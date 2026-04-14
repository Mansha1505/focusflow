import { useEffect, useState } from "react";
import axios from "axios";
import { getUserId } from "../utils/getUser";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

function ProgressPage() {
  const [tasks, setTasks] = useState([]);
  const [plans, setPlans] = useState([]);
  const [sessions, setSessions] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  // 🔄 FETCH
  const fetchData = async () => {
    try {
      const userId = getUserId();

      const taskRes = await axios.get(
        `https://focusflow-backend-5tcg.onrender.com/api/tasks?user=${userId}`
      );

      const planRes = await axios.get(
        `https://focusflow-backend-5tcg.onrender.com/api/plans?user=${userId}`
      );

      setTasks(taskRes.data);
      setPlans(planRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();

    const s = localStorage.getItem("sessions");
    const time = localStorage.getItem("totalTime");

    if (s) setSessions(JSON.parse(s));
    if (time) setTotalTime(JSON.parse(time));
  }, []);

  // 📊 TASK DATA
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.isCompleted).length;
  const pendingTasks = totalTasks - completedTasks;

  const taskChartData = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
  ];

  // 📊 PLAN DATA
  const totalPlans = plans.length;
  const completedPlans = plans.filter((p) => p.isCompleted).length;
  const pendingPlans = totalPlans - completedPlans;

  const planChartData = [
    { name: "Completed", value: completedPlans },
    { name: "Pending", value: pendingPlans },
  ];

  // 📅 DAILY PRODUCTIVITY (REAL)
  const today = new Date().toISOString().split("T")[0];

  const todayTasks = tasks.filter((t) => t.createdAt?.startsWith(today));
  const todayPlans = plans.filter((p) => p.date === today);

  const dailyData = [
    {
      name: "Today",
      tasks: todayTasks.length,
      plans: todayPlans.length,
      sessions: sessions,
    },
  ];

  // 📊 COMBINED PRODUCTIVITY
  const combinedData = [
    {
      name: "Tasks",
      Completed: completedTasks,
      Pending: pendingTasks,
    },
    {
      name: "Plans",
      Completed: completedPlans,
      Pending: pendingPlans,
    },
  ];

  // 📊 SESSION DATA
  const sessionChartData =
    sessions > 0
      ? Array.from({ length: sessions }, (_, i) => ({
          name: `S${i + 1}`,
          time: Math.round(totalTime / sessions),
        }))
      : [];

  // 📈 LINE DATA (REAL + DEMO)
  const lineChartData =
    sessions > 0
      ? sessionChartData
      : [
          { name: "Mon", time: 20 },
          { name: "Tue", time: 35 },
          { name: "Wed", time: 25 },
          { name: "Thu", time: 40 },
          { name: "Fri", time: 30 },
        ];

  // 📊 WEEKLY DEMO (KEEP)
  const weeklyData = [
    { name: "Mon", time: 20 },
    { name: "Tue", time: 35 },
    { name: "Wed", time: 25 },
    { name: "Thu", time: 40 },
    { name: "Fri", time: 30 },
    { name: "Sat", time: 50 },
    { name: "Sun", time: 45 },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <DashboardLayout>

      <h2 className="text-2xl font-semibold mb-6">
        Advanced Progress Analytics 🚀
      </h2>

      {/* STATS */}
      <div className="grid grid-cols-5 gap-6 mb-10">

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Total Tasks</p>
          <h3 className="text-xl font-bold">{totalTasks}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Total Plans</p>
          <h3 className="text-xl font-bold text-indigo-500">
            {totalPlans}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Completed Tasks</p>
          <h3 className="text-xl font-bold text-green-500">
            {completedTasks}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Sessions</p>
          <h3 className="text-xl font-bold text-blue-500">
            {sessions}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Focus Time</p>
          <h3 className="text-xl font-bold text-purple-500">
            {totalTime} min
          </h3>
        </div>

      </div>

      {/* 🥧 TASK PIE */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 max-w-3xl mx-auto">
        <h3 className="text-center font-semibold mb-4">
          Task Completion Ratio
        </h3>

        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={taskChartData} dataKey="value" outerRadius={80} label>
              {taskChartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 PLAN PIE */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 max-w-3xl mx-auto">
        <h3 className="text-center font-semibold mb-4">
          Planner Completion Ratio
        </h3>

        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={planChartData} dataKey="value" outerRadius={80} label>
              {planChartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 COMBINED BAR */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 max-w-4xl mx-auto">
        <h3 className="text-center font-semibold mb-4">
          Tasks vs Planner Comparison
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={combinedData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Completed" fill="#22c55e" />
            <Bar dataKey="Pending" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 DAILY PRODUCTIVITY */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 max-w-3xl mx-auto">
        <h3 className="text-center font-semibold mb-4">
          Today's Productivity
        </h3>

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dailyData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tasks" fill="#3b82f6" />
            <Bar dataKey="plans" fill="#8b5cf6" />
            <Bar dataKey="sessions" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📈 LINE */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 max-w-3xl mx-auto">
        <h3 className="text-center font-semibold mb-4">
          Focus Trend
        </h3>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={lineChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="time" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 WEEKLY DEMO (UNCHANGED) */}
      <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
        <h3 className="text-center font-semibold mb-4">
          Weekly Demo Progress
        </h3>

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="time" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </DashboardLayout>
  );
}

export default ProgressPage;