const API_URL = "http://localhost:5000/tasks";

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Function to fetch and display tasks
const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
};

// Function to render tasks on the page
const renderTasks = (tasks) => {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-title ${task.status ? "completed" : ""}">${task.title}</span>
            <div class="task-buttons">
                <button class="toggle-btn" data-id="${task.id}">✔</button>
                <button class="delete-btn" data-id="${task.id}">❌</button>
            </div>
        `;
        taskList.appendChild(li);
    });
};

// Add new task
addTaskBtn.addEventListener("click", async () => {
    const title = taskInput.value.trim();
    if (title) {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
        });
        taskInput.value = "";
        fetchTasks();
    }
});

// Toggle or delete a task
taskList.addEventListener("click", async (e) => {
    const target = e.target;
    const id = target.dataset.id;
    if (target.classList.contains("toggle-btn")) {
        const taskTitle = target.parentElement.previousElementSibling;
        const newStatus = !taskTitle.classList.contains("completed");
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });
        fetchTasks();
    } else if (target.classList.contains("delete-btn")) {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        fetchTasks();
    }
});

// Initial fetch
fetchTasks();