import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const completedCount = tasks.filter((item) => item.completed).length;

  function addTask(event) {
    event.preventDefault();
    const text = task.trim();

    if (!text) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
    setTask("");
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((item) => item.id !== id));
  }

  return (
    <main className="todo-app">
      <section className="todo-card" aria-labelledby="todo-title">
        <div className="todo-heading">
          <p className="eyebrow">YOUR DAY, ORGANIZED</p>
          <h1 id="todo-title">Todo List</h1>
          <p className="todo-description">
            One step at a time. Add a task and get it done.
          </p>
        </div>

        <form className="todo-form" onSubmit={addTask}>
          <label className="visually-hidden" htmlFor="new-task">
            New task
          </label>
          <input
            id="new-task"
            type="text"
            placeholder="What needs to get done?"
            value={task}
            onChange={(event) => setTask(event.target.value)}
          />
          <button className="add-button" type="submit" disabled={!task.trim()}>
            Add task
          </button>
        </form>

        <div className="list-heading">
          <h2>Tasks</h2>
          <span className="task-count" aria-live="polite">
            {tasks.length === 0
              ? "No tasks yet"
              : `${completedCount} of ${tasks.length} done`}
          </span>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">
              +
            </span>
            <p>Your list is clear</p>
            <span>Add a task above to get started.</span>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((item) => (
              <li
                className={`task-item${item.completed ? " is-completed" : ""}`}
                key={item.id}
              >
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                  />
                  <span>{item.text}</span>
                </label>
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteTask(item.id)}
                  aria-label={`Remove ${item.text}`}
                  title="Remove task"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 6h11M8 6V4.5h4V6m2.5 0-.6 9.5H6.1L5.5 6m2.8 2.5v4.5m3.4-4.5v4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
