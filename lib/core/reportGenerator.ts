import { PageElement } from './pageScanner';

export function generateHTMLReport(pageName: string, elements: PageElement[]): string {
  const rows = elements.map((el, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><code>${el.name}</code></td>
      <td><code>${el.type}</code></td>
      <td><code>${el.value}</code></td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${pageName} - Page Object</title>
  <style>
    body { font-family: sans-serif; padding: 1rem; }
    img { max-width: 100%; border: 1px solid #ccc; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { border: 1px solid #ddd; padding: 8px; }
    th { background: #f4f4f4; }
    code { white-space: nowrap; }
  </style>
</head>
<body>
  <h1>Page Object: ${pageName}</h1>
  <img src="screenshot.png" />
  <table>
    <thead>
      <tr><th>#</th><th>Variável</th><th>Método</th><th>Seletor</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>
  `.trim();
}
