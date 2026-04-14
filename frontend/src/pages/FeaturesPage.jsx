import { useNavigate } from "react-router-dom";
import {
  FaTasks,
  FaClock,
  FaCalendarAlt,
  FaChartBar,
  FaLayerGroup,
  FaFire,
} from "react-icons/fa";

function FeaturesPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Smart Task Management",
      icon: <FaTasks />,
      path: "/tasks",
    },
    {
      title: "Pomodoro Timer",
      icon: <FaClock />,
      path: "/timer",
    },
    {
      title: "Study Planner",
      icon: <FaCalendarAlt />,
      path: "/planner",
    },
    {
      title: "Progress Analytics",
      icon: <FaChartBar />,
      path: "/progress",
    },
    {
      title: "Category System",
      icon: <FaLayerGroup />,
    },
    {
      title: "Streak Tracking",
      icon: <FaFire />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-10 py-16 text-gray-800">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Features
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">

        {features.map((item, index) => (
          <div
            key={index}
            onClick={() => item.path && navigate(item.path)}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:scale-105 transition cursor-pointer"
          >

            {/* ICON */}
            <div className="text-blue-500 text-xl mb-3 pointer-events-none">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="font-semibold pointer-events-none">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="text-gray-500 text-sm mt-2 pointer-events-none">
              Designed to boost productivity and focus.
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default FeaturesPage;