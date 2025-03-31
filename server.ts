import express from "express";
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { generatePageObject } from "./lib/core/pageObjectGenerator";
import { scanPageElements } from "./lib/core/pageScanner";
import { generateHTMLReport } from "./lib/core/reportGenerator";
import { captureScreenshotWithHighlights } from "./lib/core/screenshotMarker";
import archiver from "archiver";

const app = express();
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  const { pageName, url, cookies } = req.body;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  // Adiciona os cookies válidos ao contexto
  cookies.forEach((cookie: { name: string; value: string; domain: string; path: string }) => {
    try {
      // Verificar se todos os campos obrigatórios estão presentes
      if (!cookie.name || !cookie.value || !cookie.domain || !cookie.path) {
        console.log(`Cookie inválido ignorado (falta campo): ${JSON.stringify(cookie)}`);
        return;
      }

      // Verificar se o domínio do cookie é válido (deve ser um domínio, não uma URL completa)
      const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!domainPattern.test(cookie.domain)) {
        console.log(`Cookie inválido ignorado (domínio inválido): ${JSON.stringify(cookie)}`);
        return;
      }

      // Garantir que o domínio do cookie seja compatível com o domínio da URL da página
      const urlDomain = new URL(url).hostname;
      if (!cookie.domain.includes(urlDomain)) {
        console.log(`Cookie inválido ignorado (domínio não corresponde): ${JSON.stringify(cookie)}`);
        return;
      }

      // Adiciona o cookie ao contexto
      context.addCookies([cookie]);
    } catch (err) {
      console.error("Erro ao adicionar cookie:", err);
    }
  });

  const page = await context.newPage();

  try {
    // Navega até a URL fornecida
    await page.goto(url);

    const elements = await scanPageElements(page);  // Captura os elementos da página

    if (elements.length === 0) {
      return res.status(500).json({ success: false, error: "Nenhum elemento encontrado para gerar o Page Object." });
    }

    const tsContent = generatePageObject(pageName, elements);
    const tsFilePath = path.join(__dirname, "generated", pageName, `${pageName}.ts`);

    const dirPath = path.dirname(tsFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(tsFilePath, tsContent);

    const htmlContent = generateHTMLReport(pageName, elements);
    const htmlFilePath = path.join(__dirname, "generated", pageName, "report.html");
    fs.writeFileSync(htmlFilePath, htmlContent);

    const screenshot = await captureScreenshotWithHighlights(page, elements);
    const screenshotFilePath = path.join(__dirname, "generated", pageName, "screenshot.png");
    fs.writeFileSync(screenshotFilePath, screenshot);

    const zipFilePath = path.join(__dirname, "generated", pageName, `${pageName}.zip`);
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);
    archive.file(tsFilePath, { name: `${pageName}.ts` });
    archive.file(htmlFilePath, { name: "report.html" });
    archive.file(screenshotFilePath, { name: "screenshot.png" });

    await archive.finalize();

    res.json({ downloadUrl: `/generated/${pageName}/${pageName}.zip` });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Erro ao gerar Page Object:", err.message);
      res.status(500).json({ success: false, error: err.message });
    } else {
      console.error("Erro desconhecido ao gerar Page Object:", err);
      res.status(500).json({ success: false, error: "Erro desconhecido" });
    }
  } finally {
    await browser.close();
  }
});

app.use("/generated", express.static(path.join(__dirname, "generated")));

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
