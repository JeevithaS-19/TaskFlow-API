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

## Update and Delete Verification

The following REST API operations were verified using Postman:

| Method | Endpoint | Result |
|---|---|---|
| PUT | `/api/tasks/:id` | 200 OK |
| DELETE | `/api/tasks/:id` | 200 OK |

### Update Task

Successfully updated an existing task using:

`PUT /api/tasks/:id`

The updated task was then retrieved using `GET /api/tasks/:id` to verify that the changes were persisted.

### Delete Task

Successfully deleted the task using:

`DELETE /api/tasks/:id`

A subsequent `GET /api/tasks/:id` returned `404 Not Found`, confirming that the task was removed successfully.

## Data Validation

TaskFlow API uses Mongoose schema validation to maintain data integrity.

Validation includes:

- Task title is required and must contain 3-100 characters
- Task description is required and must contain 5-500 characters
- Priority accepts only low, medium, or high
- Status accepts only pending, in-progress, or completed
- Invalid MongoDB task IDs return a 400 Bad Request response
- Valid but non-existent task IDs return a 404 Not Found response
- Validation errors are handled through centralized error middleware

### Validation Testing

The following validation scenarios were verified using Postman:

- Invalid title length → 400 Bad Request
- Invalid priority → 400 Bad Request
- Invalid status → 400 Bad Request
- Valid task data → 201 Created
- Invalid task ID format → 400 Bad Request
- Non-existent task ID → 404 Not Found