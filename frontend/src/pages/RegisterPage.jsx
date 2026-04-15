import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    console.log("REGISTER:", trimmedEmail, trimmedPassword);

    if (!trimmedEmail || !trimmedPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://focusflow-backend-5tcg.onrender.com/api/auth/register",
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

      alert("Registered successfully!");
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
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
          onClick={handleRegister}
          className="w-full bg-gray-800 text-white py-3 rounded"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;