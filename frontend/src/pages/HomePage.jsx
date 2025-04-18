import React, { useEffect, useState, useRef } from 'react';

function HomePage() {
  const fullText = "Welcome to Resume Analyser";
  const [displayedText, setDisplayedText] = useState('');
  const [showSubText, setShowSubText] = useState(false);
  const indexRef = useRef(0);

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
          <p className="text-lg md:text-2xl text-gray-700">
            🚀 Login to upload your resume and see the magic of AI analysis
          </p>
          <a
            href="/login"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </a>
        </div>
      )}
    </div>
  );
}

export default HomePage;
