
# To-Do App

📝 Overview

This is a full-stack To-Do List application. It's built with a Node.js backend to handle data operations and a simple HTML/CSS/JavaScript frontend for the user interface. All tasks are stored and managed in a MySQL database.

🚀 Features

  Add Tasks: Easily add new tasks to your list.
  Toggle Status: Mark tasks as complete or incomplete.
  Delete Tasks: Remove tasks from the list.
  Persistent Data: All tasks are saved in a MySQL database, so they remain even after you close the application.

🛠️ Technology Stack

  Frontend: HTML, CSS, JavaScript (using Fetch API)
  Backend: Node.js, Express.js
  Database: MySQL

⚙️ Setup and Installation

# Prerequisites

You need the following software installed on your machine:

Node.js: [Download here](https://nodejs.org/)
MySQL: [Download here](https://dev.mysql.com/downloads/installer/)

### Step 1: Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/bbhavs/todo-app.git
cd todo-app
```

### Step 2: Database Setup

1.  Open **MySQL Workbench**.

2.  Connect to your local MySQL server.

3.  Run the following SQL commands to create the database and table:

    ```sql
    CREATE DATABASE todo_db;
    USE todo_db;
    CREATE TABLE tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      status BOOLEAN DEFAULT 0
    );
    ```

### Step 3: Backend Configuration

1.  Navigate to the `backend` folder:

    ```bash
    cd backend
    ```

2.  Install the required Node.js packages:

    ```bash
    npm install express mysql2 cors
    ```

3.  Open `server.js` and update the database connection details with your MySQL root password:

    ```javascript
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "YOUR_MYSQL_PASSWORD_HERE", // <-- Change this
      database: "todo_db"
    });
    ```

### Step 4: Run the Application

1.  Start the backend server from the `backend` folder:

    ```bash
    node server.js
    ```

2.  In your file explorer, navigate to the `frontend` folder and open the `index.html` file in your web browser.

The To-Do app should now be running in your browser and connected to your database\!