import { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post(
        "/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">

      {/* subtle gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-100 opacity-60"></div>

      <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-sm w-full max-w-md border border-gray-200">

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

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
          className="w-full mb-6 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Sign In
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-gray-800 font-medium">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;