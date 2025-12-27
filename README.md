# pprodutividade_website

Website institucional da pprodutividade com suporte para export estático e deploy flexível.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ 
- pnpm (gerenciador de pacotes)

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/tpiola/pprodutividade_website.git
cd pprodutividade_website

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas chaves reais

# Inicie o servidor de desenvolvimento
pnpm run dev
```

O site estará disponível em `http://localhost:3000`

## 🔧 Configuração

### Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure as seguintes variáveis:

```bash
# Essenciais para desenvolvimento
NODE_ENV=development
PORT=3000

# APIs e Serviços (opcional para desenvolvimento básico)
BUILT_IN_FORGE_API_URL=https://forge.example.com
BUILT_IN_FORGE_API_KEY=sua_chave_aqui
VITE_FRONTEND_FORGE_API_URL=https://forge.example.com
VITE_FRONTEND_FORGE_API_KEY=sua_chave_aqui

# Para recursos completos, configure também:
# - AWS S3 (armazenamento de arquivos)
# - Google Maps (mapas interativos)
# - Analytics (rastreamento)
# - Database (banco de dados)
```

**Nota**: O projeto funciona em modo de desenvolvimento sem todas as chaves configuradas. Recursos dinâmicos (mapas, geração de imagens) usarão placeholders.

## 📦 Build e Deploy

### Build para Produção

```bash
# Build do cliente (Vite) e servidor (esbuild)
pnpm run build
```

Isso gera:
- `dist/public/` - Arquivos estáticos do frontend
- `dist/index.js` - Bundle do servidor Node.js

### Executar em Produção

```bash
NODE_ENV=production pnpm start
```

## 🐳 Docker

### Build e Execução com Docker

```bash
# Build da imagem
docker-compose build

# Iniciar o container
docker-compose up

# Ou em modo detached
docker-compose up -d
```

O site estará disponível em `http://localhost:3000`

### Configuração Docker

O `docker-compose.yml` já está configurado para:
- Carregar variáveis do arquivo `.env`
- Expor a porta 3000
- Health checks automáticos
- Restart automático

## 📤 Export Estático

Para gerar uma versão completamente estática do site (ideal para hospedagem estática ou importação no Elementor):

### Gerar Export Estático

```bash
# Passo 1: Gerar páginas estáticas
pnpm run export:static

# Passo 2: Criar arquivo ZIP
pnpm run export:zip
```

Isso criará:
- `out/` - Diretório com arquivos HTML e assets
- `site-export.zip` - Arquivo ZIP pronto para distribuição

### Conteúdo do Export

O export inclui:
- ✅ HTML pré-renderizado de todas as páginas
- ✅ CSS, JavaScript e imagens otimizados
- ✅ Estrutura pronta para SEO
- ⚠️  Recursos dinâmicos (mapas, imagens geradas) como placeholders

## 🎨 Importação no Elementor Pro

### Método 1: Upload Direto

1. Extraia o arquivo `site-export.zip`
2. No WordPress, vá em **Páginas > Adicionar Nova**
3. Clique em **Editar com Elementor**
4. Use o widget **HTML** e cole o conteúdo de cada arquivo `.html`
5. Ajuste estilos e layout conforme necessário

### Método 2: Importação com Plugin

1. Instale um plugin de importação HTML (ex: "Import HTML Pages")
2. Importe os arquivos `.html` do export
3. Cada página será convertida em uma página do WordPress
4. Edite com Elementor para personalizar

### Substituindo Placeholders

Alguns recursos dinâmicos precisam ser configurados manualmente:

- **Mapas**: Use o widget nativo de mapas do Elementor com sua API key
- **Imagens Geradas**: Substitua por imagens reais da sua biblioteca
- **Formulários**: Configure com plugins como Contact Form 7 ou WPForms

## 📁 Estrutura do Projeto

```
pprodutividade_website/
├── client/              # Frontend React + Vite
│   ├── src/
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── components/  # Componentes reutilizáveis
│   │   └── ...
│   └── public/          # Assets estáticos
├── server/              # Backend Node.js + Express
│   ├── _core/           # Core do servidor
│   └── routers/         # Rotas da API
├── scripts/             # Scripts utilitários
│   ├── export-static.js # Gerador de export estático
│   └── export-zip.js    # Compactador ZIP
├── Dockerfile           # Configuração Docker
├── docker-compose.yml   # Orquestração Docker
├── .env.example         # Exemplo de variáveis de ambiente
└── package.json         # Dependências e scripts
```

## 🛠️ Scripts Disponíveis

```bash
pnpm run dev           # Servidor de desenvolvimento com hot-reload
pnpm run build         # Build para produção
pnpm start             # Executar build em produção
pnpm run check         # Verificar tipos TypeScript
pnpm run format        # Formatar código com Prettier
pnpm run test          # Executar testes
pnpm run export:static # Gerar export estático
pnpm run export:zip    # Criar ZIP do export
```

## 🔒 Segurança

- ⚠️  **NUNCA** comite o arquivo `.env` com chaves reais
- ⚠️  Sempre use variáveis de ambiente para credenciais sensíveis
- ⚠️  Configure CORS adequadamente para produção
- ⚠️  Mantenha as dependências atualizadas

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Notas Importantes

### Modo de Desenvolvimento sem Chaves de API

O projeto está configurado para funcionar em modo de desenvolvimento mesmo sem todas as chaves de API configuradas:

- **Mapas Google**: Renderizarão com placeholder
- **Geração de Imagens IA**: Retornará imagens SVG placeholder
- **Storage S3**: Usará URLs mock em base64

Isso permite que você desenvolva e teste o layout e funcionalidades básicas sem precisar configurar todas as integrações imediatamente.

### Export Estático vs Site Dinâmico

O export estático é ideal para:
- ✅ Hospedagem barata (Netlify, Vercel, GitHub Pages)
- ✅ Performance máxima (sem servidor)
- ✅ Importação no WordPress/Elementor
- ❌ Não suporta funcionalidades server-side em tempo real
- ❌ Formulários precisam de configuração adicional

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma [Issue no GitHub](https://github.com/tpiola/pprodutividade_website/issues)
- Entre em contato com a equipe de desenvolvimento

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
