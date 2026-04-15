import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    console.log("LOGIN:", trimmedEmail, trimmedPassword);

    if (!trimmedEmail || !trimmedPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://focusflow-backend-5tcg.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: trimmedEmail,
            password: trimmedPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);

      alert("Login successful!");
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gray-800 text-white py-3 rounded"
        >
          Sign In
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;