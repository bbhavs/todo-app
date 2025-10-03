document.addEventListener("DOMContentLoaded", () => {
  const taskTitle = document.getElementById("taskTitle");
  const taskDesc = document.getElementById("taskDesc");
  const taskTag = document.getElementById("taskTag");
  const taskDate = document.getElementById("taskDate");
  const addTaskBtn = document.getElementById("addTask");

  const taskList = document.getElementById("taskList");
  const completedList = document.getElementById("completedList");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();

  // Add new task
  addTaskBtn.addEventListener("click", () => {
    if (taskTitle.value.trim() === "") {
      alert("Please enter a task title");
      return;
    }

    const task = {
      id: Date.now(),
      title: taskTitle.value,
      desc: taskDesc.value,
      tag: taskTag.value,
      date: taskDate.value,
      completed: false,
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    // Clear inputs
    taskTitle.value = "";
    taskDesc.value = "";
    taskTag.value = "work";
    taskDate.value = "";
  });

  // Save to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Render tasks
  function renderTasks() {
    taskList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach((task) => {
      const taskCard = document.createElement("div");
      taskCard.classList.add("task-card");

      const info = document.createElement("div");
      info.classList.add("task-info");

      const title = document.createElement("div");
      title.classList.add("task-title");
      title.textContent = task.title;

      const desc = document.createElement("div");
      desc.classList.add("task-desc");
      desc.textContent = task.desc;

      const tag = document.createElement("span");
      tag.classList.add("task-tag", task.tag);
      tag.textContent = task.tag;

      const date = document.createElement("div");
      date.classList.add("task-date");
      if (task.date) date.textContent = "📅 " + task.date;

      info.appendChild(title);
      if (task.desc) info.appendChild(desc);
      info.appendChild(tag);
      if (task.date) info.appendChild(date);

      const actions = document.createElement("div");
      actions.classList.add("task-actions");

      const completeBtn = document.createElement("button");
      completeBtn.textContent = "✓";
      completeBtn.classList.add("complete-btn");
      completeBtn.addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✕";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter((t) => t.id !== task.id);
        saveTasks();
        renderTasks();
      });

      actions.appendChild(completeBtn);
      actions.appendChild(deleteBtn);

      taskCard.appendChild(info);
      taskCard.appendChild(actions);

      if (task.completed) {
        completedList.appendChild(taskCard);
      } else {
        taskList.appendChild(taskCard);
      }
    });
  }
});
