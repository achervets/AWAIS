# America with Anastasiia

America with Anastasiia is a responsive website for an independent immigration-services business. It introduces the available services, gives visitors a straightforward way to get in touch, and includes a small publishing system for news and updates.

The public experience is intentionally simple: visitors can browse service information, read recent updates, review the privacy policy, and submit an inquiry with their preferred language and messaging platform. A protected administrator area supports account-based access and news management.

## Project structure

The application is split into two services:

- `frontend/` contains the React single-page application, built with Vite and served by Nginx in production.
- `backend/` contains the FastAPI API and PostgreSQL data layer used for administrator authentication and news posts.

Contact-form submissions are delivered through Web3Forms. The frontend communicates with the application API through same-origin `/api` and `/auth` routes, which Nginx proxies to the backend in production.

## Technology

- React 19, React Router, and Framer Motion
- Vite for development and production builds
- FastAPI and Pydantic
- PostgreSQL with psycopg2
- Argon2 password hashing and signed, expiring administrator tokens
- Docker Compose and Nginx for production deployment
- Vitest, Testing Library, and pytest

## Local development

The frontend can be run independently for layout and content work:

```sh
cd frontend
npm ci
npm run dev
```

Vite serves the site at `http://localhost:5173` and proxies API requests to `http://127.0.0.1:8000`. Pages that load news will continue to render when the backend is offline, although news content and administrator features will be unavailable.

The backend requires PostgreSQL and the packages listed in `backend/requirements.txt`. Its default local database URL is `postgresql://postgres:postgres@localhost:5432/awais_db`; a different connection can be supplied through `DATABASE_URL`.

```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Configuration

Production configuration lives in `backend/.env`, which is intentionally excluded from version control. `backend/.env.example` documents the required values:

- `TOKEN_SECRET` signs administrator access tokens.
- `ADMIN_REGISTRATION_KEY` protects first-time administrator registration.
- `POSTGRES_PASSWORD` secures the PostgreSQL service.
- `CORS_ORIGINS` lists the HTTPS origins allowed to call the API.
- `PUBLIC_PORT` optionally changes the host port from its default of `8080`.

For a separate frontend deployment, `VITE_API_BASE_URL` can point the browser to the public API origin. It should remain empty when the frontend and API share a domain.

## Production deployment

The included Compose stack builds the frontend and backend, starts PostgreSQL, waits for health checks, and exposes the application through Nginx:

```sh
cd backend
docker compose up --build -d
```

By default, the site is available at `http://localhost:8080`. In a public environment, HTTPS should terminate at a reverse proxy or managed load balancer in front of that port. Nginx provides single-page application routing, caching for hashed assets, security headers, and same-origin API proxying.

After the initial administrator account has been created, the registration key can be rotated to prevent reuse.

## Quality checks

Frontend checks are run from `frontend/`:

```sh
npm run lint
npm test -- --run
npm run build
```

Backend tests require a reachable PostgreSQL database configured through `DATABASE_URL`:

```sh
cd backend
python -m pytest
```

The backend test suite creates temporary users with unique email addresses, so it should be run against a development or test database rather than production.

## Privacy and security

The website includes a privacy policy describing the information collected through the contact form and the role of Web3Forms in processing submissions. Visitors are asked not to send highly sensitive identity or financial documents through the general inquiry form.

Administrator passwords are stored as Argon2 hashes. Authentication tokens expire after eight hours, protected API routes require a valid bearer token, and production startup fails if the token secret or administrator registration key is missing.

Immigration applications and petitions are decided by the relevant government agencies; the website does not guarantee outcomes.
