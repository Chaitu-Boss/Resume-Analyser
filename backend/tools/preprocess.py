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
    url = "https://linkedin-data-api.p.rapidapi.com/get-profile-data-by-url"
    url2 = "https://linkedin-data-api.p.rapidapi.com/all-profile-data"
    querystring1 = {"url":linkedin_url}

    headers = {
	    "x-rapidapi-key": os.getenv("RAPID_API_KEY"),
	    "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring1)
    username=response.json()['username']
    querystring2 = {"username":username}
    final_response = requests.get(url2, headers=headers, params=querystring2)
    final_response=final_response.json()
    final_response=final_response['data']
    return final_response

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
    if (not json_data.get('linkedin_url') and 
    not json_data.get('github_username') and 
    not json_data.get('githubUsername') and 
    not json_data.get('linkedinUrl') and 
    not json_data.get('linked_in_url')):
        return json_data
    github_username=json_data['github_username'] or json_data['githubUsername']
    linkedin_url=json_data['linkedin_url'] or json_data['linkedinUrl'] or json_data['linked_in_url']
    
    github_data=fetch_github_profile(github_username)
    linkedin_data=fetch_linkedin_profile(linkedin_url)
    
    json_data['url']=filename
    json_data['linkedin_data']=linkedin_data
    json_data['github_data']=github_data
    json_data['text_summary']=text_summary
    return json_data
    