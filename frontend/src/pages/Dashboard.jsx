import React, { useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [resumeFile, setResumeFile] = useState(null);
  const [skillsData, setSkillsData] = useState([]);
  const [resumeLink, setResumeLink] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobSearchResults, setJobSearchResults] = useState([
    "Frontend Developer @ Google",
    "Data Analyst Intern @ Microsoft",
    "ML Engineer @ OpenAI",
  ]);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!resumeFile) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", resumeFile);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSkillsData(res.data.skills || []);
      setResumeLink(res.data.url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleJDChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleMatchJD = () => {
    console.log("Matching JD:", jobDescription);
    alert("JD Matching functionality will be implemented here.");
  };

  const handleSearchJobs = (e) => {
    console.log("Searching jobs for:", e.target.value);
    setJobSearchResults([`New Job 1 for "${e.target.value}"`, `Another Job 2 for "${e.target.value}"`]);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="p-6 max-w-7xl mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          Resume Analytics Dashboard
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Upload Your Resume
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="w-full lg:w-2/3">
              <input
                type="file"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                onChange={handleFileChange}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
            >
              Analyze Resume
            </button>
          </div>
          {resumeLink && (
            <div className="mt-4">
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Uploaded Resume
              </a>
            </div>
          )}
        </div>
        {skillsData.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Skills Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData}>
                <XAxis
                  dataKey="name"
                  style={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  style={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) => value} 
                />
                <Tooltip
                  itemStyle={{ color: "#374151" }}
                  labelStyle={{ color: "#1e293b", fontWeight: "bold" }}
                />
                <Bar dataKey="level" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Job Description Matching
          </h2>
          <textarea
            placeholder="Paste job description here..."
            className="w-full border border-gray-300 p-3 rounded-md mb-4 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            rows={5}
            value={jobDescription}
            onChange={handleJDChange}
          />
          <button
            onClick={handleMatchJD}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Match Resume to JD
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Resume Improvement Recommendations
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-600">
            <li>
              <span className="font-semibold text-gray-700">Project Details:</span> Add more specific details and quantifiable achievements to your machine learning projects.
            </li>
            <li>
              <span className="font-semibold text-gray-700">Language Proficiency:</span> Specify your proficiency level (e.g., Beginner, Intermediate, Advanced) for each programming language.
            </li>
            <li>
              <span className="font-semibold text-gray-700">Formatting:</span> Ensure consistent font styles, sizes, and spacing throughout your resume for a professional look.
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Job Search
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for jobs (e.g., Frontend Developer, Data Scientist)"
              className="w-full border border-gray-300 p-3 rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSearchJobs(e)}
            />
            {/* Optional: Add a search button */}
            <button
              onClick={handleSearchJobs}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full mt-2 focus:outline-none focus:shadow-outline"
            >
              Search Jobs
            </button>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Recommended Jobs
          </h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            {jobSearchResults.map((job, index) => (
              <li key={index}>
                <span className="font-semibold text-indigo-600 hover:underline cursor-pointer">{job}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}