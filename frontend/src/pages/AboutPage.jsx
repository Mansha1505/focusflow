import DashboardLayout from "../layouts/DashboardLayout";

function AboutPage() {
  return (
    <DashboardLayout>

      {/* 🌟 HERO SECTION */}
      <div className="mb-14 text-center">

        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4">
          About FocusFlow ⚡
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          FocusFlow is a next-generation productivity platform designed to
          simplify how individuals manage their time, tasks, and goals.
          Built with a modern tech stack and a user-first approach,
          it empowers users to stay focused, organized, and consistent.
        </p>

      </div>

      {/* 🚀 MISSION + VISION */}
      <div className="grid md:grid-cols-2 gap-8 mb-14">

        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3">🎯 Our Mission</h2>
          <p className="text-sm">
            To redefine productivity by providing a unified platform where
            users can manage tasks, track progress, and build consistent
            habits effortlessly. FocusFlow aims to eliminate distractions
            and bring clarity into daily workflows.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3">🚀 Our Vision</h2>
          <p className="text-sm">
            To evolve into an intelligent productivity ecosystem that
            adapts to user behavior, predicts patterns, and enhances
            decision-making through insights and analytics.
          </p>
        </div>

      </div>

      {/* 💡 WHAT MAKES US DIFFERENT */}
      <div className="mb-14">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          What Makes FocusFlow Unique?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2">⚡ All-in-One Platform</h3>
            <p className="text-gray-600 text-sm">
              Tasks, planning, analytics, and focus tools integrated into a
              single seamless environment.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2">🧠 Smart Productivity</h3>
            <p className="text-gray-600 text-sm">
              Designed to enhance deep work and reduce cognitive overload
              through structured workflows.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2">☁️ Cloud Powered</h3>
            <p className="text-gray-600 text-sm">
              Built on scalable cloud architecture ensuring accessibility,
              reliability, and data persistence.
            </p>
          </div>

        </div>

      </div>

      {/* 🔧 FEATURES SECTION */}
      <div className="mb-14">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Core Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-2">📝 Task Management</h3>
            <p className="text-gray-600 text-sm">
              Create, prioritize, filter, and track tasks with an intuitive
              interface and real-time updates.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-2">⏱️ Focus Timer</h3>
            <p className="text-gray-600 text-sm">
              Boost productivity with customizable focus sessions inspired
              by proven time-management techniques.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-2">📅 Smart Planner</h3>
            <p className="text-gray-600 text-sm">
              Organize study schedules and long-term plans with ease and
              flexibility.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-2">📊 Analytics</h3>
            <p className="text-gray-600 text-sm">
              Gain insights into productivity through charts and progress
              tracking systems.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-2">🔐 Secure Auth</h3>
            <p className="text-gray-600 text-sm">
              JWT-based authentication ensures secure and personalized user
              experiences.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-2">💬 Testimonials</h3>
            <p className="text-gray-600 text-sm">
              Real users can share their experiences, building trust and
              community engagement.
            </p>
          </div>

        </div>

      </div>

      {/* 🌍 IMPACT SECTION */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 rounded-2xl mb-14 text-center shadow-lg">

        <h2 className="text-2xl font-semibold mb-3">
          Empowering Productivity Worldwide 🌍
        </h2>

        <p className="max-w-2xl mx-auto text-sm">
          FocusFlow is built with the belief that productivity is not about
          doing more, but doing what truly matters. By combining simplicity
          with powerful tools, it helps users unlock their full potential.
        </p>

      </div>

      {/* 🏁 FINAL */}
      <div className="text-center">

        <h2 className="text-xl font-semibold mb-2">
          Built for Focus. Designed for Growth.
        </h2>

        <p className="text-gray-500 max-w-xl mx-auto">
          Whether you're a student, developer, or professional, FocusFlow
          provides the tools you need to stay consistent, disciplined, and
          ahead in your journey.
        </p>

      </div>

    </DashboardLayout>
  );
}

export default AboutPage;