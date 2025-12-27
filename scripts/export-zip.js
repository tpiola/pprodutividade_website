#!/usr/bin/env node

/**
 * Export to ZIP
 * 
 * Compacta o diretório out/ em um arquivo ZIP para fácil distribuição
 */

import archiver from 'archiver';
import { createWriteStream, existsSync } from 'fs';
import { join, resolve } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');
const outDir = join(rootDir, 'out');
const zipPath = join(rootDir, 'site-export.zip');

console.log('📦 Criando arquivo ZIP do export estático...\n');

async function createZip() {
  // Verificar se o diretório out existe
  if (!existsSync(outDir)) {
    throw new Error(
      'Diretório out/ não encontrado. Execute "pnpm run export:static" primeiro.'
    );
  }

  // Instalar archiver se necessário
  let archiverModule;
  try {
    archiverModule = archiver;
  } catch (err) {
    console.log('📥 Instalando dependência archiver...');
    const { spawn } = await import('child_process');
    await new Promise((resolve, reject) => {
      const install = spawn('pnpm', ['add', '-D', 'archiver'], {
        cwd: rootDir,
        stdio: 'inherit',
        shell: true,
      });
      install.on('close', (code) => {
        if (code !== 0) {
          reject(new Error('Falha ao instalar archiver'));
          return;
        }
        resolve();
      });
    });
    // Re-importar após instalação
    const archiverPkg = await import('archiver');
    archiverModule = archiverPkg.default;
  }

  return new Promise((resolve, reject) => {
    const output = createWriteStream(zipPath);
    const archive = archiverModule('zip', {
      zlib: { level: 9 }, // Máxima compressão
    });

    output.on('close', () => {
      const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
      console.log(`\n✅ ZIP criado com sucesso!`);
      console.log(`📁 Localização: ${zipPath}`);
      console.log(`📊 Tamanho: ${sizeMB} MB`);
      console.log('');
      console.log('🎉 Pronto para deploy ou importação no Elementor!');
      console.log('');
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('⚠️  Aviso:', err.message);
      } else {
        reject(err);
      }
    });

    // Pipe archive data to the file
    archive.pipe(output);

    // Adicionar todo o conteúdo do diretório out
    console.log('📂 Compactando arquivos...');
    archive.directory(outDir, false);

    // Finalizar
    archive.finalize();
  });
}

async function main() {
  try {
    await createZip();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Erro ao criar ZIP:');
    console.error(err.message);
    console.error('');
    process.exit(1);
  }
}

main();
