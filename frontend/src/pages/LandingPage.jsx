import { Link, useNavigate } from "react-router-dom";
import {
  FaTasks,
  FaClock,
  FaCalendarAlt,
  FaChartBar,
  FaLayerGroup,
  FaFire,
} from "react-icons/fa";

function LandingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const features = [
    { title: "Smart Task Management", icon: <FaTasks /> },
    { title: "Pomodoro Timer", icon: <FaClock /> },
    { title: "Study Planner", icon: <FaCalendarAlt /> },
    { title: "Progress Analytics", icon: <FaChartBar /> },
    { title: "Category System", icon: <FaLayerGroup /> },
    { title: "Streak Tracking", icon: <FaFire /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-white-800">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-5 bg-slate-700">
        <h1 className="text-xl font-bold text-white">⚡ FocusFlow</h1>

        <div className="flex gap-6 items-center">

          <Link to="/about" className="text-white hover:text-blue-600">About</Link>
          <Link to="/features" className="text-white hover:text-blue-600">Features</Link>
          <Link to="/testimonials" className="text-white hover:text-blue-600">Testimonials</Link>
          <Link to="/stats" className="text-white hover:text-blue-600">Stats</Link>

          {token && (
            <Link to="/dashboard" className="text-white hover:text-blue-600">
              Dashboard
            </Link>
          )}

          {/* 🔐 AUTH SECTION */}
          {!token ? (
            <>
              <Link to="/login" className="text-white-600">
                Sign In
              </Link>

              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow"
              >
                Get Started →
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )}

        </div>
      </nav>

      {/* HERO */}
      <div className="text-center mt-16 px-6">
        <h1 className="text-5xl font-bold mb-6">
          Study Smarter.{" "}
          <span className="text-blue-600">Focus Deeper.</span>{" "}
          Achieve More.
        </h1>

        <p className="max-w-2xl mx-auto text-white-600 mb-8">
          All-in-one study planner to manage tasks, track focus, and boost productivity.
        </p>

        <div className="flex justify-center gap-4 mb-6">

          {!token ? (
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition"
            >
              Start for Free →
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition"
            >
              Go to Dashboard →
            </Link>
          )}

          {!token && (
            <Link
              to="/login"
              className="border border-white-300 px-6 py-3 rounded-lg hover:bg-white-100"
            >
              Sign In
            </Link>
          )}

        </div>

        <p className="text-sm text-white-500">
          Trusted by 50,000+ students worldwide
        </p>
      </div>

      {/* STATS */}
      <div className="mt-10 flex justify-center gap-16 text-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-600">50K+</h2>
          <p className="text-white-500">Students</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-blue-600">2M+</h2>
          <p className="text-white-500">Tasks Completed</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-blue-600">98%</h2>
          <p className="text-white-500">Satisfaction</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-blue-600">4.9★</h2>
          <p className="text-white-500">Rating</p>
        </div>
      </div>

      {/* DASHBOARD PREVIEW */}
      <div className="mt-16 flex justify-center px-6">
        <div className="bg-white/70 backdrop-blur-md border rounded-xl shadow-lg p-6 w-[900px]">

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded">Tasks: 8</div>
            <div className="bg-green-50 p-3 rounded">Completed: 5</div>
            <div className="bg-purple-50 p-3 rounded">Focus: 2h</div>
            <div className="bg-yellow-50 p-3 rounded">Streak: 7d</div>
          </div>

          <div className="bg-white-100 p-4 rounded text-center text-white-500">
            Dashboard Preview
          </div>

        </div>
      </div>

      {/* FEATURES */}
      <div className="mt-24 px-10 pb-20">
        <h2 className="text-3xl font-bold text-center mb-2">
          Built for serious students
        </h2>

        <p className="text-center text-white-600 mb-10">
          Every feature is designed to help you succeed
        </p>

        <div className="grid grid-cols-3 gap-6">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:scale-105 transition"
            >
              <div className="text-blue-500 text-xl mb-4">
                {item.icon}
              </div>

              <h3 className="font-semibold mb-2">{item.title}</h3>

              <p className="text-white-500 text-sm">
                Improve productivity and stay organized.
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default LandingPage;