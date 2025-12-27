#!/usr/bin/env tsx

/**
 * Static Export Script for pprodutividade_website
 * 
 * This script:
 * 1. Builds the Vite client
 * 2. Starts a temporary static server
 * 3. Uses Puppeteer to pre-render all routes
 * 4. Saves static HTML and copies assets to ./out directory
 * 
 * Usage: pnpm run export:static
 */

import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Configuration
const BUILD_DIR = path.join(projectRoot, 'dist', 'public');
const OUT_DIR = path.join(projectRoot, 'out');
const SERVER_PORT = 3001;
const BASE_URL = `http://localhost:${SERVER_PORT}`;

// Routes to pre-render (automatically detected from pages)
const ROUTES = [
  '/',
  '/sobre',
  '/404',
];

interface ExportStats {
  totalRoutes: number;
  successfulRoutes: number;
  failedRoutes: string[];
  totalAssets: number;
  startTime: number;
  endTime: number;
}

const stats: ExportStats = {
  totalRoutes: 0,
  successfulRoutes: 0,
  failedRoutes: [],
  totalAssets: 0,
  startTime: Date.now(),
  endTime: 0,
};

/**
 * Run a command and return a promise
 */
function runCommand(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`\n📦 Running: ${command} ${args.join(' ')}`);
    
    const proc = spawn(command, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true,
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    proc.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Start static file server
 */
function startServer(): Promise<() => void> {
  return new Promise((resolve, reject) => {
    console.log(`\n🚀 Starting static server on port ${SERVER_PORT}...`);
    
    const server = spawn('npx', ['serve', BUILD_DIR, '-l', String(SERVER_PORT), '--no-clipboard'], {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let resolved = false;

    server.stdout?.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Accepting connections') || output.includes('Local:')) {
        if (!resolved) {
          resolved = true;
          console.log('✅ Server started successfully');
          // Wait a bit for server to be fully ready
          setTimeout(() => {
            resolve(() => {
              server.kill();
            });
          }, 1000);
        }
      }
    });

    server.stderr?.on('data', (data) => {
      console.error('Server error:', data.toString());
    });

    server.on('error', (err) => {
      if (!resolved) {
        resolved = true;
        reject(err);
      }
    });

    // Timeout after 10 seconds
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        server.kill();
        reject(new Error('Server start timeout'));
      }
    }, 10000);
  });
}

/**
 * Clean and create output directory
 */
async function prepareOutputDir(): Promise<void> {
  console.log(`\n🧹 Preparing output directory: ${OUT_DIR}`);
  
  try {
    await fs.rm(OUT_DIR, { recursive: true, force: true });
  } catch (err) {
    // Directory might not exist, that's OK
  }
  
  await fs.mkdir(OUT_DIR, { recursive: true });
  console.log('✅ Output directory ready');
}

/**
 * Copy assets from build directory to output directory
 */
async function copyAssets(): Promise<void> {
  console.log('\n📁 Copying static assets...');
  
  try {
    const entries = await fs.readdir(BUILD_DIR, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(BUILD_DIR, entry.name);
      const destPath = path.join(OUT_DIR, entry.name);
      
      if (entry.isDirectory()) {
        await fs.mkdir(destPath, { recursive: true });
        await copyDirectory(srcPath, destPath);
      } else if (entry.name !== 'index.html') {
        // Copy all files except index.html (we'll generate that per route)
        await fs.copyFile(srcPath, destPath);
        stats.totalAssets++;
      }
    }
    
    console.log(`✅ Copied ${stats.totalAssets} asset files`);
  } catch (err) {
    console.error('Error copying assets:', err);
    throw err;
  }
}

/**
 * Recursively copy directory
 */
async function copyDirectory(src: string, dest: string): Promise<void> {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
      stats.totalAssets++;
    }
  }
}

/**
 * Pre-render a single route
 */
async function prerenderRoute(browser: puppeteer.Browser, route: string): Promise<void> {
  const url = `${BASE_URL}${route}`;
  console.log(`\n🔍 Pre-rendering: ${route}`);
  
  try {
    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to the page
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });
    
    // Wait a bit for any client-side hydration
    await page.waitForTimeout(1000);
    
    // Get the rendered HTML
    const html = await page.content();
    
    // Determine output path
    let outputPath: string;
    if (route === '/') {
      outputPath = path.join(OUT_DIR, 'index.html');
    } else if (route.endsWith('/')) {
      outputPath = path.join(OUT_DIR, route, 'index.html');
    } else {
      outputPath = path.join(OUT_DIR, `${route}.html`);
    }
    
    // Create directory if needed
    const outputDir = path.dirname(outputPath);
    await fs.mkdir(outputDir, { recursive: true });
    
    // Save HTML
    await fs.writeFile(outputPath, html, 'utf-8');
    
    await page.close();
    
    stats.successfulRoutes++;
    console.log(`✅ Saved: ${outputPath}`);
  } catch (err) {
    stats.failedRoutes.push(route);
    console.error(`❌ Failed to pre-render ${route}:`, err instanceof Error ? err.message : err);
  }
}

/**
 * Pre-render all routes
 */
async function prerenderAllRoutes(): Promise<void> {
  console.log(`\n🎨 Pre-rendering ${ROUTES.length} routes...`);
  stats.totalRoutes = ROUTES.length;
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  try {
    for (const route of ROUTES) {
      await prerenderRoute(browser, route);
    }
  } finally {
    await browser.close();
  }
}

/**
 * Create a deployment info file
 */
async function createDeploymentInfo(): Promise<void> {
  const info = {
    exportedAt: new Date().toISOString(),
    routes: ROUTES,
    stats: {
      totalRoutes: stats.totalRoutes,
      successfulRoutes: stats.successfulRoutes,
      failedRoutes: stats.failedRoutes,
      totalAssets: stats.totalAssets,
      duration: `${((stats.endTime - stats.startTime) / 1000).toFixed(2)}s`,
    },
    instructions: {
      elementor: [
        '1. Extract site-export.zip',
        '2. Upload assets (CSS, JS, images) to your hosting',
        '3. Copy HTML content from index.html to Elementor page',
        '4. Update asset paths to match your hosting URLs',
        '5. Replace any dynamic API calls with static content',
      ],
      staticHosting: [
        '1. Extract site-export.zip',
        '2. Upload all files to your static hosting (Netlify, Vercel, S3, etc.)',
        '3. Configure routing to serve index.html for all routes (SPA mode)',
        '4. Set up custom domain if needed',
      ],
    },
  };
  
  await fs.writeFile(
    path.join(OUT_DIR, 'deployment-info.json'),
    JSON.stringify(info, null, 2),
    'utf-8'
  );
  
  console.log('\n📄 Created deployment-info.json');
}

/**
 * Print summary
 */
function printSummary(): void {
  stats.endTime = Date.now();
  const duration = ((stats.endTime - stats.startTime) / 1000).toFixed(2);
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 EXPORT SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successful routes: ${stats.successfulRoutes}/${stats.totalRoutes}`);
  console.log(`📦 Total assets: ${stats.totalAssets}`);
  console.log(`⏱️  Duration: ${duration}s`);
  
  if (stats.failedRoutes.length > 0) {
    console.log(`\n❌ Failed routes (${stats.failedRoutes.length}):`);
    stats.failedRoutes.forEach(route => console.log(`   - ${route}`));
  }
  
  console.log(`\n📂 Output directory: ${OUT_DIR}`);
  console.log('\n🎉 Static export complete!');
  console.log('\nNext steps:');
  console.log('  1. Run "pnpm run export:zip" to create site-export.zip');
  console.log('  2. Check deployment-info.json for deployment instructions');
  console.log('  3. Upload to your hosting platform');
  console.log('='.repeat(50) + '\n');
}

/**
 * Main export function
 */
async function main(): Promise<void> {
  console.log('🚀 Starting static export process...\n');
  
  try {
    // Step 1: Build the project
    console.log('📦 Step 1: Building project...');
    await runCommand('pnpm', ['run', 'build']);
    
    // Check if build directory exists
    try {
      await fs.access(BUILD_DIR);
    } catch {
      throw new Error(`Build directory not found: ${BUILD_DIR}`);
    }
    
    // Step 2: Prepare output directory
    await prepareOutputDir();
    
    // Step 3: Start static server
    const stopServer = await startServer();
    
    try {
      // Step 4: Copy assets
      await copyAssets();
      
      // Step 5: Pre-render routes
      await prerenderAllRoutes();
      
      // Step 6: Create deployment info
      await createDeploymentInfo();
    } finally {
      // Stop server
      console.log('\n🛑 Stopping server...');
      stopServer();
    }
    
    // Print summary
    printSummary();
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Export failed:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

// Run the export
main();
