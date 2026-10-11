
import { useState } from "react";
import TaskForm from "./Components/TaskForm";
import TaskItem from "./Components/TaskItem";
import TaskList from "./Components/TaskList";
import TaskStats from "./Components/TaskStats";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Study React", completed: false },
    { id: 2, title: "Practice JavaScript", completed: true },
    { id: 3, title: "Read a book", completed: false },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  }

  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function filterTasks() {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed);

      return matchesSearch && matchesFilter;
    });
  }

  return (
    <main className="app">
      <header className="header">
        <p className="eyebrow">STAY PRODUCTIVE</p>
        <h1>Task Manager</h1>
        <p>Organize your work. Finish what matters.</p>
      </header>

      <TaskStats tasks={tasks} />

      <section className="panel">
        <h2>Add a new task</h2>
        <TaskForm onAddTask={addTask} />
      </section>

      <section className="panel">
        <h2>Your tasks</h2>

        <input
          className="search-input"
          type="search"
          placeholder="Search tasks..."
          value={search}
          onChange={handleSearch}
        />

        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <TaskList
          tasks={filterTasks()}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </section>
    </main>
  );
}
