# Development Guide

This guide will help you set up and run the pprodutividade_website project locally.

## Prerequisites

- **Node.js**: Version 20 or higher
- **pnpm**: Package manager (installed via corepack)
- **MySQL/MariaDB**: Database server
- **Supabase Account**: For authentication and storage (optional for basic development)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/tpiola/pprodutividade_website.git
cd pprodutividade_website
```

### 2. Enable Corepack and Install pnpm

This project uses pnpm as the package manager. Enable it via corepack:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

### 3. Install Dependencies

```bash
pnpm install
```

This will install all dependencies as specified in `pnpm-lock.yaml`. Use the `--frozen-lockfile` flag in CI environments to ensure deterministic builds.

### 4. Configure Environment Variables

Copy the example environment file and configure it with your local settings:

```bash
cp .env.example .env
```

Edit `.env` and fill in the required values:

#### Required Variables

- `DATABASE_URL`: MySQL connection string (e.g., `mysql://user:password@localhost:3306/pprodutividade`)
- `JWT_SECRET`: Secret key for JWT tokens (generate with `openssl rand -base64 32`)
- `VITE_APP_ID`: Your application ID
- `OWNER_OPEN_ID`: OpenID of the repository/app owner

#### Optional but Recommended

- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous API key
- `OAUTH_SERVER_URL`: OAuth server URL for authentication
- `VITE_OAUTH_PORTAL_URL`: OAuth portal URL for frontend
- `BUILT_IN_FORGE_API_URL`: Forge API URL for backend services
- `BUILT_IN_FORGE_API_KEY`: Forge API key for backend services
- `VITE_FRONTEND_FORGE_API_URL`: Forge API URL for frontend Map component
- `VITE_FRONTEND_FORGE_API_KEY`: Forge API key for frontend
- `PORT`: Server port (defaults to 3000)

**Important Security Notes:**
- Never commit your `.env` file to version control
- All variables prefixed with `VITE_` are exposed to the frontend build
- Use strong, randomly generated secrets in production
- Store production secrets in your deployment platform's secrets management

### 5. Database Setup

Set up your local MySQL database and run migrations:

```bash
# Create the database (if needed)
mysql -u root -p -e "CREATE DATABASE pprodutividade CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run Drizzle migrations
pnpm run db:push
```

This command will:
1. Generate migration files from the schema (`drizzle-kit generate`)
2. Apply migrations to your database (`drizzle-kit migrate`)

**Database Schema Location**: `./drizzle/schema.ts`

## Development Commands

### Start Development Server

Run the development server with hot reload:

```bash
pnpm run dev
```

This starts:
- Express server on port 3000 (or `PORT` from `.env`)
- Vite dev server for the frontend
- Watch mode for automatic reloading on code changes

Access the application at `http://localhost:3000`

### Type Checking

Run TypeScript type checking without emitting files:

```bash
pnpm run check
```

This is useful for catching type errors before building or committing.

### Run Tests

Execute the test suite using Vitest:

```bash
pnpm run test
```

**Note**: Some tests may require environment variables (e.g., `SUPABASE_URL`, `SUPABASE_ANON_KEY`). Ensure your `.env` file is properly configured or tests may be skipped.

Test files are located in: `server/**/*.test.ts`

### Build for Production

Build the application for production:

```bash
pnpm run build
```

This will:
1. Build the frontend using Vite (output: `dist/` with client assets)
2. Bundle the server using esbuild (output: `dist/index.js`)

### Start Production Server

After building, start the production server:

```bash
pnpm run start
```

**Note**: Ensure `NODE_ENV=production` and all required environment variables are set.

### Format Code

Format code using Prettier:

```bash
pnpm run format
```

This will format all files according to the `.prettierrc` configuration.

### Database Migrations

Generate and apply database migrations:

```bash
pnpm run db:push
```

This combines:
- `drizzle-kit generate`: Generate migration files
- `drizzle-kit migrate`: Apply migrations to the database

## Project Structure

```
.
├── client/               # Frontend React application
│   └── src/             # Source files
├── server/              # Backend Express application
│   ├── _core/           # Core server files
│   │   └── index.ts     # Server entry point
│   └── db.ts            # Database connection
├── shared/              # Shared code between client and server
├── drizzle/             # Database schema and migrations
├── docs/                # Documentation
├── .github/             # GitHub Actions workflows and configs
│   ├── workflows/       # CI/CD workflows
│   └── dependabot.yml   # Dependabot configuration
├── package.json         # Project dependencies and scripts
├── vite.config.ts       # Vite configuration
├── vitest.config.ts     # Vitest test configuration
├── drizzle.config.ts    # Drizzle ORM configuration
└── .env.example         # Example environment variables
```

## Continuous Integration

This project uses GitHub Actions for CI. The workflow:
- Runs on push/PR to `main`/`master` branches
- Executes type checking (`pnpm run check`)
- Runs tests (`pnpm run test`)
- Builds the application (`pnpm run build`)

### CI Secrets

For CI to work properly in production scenarios, configure the following GitHub Secrets in your repository:

**Required Secrets:**
- `DATABASE_URL`
- `JWT_SECRET`
- `VITE_APP_ID`
- `OWNER_OPEN_ID`

**Recommended Secrets:**
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `OAUTH_SERVER_URL`
- `VITE_OAUTH_PORTAL_URL`
- `BUILT_IN_FORGE_API_URL`
- `BUILT_IN_FORGE_API_KEY`

The CI workflow will use these secrets or fall back to test values if not configured.

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, set a different port in your `.env`:

```
PORT=3001
```

### Database Connection Issues

Verify your `DATABASE_URL` is correct and the MySQL server is running:

```bash
mysql -u user -p -h localhost -e "SHOW DATABASES;"
```

### pnpm Installation Issues

If pnpm is not working, try reinstalling via corepack:

```bash
corepack disable
corepack enable
corepack prepare pnpm@latest --activate
```

### Build Fails with Environment Variable Errors

Ensure all required environment variables are set in your `.env` file. Check the `.env.example` for reference.

### Tests Fail Due to Missing Environment Variables

Some tests require Supabase credentials. Either:
1. Configure `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env`
2. Or, tests may skip if these are not critical

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and type checking (`pnpm run test && pnpm run check`)
5. Format your code (`pnpm run format`)
6. Commit your changes with a descriptive message
7. Push to your branch
8. Open a Pull Request

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [Express Documentation](https://expressjs.com/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [React Documentation](https://react.dev/)
- [pnpm Documentation](https://pnpm.io/)

## Support

If you encounter any issues or have questions:
1. Check this documentation first
2. Review existing GitHub Issues
3. Open a new issue with detailed information about the problem

---

**Happy coding! 🚀**
