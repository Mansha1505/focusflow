import { useState, useEffect } from "react";
import API from "../api";
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
      const res = await API.get(`/api/tasks?user=${userId}`);
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

    await API.post("/api/tasks", {
      text,
      priority,
      user: userId,
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
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()))
    .filter((t) =>
      filterPriority === "all" ? true : t.priority === filterPriority
    );

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-6">Task Manager</h2>

      <div className="bg-white p-4 rounded-xl shadow mb-4 flex gap-3">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg flex-1"
        />
      </div>

      <div className="bg-white p-5 rounded-xl shadow mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Enter task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-3 rounded-lg"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button onClick={addTask} className="bg-blue-500 text-white px-5 rounded-lg">
          Add
        </button>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        {filteredTasks.map((task) => (
          <div key={task._id} className="flex justify-between mb-2">
            <div>
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleComplete(task._id, task.isCompleted)}
              />
              <span className="ml-2">{task.text}</span>
            </div>

            <button onClick={() => deleteTask(task._id)} className="text-red-500">
              Delete
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default TasksPage;