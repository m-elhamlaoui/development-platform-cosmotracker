# Cosmo Tracker - Cosmic Events Tracking Platform
Cosmo Tracker is a full-stack application to help discover, track, and explore cosmic events. The platform provides a seamless way to access detailed information about astronomical events like solar eclipses, meteor showers, planetary transits, and much more.

## Setup Instructions

### Prerequisites
- Docker and Docker Compose installed
- Git installed
- Java 17 or later (for local development)
- Node.js and npm (for local development)

### 1. Clone the Repository
```bash
git clone https://github.com/m-elhamlaoui/development-platform-cosmotracker.git
cd development-platform-cosmotracker
```

### 2. Running with Docker (Recommended)

#### Development Environment
1. Create a `.env` file in the root directory:
```env
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
```

2. Build the backend JAR file (required for Docker build):
```bash
cd backend
./mvnw clean package
cd ..
```

3. Start the development environment:
```bash
docker compose -f docker-compose.dev.yml up --build
```

The services will be available at:
- Frontend: http://localhost:5174
- Backend API: http://localhost:8082
- PostgreSQL: http://localhost:5543

#### Production Environment
1. Create a `.env` file in the root directory:
```env
DB_USER=postgres
DB_PASS=postgres
```

2. Build the backend JAR file (required for Docker build):
```bash
cd backend
./mvnw clean package
cd ..
```

3. Start the production environment:
```bash
docker compose -f docker-compose.prod.yml up --build
```

The services will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8081
- PostgreSQL: http://localhost:5433
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000

### 3. Local Development (Without Docker)

#### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Build and run the backend:
```bash
./mvnw clean package
./mvnw spring-boot:run
```

The backend will be available at `http://localhost:8081`.

#### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies and start the development server:
```bash
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Stopping the Application
- For Docker environments: `docker compose -f docker-compose.dev.yml down` or `docker compose -f docker-compose.prod.yml down`
- For local development: Use Ctrl+C in the respective terminal windows

## Troubleshooting
- If you encounter database connection issues, ensure the database credentials in your `.env` file match the ones in the Docker Compose files
- For Docker-related issues, ensure Docker and Docker Compose are properly installed and running
- For local development issues, ensure you have the correct versions of Java and Node.js installed
- If the Docker build fails, make sure you've built the backend JAR file first using `./mvnw clean package` in the backend directory
