const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tiger", // <-- Update this line
  database: "todo_db"
});

// Routes
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;
  db.query("INSERT INTO tasks (title, status) VALUES (?, ?)", [title, 0], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, title, status: 0 });
  });
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query("UPDATE tasks SET status=? WHERE id=?", [status, id], (err) => {
    if (err) throw err;
    res.json({ message: "Task updated" });
  });
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Task deleted" });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));