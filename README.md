# Pharmacy Management System

A microservices-based pharmacy management system built with Spring Boot, Spring Cloud and React.

## Architecture

React Frontend (5173) → API Gateway (8080) → Eureka Server (8761)

Services registered with Eureka:
- Patient Service (8081) → pharmacy_patients database
- Medicine Service (8082) → pharmacy_medicines database
- Prescription Service (8083) → pharmacy_prescriptions database

## Microservices

| Service | Port | Description |
|---------|------|-------------|
| Eureka Server | 8761 | Service discovery and registry |
| API Gateway | 8080 | Single entry point for all requests |
| Patient Service | 8081 | Manage patient records |
| Medicine Service | 8082 | Manage medicines and stock |
| Prescription Service | 8083 | Create prescriptions via Feign Client |
| React Frontend | 5173 | UI connecting to API Gateway |

## Tech Stack

**Backend:** Java 17, Spring Boot 3.3.5, Spring Cloud 2023.0.3, Eureka, API Gateway, OpenFeign, Spring Data JPA, Hibernate, MySQL, Lombok, Bean Validation

**Frontend:** React.js, Vite, Axios, React Router DOM

## Features
- Register and manage patients
- Add and manage medicines with stock tracking
- Create prescriptions linking patients and medicines
- Automatic stock reduction on prescription creation
- Insufficient stock validation
- Input validation on all services
- Inter-service communication via Feign Client
- Service discovery via Eureka
- Single entry point via API Gateway

## How to Run

1. Make sure MySQL is running
2. Start eureka-server
3. Start api-gateway
4. Start patient-service, medicine-service, prescription-service in any order
5. Start React frontend — cd pharmacy-frontend then npm run dev
6. Open http://localhost:5173

## API Endpoints

### Patients
- POST /api/patients/add
- GET /api/patients/all
- GET /api/patients/{id}
- PUT /api/patients/{id}
- DELETE /api/patients/{id}

### Medicines
- POST /api/medicines/add
- GET /api/medicines/all
- GET /api/medicines/{id}
- GET /api/medicines/category/{category}
- PUT /api/medicines/stock/{id}
- DELETE /api/medicines/{id}

### Prescriptions
- POST /api/prescriptions/create
- GET /api/prescriptions/all
- GET /api/prescriptions/{id}
- GET /api/prescriptions/patient/{patientId}