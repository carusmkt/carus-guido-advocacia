# Carús Guido Advocacia — site institucional

Site estático (HTML + CSS + JS puro), sem dependências nem etapa de build. Pronto para GitHub Pages.

## Estrutura

```
index.html                    Página principal
politica-de-privacidade.html  Política de privacidade (LGPD)
404.html                      Página de erro
assets/css/style.css          Estilos (modo claro/escuro)
assets/js/main.js             Tema, menu mobile, filtro das perguntas
assets/img/                   Logo, foto, favicon e imagem de compartilhamento
robots.txt · sitemap.xml · site.webmanifest · .nojekyll
```

## Dados do escritório

OAB/RS 121.554 · Rua Dr. Pantaleão, 270 – térreo, Santa Maria – RS · (55) 3307-7098 · WhatsApp (55) 98403-6693 · joaocguido@gmail.com

Endereço atual: https://carusmkt.github.io/carus-guido-advocacia/ (sem domínio próprio). Ao registrar um domínio, troque esse endereço em canonical, sitemap, robots, Open Graph e JSON-LD, e os caminhos `/carus-guido-advocacia/` do `404.html` por `/`.

## Publicar no GitHub Pages

1. Crie um repositório (ex.: `carus-guido-advocacia`) e envie os arquivos.
2. Em **Settings → Pages**, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`.
3. Domínio próprio: informe o domínio em **Custom domain**, ative **Enforce HTTPS** e configure o DNS conforme a documentação do GitHub.
4. Após publicar, cadastre o site no **Google Search Console** e envie o `sitemap.xml`.


## Visualizar localmente

```bash
python3 -m http.server 8765
```
