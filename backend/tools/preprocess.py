from langchain_community.document_loaders import PyPDFLoader
import fitz
from agents.analysis_agent import analysis_agent
from tools.parseResponse import parse_mixed_response
import requests
from werkzeug.utils import secure_filename
import os
from dotenv import load_dotenv

load_dotenv()

def fetch_github_profile(username):
    user_data = requests.get(f"https://api.github.com/users/{username}").json()
    repos = requests.get(f"https://api.github.com/users/{username}/repos").json()

    languages = list({repo['language'] for repo in repos if repo['language']})

    return user_data

def fetch_linkedin_profile(linkedin_url):
    api_endpoint = 'https://nubela.co/proxycurl/api/v2/linkedin'
    linkedin_profile_url = linkedin_url
    api_key = os.getenv("PROXYCURL_API_KEY")
    headers = {'Authorization': 'Bearer ' + api_key}
    response = requests.get(api_endpoint,
                        params={'url': linkedin_profile_url,'skills': 'include'},
                        headers=headers)
    return response.json()

def preprocess(filename):
    response = requests.get(filename, stream=True)
    response.raise_for_status()
    filename = secure_filename(filename.split('/')[-1])
    temp_filepath = f"temp_{filename}"
    with open(temp_filepath, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)
    
    doc = fitz.open(temp_filepath)
    links=[]    
    for page in doc:
        for link in page.get_links():
            links.append(link['uri'])
    text=PyPDFLoader(temp_filepath).load()[0].page_content
    for link in links:
        text=text+" "+link
    
    if doc:
        doc.close()
    os.remove(temp_filepath)
    
    response=analysis_agent.run(text)
    
    
    parsed_json, additional_text = parse_mixed_response(response=response.content)
    json_data=parsed_json
    text_summary=additional_text
    print(json_data)
    github_username=json_data['github_username'] or json_data['githubUsername']
    linkedin_url=json_data['linkedin_url'] or json_data['linkedinUrl']
    
    github_data=fetch_github_profile(github_username)
    linkedin_data=fetch_linkedin_profile(linkedin_url)
    
    
    json_data['url']=filename
    json_data['linkedin_data']=linkedin_data
    json_data['github_data']=github_data
    json_data['text_summary']=text_summary
    return json_data
    