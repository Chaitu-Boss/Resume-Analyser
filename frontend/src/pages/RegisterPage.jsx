// import React, { useState } from 'react';

// function RegisterPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     // In a real application, you would handle user registration here
//     console.log('Registering with:', { name, email, password });
//     // After successful registration, you might redirect to the login page
//     alert('Registration Successful (Simulated)');
//     window.location.href = '/login';
//   };

//   const handleLoginClick = () => {
//     window.location.href = '/login';
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
//           Register
//         </h2>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         <form onSubmit={handleRegister}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Your Name"
//               required
//             />
//           </div>
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
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm Password"
//               required
//             />
//           </div>
//           <button
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//             type="submit"
//           >
//             Register
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-gray-600 text-sm">
//             Already have an account?{' '}
//             <button
//               type="button"
//               className="font-semibold text-blue-500 hover:text-blue-700 focus:outline-none"
//               onClick={handleLoginClick}
//             >
//               Login here
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterPage;
import React, { useState } from 'react';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    console.log('Registering with:', { name, email, password });
    alert('Registration Successful (Simulated)');
    window.location.href = '/login';
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[420px]">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
        Let’s Get You Started! 🚀
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 rounded shadow-md transition duration-300 cursor-pointer"
          >
            Register
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              className="font-semibold text-indigo-500 hover:underline cursor-pointer"
              onClick={handleLoginClick}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
