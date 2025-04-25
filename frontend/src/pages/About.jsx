import React from 'react'

const About = () => {
    return (
        <div>
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-indigo-600">About ResumeAnalyser</h1>
                <p className="text-gray-700 text-lg mb-4">
                    <strong>ResumeAnalyser</strong> is an AI-powered platform designed to help job seekers improve their resumes, match them with the right job roles, and receive actionable insights for career growth.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    Whether you're a fresher, experienced professional, or career switcher, ResumeAnalyser analyzes your resume, gives personalized recommendations, and even compares it against job descriptions using smart AI agents.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    Built with ❤️ using Python (Flask), React, LangChain, Groq, and Dropbox, it leverages the power of LLMs to bring intelligent resume analysis to everyone for free.
                </p>
                <p className="text-gray-700 text-lg">
                    Features include:
                    <ul className="list-disc ml-6 mt-2">
                        <li>AI-powered resume parsing & enhancement</li>
                        <li>Job compatibility scoring with justification</li>
                        <li>Career & skill growth suggestions</li>
                        <li>Cloud resume upload & storage via Dropbox</li>
                    </ul>
                </p>
            </div>

        </div>
    )
}

export default About
