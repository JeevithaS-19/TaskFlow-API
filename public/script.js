const API_URL = "/api/tasks";

const taskList = document.getElementById("taskList");
const modal = document.getElementById("modal");
const taskForm = document.getElementById("taskForm");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");


// ===============================
// LOAD TASKS
// ===============================

async function loadTasks() {
    try {
        taskList.innerHTML = `<div class="loading">Loading tasks...</div>`;

        const response = await fetch(API_URL);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to load tasks");
        }

        const tasks = result.data || [];

        updateStats(tasks);
        renderTasks(tasks);

    } catch (error) {
        console.error(error);

        taskList.innerHTML = `
            <div class="empty">
                Unable to load tasks.
                <br>
                Please check that the backend is running.
            </div>
        `;
    }
}


// ===============================
// UPDATE STATISTICS
// ===============================

function updateStats(tasks) {
    totalCount.textContent = tasks.length;

    const pending = tasks.filter(
        task => task.status === "pending"
    ).length;

    const completed = tasks.filter(
        task => task.status === "completed"
    ).length;

    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}


// ===============================
// DISPLAY TASKS
// ===============================

function renderTasks(tasks) {

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty">
                <h3>No tasks yet</h3>
                <p>Create your first task using the "New Task" button.</p>
            </div>
        `;

        return;
    }

    taskList.innerHTML = tasks.map(task => {

        const dueDate = task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "";

        return `
            <div class="task-card">

                <div class="task-main">

                    <div class="task-title">
                        ${escapeHtml(task.title)}
                    </div>

                    <div class="task-description">
                        ${escapeHtml(task.description || "No description")}
                    </div>

                    <div class="task-meta">

                        <span class="badge priority-${task.priority}">
                            ${task.priority}
                        </span>

                        <span class="badge status-badge">
                            ${formatStatus(task.status)}
                        </span>

                        ${
                            dueDate
                                ? `<span class="badge status-badge">
                                    Due ${dueDate}
                                   </span>`
                                : ""
                        }

                    </div>

                </div>

                <div class="task-actions">

                    <button
                        class="action-btn"
                        onclick='editTask(${JSON.stringify(task)})'
                        title="Edit task"
                    >
                        ✎
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteTask('${task._id}')"
                        title="Delete task"
                    >
                        ×
                    </button>

                </div>

            </div>
        `;
    }).join("");
}


// ===============================
// OPEN MODAL
// ===============================

function openModal() {

    document.getElementById("modalTitle").textContent =
        "Create new task";

    document.getElementById("taskId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("priority").value = "medium";
    document.getElementById("status").value = "pending";
    document.getElementById("dueDate").value = "";

    modal.classList.remove("hidden");
}


// ===============================
// CLOSE MODAL
// ===============================

function closeModal() {
    modal.classList.add("hidden");
}


// Close modal when clicking outside
modal.addEventListener("click", function(event) {

    if (event.target === modal) {
        closeModal();
    }

});


// ===============================
// CREATE / UPDATE TASK
// ===============================

taskForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const taskId = document.getElementById("taskId").value;

    const taskData = {
        title: document.getElementById("title").value.trim(),
        description: document.getElementById("description").value.trim(),
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value,
        dueDate: document.getElementById("dueDate").value || null
    };

    try {

        const url = taskId
            ? `${API_URL}/${taskId}`
            : API_URL;

        const method = taskId ? "PUT" : "POST";

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Unable to save task"
            );
        }

        closeModal();

        showToast(
            taskId
                ? "Task updated successfully"
                : "Task created successfully"
        );

        await loadTasks();

    } catch (error) {

        console.error(error);

        showToast(error.message);
    }

});


// ===============================
// EDIT TASK
// ===============================

function editTask(task) {

    document.getElementById("modalTitle").textContent =
        "Edit task";

    document.getElementById("taskId").value = task._id;

    document.getElementById("title").value =
        task.title || "";

    document.getElementById("description").value =
        task.description || "";

    document.getElementById("priority").value =
        task.priority || "medium";

    document.getElementById("status").value =
        task.status || "pending";

    document.getElementById("dueDate").value =
        task.dueDate
            ? task.dueDate.substring(0, 10)
            : "";

    modal.classList.remove("hidden");
}


// ===============================
// DELETE TASK
// ===============================

async function deleteTask(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Unable to delete task"
            );
        }

        showToast("Task deleted successfully");

        await loadTasks();

    } catch (error) {

        console.error(error);

        showToast(error.message);
    }
}


// ===============================
// TOAST MESSAGE
// ===============================

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// ===============================
// HELPERS
// ===============================

function formatStatus(status) {

    if (!status) {
        return "Pending";
    }

    return status
        .replace("-", " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());
}


function escapeHtml(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


// ===============================
// INITIAL LOAD
// ===============================

loadTasks();