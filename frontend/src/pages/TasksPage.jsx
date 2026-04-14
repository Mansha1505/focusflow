import { useState, useEffect } from "react";
import API from "../utils/api";
import { getUserId } from "../utils/getUser";
import DashboardLayout from "../layouts/DashboardLayout";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [showCompleted, setShowCompleted] = useState(true);
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");

 const fetchTasks = async () => {
  try {
    const userId = getUserId();

    const res = await API.get(
      `/api/tasks?user=${userId}`
    );

    setTasks(res.data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchTasks();
  }, []);



const addTask = async () => {
  if (!text.trim()) return;

  const userId = getUserId();

  console.log("USER ID:", userId); // 👈 DEBUG

  await API.post("/api/tasks", {
    text,
    priority,
    user: userId, // ✅ MUST BE SENT
  });

  setText("");
  setPriority("medium");
  fetchTasks();
};

  const deleteTask = async (id) => {
    await API.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (id, currentStatus) => {
    await API.put(`/api/tasks/${id}`, {
      isCompleted: !currentStatus,
    });

    setTasks((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, isCompleted: !currentStatus } : t
      )
    );
  };

  const getPriorityColor = (p) => {
    if (p === "high") return "text-red-500";
    if (p === "medium") return "text-yellow-500";
    return "text-green-500";
  };

  const filteredTasks = tasks
    .filter((t) => showCompleted || !t.isCompleted)
    .filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) =>
      filterPriority === "all" ? true : t.priority === filterPriority
    );

  return (
    <DashboardLayout>

      <h2 className="text-2xl font-semibold mb-6">Task Manager</h2>

      {/* 🔍 SEARCH + FILTER */}
      <div className="bg-white p-4 rounded-xl shadow mb-4 flex flex-col md:flex-row gap-3">

        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg flex-1 focus:outline-blue-400"
        />

        <div className="flex gap-2">
          {["all", "high", "medium", "low"].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1 rounded-lg text-sm ${
                filterPriority === p
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

      </div>

      {/* ➕ INPUT */}
      <div className="bg-white p-5 rounded-xl shadow mb-6 flex gap-3">

        <input
          type="text"
          placeholder="Enter task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-3 rounded-lg focus:outline-blue-400"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="high">🔥 High</option>
          <option value="medium">⚡ Medium</option>
          <option value="low">🌿 Low</option>
        </select>

        <button
          onClick={addTask}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-lg shadow"
        >
          Add
        </button>

      </div>

      {/* 📊 STATS */}
      <div className="flex gap-6 mb-4 text-sm text-gray-600">
        <span>Total: {tasks.length}</span>
        <span>Filtered: {filteredTasks.length}</span>
        <span>
          Completed: {tasks.filter(t => t.isCompleted).length}
        </span>
      </div>

      {/* SHOW COMPLETED */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        />
        <label>Show Completed</label>
      </div>

      {/* LIST */}
      <div className="bg-white p-5 rounded-xl shadow">

        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks found</p>
        ) : (
          <ul className="space-y-3">

            {filteredTasks.map((task) => (

              <li
                key={task._id}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-blue-50 transition border"
              >

                <div className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() =>
                      toggleComplete(task._id, task.isCompleted)
                    }
                  />

                  <div>
                    <p
                      className={`font-medium ${
                        task.isCompleted
                          ? "line-through text-gray-400"
                          : ""
                      }`}
                    >
                      {task.text}
                    </p>

                    <span
                      className={`text-xs font-semibold ${getPriorityColor(task.priority)}`}
                    >
                      {task.priority || "medium"}
                    </span>
                  </div>

                </div>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>

              </li>

            ))}

          </ul>
        )}

      </div>

    </DashboardLayout>
  );
}

export default TasksPage;