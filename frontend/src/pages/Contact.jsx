import React from 'react'

const Contact = () => {
    return (
        <div>
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-indigo-600">Contact Me</h1>
                <p className="text-gray-700 text-lg mb-4">
                    Have questions, feedback, or suggestions? We’d love to hear from you!
                </p>
                <div className="space-y-4">
                    <p className="text-gray-700 text-lg">
                        📧 <strong>Email:</strong> <a href="mailto:chaituraut13@gmail.com" className="text-blue-600 underline">chaituraut13@gmail.com</a>
                    </p>
                    <p className="text-gray-700 text-lg">
                        🐙 <strong>GitHub:</strong> <a href="https://github.com/Chaitu-Boss" target="_blank" className="text-blue-600 underline">github.com/Chaitu-Boss</a>
                    </p>
                    <p className="text-gray-700 text-lg">
                        📝 <strong>Feedback Form:</strong> <a href="https://forms.gle/your-feedback-form" target="_blank" className="text-blue-600 underline">Submit Feedback</a>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Contact
