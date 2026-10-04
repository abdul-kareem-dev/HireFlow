# HireFlow 🚀

**HireFlow** is a full-stack job application management system built using **React, Spring Boot, MySQL, and REST APIs**.

The application allows users to browse available jobs, view job details, submit applications, and track their application status. The backend provides RESTful APIs for managing jobs and applications, while the frontend provides a responsive user interface for interacting with those APIs.

The project is deployed using **Render**, with **Aiven MySQL** as the cloud database and **Docker** used to containerize the Spring Boot backend.

---

## 🌐 Live Demo

**Frontend:**
https://hireflow-wddx.onrender.com

**Backend API:**
https://hireflow-backend-ga0p.onrender.com

> The backend API can be accessed directly through endpoints such as `/api/jobs`.

---

## 📌 Project Overview

Managing job applications can become difficult when users have to keep track of different job opportunities, application details, and application statuses.

HireFlow provides a centralized platform where a user can:

* Browse available jobs
* View complete job details
* Apply for a job
* Prevent duplicate applications for the same job
* View submitted applications
* Track application status

The backend exposes REST APIs that handle the business logic and database operations.

---

# ✨ Features

## 👤 Job Seeker Features

### Browse Jobs

Users can view all available job postings.

Each job contains:

* Job title
* Company
* Location
* Description
* Required skills

### View Job Details

Users can select a job and view its complete information before applying.

### Apply for a Job

Users can submit:

* Applicant name
* Email
* Resume URL

The application is associated with the selected job.

### Duplicate Application Prevention

A user cannot apply multiple times for the same job using the same email address.

The backend checks whether an application already exists before creating a new one.

### Track Applications

Users can view their submitted applications and see:

* Job title
* Company
* Location
* Application status
* Application date

---

## 🏢 Job Management / Backend Features

The backend provides APIs for managing job postings.

Supported operations include:

* Create a job
* Retrieve all jobs
* Retrieve a job by ID
* Update a job
* Delete a job

---

## 📊 Application Management

The backend also supports:

* Creating applications
* Retrieving all applications
* Retrieving applications by user email
* Retrieving applications for a specific job
* Updating application status

Supported application statuses:

```text
APPLIED
UNDER_REVIEW
SHORTLISTED
REJECTED
HIRED
```

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* React Router
* JavaScript
* HTML
* CSS
* Fetch API

## Backend

* Java
* Spring Boot
* Spring MVC / REST
* Spring Data JPA
* Hibernate
* Jakarta Validation
* Maven

## Database

* MySQL
* Aiven MySQL for cloud deployment

## Deployment

* Render
* Docker
* Aiven

## Development Tools

* IntelliJ IDEA
* VS Code
* Postman
* DBeaver
* Git
* GitHub

---

# 🏗️ System Architecture

HireFlow follows a layered full-stack architecture.

```text
                         USER
                          │
                          ▼
                ┌──────────────────┐
                │   React Frontend │
                │     (Vite)       │
                └────────┬─────────┘
                         │
                    HTTP / JSON
                         │
                         ▼
              ┌──────────────────────┐
              │   Spring Boot API    │
              │                      │
              │     Controller       │
              │         ↓            │
              │       Service        │
              │         ↓            │
              │     Repository       │
              └──────────┬───────────┘
                         │
                    JPA / Hibernate
                         │
                         ▼
                ┌──────────────────┐
                │    MySQL DB      │
                │     Aiven        │
                └──────────────────┘
```

### Request Flow

When a user performs an operation:

```text
React
  ↓
HTTP Request
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
MySQL
```

The response travels back in the opposite direction:

```text
MySQL
  ↓
Repository
  ↓
Service
  ↓
Controller
  ↓
JSON Response
  ↓
React
```

---

# 📂 Project Structure

```text
HireFlow/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── kareem/
│       │           └── HireFlow/
│       │               │
│       │               ├── config/
│       │               │   └── WebConfig.java
│       │               │
│       │               ├── controller/
│       │               │   ├── JobController.java
│       │               │   └── ApplicationController.java
│       │               │
│       │               ├── entity/
│       │               │   ├── Job.java
│       │               │   ├── JobApplication.java
│       │               │   └── ApplicationStatus.java
│       │               │
│       │               ├── exception/
│       │               │   ├── ResourceNotFoundException.java
│       │               │   ├── ConflictException.java
│       │               │   └── GlobalExceptionHandler.java
│       │               │
│       │               ├── repository/
│       │               │   ├── JobRepository.java
│       │               │   └── ApplicationRepository.java
│       │               │
│       │               └── service/
│       │                   ├── JobService.java
│       │                   └── ApplicationService.java
│       │
│       └── resources/
│           └── application.properties
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobCard.jsx
│   │   │   └── ApplicationForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── JobDetails.jsx
│   │   │   ├── Apply.jsx
│   │   │   └── Applications.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── Dockerfile
├── pom.xml
├── mvnw
├── mvnw.cmd
├── .gitignore
└── README.md
```

---

# 🗄️ Database Design

HireFlow currently uses two main entities:

## Job

The `Job` entity represents a job posting.

Important fields:

| Field         | Description           |
| ------------- | --------------------- |
| `id`          | Unique job identifier |
| `title`       | Job title             |
| `company`     | Company name          |
| `location`    | Job location          |
| `description` | Job description       |
| `skills`      | Required skills       |

---

## JobApplication

The `JobApplication` entity represents an application submitted for a job.

Important fields:

| Field            | Description                   |
| ---------------- | ----------------------------- |
| `id`             | Unique application identifier |
| `applicantName`  | Applicant name                |
| `applicantEmail` | Applicant email               |
| `resumeUrl`      | Resume URL                    |
| `status`         | Current application status    |
| `appliedAt`      | Application timestamp         |
| `job`            | Associated job                |

---

## Entity Relationship

A job can have multiple applications.

```text
             ┌──────────────┐
             │     Job      │
             ├──────────────┤
             │ id           │
             │ title        │
             │ company      │
             │ location     │
             │ description  │
             │ skills       │
             └───────┬──────┘
                     │
                     │ 1
                     │
                     │
                     │ *
             ┌───────▼──────────┐
             │  JobApplication  │
             ├──────────────────┤
             │ id               │
             │ applicantName   │
             │ applicantEmail  │
             │ resumeUrl       │
             │ status           │
             │ appliedAt       │
             │ job_id          │
             └──────────────────┘
```

The relationship is implemented using JPA:

```java
@ManyToOne
@JoinColumn(name = "job_id")
private Job job;
```

This means multiple applications can reference the same job.

---

# 🔌 REST API

## Job APIs

### Create Job

```http
POST /api/jobs
```

Example request:

```json
{
  "title": "Java Backend Developer",
  "company": "HireFlow Technologies",
  "location": "Bangalore",
  "description": "Develop REST APIs using Java and Spring Boot.",
  "skills": "Java, Spring Boot, MySQL, REST API"
}
```

Returns:

```text
201 Created
```

---

### Get All Jobs

```http
GET /api/jobs
```

Returns all available jobs.

---

### Get Job By ID

```http
GET /api/jobs/{id}
```

Example:

```http
GET /api/jobs/1
```

---

### Update Job

```http
PUT /api/jobs/{id}
```

Example:

```http
PUT /api/jobs/1
```

---

### Delete Job

```http
DELETE /api/jobs/{id}
```

Returns:

```text
204 No Content
```

---

# 📋 Application APIs

## Apply For Job

```http
POST /api/applications/job/{jobId}
```

Example:

```http
POST /api/applications/job/1
```

Request:

```json
{
  "applicantName": "Abdul Kareem",
  "applicantEmail": "abdul@example.com",
  "resumeUrl": "https://example.com/resume.pdf"
}
```

The backend automatically:

1. Verifies that the job exists
2. Checks for duplicate applications
3. Associates the application with the job
4. Sets the application status to `APPLIED`
5. Records the application timestamp
6. Saves the application

---

## Get All Applications

```http
GET /api/applications
```

---

## Get Applications By User

```http
GET /api/applications/user/{email}
```

Example:

```http
GET /api/applications/user/abdul@example.com
```

---

## Get Applications By Job

```http
GET /api/applications/job/{jobId}
```

Example:

```http
GET /api/applications/job/1
```

---

## Update Application Status

```http
PUT /api/applications/{applicationId}/status?status={status}
```

Example:

```http
PUT /api/applications/1/status?status=SHORTLISTED
```

Possible statuses:

```text
APPLIED
UNDER_REVIEW
SHORTLISTED
REJECTED
HIRED
```

---

# 🧩 Backend Architecture

The backend follows a layered architecture.

## Controller Layer

Controllers handle HTTP requests and responses.

Example:

```text
JobController
ApplicationController
```

Responsibilities:

* Receive HTTP requests
* Read path variables/request bodies
* Validate input
* Call the service layer
* Return HTTP responses

---

## Service Layer

Services contain the application's business logic.

Example:

```text
JobService
ApplicationService
```

For example, when a user applies for a job, the service:

```text
Receive application
       ↓
Check job exists
       ↓
Check duplicate application
       ↓
Associate application with job
       ↓
Set status = APPLIED
       ↓
Set appliedAt
       ↓
Save application
```

---

## Repository Layer

Repositories communicate with the database through Spring Data JPA.

Example:

```java
public interface JobRepository extends JpaRepository<Job, Long> {
}
```

Because `JpaRepository` is used, common database operations such as:

```text
save()
findAll()
findById()
delete()
```

are available without manually writing SQL for each operation.

---

# 🛡️ Validation

The application uses Jakarta Validation.

For example:

```java
@NotBlank(message = "Job title is required")
private String title;
```

and:

```java
@Email(message = "Enter a valid email address")
private String applicantEmail;
```

Controllers use:

```java
@Valid
@RequestBody
```

to trigger validation.

Invalid requests return:

```text
400 Bad Request
```

with validation information.

---

# ⚠️ Exception Handling

HireFlow uses centralized exception handling through:

```java
@RestControllerAdvice
```

Custom exceptions include:

```text
ResourceNotFoundException
ConflictException
```

For example, if a requested job does not exist:

```text
GET /api/jobs/999
```

the API returns:

```json
{
  "status": 404,
  "message": "Job not found"
}
```

This prevents controller methods from becoming cluttered with repetitive exception handling.

---

# 🌐 CORS

The React frontend and Spring Boot backend are deployed separately.

Therefore, the backend must explicitly allow requests from the frontend origin.

The application configures CORS using Spring's `WebMvcConfigurer`.

The production frontend is allowed to communicate with the backend API.

This is required because browsers enforce the same-origin policy.

---

# 🔐 Configuration & Environment Variables

Sensitive database credentials are not stored directly in the source code.

The backend uses environment variables:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
```

Example local configuration:

```text
DB_URL=jdbc:mysql://localhost:3306/hireflow
DB_USERNAME=root
DB_PASSWORD=your_password
```

The frontend uses:

```text
VITE_API_URL
```

Example:

```text
VITE_API_URL=http://localhost:8085
```

In production, the frontend uses the deployed Spring Boot backend URL.

Actual `.env` files containing credentials or environment-specific configuration are excluded from Git using `.gitignore`.

---

# 🐳 Docker Deployment

The Spring Boot backend is containerized using Docker.

The Dockerfile uses an Eclipse Temurin Java image.

The container:

1. Creates the application working directory
2. Copies the project
3. Builds the Spring Boot application using Maven
4. Exposes the application port
5. Starts the generated Spring Boot JAR

Simplified deployment flow:

```text
GitHub Repository
       ↓
Render
       ↓
Docker Build
       ↓
Maven Build
       ↓
Spring Boot JAR
       ↓
Running Web Service
```

The application port is configured using the Render-provided `PORT` environment variable with a local fallback.

---

# ☁️ Cloud Deployment

## Frontend

The React application is deployed as a Render Static Site.

```text
React + Vite
     ↓
npm run build
     ↓
dist/
     ↓
Render Static Site
```

## Backend

The Spring Boot application is deployed as a Docker-based Render Web Service.

```text
Spring Boot
     ↓
Docker
     ↓
Render Web Service
```

## Database

The production database is hosted using Aiven MySQL.

```text
Render Backend
      ↓
JDBC
      ↓
Aiven MySQL
```

---

# 🚀 Running the Project Locally

## Prerequisites

Install:

* Java
* Maven
* Node.js
* npm
* MySQL
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/abdul-kareem-dev/HireFlow.git
```

Move into the project:

```bash
cd HireFlow
```

---

# 2. Configure the Backend

Create the required environment variables.

Example:

```text
DB_URL=jdbc:mysql://localhost:3306/hireflow
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

Make sure the MySQL database exists:

```sql
CREATE DATABASE hireflow;
```

---

# 3. Start the Spring Boot Backend

On Windows:

```powershell
.\mvnw spring-boot:run
```

The backend runs locally on:

```text
http://localhost:8085
```

---

# 4. Start the React Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:8085
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

# 🧪 Testing

The backend APIs were tested using Postman.

The following functionality was tested:

* Create job
* Get all jobs
* Get job by ID
* Update job
* Delete job
* Submit application
* Get all applications
* Get applications by email
* Get applications by job
* Update application status
* Input validation
* Resource-not-found handling
* Duplicate application prevention

The frontend was also tested against the deployed backend.

---

# 🔄 Complete Application Flow

A typical user flow looks like this:

```text
1. User opens HireFlow
          ↓
2. React requests available jobs
          ↓
3. Spring Boot receives GET /api/jobs
          ↓
4. JobController calls JobService
          ↓
5. JobService calls JobRepository
          ↓
6. JPA/Hibernate retrieves jobs from MySQL
          ↓
7. Backend returns JSON
          ↓
8. React displays job cards
          ↓
9. User opens job details
          ↓
10. User submits application
          ↓
11. React sends POST request
          ↓
12. ApplicationService validates the request
          ↓
13. Job relationship is created
          ↓
14. Application is stored in MySQL
          ↓
15. User views My Applications
          ↓
16. Application status is displayed
```

---

# 🧠 Key Technical Concepts Demonstrated

This project provided practical experience with:

### Java

* Object-oriented programming
* Classes and objects
* Enums
* Interfaces
* Exception handling
* Collections
* Dependency-based application design

### Spring Boot

* REST APIs
* Controllers
* Services
* Dependency Injection
* Spring Data JPA
* Validation
* Exception handling
* Configuration
* CORS

### Hibernate / JPA

* Entity mapping
* Primary keys
* Generated IDs
* `@ManyToOne`
* Foreign keys
* Repository abstraction
* Database persistence

### React

* Functional components
* Props
* State management
* `useState`
* `useEffect`
* React Router
* Form handling
* Fetch API
* Environment variables

### DevOps / Deployment

* Git
* GitHub
* Docker
* Render
* Aiven
* Environment variables
* Production CORS configuration

---

# 🐛 Challenges Faced During Development

## 1. Database Configuration

The application initially used a local MySQL database.

During cloud deployment, the database configuration had to be changed to use Aiven MySQL through environment variables.

This helped separate application code from environment-specific configuration.

---

## 2. Docker Maven Permission Issue

During the first Render deployment, Docker failed with:

```text
./mvnw: Permission denied
```

The Maven wrapper did not have the required executable permission in the Linux build environment.

The Git file permission was corrected using:

```bash
git update-index --chmod=+x mvnw
```

After committing the change, the Docker build succeeded.

---

## 3. CORS During Production Deployment

The frontend and backend were deployed to different Render domains.

The browser initially blocked API requests because the production frontend origin was not included in the backend's CORS configuration.

The backend was updated to allow the deployed frontend origin.

---

## 4. Frontend Production API Configuration

The React application initially used the local backend URL:

```text
http://localhost:8085
```

For production, the application was changed to use:

```javascript
import.meta.env.VITE_API_URL
```

This allows the same frontend code to work with different backend environments.

---

## 5. Frontend Runtime Bug

The Applications page initially attempted to use an undefined `id` variable when requesting application data.

The API request was corrected to use the application's actual backend endpoint:

```text
/api/applications/user/{email}
```

This reinforced the importance of matching frontend requests with the backend API contract.

---

# 🔮 Future Improvements

The current version focuses on the core job application workflow.

Potential future improvements include:

* User authentication and authorization
* Separate job seeker and recruiter roles
* Recruiter dashboard
* Admin dashboard
* Secure JWT-based authentication
* Resume file uploads
* Job search and filtering
* Pagination
* Job bookmarking
* Email notifications
* Application analytics
* Improved user profile management
* Automated testing
* CI/CD pipeline
* Production monitoring and logging

These features are intentionally outside the current MVP scope.

---

# 📈 Learning Outcomes

Through HireFlow, I gained practical experience in building and deploying a complete full-stack application.

The project helped me understand how:

```text
Frontend
   ↓
REST API
   ↓
Backend Business Logic
   ↓
Repository
   ↓
ORM
   ↓
Database
```

works as one complete system.

I also gained hands-on experience with:

* API development
* Database relationships
* Backend architecture
* Frontend-backend integration
* Validation and exception handling
* Environment configuration
* Docker
* Cloud deployment
* Debugging production issues
* Git and GitHub workflow

---

# 👨‍💻 Author

**Abdul Kareem**

B.Tech Computer Science and Engineering

GitHub:
https://github.com/abdul-kareem-dev

---

# 📄 License

This project was developed as a learning and portfolio project.
