# Task-University-Management
This is a University Student Management System built using Node.js, Express, MongoDB, and JWT authentication.

## Introduction

The University Student Management System is a REST API that allows universities to manage student records, events, and more. 
It provides APIs for universities to register, log in, manage student information, and organize student events.

## Features

- University registration and authentication with JWT
- Create, update, delete universities
- Create, update, delete students
- Manage student events

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Express-validator

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud-based)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/university-student-management.git

2. Navigate to the project directory:
   `cd university-student-management`
    
3. Install the dependencies:
   `npm install`

4. Set up your environment variables by creating a `.env` file based on `.env.example`

## Usage

1. Start the server
    `node app.js`
The server will start on port 3000. You can access the endpoints using tools like Postman.

## API Endpoints

Authentication:

- POST /auth/registerUniversity: Register a new university
- POST /auth/login: Authenticate a university

Universities:

- POST `/universities`: Create a new university
- GET `/universities`: Get all universities
- PUT `/universities/:id`: Update a university by ID
- DELETE `/universities/:id`: Delete a university by ID

Students:

- POST `/students`: Create a new student
- GET `/students`: Get all students
- GET `/students/:id`: Get a specific student by ID
- PUT `/students/:id`: Update a student by ID
- DELETE `/students/:id`: Delete a student by ID

Student Events:

- POST `/students/:id/events`: Create a student event
- GET `/students/:id/events`: Get all student events
- GET `/students/:id/events/:eventId`: Get a specific student event by ID
- PUT `/students/:id/events/:eventId`: Update a student event by ID
- DELETE `/students/:id/events/:eventId`: Delete a student event by ID
