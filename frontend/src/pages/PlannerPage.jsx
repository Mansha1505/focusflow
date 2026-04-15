import { useState, useEffect } from "react";
import API from "../api";
import { getUserId } from "../utils/getUser";
import DashboardLayout from "../layouts/DashboardLayout";

function PlannerPage() {
  const [plan, setPlan] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [plans, setPlans] = useState([]);

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
    fetchPlans();
  }, []);

  const addPlan = async () => {
    if (!plan || !date) return;

    const userId = getUserId();

    await API.post("/api/plans", {
      text: plan,
      date,
      time,
      user: userId,
      isCompleted: false,
    });

    setPlan("");
    setDate("");
    setTime("");
    fetchPlans();
  };

  const deletePlan = async (id) => {
    await API.delete(`/api/plans/${id}`);
    fetchPlans();
  };

  const toggleComplete = async (id, currentStatus) => {
    await API.put(`/api/plans/${id}`, {
      isCompleted: !currentStatus,
    });

    setPlans((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, isCompleted: !currentStatus } : p
      )
    );
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-6">Planner</h2>

      <input value={plan} onChange={(e) => setPlan(e.target.value)} placeholder="Plan" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

      <button onClick={addPlan}>Add</button>

      {plans.map((p) => (
        <div key={p._id}>
          <input
            type="checkbox"
            checked={p.isCompleted}
            onChange={() => toggleComplete(p._id, p.isCompleted)}
          />
          {p.text}
          <button onClick={() => deletePlan(p._id)}>Delete</button>
        </div>
      ))}
    </DashboardLayout>
  );
}

export default PlannerPage;