from flask import Flask, request,jsonify,session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from tools.preprocess import preprocess
from tools.fetchJobs import get_jobs
from agents.jobs_agent import jobs_agent
from agents.score_agent import score_agent
from agents.resume_recommendation_agent import resume_recommendation_agent
import os
from dotenv import load_dotenv
load_dotenv()
from pymongo import MongoClient
import dropbox
from werkzeug.utils import secure_filename

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

try:
    dbx = dropbox.Dropbox(os.getenv("DROPBOX_API_KEY"))
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client["test"]
    collection = db["resumes"]
    users_collection = db["users"]
    print("Connected to Dropbox and MongoDB")
except Exception as e:
    print(f"Error: {e}")

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "File not found"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    filename = secure_filename(file.filename)
    dropbox_path = f"/resumes/{filename}"
    try:
        dbx.files_upload(file.read(), dropbox_path)
        shared_link_metadata = dbx.sharing_create_shared_link_with_settings(dropbox_path)
        shared_url = shared_link_metadata.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com')
        json_data = preprocess(shared_url)
        inserted_result = collection.insert_one(json_data)
        inserted_id = inserted_result.inserted_id
        return jsonify({"_id": str(inserted_id), **json_data}), 200
    except dropbox.exceptions.ApiError as e: 
        return jsonify({"error": str(e)}), 400

@app.route('/jobs', methods=['GET'])
def search():
    query = request.get_json()
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400
    jobs=get_jobs(query)
    response = jobs_agent.run(jobs)
    return jsonify({"jobs":response.content}), 200
    
@app.route('/jd-match',methods=['POST'])
def jd_match():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Data parameter is required"}), 400
    response=score_agent.run(data)
    return jsonify({"score":response.content}), 200

@app.route('/recommendations', methods=['GET'])
def recommendations():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No Resume Data"}), 400
    response=resume_recommendation_agent.run(data)
    return jsonify({"recommendations":response.content}), 200

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'Email already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user_data = {'username': username, 'email': email, 'password': hashed_password}
    users_collection.insert_one(user_data)
    return jsonify({'message': 'Registration successful'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    user = users_collection.find_one({'email': email})

    if user and bcrypt.check_password_hash(user['password'], password):
        session['email'] = email
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('email', None)
    return jsonify({'message': 'Logout successful'}), 200

@app.route('/home')
def home():
    if 'email' in session:
        return jsonify({'email': session['email']}), 200
    return jsonify({'error': 'Unauthorized'}), 401

if __name__ == '__main__':
    app.run(debug=True)
