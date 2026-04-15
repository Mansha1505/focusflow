import { useState, useEffect } from "react";
import API from "../api";
import { getUserId } from "../utils/getUser";
import DashboardLayout from "../layouts/DashboardLayout";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [plans, setPlans] = useState([]);

  // 🔄 FETCH TASKS
  const fetchTasks = async () => {
    try {
      const userId = getUserId();

      const res = await API.get(`/api/tasks?user=${userId}`);

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔄 FETCH PLANS
  const fetchPlans = async () => {
    try {
      const userId = getUserId();

      const res = await API.get(`/api/plans?user=${userId}`);

      setPlans(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchPlans();
  }, []);

  // 🔁 REFRESH ON TAB FOCUS
  useEffect(() => {
    const handleFocus = () => {
      fetchTasks();
      fetchPlans();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // 📊 TASK CALCULATIONS
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.isCompleted).length;
  const pendingTasks = totalTasks - completedTasks;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // 📅 PLAN CALCULATIONS
  const totalPlans = plans.length;
  const completedPlans = plans.filter((p) => p.isCompleted).length;

  const today = new Date().toISOString().split("T")[0];
  const todayPlans = plans.filter((p) => p.date === today).length;

  return (
    <DashboardLayout>

      <h2 className="text-2xl font-semibold mb-6">
        Dashboard Overview
      </h2>

      {/* TASK CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold text-blue-600">
            {totalTasks}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-600">
            {completedTasks}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-red-500">
            {pendingTasks}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-500">Completion %</h3>
          <p className="text-2xl font-bold text-purple-600">
            {completionRate}%
          </p>
        </div>

      </div>

      {/* PLANNER CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-500">Total Plans</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {totalPlans}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-500">Completed Plans</h3>
          <p className="text-2xl font-bold text-green-600">
            {completedPlans}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-gray-500">Today's Plans</h3>
          <p className="text-2xl font-bold text-blue-600">
            {todayPlans}
          </p>
        </div>

      </div>

      {/* PROGRESS */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="mb-3 font-semibold">Progress</h3>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {completionRate}% tasks completed
        </p>

      </div>

    </DashboardLayout>
  );
}

export default DashboardPage;