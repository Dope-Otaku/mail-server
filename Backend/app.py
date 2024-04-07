from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Load environment variables
load_dotenv()

# Configure JWT
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('POSTGRES_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
db = SQLAlchemy(app)

# Import models
from models import User, Society, Admin

# Landing Page
@app.route('/')
def landing():
    return "Welcome to Our Society Management System. Please login or register to continue."

# Register Page
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    email = data['email']
    password = data['password']
    role = data['role']

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify(message="User already exists"), 400

    # Create new user
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="User registered successfully"), 201

# Login Page
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    # Check if user exists
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200

    return jsonify(message="Invalid email or password"), 401

# Society Onboarding Form
@app.route('/society-onboarding', methods=['POST'])
def society_onboarding():
    data = request.json
    # Process form data and save to database
    return jsonify(message="Society onboarded successfully"), 201

if __name__ == '__main__':
    app.run(debug=True)