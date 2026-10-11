
export default function TaskStats({ tasks }) {
  function getTotal() {
    return tasks.length;
  }

  function getCompleted() {
    return tasks.filter((task) => task.completed).length;
  }

  function getPending() {
    return tasks.filter((task) => !task.completed).length;
  }

  return (
    <div className="stats">
      <div className="stat-card">
        <span>Total Tasks</span>
        <h2>{getTotal()}</h2>
      </div>

      <div className="stat-card">
        <span>Completed</span>
        <h2>{getCompleted()}</h2>
      </div>

      <div className="stat-card">
        <span>Pending</span>
        <h2>{getPending()}</h2>
      </div>
    </div>
  );
}
