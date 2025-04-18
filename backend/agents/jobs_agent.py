from agno.agent import Agent
from agno.models.groq import Groq
from textwrap import dedent
from tools.fetchJobs import get_jobs
import os
from dotenv import load_dotenv

load_dotenv()

jobs_agent = Agent(
    name="Job Listing Summarizer",
    role="Smart job search assistant who summarizes job listings for easy reading.",
    description = dedent("""\
    You are a helpful job listing summarization assistant. Your job is to process a JSON array of job listings provided by the user and summarize the key information for each job.
    """),


    instructions = dedent("""\
    You will receive a JSON array containing one or more job listing objects. Each object in the array will represent a job and will contain information such as: "Job Title", "Company Name", "Location", "Job Type", "Brief Job Description", and "Application/Listing URL".

    Your task is to:
    1. Iterate through each job listing in the provided JSON array.
    2. For each job, extract the key information: "Job Title", "Company Name", "Location", "Job Type", a concise summary of the "Brief Job Description", and the "Application/Listing URL".
    3. Format the summarized information for each job clearly as a numbered list.
    4. Return the summarized information for all jobs in plain text.
    """),

   expected_output = dedent("""\
    For each job in the provided JSON array, you will generate a numbered summary containing the following information:

    1. Job Title: [Job Title]
    2. Company Name: [Company Name]
    3. Location: [Location]
    4. Job Type: [Job Type]
    5. Job Description Summary: [A brief summary of the job description]
    6. Application/Listing URL: [Application/Listing URL]

    The summaries for all jobs will be concatenated in a single plain text output, with each job's summary numbered sequentially.
    """),
    show_tool_calls=True,
    markdown=True,
    model=Groq(id="llama-3.3-70b-versatile",api_key=os.getenv("GROQ_API_KEY"))
)
