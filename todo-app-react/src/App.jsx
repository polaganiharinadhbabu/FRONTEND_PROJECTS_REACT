
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Load saved tasks from Local Storage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("myTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  // Save tasks whenever tasks change
  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  // Mark task as completed or active
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const remainingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  return (
    <div className="app">
      <div className="todo-container">
        <header>
          <h1>My Todo App</h1>
          <p>Organize your day, one task at a time.</p>
        </header>

        <form className="todo-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Enter a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit">Add Task</button>
        </form>

        <div className="task-summary">
          <span>Total Tasks: {tasks.length}</span>
          <span>Remaining: {remainingTasks}</span>
        </div>

        <div className="filters">
          {["All", "Active", "Completed"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active-filter" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div className="task-item" key={task.id}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />

                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>
                </label>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="empty-message">
              No tasks found. Add a new task!
            </p>
          )}
        </div>

        {tasks.length > 0 && (
          <button
            className="clear-btn"
            onClick={() => setTasks([])}
          >
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
