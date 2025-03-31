import { chromium } from 'playwright';
import { scanPageElements } from './core/pageScanner';
import { generatePageObject } from './core/pageObjectGenerator';
import { highlightElements } from './core/screenshotMarker';
import { generateHTMLReport } from './core/reportGenerator';
import { ensureDir, writeToFile } from './core/utils/fileUtils';
import path from 'path';

export async function run(url: string, pageName: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const elements = await scanPageElements(page);
  const poContent = generatePageObject(pageName, elements);

  const outDir = `public/output/${pageName}`;
  const tsPath = path.join(outDir, `${pageName}.ts`);
  const htmlPath = path.join(outDir, `report.html`);
  const screenshotPath = path.join(outDir, `screenshot.png`);

  ensureDir(outDir);

  writeToFile(tsPath, poContent);

  await highlightElements(page, elements);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  const html = generateHTMLReport(pageName, elements);
  writeToFile(htmlPath, html);

  await browser.close();
}