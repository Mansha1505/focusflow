import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function TimerPage() {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");

  const [sessions, setSessions] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  // 🔄 Load
  useEffect(() => {
    const s = localStorage.getItem("sessions");
    const t = localStorage.getItem("totalTime");

    if (s) setSessions(JSON.parse(s));
    if (t) setTotalTime(JSON.parse(t));
  }, []);

  // 💾 Save
  const saveData = (s, t) => {
    localStorage.setItem("sessions", JSON.stringify(s));
    localStorage.setItem("totalTime", JSON.stringify(t));
  };

  const formatTime = () => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  useEffect(() => {
    let interval;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    if (time === 0) {
      if (mode === "focus") {
        const newSessions = sessions + 1;
        const sessionTime = focusMinutes;

        const newTotalTime = totalTime + sessionTime;

        setSessions(newSessions);
        setTotalTime(newTotalTime);

        saveData(newSessions, newTotalTime);

        setMode("break");
        setTime(breakMinutes * 60);
      } else {
        setMode("focus");
        setTime(focusMinutes * 60);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, time, mode]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setMode("focus");
    setTime(focusMinutes * 60);
  };

  return (
    <DashboardLayout>

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Pomodoro Timer
      </h2>

      <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl shadow-lg text-center max-w-xl mx-auto">

        {/* MODE */}
        <h3 className="text-gray-500 mb-2 text-sm tracking-wide uppercase">
          {mode === "focus" ? "Focus Session" : "Break Session"}
        </h3>

        {/* TIMER */}
        <h1 className="text-7xl font-bold text-slate-800 mb-6 tracking-tight">
          {formatTime()}
        </h1>

        {/* INPUTS */}
        <div className="flex justify-center gap-6 mb-8">

          <div className="flex flex-col items-center">
            <label className="text-sm text-gray-500 mb-1">
              Focus (min)
            </label>
            <input
              type="number"
              value={focusMinutes}
              onChange={(e) =>
                setFocusMinutes(Number(e.target.value))
              }
              className="border border-gray-300 p-2 rounded-lg w-20 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm text-gray-500 mb-1">
              Break (min)
            </label>
            <input
              type="number"
              value={breakMinutes}
              onChange={(e) =>
                setBreakMinutes(Number(e.target.value))
              }
              className="border border-gray-300 p-2 rounded-lg w-20 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={startTimer}
            className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition"
          >
            Start
          </button>

          <button
            onClick={pauseTimer}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition"
          >
            Pause
          </button>

          <button
            onClick={resetTimer}
            className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-lg transition"
          >
            Reset
          </button>

        </div>

        {/* STATS */}
        <div className="mt-6 border-t border-gray-200 pt-6">

          <div className="flex justify-around text-sm text-gray-600">

            <div>
              <p className="text-gray-400">Sessions</p>
              <p className="text-lg font-semibold text-slate-800">
                {sessions}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Total Focus</p>
              <p className="text-lg font-semibold text-slate-800">
                {totalTime} min
              </p>
            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default TimerPage;