import axios from 'axios';
import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
  
    try {
      console.log('Logging in with:', { email, password });
  
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      }, { withCredentials: true });
      alert('Login Successful');
      window.location.href = '/';
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('Something went wrong. Please try again later.');
        console.error(err);
      }
    }
  };

  const handleRegisterClick = () => {
    window.location.href = '/register';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 rounded-xl shadow-md transition transform hover:scale-105 cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New here?{' '}
            <button
              type="button"
              onClick={handleRegisterClick}
              className="text-indigo-500 font-semibold hover:underline cursor-pointer"
            >
              Register now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
