#!/usr/bin/env node

/**
 * Export Static Site Generator
 * 
 * Este script gera uma versão estática do site para deploy em hospedagem estática
 * ou importação no Elementor Pro.
 * 
 * Processo:
 * 1. Executa build do projeto
 * 2. Inicia servidor local com os arquivos buildados
 * 3. Usa Puppeteer para renderizar cada página
 * 4. Salva HTML renderizado e copia assets
 * 5. Gera estrutura pronta para deploy/importação
 */

import { spawn } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, cpSync, readFileSync, readdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');
const outDir = join(rootDir, 'out');
const distDir = join(rootDir, 'dist', 'public');

// Rotas detectadas automaticamente dos arquivos de página
const PAGES = [
  { route: '/', name: 'index' },
  { route: '/sobre', name: 'sobre' },
  { route: '/component-showcase', name: 'component-showcase' },
];

console.log('🚀 Iniciando export estático...\n');

// Passo 1: Build do projeto
async function buildProject() {
  console.log('📦 Executando build do projeto...');
  return new Promise((resolve, reject) => {
    const build = spawn('pnpm', ['run', 'build'], {
      cwd: rootDir,
      stdio: 'inherit',
      shell: true,
    });

    build.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Build falhou com código ${code}`));
        return;
      }
      console.log('✅ Build concluído com sucesso!\n');
      resolve();
    });

    build.on('error', (err) => {
      reject(new Error(`Erro ao executar build: ${err.message}`));
    });
  });
}

// Passo 2: Iniciar servidor estático
async function startStaticServer() {
  console.log('🌐 Iniciando servidor estático...');
  
  if (!existsSync(distDir)) {
    throw new Error(`Diretório de build não encontrado: ${distDir}`);
  }

  return new Promise((resolve, reject) => {
    // Usar sirv-cli se disponível, senão usar um servidor HTTP simples
    const server = spawn('npx', ['sirv-cli', distDir, '--port', '3001', '--single'], {
      cwd: rootDir,
      stdio: 'pipe',
      shell: true,
    });

    let serverReady = false;

    server.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(output);
      
      if (output.includes('http://') || output.includes('Ready')) {
        if (!serverReady) {
          serverReady = true;
          console.log('✅ Servidor estático rodando na porta 3001\n');
          // Aguardar um pouco para garantir que o servidor está pronto
          setTimeout(() => resolve(server), 2000);
        }
      }
    });

    server.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    server.on('error', (err) => {
      reject(new Error(`Erro ao iniciar servidor: ${err.message}`));
    });

    // Timeout de 30 segundos
    setTimeout(() => {
      if (!serverReady) {
        server.kill();
        reject(new Error('Timeout ao iniciar servidor estático'));
      }
    }, 30000);
  });
}

// Passo 3: Renderizar páginas com Puppeteer
async function renderPages(serverProcess) {
  console.log('🎨 Renderizando páginas com Puppeteer...');
  
  // Importação dinâmica do Puppeteer
  let puppeteer;
  try {
    puppeteer = await import('puppeteer');
  } catch (err) {
    console.error('❌ Puppeteer não encontrado. Instalando...');
    await new Promise((resolve, reject) => {
      const install = spawn('pnpm', ['add', '-D', 'puppeteer'], {
        cwd: rootDir,
        stdio: 'inherit',
        shell: true,
      });
      install.on('close', (code) => {
        if (code !== 0) {
          reject(new Error('Falha ao instalar Puppeteer'));
          return;
        }
        resolve();
      });
    });
    puppeteer = await import('puppeteer');
  }

  const browser = await puppeteer.default.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // Criar diretório de saída
  if (existsSync(outDir)) {
    console.log('🗑️  Limpando diretório out/ existente...');
    cpSync(outDir, outDir + '_backup', { recursive: true });
  }
  mkdirSync(outDir, { recursive: true });

  try {
    for (const page of PAGES) {
      console.log(`  📄 Renderizando: ${page.route}`);
      
      const pageInstance = await browser.newPage();
      
      // Configurar viewport
      await pageInstance.setViewport({ width: 1920, height: 1080 });
      
      // Navegar para a página
      const url = `http://localhost:3001${page.route}`;
      await pageInstance.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Aguardar um pouco para animações e conteúdo dinâmico
      await pageInstance.waitForTimeout(1000);

      // Obter HTML renderizado
      const html = await pageInstance.content();

      // Salvar HTML
      const filename = page.name === 'index' ? 'index.html' : `${page.name}.html`;
      const filepath = join(outDir, filename);
      writeFileSync(filepath, html, 'utf-8');
      
      console.log(`    ✅ Salvo: ${filename}`);
      
      await pageInstance.close();
    }

    console.log('\n✅ Todas as páginas foram renderizadas!\n');
  } finally {
    await browser.close();
    
    // Encerrar servidor
    console.log('🛑 Encerrando servidor estático...');
    serverProcess.kill();
  }
}

// Passo 4: Copiar assets
async function copyAssets() {
  console.log('📂 Copiando assets...');
  
  const assetsDir = join(outDir, 'assets');
  mkdirSync(assetsDir, { recursive: true });

  // Copiar arquivos CSS, JS, imagens do dist
  if (existsSync(distDir)) {
    try {
      const files = readdirSync(distDir, { recursive: true });
      
      for (const file of files) {
        const srcPath = join(distDir, file);
        const destPath = join(assetsDir, file);
        
        // Criar diretórios necessários
        mkdirSync(dirname(destPath), { recursive: true });
        
        // Copiar arquivo se não for HTML
        if (!file.endsWith('.html') && !file.includes('index.html')) {
          cpSync(srcPath, destPath, { recursive: true, force: true });
        }
      }
      
      console.log('✅ Assets copiados com sucesso!\n');
    } catch (err) {
      console.error('⚠️  Erro ao copiar assets:', err.message);
    }
  }
}

// Passo 5: Criar arquivo de instruções
async function createInstructions() {
  const instructions = `
# Export Estático - pprodutividade_website

## 📦 Conteúdo

Este diretório contém a versão estática do site, pronta para:
- Deploy em hospedagem estática (Netlify, Vercel, GitHub Pages, etc.)
- Importação no Elementor Pro do WordPress

## 📋 Estrutura

- **index.html**: Página inicial
- **sobre.html**: Página Sobre
- **component-showcase.html**: Showcase de componentes
- **assets/**: Arquivos CSS, JavaScript, imagens e fontes

## 🚀 Deploy em Hospedagem Estática

### Netlify / Vercel / GitHub Pages

1. Faça upload de todo o conteúdo deste diretório
2. Configure o domínio personalizado (se necessário)
3. Pronto! O site estará no ar

### Servidor Web Tradicional (Apache, Nginx)

1. Copie todo o conteúdo para a pasta web (ex: /var/www/html)
2. Configure o servidor para servir arquivos estáticos
3. Certifique-se de que o index.html seja servido na raiz

## 📝 Importação no Elementor Pro

### Método 1: Importar HTML Direto

1. No WordPress, acesse Elementor > Templates > Theme Builder
2. Crie uma nova página/template
3. Use o widget "HTML" do Elementor
4. Cole o conteúdo de cada arquivo .html
5. Ajuste estilos conforme necessário

### Método 2: Converter para Template

1. Use um plugin de importação de HTML (ex: "Import HTML Pages")
2. Importe cada arquivo .html como uma página separada
3. Edite com o Elementor para personalizar

## ⚠️  Recursos Dinâmicos

Alguns recursos foram substituídos por placeholders no export estático:

### Mapas do Google
- **Problema**: Requer API key e JavaScript dinâmico
- **Solução**: No Elementor, use o widget nativo de mapas ou configure a API key

### Imagens Geradas (IA)
- **Problema**: Geração dinâmica não funciona em modo estático
- **Solução**: Substitua por imagens reais ou use o serviço backend

### APIs Externas
- **Problema**: Chamadas diretas a APIs podem falhar
- **Solução**: Configure proxy ou use funções serverless

## 🔧 Configuração de Variáveis

Para ativar recursos dinâmicos, configure as seguintes variáveis no seu ambiente:

\`\`\`bash
VITE_FRONTEND_FORGE_API_KEY=sua_chave_aqui
VITE_FRONTEND_FORGE_API_URL=https://forge.example.com
VITE_FRONTEND_GOOGLE_MAPS_KEY=sua_chave_google_maps
\`\`\`

## 📚 Mais Informações

Consulte o README.md principal do repositório para instruções completas.
`;

  writeFileSync(join(outDir, 'README.md'), instructions.trim(), 'utf-8');
  console.log('📄 Arquivo de instruções criado: out/README.md\n');
}

// Função principal
async function main() {
  try {
    await buildProject();
    const server = await startStaticServer();
    await renderPages(server);
    await copyAssets();
    await createInstructions();
    
    console.log('🎉 Export estático concluído com sucesso!');
    console.log(`📁 Arquivos disponíveis em: ${outDir}`);
    console.log('');
    console.log('Próximos passos:');
    console.log('  1. Execute "pnpm run export:zip" para criar um arquivo ZIP');
    console.log('  2. Faça upload do ZIP para sua hospedagem ou importe no Elementor');
    console.log('');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Erro durante o export estático:');
    console.error(err.message);
    console.error('');
    process.exit(1);
  }
}

main();
