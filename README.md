<h1 align="center">Web Scraping on Instagram</h1>

<p align="center">
O projeto de Web Scraping para estudo com Node.js visa desenvolver uma aplicação que permita a extração de dados de páginas web de forma automatizada e programática. Utilizando a linguagem de programação Node.js e suas bibliotecas, o projeto aborda conceitos de manipulação de requisições HTTP, análise e extração de informações de HTML, além do uso de técnicas avançadas, como autenticação e scroll automático para lidar com páginas dinâmicas. O objetivo principal é fornecer aos desenvolvedores uma experiência prática na implementação de Web Scraping ético e eficiente, respeitando os termos de serviço dos sites-alvo e utilizando tecnologias modernas para aprimorar suas habilidades de programação e coleta de dados na web.
</p>

## Rodando localmente

**Em desenvolvimento.**

É necessário o [Node.js](https://nodejs.org/it/download) para rodar. **É recomendado a versão LTS**

Baixe o projeto

```bash
git clone https://github.com/BrunomelloxD/WebScrapingNode.js.git
```

Entre no diretório do projeto

```bash
  cd WebScraping
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor. O projeto irá rodar em `http://localhost:3000/`

```bash
  npm run dev
```

## Documentação da API

#### Retorna todos os seguidores. Obs: Envie uma url no seu body.

```http
  POST /instagramFollowers
```

| Parâmetro | Tipo     | Descrição                                                                                                                                    |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`     | `string` | **Obrigatório**. Informe o perfil da pessoao que deseja listar os seus seguidores. Exemplo: `https://www.instagram.com/instagram/followers/` |

**Nesse exemplo irá retorna todos os seguidores da página Instagram**
