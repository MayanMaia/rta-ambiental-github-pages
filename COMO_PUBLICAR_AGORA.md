# Publicação imediata no GitHub Pages

Este pacote já contém o build pronto na raiz para funcionar com a configuração atual:

`Settings > Pages > Deploy from a branch > main > / (root)`

## Publicar

1. Extraia este pacote.
2. Copie todos os arquivos extraídos para a raiz do repositório.
3. Substitua os arquivos antigos.
4. Faça o commit:

```bash
git add .
git commit -m "publica build corrigido do site"
git push origin main
```

O arquivo `index.html` da raiz deste pacote é o build compilado. Não substitua novamente por um `index.html` que contenha `/src/main.jsx`.

## Configuração recomendada para o futuro

Para que cada commit compile automaticamente o código React, altere em `Settings > Pages > Build and deployment > Source` para **GitHub Actions**. O workflow em `.github/workflows/deploy-pages.yml` já está incluído.

## Endereço

https://mayanmaia.github.io/rta-ambiental-github-pages/
