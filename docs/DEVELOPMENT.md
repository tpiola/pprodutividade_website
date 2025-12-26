# Development Guide

This guide will help you set up and run the project locally.

## Prerequisites

- **Node.js** (v18 or higher, v20.x recommended)
- **pnpm** (v10.x or higher)
- **MySQL** database instance

## Initial Setup

### 1. Install pnpm

If you don't have pnpm installed, install it globally:

```bash
npm install -g pnpm
```

### 2. Clone the Repository

```bash
git clone https://github.com/tpiola/pprodutividade_website.git
cd pprodutividade_website
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit the `.env` file and fill in the required values:

#### Required Variables

- `DATABASE_URL`: MySQL connection string (e.g., `mysql://user:password@localhost:3306/database_name`)
- `JWT_SECRET`: Secret key for JWT tokens (generate with: `openssl rand -base64 32`)
- `VITE_APP_ID`: Your application ID from the OAuth portal
- `VITE_OAUTH_PORTAL_URL`: OAuth portal URL
- `OAUTH_SERVER_URL`: OAuth server URL for token validation
- `OWNER_OPEN_ID`: OpenID of the application owner

#### Optional Variables

- `SUPABASE_URL`: Supabase project URL (if using Supabase features)
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- `VITE_ANALYTICS_ENDPOINT`: Analytics endpoint URL (e.g., Umami)
- `VITE_ANALYTICS_WEBSITE_ID`: Website ID for analytics
- `BUILT_IN_FORGE_API_URL`: Backend Forge API URL
- `BUILT_IN_FORGE_API_KEY`: Backend Forge API key
- `VITE_FRONTEND_FORGE_API_URL`: Frontend Forge API URL for maps
- `VITE_FRONTEND_FORGE_API_KEY`: Frontend Forge API key
- `PORT`: Server port (defaults to 3000)

### 5. Set Up Database

Run database migrations to set up your database schema:

```bash
pnpm run db:push
```

Make sure your `DATABASE_URL` is correctly configured before running this command.

## Development

### Start Development Server

```bash
pnpm run dev
```

This will start the development server with hot-reload enabled. The application will be available at `http://localhost:3000` (or the port specified in your `PORT` environment variable).

### Type Checking

Run TypeScript type checking:

```bash
pnpm run check
```

### Format Code

Format all files using Prettier:

```bash
pnpm run format
```

### Run Tests

Execute the test suite:

```bash
pnpm run test
```

## Building for Production

### Build the Application

```bash
pnpm run build
```

This command will:
1. Build the frontend using Vite (output to `dist/public`)
2. Bundle the server code using esbuild (output to `dist`)

### Start Production Server

After building, start the production server:

```bash
pnpm run start
```

## Project Structure

```
.
├── client/              # Frontend React application
│   ├── src/            # Source files
│   └── public/         # Static assets
├── server/             # Backend Express server
│   ├── _core/          # Core server functionality
│   └── routers/        # API route handlers
├── shared/             # Shared code between client and server
├── db/                 # Database related files
├── drizzle/            # Drizzle ORM migrations
└── docs/               # Documentation
```

## Common Issues

### Port Already in Use

If port 3000 is already in use, you can specify a different port in your `.env` file:

```
PORT=3001
```

### Database Connection Errors

Make sure:
1. MySQL is running
2. The database specified in `DATABASE_URL` exists
3. The user has proper permissions
4. The connection string format is correct: `mysql://user:password@host:port/database`

### Build Failures

If you encounter build errors:
1. Make sure all environment variables are set
2. Try removing `node_modules` and `pnpm-lock.yaml`, then run `pnpm install` again
3. Clear the build cache: `rm -rf dist`

## Contributing

1. Create a new branch for your feature: `git checkout -b feature/my-feature`
2. Make your changes
3. Run tests and type checking: `pnpm run check && pnpm run test`
4. Format your code: `pnpm run format`
5. Commit your changes
6. Push and create a pull request

## Additional Resources

- [pnpm Documentation](https://pnpm.io/)
- [Vite Documentation](https://vitejs.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [tRPC Documentation](https://trpc.io/)
