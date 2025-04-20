import React, { useEffect, useState, useRef,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext.jsx';

function HomePage() {
  const fullText = "Welcome to Resume Analyser";
  const [displayedText, setDisplayedText] = useState('');
  const { email, setEmail } = useContext(AuthContext);
  const [showSubText, setShowSubText] = useState(false);
  const indexRef = useRef(0);
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get('http://localhost:5000/home', { withCredentials: true });
        setEmail(response.data.email);
        console.log('Email:', response.data.email);
        localStorage.setItem('email', response.data.email);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmail();
  },[])

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = indexRef.current;
      if (currentIndex < fullText.length) {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        indexRef.current += 1;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowSubText(true), 500);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-blue-700 px-4">
        {displayedText}
        <span className="animate-pulse text-blue-400">|</span>
      </h1>

      {showSubText && (
        <div className="mt-10">
          {email ? (
            <>
              <p className="text-lg md:text-2xl text-gray-700">
                🎯 Welcome back! Go to the dashboard to get your analysis
              </p>
              <a
                href="/dashboard"
                className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300"
              >
                Go to Dashboard
              </a>
            </>
          ) : (
            <>
              <p className="text-lg md:text-2xl text-gray-700">
                🚀 Login to upload your resume and see the magic of AI analysis
              </p>
              <a
                href="/login"
                className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Get Started
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
