function StatsPage() {
  return (
    <div className="min-h-screen bg-blue-50 px-10 py-16 text-center">

      <h1 className="text-4xl font-bold mb-10">
        Our Impact
      </h1>

      <div className="flex justify-center gap-16">

        <div>
          <h2 className="text-4xl font-bold text-blue-600">50K+</h2>
          <p className="text-gray-500">Students</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-blue-600">2M+</h2>
          <p className="text-gray-500">Tasks Completed</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-blue-600">98%</h2>
          <p className="text-gray-500">Satisfaction</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-blue-600">4.9★</h2>
          <p className="text-gray-500">Rating</p>
        </div>

      </div>

    </div>
  );
}

export default StatsPage;