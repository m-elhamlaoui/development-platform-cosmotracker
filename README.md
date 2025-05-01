# Cosmo Tracker Backend

This is the backend service for the Cosmo Tracker project, built with Spring Boot, React and PostgreSQL
 
## Setup

1. Clone the repository
2. Create a '.env' file in the root directory (on the same level as frontend and backend folders):

```env
DATABASE_URL=jdbc:postgresql://your-postgres-host:port/database
DATABASE_USERNAME=yourusername
DATABASE_PASSWORD=yourpassword

( Configure your own DB locally if you want)

> PLEASE replace the values with our Railway PostgresSQL instance.

## Running the Backend

### Commands:
```bash
cd backend
./mvnw spring-boot:run
```

The backend should start on `http://localhost:8081`

## Running the Frontend
### Commands:
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`
