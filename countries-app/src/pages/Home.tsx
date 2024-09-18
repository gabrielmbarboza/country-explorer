import React from "react";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 font-color-white">
            Country Explorer
          </h1>
          <div className="relative">
            <Link to="/login"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <FiLock className="w-6 h-6 font-color-white" />
              <span className="font-color-white">Login</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
      <strong><span>⚠️⚠️⚠️⚠️</span> Atenção! <span>⚠️⚠️⚠️⚠️</span></strong>
      <br />
      <br />
      <h3>Este layout foi desenvolvido por um desenvolvedor Backend! O login está logo ali a direita! :D</h3>
      </main>
    </div>
  );
};

export default Home;
