const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/server");
const connectDB = require("../src/config/db");

let taskId;

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Task API", () => {

    test("GET /api/tasks should return a task list", async () => {
        const response = await request(app)
            .get("/api/tasks");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test("POST /api/tasks should create a task", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "Automated Test Task",
                description: "Created by Jest and Supertest",
                priority: "high",
                status: "pending",
                dueDate: "2026-08-30"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Task created successfully");
        expect(response.body.data.title).toBe("Automated Test Task");

        taskId = response.body.data._id;
    });

    test("GET /api/tasks/:id should return the created task", async () => {
        const response = await request(app)
            .get(`/api/tasks/${taskId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data._id).toBe(taskId);
        expect(response.body.data.title).toBe("Automated Test Task");
        expect(response.body.data.status).toBe("pending");
    });

    test("PUT /api/tasks/:id should update the task", async () => {
        const response = await request(app)
            .put(`/api/tasks/${taskId}`)
            .send({
                title: "Updated Automated Test Task",
                description: "Updated by Jest and Supertest",
                priority: "low",
                status: "completed",
                dueDate: "2026-09-01"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Task updated successfully");
        expect(response.body.data.title).toBe("Updated Automated Test Task");
        expect(response.body.data.status).toBe("completed");
    });

    test("DELETE /api/tasks/:id should delete the task", async () => {
        const response = await request(app)
            .delete(`/api/tasks/${taskId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Task deleted successfully");
    });
    test("POST /api/tasks should reject invalid priority", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "Invalid Priority Task",
                description: "Testing validation",
                priority: "urgent",
                status: "pending",
                dueDate: "2026-09-01"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain("priority");
    });

    test("GET /api/tasks/:id should reject an invalid task ID", async () => {
        const response = await request(app)
            .get("/api/tasks/abc123");

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Invalid task ID");
    });

});