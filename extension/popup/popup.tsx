import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";

export default function Popup() {
  const [pageName, setPageName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerate = async () => {
    if (!pageName) {
      setMessage("Preencha o nome da classe da página.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        const currentUrl = tabs[0]?.url;

        if (!currentUrl) {
          setMessage("Erro: Não foi possível capturar a URL da página.");
          return;
        }

        // Captura os cookies da página
        chrome.cookies.getAll({ url: currentUrl }, async (cookies) => {
          if (cookies) {
            const cookiesArray = cookies.map((cookie) => ({
              name: cookie.name,
              value: cookie.value,
              domain: cookie.domain,
              path: cookie.path,
            }));

            // Envia a URL e os cookies para o backend
            const response = await fetch("http://localhost:3000/api/generate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                url: currentUrl,
                pageName: pageName,
                cookies: cookiesArray, // Envia os cookies
              }),
            });

            const data = await response.json();

            if (response.ok) {
              setMessage(`✅ Page Object gerado com sucesso!`);
              const { downloadUrl } = data;
              downloadFile(downloadUrl);
            } else {
              setMessage(`❌ Erro ao gerar o Page Object: ${data.error}`);
            }
          } else {
            setMessage("Erro: Não foi possível obter os cookies.");
          }
        });
      });
    } catch (err) {
      setMessage("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (fileUrl: string) => {
    const link = document.createElement("a");
    link.href = `http://localhost:3000${fileUrl}`;
    link.download = `${fileUrl.split("/").pop()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="popup-container">
      <h1>Page Object Generator</h1>
      <div className="input-group">
        <label htmlFor="pageName">Nome da classe Page Object</label>
        <input
          id="pageName"
          type="text"
          value={pageName}
          onChange={(e) => setPageName(e.target.value)}
          placeholder="Ex: LoginPage"
        />
      </div>
      <button
        className={`generate-btn ${loading ? "loading" : ""}`}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Gerando..." : "Gerar Page Object"}
      </button>
      {message && <div className={`message ${message.startsWith("✅") ? "success" : "error"}`}>{message}</div>}
    </div>
  );
}

const rootElement = document.getElementById("app");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Popup />);
}
