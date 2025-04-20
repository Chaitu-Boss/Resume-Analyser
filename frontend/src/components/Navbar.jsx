import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';


function Navbar() {
  const { email, setEmail } = useContext(AuthContext);

  useEffect(() => {
    console.log('Email:', localStorage.getItem('email'));
    setEmail(localStorage.getItem('email'));
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', null, { withCredentials: true });
      localStorage.removeItem('email');
      setEmail(null);
      window.location.href = '/login';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-slate-100 via-gray-100 to-slate-200 shadow-md py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold text-violet-700 tracking-wide">
          <a href="/">
            ResumeAnalyser
          </a>
        </div>
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
          {email ? (
            <span
              className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-5 py-2 rounded-full shadow hover:opacity-90 transition duration-300 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
          ) : (
            <a
              href="/login"
              className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-5 py-2 rounded-full shadow hover:opacity-90 transition duration-300"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;