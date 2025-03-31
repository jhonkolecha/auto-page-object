
# Auto Page Object

Ferramenta para geração automática de **Page Objects** com **Playwright**. Permite a criação de classes de automação para testes de UI, gerando os arquivos de **Page Object** e seus respectivos relatórios (HTML e screenshots).

---

## 🚀 Funcionalidade

- **Geração automática de Page Objects** a partir de uma URL.
- Geração de relatórios HTML com os detalhes dos elementos da página.
- Captura de tela da página com os elementos destacados.
- Interface web simples para gerar os arquivos de forma fácil.

---

## ⚙️ Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/SEU_USUARIO/auto-page-object.git
   ```

2. Navegue até a pasta do projeto:

   ```bash
   cd auto-page-object
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

---

## 🖥️ Rodando o Projeto

Para rodar o servidor de desenvolvimento, execute o comando:

```bash
npm run dev
```

Isso iniciará a aplicação Next.js na URL `http://localhost:3000`.

---

## 📥 Como usar a interface web

1. Abra `http://localhost:3000` no seu navegador.
2. Preencha a URL da página que deseja gerar o Page Object.
3. Digite o nome da classe do Page Object.
4. Clique em **"Gerar Page Object"**.
5. Após a geração, você verá os links para baixar:
   - **O arquivo `.ts`** com o código do Page Object.
   - **Relatório HTML** com a descrição dos elementos.
   - **Screenshot** da página com os elementos destacados.

---

## 🔧 Deploy

### 📦 Deploy com Vercel

1. Conecte o repositório GitHub ao **Vercel** (https://vercel.com).
2. Importe o projeto no Vercel e faça o deploy.
3. O projeto estará disponível em uma URL como: `https://auto-page-object.vercel.app`.

### 📦 Deploy com GitHub Pages (alternativa)

1. Instale o **gh-pages**:

   ```bash
   npm install --save-dev gh-pages
   ```

2. Adicione o script de deploy no `package.json`:

   ```json
   "scripts": {
     "deploy": "next build && next export && gh-pages -d out"
   }
   ```

3. Execute o comando para fazer o deploy:

   ```bash
   npm run deploy
   ```

4. Acesse seu projeto em `https://SEU_USUARIO.github.io/auto-page-object/`.

---

## 📚 Tecnologias

- **Next.js**: Framework para construção da aplicação web.
- **Playwright**: Framework para automação de testes de UI.
- **Tailwind CSS**: Biblioteca de CSS para estilização rápida e eficiente.
- **TypeScript**: Linguagem que adiciona tipagem estática ao JavaScript.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você quiser contribuir para este projeto, siga os seguintes passos:

1. Faça um **fork** deste repositório.
2. Crie uma **branch** para suas alterações:
   ```bash
   git checkout -b minha-alteracao
   ```
3. Faça suas alterações e **commite**:
   ```bash
   git commit -m "Minha contribuição"
   ```
4. Envie suas alterações para o **seu repositório fork**:
   ```bash
   git push origin minha-alteracao
   ```
5. Abra um **pull request** com suas alterações.

---

## 📜 Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
