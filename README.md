\# TaskFlow API



A RESTful Task Management API built with Node.js, Express.js, and MongoDB.



\## Features



\- Create tasks

\- Get all tasks

\- Get task by ID

\- Update tasks

\- Delete tasks

\- Centralized error handling

\- Input validation

\- Automated API testing



\## Tech Stack



\- Node.js

\- Express.js

\- MongoDB

\- Mongoose

\- Jest

\- Supertest

\- dotenv



\## Testing



Run:



```bash

npm test

## Database Integration

TaskFlow API is connected to MongoDB using Mongoose for persistent data storage.

## API Verification

The following REST API operations were verified using Postman:

| Method | Endpoint | Result |
|---|---|---|
| POST | `/api/tasks` | 201 Created |
| GET | `/api/tasks` | 200 OK |
| GET | `/api/tasks/:id` | 200 OK |

### Create Task

Successfully created a task and stored it in MongoDB using:

`POST /api/tasks`

### Read Tasks

Successfully retrieved all stored tasks using:

`GET /api/tasks`

### Read Task by ID

Successfully retrieved an individual task using:

`GET /api/tasks/:id`