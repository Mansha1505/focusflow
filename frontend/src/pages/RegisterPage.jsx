import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const getStrength = () => {
    if (password.length < 6) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/))
      return "Strong";
    return "Medium";
  };

  const strength = getStrength();

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">

      {/* subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-100 opacity-60"></div>

      <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-sm w-full max-w-md border border-gray-200">

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <p className="text-sm mb-4 text-gray-600">
          Strength:{" "}
          <span
            className={
              strength === "Weak"
                ? "text-red-500"
                : strength === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }
          >
            {strength}
          </span>
        </p>

        <button
          onClick={handleRegister}
          className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-800 font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default RegisterPage;