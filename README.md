# Customer Admin Panel

Minimal scaffold for a SaaS customer admin panel using React, TypeScript and Vite.
It communicates with a NestJS backend using JWT authentication and a tenant header.

## Scripts

- `npm run dev` – start development server
- `npm run build` – build for production

## Environment Variables

Create a `.env` file based on `.env.example` and provide values for:

- `VITE_API_URL` – base URL of the API
- `VITE_TOKEN_KEY` – key containing JWT token in `/auth/login` response
- `VITE_AUTH_STORAGE_KEY` – localStorage key for storing the JWT
- `VITE_TENANT_HEADER_NAME` – header name used for the tenant id

The current token key is `access_token`.

Requests that operate on site scoped resources automatically include the tenant header.

Example:

```bash
VITE_API_URL=https://api.example.com
VITE_TOKEN_KEY=access_token
VITE_AUTH_STORAGE_KEY=saas_customer_token
VITE_TENANT_HEADER_NAME=x-tenant-id
```

## Usage

Install dependencies and start the dev server:

```bash
npm ci
npm run dev
```

Login with a user that has the `site_owner` or `operator` role. Select a site from the top bar to manage its resources.
