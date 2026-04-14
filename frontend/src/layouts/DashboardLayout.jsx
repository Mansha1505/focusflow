import { Link, useLocation } from "react-router-dom";

function DashboardLayout({ children }) {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tasks", path: "/tasks" },
    { name: "Planner", path: "/planner" },
    { name: "Timer", path: "/timer" },
    { name: "Progress", path: "/progress" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg flex flex-col h-screen fixed">

        {/* TOP */}
        <div className="p-5">

          <h2 className="text-xl font-bold text-blue-600 mb-8">
            ⚡ FocusFlow
          </h2>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition ${
                  location.pathname === item.path
                    ? "bg-blue-500 text-white shadow"
                    : "text-gray-600 hover:bg-blue-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

        </div>

        {/* 🔴 FIXED LOGOUT AT BOTTOM */}
        <div className="mt-auto p-5 border-t">

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow"
          >
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-64 text-gray-800">

        <div className="mb-6">
          <h1 className="text-2xl font-semibold capitalize">
            {location.pathname.replace("/", "") || "dashboard"}
          </h1>
        </div>

        {children}

      </main>

    </div>
  );
}

export default DashboardLayout;