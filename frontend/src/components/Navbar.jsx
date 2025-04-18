import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-slate-100 via-gray-100 to-slate-200 shadow-md py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold text-violet-700 tracking-wide">
          <a href="/">
          ResumeAnalyser
          </a>
          
        </div>

        {/* Navigation Links */}
        <div className="space-x-10 text-lg font-medium">
          <a
            href="/about"
            className="text-gray-800 hover:text-violet-700 transition duration-300"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-gray-800 hover:text-violet-700 transition duration-300"
          >
            Contact
          </a>
          <a
            href="/login"
            className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-5 py-2 rounded-full shadow hover:opacity-90 transition duration-300"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
