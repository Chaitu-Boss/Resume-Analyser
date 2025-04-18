import React, { useEffect } from 'react';

function HomePage() {
  const [text, setText] = React.useState("Welcome to Resume Analyser")
  const [valueTrue, setValueTrue] = React.useState(false)
  let count = 0
  useEffect(() => {
    const interval = setInterval(() => {
      count++;
      if (count <= text.length) {
        setText(text.substring(0, count));
      } else {
        setValueTrue(true);
      }
    }, 150);
  }, []);
  return (
    <>
      <div className="grid place-content-center">
        <p className="text-blue-600 md:text-9xl py-24 px-24 2xl:text-6xl" id="type">{text}</p>
        {valueTrue && <p className=" text-blue-600 py-10 px-40 md:text-4xl 2xl:text-3xl ">Login To Upload Resume & Analyse</p>}
      </div>
    </>
  );
}

export default HomePage;