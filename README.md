# Cosmo Tracker - Cosmic Events Tracking Platform
Cosmo Tracker is a full-stack application to help discover, track, and explore cosmic events. The platform provides a seamless way to access detailed information about astronomical events like solar eclipses, meteor showers, planetary transits, and much more.

## Setup Instructions
### 1. Clone the Repository
```bash
git clone https://github.com/m-elhamlaoui/development-platform-cosmotracker.git
cd development-platform-cosmotracker
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory with the following contents:
```env
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
```

### 3. Build and Run Backend
```bash
cd backend
./mvnw clean package
./mvnw spring-boot:run
```
The backend should be running at `http://localhost:8081`.

### 4. Build and Run Frontend
```bash
cd ../frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.

### 5. Dockerized Deployment
To run the entire stack using Docker:
```bash
docker compose up -f docker-compose.prod.yml --build
```
### 6. Access the Application
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8081`
