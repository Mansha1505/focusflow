import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function TestimonialsPage() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  // 🔄 FETCH
  const fetchReviews = async () => {
    const res = await axios.get("https://focusflow-backend-olwq.onrender.com/api/testimonials");
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ➕ ADD
  const addReview = async () => {
    if (!name || !message) return;

    await axios.post("https://focusflow-backend-olwq.onrender.com/api/testimonials", {
      name,
      message,
      rating,
    });

    setName("");
    setMessage("");
    setRating(5);
    fetchReviews();
  };

  return (
    <DashboardLayout>

      <h2 className="text-2xl font-semibold mb-6">
        What Users Say 💬
      </h2>

      {/* ⭐ DUMMY TESTIMONIALS (BIG) */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600">
            FocusFlow completely transformed my productivity. I can now
            manage tasks effortlessly!
          </p>
          <h3 className="mt-4 font-semibold">— Aditi</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600">
            The timer + planner combo is insane. I study more efficiently now.
          </p>
          <h3 className="mt-4 font-semibold">— Rahul</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600">
            Clean UI, smooth experience. Best productivity app I’ve used!
          </p>
          <h3 className="mt-4 font-semibold">— Sneha</h3>
        </div>

      </div>

      {/* ➕ ADD REVIEW */}
      <div className="bg-white p-5 rounded-xl shadow mb-6 flex flex-col gap-3">

        <h3 className="font-semibold">Share your experience</h3>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <textarea
          placeholder="Write your review..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <button
          onClick={addReview}
          className="bg-blue-500 text-white py-2 rounded-lg"
        >
          Submit Review
        </button>

      </div>

      {/* 👇 USER TESTIMONIALS (SMALL CARDS) */}
      <div>

        <h3 className="text-lg font-semibold mb-4">
          Community Reviews
        </h3>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">

            {reviews.map((r) => (
              <div
                key={r._id}
                className="bg-white p-3 rounded-lg shadow-sm border text-sm"
              >

                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold">{r.name}</h4>
                  <span className="text-yellow-500 text-xs">
                    {"⭐".repeat(r.rating)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm">
                  {r.message}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

    </DashboardLayout>
  );
}

export default TestimonialsPage;