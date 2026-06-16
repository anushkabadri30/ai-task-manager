import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  function addTask() {
    if (!title || !priority || !dueDate) {
      alert("Please fill in all fields!");
      return;
    }

    const task = {
      id: Date.now(),
      title,
      priority,
      dueDate,
      completed: false,
    };

    setTasks([...tasks, task]);
    setTitle("");
    setPriority("");
    setDueDate("");
  }

  function toggleTask(id) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const filtered = tasks.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const completed = tasks.filter(t => t.completed).length;
  const active = tasks.filter(t => !t.completed).length;

  return (
    <div className="app">
      <div className="header">
        <h1>✨ AI Task Manager</h1>
        <p className="subtitle">Stay organized, stay productive</p>
        <div className="stats">
          <span className="stat">📋 Total: {tasks.length}</span>
          <span className="stat">🔥 Active: {active}</span>
          <span className="stat">✅ Done: {completed}</span>
        </div>
      </div>

      <div className="form-box">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="form-row">
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="">Priority</option>
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
        <button onClick={addTask}>+ Add Task</button>
      </div>

      <div className="filters">
        {["all", "active", "completed"].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="task-list">
        {filtered.length === 0 && (
          <div className="empty">No tasks here!</div>
        )}
        {filtered.map(task => (
          <div key={task.id} className={`task-item ${task.completed ? "done" : ""} ${task.priority}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <div className="task-info">
              <span className="task-title">{task.title}</span>
              <span className="task-meta">Due: {task.dueDate}</span>
            </div>
            <span className={`badge ${task.priority}`}>{task.priority}</span>
            <button className="btn-delete" onClick={() => deleteTask(task.id)}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;