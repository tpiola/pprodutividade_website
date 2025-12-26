# Development Guide

This guide will help you set up and run the pprodutividade_website project locally.

## Prerequisites

- **Node.js** v20 or higher
- **pnpm** (automatically managed via corepack)
- **MySQL** database (for local development)

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tpiola/pprodutividade_website.git
cd pprodutividade_website
```

### 2. Enable Corepack and Install Dependencies

```bash
corepack enable
pnpm install
```

### 3. Configure Environment Variables

Copy the example environment file and configure it with your values:

```bash
cp .env.example .env
```

Edit the `.env` file with your actual configuration values:

#### Required Variables

- **DATABASE_URL**: MySQL connection string (format: `mysql://user:password@host:3306/database`)
- **JWT_SECRET**: A strong random string for JWT token generation

#### Optional Variables (depending on features used)

- **SUPABASE_URL**: Your Supabase project URL
- **SUPABASE_ANON_KEY**: Public anonymous key from Supabase
- **BUILT_IN_FORGE_API_URL**: URL for the Forge API
- **BUILT_IN_FORGE_API_KEY**: API key for Forge authentication
- **VITE_APP_ID**: Application ID for frontend
- **VITE_OAUTH_PORTAL_URL**: OAuth portal URL
- **VITE_ANALYTICS_ENDPOINT**: Analytics endpoint URL (e.g., Umami)
- **VITE_ANALYTICS_WEBSITE_ID**: Website ID for analytics tracking
- **OWNER_OPEN_ID**: Owner's OpenID (optional)
- **OAUTH_SERVER_URL**: OAuth server URL (optional)
- **PORT**: Port for the server (default: 3000)
- **NODE_ENV**: Environment mode (development/production)

**⚠️ Security Note**: Never commit your `.env` file to version control. It contains sensitive credentials.

### 4. Database Setup

Run database migrations:

```bash
pnpm run db:push
```

## Development Commands

### Start Development Server

```bash
pnpm run dev
```

This starts the development server with hot-reload enabled. The server will run on `http://localhost:3000` (or the PORT specified in .env).

### Type Checking

```bash
pnpm run check
```

Runs TypeScript compiler in check mode (no emit) to verify types.

### Run Tests

```bash
pnpm run test
```

Runs the test suite using Vitest.

### Build for Production

```bash
pnpm run build
```

Creates an optimized production build in the `dist/` directory.

### Start Production Server

```bash
pnpm run start
```

Runs the production build. Make sure to run `pnpm run build` first.

### Code Formatting

```bash
pnpm run format
```

Formats all code using Prettier.

### Database Migrations

```bash
pnpm run db:push
```

Generates and runs database migrations using Drizzle Kit.

## Project Structure

```
.
├── client/          # Frontend React application
├── server/          # Backend Express server
│   ├── _core/      # Core server functionality
│   └── routers/    # tRPC routers
├── shared/          # Shared code between client and server
├── db/             # Database schemas and migrations
├── docs/           # Documentation
└── dist/           # Production build output
```

## Continuous Integration (CI)

This project uses GitHub Actions for CI/CD. The workflow runs on every push and pull request to the `main` or `master` branches.

The CI pipeline includes:
1. Type checking (`pnpm run check`)
2. Running tests (`pnpm run test`)
3. Building the project (`pnpm run build`)

### Setting Up CI Secrets

Repository maintainers need to configure the following GitHub Secrets for CI to work properly:

- `DATABASE_URL`
- `JWT_SECRET`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `BUILT_IN_FORGE_API_URL`
- `BUILT_IN_FORGE_API_KEY`
- `VITE_APP_ID`
- `VITE_OAUTH_PORTAL_URL`
- `VITE_ANALYTICS_ENDPOINT`
- `VITE_ANALYTICS_WEBSITE_ID`

Go to: Repository Settings → Secrets and variables → Actions → New repository secret

## Cross-Platform Compatibility

This project uses `cross-env` to ensure scripts work across different operating systems (Windows, macOS, Linux). All environment variable assignments in npm scripts are handled through `cross-env`.

## Dependency Management

- We use **pnpm** for faster and more efficient package management
- Dependencies are automatically updated weekly via Dependabot
- Run `pnpm install --frozen-lockfile` to ensure consistent dependency versions

## Troubleshooting

### Port Already in Use

If you get an error that the port is already in use, either:
- Stop the process using that port
- Change the `PORT` in your `.env` file

### Database Connection Issues

- Verify your `DATABASE_URL` is correct
- Ensure your MySQL server is running
- Check that the database user has proper permissions

### Missing Environment Variables

If you encounter errors about missing environment variables:
- Verify all required variables are set in your `.env` file
- Restart the development server after changing `.env`

## Contributing

When contributing to this project:
1. Create a feature branch from `main`
2. Make your changes
3. Run `pnpm run check` and `pnpm run test` to verify
4. Submit a pull request

The CI pipeline will automatically run checks on your pull request.

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [tRPC Documentation](https://trpc.io/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Express Documentation](https://expressjs.com/)
