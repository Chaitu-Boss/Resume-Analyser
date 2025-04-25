from flask import Flask, request,jsonify,session,make_response
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from tools.preprocess import preprocess
from tools.fetchJobs import get_jobs
import json
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
app.secret_key = os.getenv('FLASK_SECRET_KEY')

try:
    dbx = dropbox.Dropbox(
    app_key=os.getenv("DROPBOX_APP_KEY"),
    app_secret=os.getenv("DROPBOX_APP_SECRET"),
    oauth2_refresh_token=os.getenv("DROPBOX_REFRESH_TOKEN")
    )
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
    email = request.form.get('email') 
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    dropbox_path = f"/resumes/{secure_filename(email)}_resume.pdf"
    try:
        dbx.files_upload(file.read(), dropbox_path, mode=dropbox.files.WriteMode('overwrite'))
        shared_link_metadata = dbx.sharing_create_shared_link_with_settings(dropbox_path)
        shared_url = shared_link_metadata.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com')
        json_data = preprocess(shared_url)
        recommendations=resume_recommendation_agent.run(json.dumps(json_data))
        
        final_response = {
            'login_email': email,
            'resume_data': json_data,
            'recommendations': recommendations.content
        }
        existing = collection.find_one({"login_email": email})
        if existing:
            collection.update_one({"login_email": email}, {"$set": final_response})
            final_response['_id'] = str(existing['_id'])
        else:
            inserted_result = collection.insert_one(final_response)
            final_response['_id'] = str(inserted_result.inserted_id)
        return jsonify(final_response), 200
    except dropbox.exceptions.ApiError as e: 
        print(str(e))
        return jsonify({"error": str(e)}), 400


@app.route('/get-data-from-email', methods=['POST'])
def get_data_from_email():
    email = request.get_json().get("email")
    user = users_collection.find_one({ "email": email })
    data = collection.find_one({ "login_email": email })
    if not user:
        return jsonify({ "error": "User not found" }), 404
    final_response = {
        "username": user.get("username", "")
    }
    if data and "resume_data" in data:
        final_response["data"] = data["resume_data"]
    if data and "recommendations" in data:
        final_response["recommendations"] = data["recommendations"]
    return jsonify(final_response), 200

@app.route('/jobs', methods=['POST'])
def search():
    query = request.get_json()
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400
    jobs=get_jobs(query['query'])
    return jsonify({"jobs":jobs}), 200
    
@app.route('/jd-match',methods=['POST'])
def jd_match():
    jd = request.get_json().get('jobs_description')
    email=request.get_json().get("email")
    data = collection.find_one({ "login_email": email })
    data = data.get("resume_data")
    if not data:
        return jsonify({"error": "Resume data not found"}), 404
    to_send={
        "resume":data,
        "jd":jd
    }
    if not jd:
        return jsonify({"error": "Data parameter is required"}), 400
    response=score_agent.run(json.dumps(to_send))
    return jsonify({"score":response.content}), 200

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
    session.pop('session', None)
    # return jsonify({'message': 'Logout successful'}), 200
    response = make_response(jsonify({'message': 'Logout successful'}), 200)
    response.set_cookie('session', '', expires=0)  # clear cookie
    return response

@app.route('/home')
def home():
    if 'email' in session:
        return jsonify({'email': session['email']}), 200
    return jsonify({'error': 'Unauthorized'}), 401

if __name__ == '__main__':
    app.run(debug=True)
