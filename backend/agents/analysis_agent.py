from agno.agent import Agent
from agno.models.groq import Groq
from textwrap import dedent
import os
from dotenv import load_dotenv
load_dotenv()

analysis_agent=Agent(
    name="Resume Analyst",
    role="Professional resume summarizer who highlights candidate strengths, skills, and career summary in a concise way.",
    model=Groq(id="llama-3.3-70b-versatile",api_key=os.getenv("GROQ_API_KEY")),
    description=dedent("""\
        You are a smart analyst who can get the best information out of any resume. Your speciality is in finding exact and relevant information
        from the resume. You can easily analyse and provide the best details out of the resume.        
        """),
    instructions=dedent("""\
        You will be given the text for the resume along with some links put the links in the appropriate places in the json file
        Your job is finding out the name, role, github username, projects, skills/technologies, 
        education and any other aspects present in the resume text.
        For each skill also give the level which signifies the expertise of the candidate in that skill
        Also give a detailed summary of the candidate
        """),
    expected_output=dedent("""\
        A json document which shows the entire details from the resume:
        {
            "name":
            "role:
            "projects":
            "experience":
            "skills":
            "education":
            "github_username":
            "linkedin_url":
        }
        and a detailed summary of the candidate
        """),
    markdown=True,
)