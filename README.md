
# CosmoTracker - Cosmic Events Tracking Platform

CosmoTracker is a full-stack application designed to help astronomy enthusiasts discover, track, and explore cosmic events. The platform provides seamless access to detailed information about astronomical events like solar eclipses, meteor showers, planetary transits, and more.

---

## Features

- **Cosmic Event Management**: Browse and filter astronomical events by type, constellation, date range, and visibility  
- **User Authentication**: Secure JWT-based authentication system  
- **Favorites System**: Save and manage your favorite cosmic events  
- **Interactive Star Map**: Visualize celestial bodies and their positions  
- **NASA APOD Integration**: Access NASA's Astronomy Picture of the Day  
- **Responsive Design**: Modern React-based frontend with Tailwind CSS  

---
## Video Demonstration
Link for the video : https://drive.google.com/drive/folders/1f_NaOYMMaEiRxC0XCE8zLCMA1opPrbLE


## Architecture

![overall project architecture](assets/projectarchitecture.png)

![project backend architecture](assets/backend1.png)

## Jenkins CI/CD Pipeline
Our project includes a Jenkins Pipeline for continuous integration and deployment.

![project backend architecture](assets/pipeline.png)

### Pipeline steps: 

#### General Setup 

The pipeline runs on any available Jenkins Agent and uses Maven 3.

#### Checkout stage

We checkout the source code from our Git repository

#### Docker Login 

Authenticate with Docker Hub using the DOCKER_CREDS credentials, preconfigured inside Jenkins.

#### Build and Push (Runs in Parallel)

We first run our backend tests using `mvn test`.
We compile and package our backend JAR using Maven.
Then we build a Docker image for our backend, tag it with `latest` and build version and then we push both tags to Docker Hub. 

In parallel, we also build a new image for our front end and then push it with `latest` and build version.

![project backend architecture](assets/dockerhub.png)

#### Deployment 

We stop, remove and redeploy the containers using docker-compose.prod.yml

#### Post-Build Actions

Always : clean up unused Docker ressources and log out from Docker Hub

On Success : print success message and image tags
On failure : print error message

## Technology Stack

### Backend

- **Java 17** with **Spring Boot 3.4.4**
- **PostgreSQL 15** for data persistence
- **Spring Security** with JWT authentication
- **Spring Data JPA** for database operations

### Frontend

- **React 18** with **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Infrastructure

- **Docker & Docker Compose** for containerization
- **Prometheus & Grafana** for monitoring (production)
- **Jenkins** for CI/CD pipeline

---

## Prerequisites

- Docker and Docker Compose  
- Git  
- Java 17+ (for local development)  
- Node.js and npm (for local development)  

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/m-elhamlaoui/development-platform-cosmotracker.git
cd development-platform-cosmotracker
```

### 2. Environment Setup

Create a `.env` file in the root directory:

**For Development:**
```env
DATABASE_USERNAME=postgres  
DATABASE_PASSWORD=postgres
```

**For Production:**
```env
DB_USER=postgres  
DB_PASS=postgres
```

### 3. Build Backend JAR

```bash
cd backend  
./mvnw clean package  
cd ..
```

### 4. Run with Docker Compose

**Development Environment:**

```bash
docker compose -f docker-compose.dev.yml up --build
```

- Frontend: http://localhost:5173  
- Backend API: http://localhost:8081  
- PostgreSQL: localhost:5543

**Production Environment:**

```bash
docker compose -f docker-compose.prod.yml up --build
```

- Frontend: http://localhost:5173  
- Backend API: http://localhost:8081  
- PostgreSQL: localhost:5433  
- Prometheus: http://localhost:9090  
- Grafana: http://localhost:3000

---

### 5. Local Development (Without Docker)

**Backend Setup**

```bash
cd backend  
./mvnw clean package  
./mvnw spring-boot:run
```

Backend available at: [http://localhost:8081](http://localhost:8081)

**Frontend Setup**

```bash
cd frontend  
npm install  
npm run dev
```

Frontend available at: [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

### Authentication

- `POST /api/register` - User registration  
- `POST /api/login` - User login  
- `GET /api/protected` - Protected endpoint test  

### Cosmic Events

- `GET /api/events` - Get all events (with filtering)  
- `GET /api/events/{id}` - Get specific event  
- `GET /api/events/upcoming-this-month` - Get upcoming events this month  
- `POST /api/events` - Create new event  

### Favorites

- `POST /api/favorites/{eventId}` - Add event to favorites  
- `DELETE /api/favorites/{eventId}` - Remove from favorites  
- `GET /api/favorites` - Get user's favorite events  

---

## Database Schema

The application uses three main entities:

- **CosmicEvent**: Stores astronomical event data  
- **MyUser**: User authentication and profile data  
- **Favorite**: Many-to-many relationship between users and events  

---

## Monitoring

Production deployment includes monitoring stack:

- **Prometheus**: Metrics collection on port `9090`  
- **Grafana**: Visualization dashboard on port `3000`  

---

## Stopping the Application

**Docker environments:**
```bash
docker compose -f docker-compose.dev.yml down  
docker compose -f docker-compose.prod.yml down
```

**Local development:**
Use `Ctrl+C` in terminal windows to stop the servers

---

## Troubleshooting

- **Database connection issues**: Verify `.env` credentials match Docker Compose files  
- **Docker build failures**: Ensure backend JAR is built first with `./mvnw clean package`  
- **Port conflicts**: Check if ports `5173`, `8081`, `5433/5543` are available  
- **Permission issues**: Ensure Docker daemon is running and accessible  