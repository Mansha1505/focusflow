import { useState, useEffect } from "react";
import API from "../utils/api";
import { getUserId } from "../utils/getUser";
import DashboardLayout from "../layouts/DashboardLayout";

function PlannerPage() {
  const [plan, setPlan] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(""); // ✅ NEW
  const [plans, setPlans] = useState([]);

  // 🔄 FETCH
  const fetchPlans = async () => {
    try {
      const userId = getUserId();

      const res = await API.get(
        `/api/plans?user=${userId}`
      );

      setPlans(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ➕ ADD PLAN
  const addPlan = async () => {
    if (!plan || !date) return;

    try {
      const userId = getUserId();

      await API.post("/api/plans", {
        text: plan,
        date,
        time, // ✅ NEW
        user: userId,
        isCompleted: false, // ✅ NEW
      });

      setPlan("");
      setDate("");
      setTime("");
      fetchPlans();
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ DELETE
  const deletePlan = async (id) => {
    await API.delete(`/api/plans/${id}`);
    fetchPlans();
  };

  // ✅ TOGGLE COMPLETE
  const toggleComplete = async (id, currentStatus) => {
    try {
      await API.put(`/api/plans/${id}`, {
        isCompleted: !currentStatus,
      });

      // instant UI update
      setPlans((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, isCompleted: !currentStatus } : p
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // 📅 GROUP BY DATE
  const groupedPlans = plans.reduce((acc, plan) => {
    if (!acc[plan.date]) acc[plan.date] = [];
    acc[plan.date].push(plan);
    return acc;
  }, {});

  return (
    <DashboardLayout>

      <h2 className="text-2xl font-semibold mb-6">
        Study Planner 📅
      </h2>

      {/* INPUT */}
      <div className="bg-white p-5 rounded-xl shadow mb-6 flex gap-3 flex-wrap">

        <input
          type="text"
          placeholder="Study topic..."
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="flex-1 border p-3 rounded-lg"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <button
          onClick={addPlan}
          className="bg-blue-500 text-white px-4 rounded-lg"
        >
          Add
        </button>

      </div>

      {/* LIST */}
      <div className="space-y-6">

        {Object.keys(groupedPlans).length === 0 ? (
          <p className="text-gray-500">No plans yet</p>
        ) : (
          Object.keys(groupedPlans).map((dateKey) => (

            <div key={dateKey} className="bg-white p-5 rounded-xl shadow">

              {/* DATE HEADER */}
              <h3 className="font-semibold mb-3 text-blue-600">
                {dateKey}
              </h3>

              <ul className="space-y-3">

                {groupedPlans[dateKey]
                  .sort((a, b) => (a.time || "").localeCompare(b.time || ""))
                  .map((p) => (

                  <li
                    key={p._id}
                    className="flex justify-between items-center border-b pb-2"
                  >

                    {/* LEFT */}
                    <div className="flex items-center gap-3">

                      <input
                        type="checkbox"
                        checked={p.isCompleted}
                        onChange={() =>
                          toggleComplete(p._id, p.isCompleted)
                        }
                      />

                      <div>
                        <p
                          className={`${
                            p.isCompleted
                              ? "line-through text-gray-400"
                              : ""
                          }`}
                        >
                          {p.text}
                        </p>

                        {p.time && (
                          <p className="text-xs text-gray-500">
                            ⏰ {p.time}
                          </p>
                        )}
                      </div>

                    </div>

                    {/* RIGHT */}
                    <button
                      onClick={() => deletePlan(p._id)}
                      className="text-red-500 text-sm"
                    >
                      Delete
                    </button>

                  </li>

                ))}

              </ul>

            </div>

          ))
        )}

      </div>

    </DashboardLayout>
  );
}

export default PlannerPage;