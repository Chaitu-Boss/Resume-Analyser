import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle, Star, TrendingUp, Target } from 'lucide-react';

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [skillsData, setSkillsData] = useState([]);
  const [resumeLink, setResumeLink] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [jobSearchResults, setJobSearchResults] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const sections = [
    {
      title: 'Career Path Suggestions',
      icon: <TrendingUp className="text-blue-600 w-5 h-5" />,
      points: recommendations.careerPathSuggestions || []
    },
    {
      title: 'Skill Development',
      icon: <Star className="text-green-600 w-5 h-5" />,
      points: recommendations.skillDevelopment || []
    },
    {
      title: 'Resume Improvement Suggestions',
      icon: <Target className="text-yellow-600 w-5 h-5" />,
      points: recommendations.resumeImprovementSuggestions || []
    },
    {
      title: 'Job Search Guidance',
      icon: <CheckCircle className="text-purple-600 w-5 h-5" />,
      points: recommendations.jobSearchGuidanceOptional || []
    }]
  function toCamelCase(text) {
    return text
      .replace(/[:()]/g, '')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
  }

  function removeMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1');
  }

  function extractSections(text) {
    const sectionRegex = /### (.*?)\s*\n((?:\*.*?\n)+)/g;
    const result = {};
    let match;

    while ((match = sectionRegex.exec(text)) !== null) {
      const rawTitle = match[1].trim();
      const camelCaseTitle = toCamelCase(rawTitle);
      const items = match[2]
        .trim()
        .split('\n')
        .map(item => removeMarkdown(item.replace(/^\*\s*/, '').trim()));
      result[camelCaseTitle] = items;
    }

    return result;
  }



  const fetchUserData = async () => {
    const email = localStorage.getItem("email");
    if (!email) return;

    function flattenSkills(skillsObj) {
      const result = [];
      for (const category in skillsObj) {
        skillsObj[category].forEach(skill => {
          result.push({ ...skill, category });
        });
      }
      return result;
    }
    try {
      const res = await axios.post("http://localhost:5000/get-data-from-email", { email }, { withCredentials: true });
      setUsername(res.data.username || "");
      if (res.data.data) {
        setResumeLink(res.data.data.url);
        setSkillsData(flattenSkills(res.data.data.skills) || []);
        console.log("Skills Data:", skillsData);
        const parsedRecommendations = extractSections(res.data.recommendations);
        setRecommendations(parsedRecommendations);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);



  const handleFileChange = (e) => setResumeFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (!resumeFile) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", resumeFile);
    formData.append("email", localStorage.getItem("email"));

    setIsUploading(true);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSkillsData(res.data.skills || []);
      setResumeLink(res.data.url);
      fetchUserData();
      alert("Resume uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };


  const handleJDChange = (e) => setJobDescription(e.target.value);

  const handleMatchJD = async () => {
    setIsMatching(true);
    try {
      console.log("Matching JD:", jobDescription);
    } catch (err) {
      console.error(err);
    } finally {
      setIsMatching(false);
    }
  };


  const handleSearchJobs = async (e) => {
    const query = e.target.value || document.getElementById("jobSearchInput").value;
    if (query) {
      setIsSearching(true);
      try {
        console.log("Searching for jobs:", query);
        const res = await axios.post("http://localhost:5000/jobs", { query }, { withCredentials: true });
        setJobSearchResults(res.data.jobs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }
  };


  return (
    <div className="bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="bg-white p-6 rounded-2xl shadow-md ">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome {username}</h1>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md ">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload Your Resume</h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
              onChange={handleFileChange}
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition flex items-center gap-2"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeOpacity=".25" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 018-8" />
                  </svg>
                  Uploading...
                </>
              ) : (
                "Analyze Resume"
              )}
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
          <div className="bg-white p-6 rounded-2xl shadow-md ">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Skills Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  style={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis style={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip itemStyle={{ color: "#374151" }} labelStyle={{ color: "#1e293b", fontWeight: "bold" }} />
                <Bar dataKey="level" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {resumeLink && (
          <><div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Job Description Matching</h2>
            <textarea
              placeholder="Paste job description here..."
              className="w-full border border-gray-300 p-3 rounded-md text-gray-700 mb-4 focus:ring-indigo-500 focus:border-indigo-500"
              rows={5}
              value={jobDescription}
              onChange={handleJDChange} />
            <button
              onClick={handleMatchJD}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full flex items-center gap-2"
              disabled={isMatching}
            >
              {isMatching ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeOpacity=".25" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 018-8" />
                  </svg>
                  Matching...
                </>
              ) : (
                "Match Resume to JD"
              )}
            </button>

          </div><div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Resume Improvement Recommendations</h2>
              <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
                <h1 className="text-3xl font-bold text-center text-indigo-800 mb-4">🎯 Resume Analysis Recommendations</h1>

                {sections.map((section, index) => (
                  <div key={index} className="bg-white shadow-md rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {section.icon}
                      <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {section.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div><div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Job Search</h2>
              <div className="mb-4">
                <input
                  type="text"
                  id="jobSearchInput"
                  placeholder="Search for jobs (e.g., Frontend Developer)"
                  className="w-full border border-gray-300 p-3 rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                  onKeyDown={(e) => e.key === "Enter" && handleSearchJobs(e)} />
                <button
                  onClick={handleSearchJobs}
                  data-manual="true"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full mt-3 flex items-center gap-2"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeOpacity=".25" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 018-8" />
                      </svg>
                      Searching...
                    </>
                  ) : (
                    "Search Jobs"
                  )}
                </button>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Recommended Jobs</h3>

              <div className="p-6 space-y-6">
                {jobSearchResults.length === 0 && <p className="text-gray-500">No jobs found.</p>}
                {jobSearchResults.map((job, index) => (
                  <div key={index} className="p-6 bg-white rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold text-indigo-700">{job.title}</h2>
                    <p className="text-sm text-gray-600 mb-1"><strong>Company:</strong> {job.company}</p>
                    <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {job.location}</p>
                    <p className="text-gray-800 mb-3 whitespace-pre-line">{job.description}</p>

                    <div className="flex flex-wrap gap-3">
                      {job.apply_options.map((option, idx) => (
                        <a
                          key={idx}
                          href={option.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                        >
                          Apply via {option.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>


            </div></>

        )
        }
      </div>
    </div>
  );
}
