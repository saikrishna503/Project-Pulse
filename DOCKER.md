# Run Project Pulse with Docker

## Local run

Copy `server/.env.example` to `server/.env` and set strong values for the JWT and verification token secrets. Add email settings if you need email verification, password resets, and invitation emails. Compose connects the API to its MongoDB container and persists database files in the `mongo-data` volume.

From the project root, run:

```powershell
docker compose up --build
```

Open <http://localhost:8080>. Stop the containers with `docker compose down`. Database files remain in the named volume; `docker compose down -v` deletes that data.

## Cloud deployment

Deploy this Compose stack on a host that supports Docker Compose. Configure `APP_URL` and `CORS_ORIGIN` to the public website origin (for example, `https://pulse.example.com`) and `WEB_PORT` if the host requires a specific port. Provide the variables from `server/.env.example` as runtime secrets/environment variables in the host. Use a managed MongoDB database for production and set `DB_LOCAL_URI` to its connection string in the Compose environment, replacing the local MongoDB URI. Restrict database network access and use a database user/password.

The frontend and API share one origin; Nginx serves the React app and proxies `/api` to the API container. This avoids baking a deployment-specific API URL into the frontend image.

Do not add `.env` files or `credentials.txt` to the Docker image or source control.
