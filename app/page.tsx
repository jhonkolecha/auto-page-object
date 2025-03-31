'use client'

import { useState } from 'react';
import { Input } from '../src/components/ui/input';
import { Button } from '../src/components/ui/button';
import { Card, CardContent } from '../src/components/ui/card';
import { Label } from '../src/components/ui/label';
import { Loader2 } from 'lucide-react';

export default function PageObjectGenerator() {
  const [url, setUrl] = useState('');
  const [pageName, setPageName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [downloadLinks, setDownloadLinks] = useState<any>(null);

  const handleGenerate = async () => {
    if (!url || !pageName) {
      setMessage('Preencha a URL e o nome da página.');
      return;
    }

    setLoading(true);
    setMessage('');
    setDownloadLinks(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, pageName }),
      });

      const data = await response.json();
      if (response.ok) {
        setDownloadLinks(data);
        setMessage(`✅ Sucesso! Arquivo gerado em: ${data.tsPath}`);
      } else {
        setMessage(`❌ Erro: ${data.error}`);
      }
    } catch (err) {
      setMessage('Erro ao conectar com o backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <Card className="shadow-lg w-full max-w-3xl rounded-lg">
        <CardContent className="space-y-6">
          <h1 className="text-3xl font-semibold text-center text-gray-800">Gerador de Page Object</h1>

          <div className="space-y-4">
            <div>
              <Label htmlFor="url" className="text-gray-700">URL da página</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.exemplo.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="pageName" className="text-gray-700">Nome da classe Page Object</Label>
              <Input
                id="pageName"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
                placeholder="Ex: LoginPage"
                className="mt-2"
              />
            </div>

            <Button onClick={handleGenerate} disabled={loading} className="w-full mt-6">
              {loading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : 'Gerar Page Object'}
            </Button>
          </div>

          {message && (
            <div className="mt-4 text-sm text-center text-gray-600">
              {message}
            </div>
          )}

          {downloadLinks && (
            <div className="mt-4 space-y-4">
              <h2 className="font-semibold text-lg text-gray-800">Links para download:</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`/output/${pageName}/${pageName}.ts`}
                    download
                    className="text-blue-600 hover:underline"
                  >
                    Baixar Page Object (.ts)
                  </a>
                </li>
                <li>
                  <a
                    href={`/output/${pageName}/report.html`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Ver Relatório (HTML)
                  </a>
                </li>
                <li>
                  <a
                    href={`/output/${pageName}/screenshot.png`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Ver Screenshot
                  </a>
                </li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
