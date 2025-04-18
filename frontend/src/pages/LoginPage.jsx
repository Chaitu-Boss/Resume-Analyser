// import React, { useState } from 'react';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // In a real application, you would handle authentication here
//     console.log('Logging in with:', { email, password });
//     // After successful login, you would typically redirect to the home page
//     // For this example, we'll just log a message.
//     alert('Login Successful (Simulated)');
//     // window.location.href = '/home'; // Uncomment to redirect
//   };

//   const handleRegisterClick = () => {
//     // Programmatically navigate to the register page
//     window.location.href = '/register';
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
//       <div className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
//           Login
//         </h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Your Email"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Your Password"
//               required
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Sign In
//             </button>
//             {/* You can add a "Forgot Password?" link here if needed */}
//           </div>
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-gray-600 text-sm">
//             New here?{' '}
//             <button
//               type="button"
//               className="font-semibold text-blue-500 hover:text-blue-700 focus:outline-none"
//               onClick={handleRegisterClick}
//             >
//               Register now
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    alert('Login Successful (Simulated)');
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
