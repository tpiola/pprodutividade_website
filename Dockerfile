# ==============================================================================
# Multi-stage Dockerfile for pprodutividade_website
# ==============================================================================
# Stage 1: Build
# ==============================================================================
FROM node:18-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm@10.4.1

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
# - Vite build: compiles client to dist/public
# - esbuild: bundles server to dist/index.js
RUN pnpm run build

# ==============================================================================
# Stage 2: Production
# ==============================================================================
FROM node:18-alpine AS production

# Install pnpm for running the app
RUN npm install -g pnpm@10.4.1

WORKDIR /app

# Copy package files for production dependencies
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Copy other necessary files
COPY --from=builder /app/client/public ./client/public

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "dist/index.js"]
