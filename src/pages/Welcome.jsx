import React from "react";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">

      {/* Floating glow effect */}
      <div className="absolute inset-0">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400 rounded-full blur-3xl opacity-30 animate-pulse delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 max-w-2xl">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-lg animate-fadeIn">
          Smart Notes
        </h1>
        <p className="text-gray-100 text-base sm:text-lg md:text-xl max-w-md">
          Organize your thoughts, ideas, and notes beautifully — anywhere, anytime.
        </p>

        <Link to="/editor/text">
          <button className="mt-4 flex items-center justify-center gap-3 text-lg sm:text-xl font-semibold px-6 py-3 bg-white text-violet-700 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
            Get Started
            <GoArrowRight className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Link>
      </div>

      {/* Footer text */}
      <p className="absolute bottom-5 text-gray-200 text-sm sm:text-base opacity-75">
        ✨ Your ideas deserve a smarter space ✨
      </p>
    </div>
  );
}

export default Welcome;
