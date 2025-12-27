# 🚀 pprodutividade_website

Website estático e moderno para pprodutividade, construído com React, Vite, TypeScript, e TailwindCSS.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Desenvolvimento](#desenvolvimento)
- [Build e Produção](#build-e-produção)
- [Deploy com Docker](#deploy-com-docker)
- [Export Estático](#export-estático)
- [Deploy no Elementor Pro](#deploy-no-elementor-pro)
- [CI/CD com GitHub Actions](#cicd-com-github-actions)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias](#tecnologias)

## 🔧 Pré-requisitos

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **pnpm** 10.4.1+ (Instalação: `npm install -g pnpm`)
- **Docker** (opcional, para deployment containerizado)
- **Git**

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/tpiola/pprodutividade_website.git
cd pprodutividade_website

# Instale as dependências
pnpm install
```

## ⚙️ Configuração

### 1. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure as variáveis necessárias. As variáveis mais importantes são:

#### Obrigatórias para funcionalidade completa:
- `VITE_FRONTEND_FORGE_API_KEY` - Chave pública para proxy de mapas/imagens
- `VITE_FRONTEND_FORGE_API_URL` - URL do serviço Forge
- `DATABASE_URL` - String de conexão do banco de dados MySQL
- `JWT_SECRET` - Segredo para assinatura de tokens JWT

#### Opcionais:
- `SUPABASE_URL` / `SUPABASE_ANON_KEY` - Para funcionalidades de newsletter/blog
- `VITE_ANALYTICS_*` - Para analytics Umami
- `GOOGLE_MAPS_API_KEY` - Se não usar proxy Forge para mapas

### 2. Modo Desenvolvimento sem Chaves (Mock)

Se você não tem chaves de API disponíveis, ainda pode rodar o projeto em modo de desenvolvimento. Algumas funcionalidades (mapas, autenticação) não funcionarão, mas a estrutura do site será visível:

```bash
# Execute sem configurar .env
pnpm run dev
```

O site carregará com fallbacks e placeholders onde APIs externas são necessárias.

## 💻 Desenvolvimento

### Rodar servidor de desenvolvimento

```bash
pnpm run dev
```

O servidor estará disponível em `http://localhost:3000` (ou próxima porta disponível).

### Comandos úteis

```bash
# Verificar tipos TypeScript
pnpm run check

# Formatar código
pnpm run format

# Rodar testes
pnpm run test

# Gerenciar banco de dados (migrations)
pnpm run db:push
```

## 🏗️ Build e Produção

### Build Local

```bash
# Build completo (client + server)
pnpm run build
```

Isso irá:
1. Compilar o cliente React com Vite → `dist/public/`
2. Compilar o servidor Express com esbuild → `dist/index.js`

### Rodar em Produção Local

```bash
# Após o build
pnpm start
```

O servidor rodará em modo produção na porta 3000 (ou especificada em `PORT`).

## 🐳 Deploy com Docker

### Opção 1: Docker Compose (Recomendado)

```bash
# 1. Configure o arquivo .env
cp .env.example .env
# Edite .env com suas credenciais

# 2. Build e start com docker-compose
docker-compose up -d

# Ver logs
docker-compose logs -f web

# Parar containers
docker-compose down
```

### Opção 2: Docker Manual

```bash
# Build da imagem
docker build -t pprodutividade-web .

# Rodar container
docker run -d \
  --name pprodutividade \
  -p 3000:3000 \
  --env-file .env \
  pprodutividade-web

# Ver logs
docker logs -f pprodutividade

# Parar container
docker stop pprodutividade
docker rm pprodutividade
```

### Healthcheck

A imagem Docker inclui um healthcheck que verifica se o servidor está respondendo corretamente.

## 📤 Export Estático

Gere uma versão totalmente estática do site (HTML pré-renderizado) para hospedar em qualquer plataforma ou importar para o Elementor.

### Passo 1: Gerar Site Estático

```bash
# Export completo com pre-rendering
pnpm run export:static
```

Isso irá:
1. Fazer build do projeto com Vite
2. Iniciar servidor temporário
3. Usar Puppeteer para visitar todas as rotas
4. Salvar HTML pré-renderizado em `./out/`
5. Copiar todos os assets (CSS, JS, imagens, fontes)

### Passo 2: Criar ZIP para Deploy

```bash
# Criar arquivo site-export.zip
pnpm run export:zip
```

O arquivo `out/site-export.zip` estará pronto para upload.

### O que está incluído no export:

```
out/
├── index.html           # Página principal pré-renderizada
├── sobre.html           # Página "sobre" pré-renderizada  
├── 404.html             # Página de erro pré-renderizada
├── assets/              # CSS, JS, fontes compilados
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── deployment-info.json # Instruções de deployment
└── site-export.zip      # Arquivo compactado pronto
```

## 🎨 Deploy no Elementor Pro

### Método 1: Import HTML Completo

1. **Extrair ZIP**
   ```bash
   unzip out/site-export.zip -d elementor-import
   ```

2. **Upload de Assets**
   - Acesse o Media Library do WordPress
   - Upload dos arquivos em `assets/` para WordPress media
   - Anote as URLs dos arquivos uploaded

3. **Criar Nova Página no Elementor**
   - WordPress Admin → Pages → Add New
   - Edit with Elementor
   - Add HTML Widget

4. **Colar HTML**
   - Abra `index.html` no editor de texto
   - Copie todo o conteúdo
   - Cole no HTML Widget do Elementor

5. **Atualizar Caminhos de Assets**
   - Substitua caminhos relativos (`/assets/...`) 
   - Por URLs absolutas do WordPress (`https://seusite.com/wp-content/uploads/...`)
   - Use Find & Replace no editor

6. **Publicar**
   - Preview para verificar
   - Publish quando estiver satisfeito

### Método 2: Import CSS/JS como Custom Code

1. **Upload Assets via FTP/cPanel**
   ```
   wp-content/themes/seu-tema/assets/pprodutividade/
   ```

2. **Adicionar CSS no Theme**
   - Elementor → Custom CSS
   - Ou Theme Customizer → Additional CSS
   - Cole o conteúdo do arquivo `.css` principal

3. **Adicionar JS no Footer**
   - Elementor → Custom Code
   - Location: Footer
   - Cole o conteúdo do arquivo `.js` principal

4. **Reconstruir Layout**
   - Use widgets Elementor para recriar a estrutura
   - Aplique classes CSS existentes

### Considerações Importantes

⚠️ **Funcionalidades Dinâmicas:**
- Mapas do Google Maps precisarão ser reconfigurados com widget Elementor Maps
- Chamadas à API (newsletter, blog) precisarão integração WordPress
- Autenticação OAuth não funcionará - use WordPress login

✅ **O que funciona:**
- Todo CSS e estilização
- Animações e transições
- Layout responsivo
- Formulários estáticos (precisam action configurada)

## 🔄 CI/CD com GitHub Actions

O projeto inclui workflow automático para export estático.

### Configuração

1. **Adicionar Secrets no GitHub**
   - Vá para: Repository → Settings → Secrets and variables → Actions
   - Adicione secrets necessários:
     - `VITE_FRONTEND_FORGE_API_KEY`
     - `VITE_FRONTEND_FORGE_API_URL`
     - Outros conforme necessário (veja `.env.example`)

2. **Workflow Automático**
   - Roda em push para `main` ou `infra/static-export`
   - Ou manualmente via Actions tab → Export Static Site → Run workflow

3. **Download Artifact**
   - Após workflow completar
   - Actions tab → último workflow run
   - Download `site-export-[sha].zip`

### Publicação Automática (Opcional)

Para publicar automaticamente em Docker Hub, descomente o job `docker-build` em `.github/workflows/export-static.yml` e adicione secrets:
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

## 📁 Estrutura do Projeto

```
pprodutividade_website/
├── .github/
│   └── workflows/           # GitHub Actions workflows
├── client/                  # Frontend React + Vite
│   ├── src/
│   │   ├── components/     # Componentes React reutilizáveis
│   │   ├── pages/          # Páginas (rotas)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilitários
│   │   ├── contexts/       # React Context providers
│   │   └── App.tsx         # Componente raiz
│   ├── public/             # Assets estáticos
│   └── index.html          # HTML template
├── server/                  # Backend Express + tRPC
│   ├── _core/              # Configuração servidor
│   ├── routers/            # tRPC routers (API)
│   └── storage.ts          # Storage helpers
├── shared/                  # Código compartilhado client/server
├── scripts/                 # Scripts utilitários
│   └── export-static.ts    # Script de export estático
├── drizzle/                 # Schema e migrations banco
├── dist/                    # Build output (gitignored)
├── out/                     # Export estático output (gitignored)
├── .env.example            # Template de variáveis ambiente
├── docker-compose.yml      # Docker Compose config
├── Dockerfile              # Docker image config
├── vite.config.ts          # Vite configuration
├── package.json            # Dependencies e scripts
└── README.md               # Esta documentação
```

## 🛠️ Tecnologias

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool e dev server
- **TailwindCSS 4** - Utility-first CSS
- **Wouter** - Lightweight routing
- **Radix UI** - Accessible components
- **Framer Motion** - Animations
- **React Query** - Server state management

### Backend
- **Express** - Web server
- **tRPC** - Type-safe APIs
- **Drizzle ORM** - Database ORM
- **MySQL** - Database
- **Supabase** - Optional backend services

### DevOps
- **Docker** - Containerization
- **pnpm** - Fast package manager
- **GitHub Actions** - CI/CD
- **Puppeteer** - Static site generation

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm run dev` | Inicia servidor de desenvolvimento |
| `pnpm run build` | Build de produção (client + server) |
| `pnpm start` | Inicia servidor de produção |
| `pnpm run check` | Type-check TypeScript |
| `pnpm run format` | Formata código com Prettier |
| `pnpm run test` | Executa testes |
| `pnpm run export:static` | Gera site estático pré-renderizado |
| `pnpm run export:zip` | Cria ZIP do site exportado |
| `pnpm run db:push` | Roda migrations do banco |

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Se encontrar problemas:

1. Verifique se todas as dependências estão instaladas: `pnpm install`
2. Confirme que as variáveis de ambiente estão configuradas corretamente
3. Verifique logs do servidor/Docker para erros específicos
4. Abra uma issue no GitHub com detalhes do problema

## 🎯 Roadmap

- [x] Configuração inicial do projeto
- [x] Sistema de export estático
- [x] Docker e docker-compose
- [x] CI/CD com GitHub Actions
- [x] Documentação completa
- [ ] Testes end-to-end
- [ ] PWA support
- [ ] SSR optimization
- [ ] Plugin WordPress para import automático

---

Desenvolvido com ❤️ para pprodutividade
