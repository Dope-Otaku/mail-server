from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import check_password_hash
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import random
import string
from flask_mail import Mail, Message
import jwt

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Load environment variables
load_dotenv()

# configure mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

# Configure JWT
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('POSTGRES_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True  # just for testing only, remove it from production code!
db = SQLAlchemy(app)

# Import models
from models import User, Society, Admin

# Landing Page
@app.route('/')
def landing():
    return jsonify(message="Welcome to Our Society Management System. Please login or register to continue.")

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
    hashed_password = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')
    new_user = User(username=username, email=email, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()

    # Create and return access token
    access_token = create_access_token(identity=new_user.id)
    
    return jsonify(message="User registered successfully", access_token=access_token), 201

# login page
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    # Check if user exists
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password.encode('utf-8')):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200

    return jsonify(message="Invalid email or password"), 401

# forgot-password
@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data['email']

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify(message="Email not found"), 404

    # Generate a temporary password
    temp_password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))

    # Update user's password in the database
    hashed_password = bcrypt.generate_password_hash(temp_password.encode('utf-8')).decode('utf-8')
    user.password = hashed_password
    db.session.commit()

    # Send the temporary password to the user's email
    msg = Message("Forgot Password", sender=os.getenv('MAIL_USERNAME'), recipients=[email])
    msg.body = f"Your temporary password is: {temp_password}"
    mail.send(msg)

    return jsonify(message="Temporary password sent to your email"), 200

# Society Onboarding Form
@app.route('/society-onboarding', methods=['POST'])
@jwt_required()  # Require JWT token for this route
def society_onboarding():
    try:
        # Get the JWT token from the Authorization header
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify(message="Authorization header missing"), 401
        token = auth_header.split()[1] if len(auth_header.split()) > 1 else None

        # Decode the token to get the user's id (identity)
        user_id = get_jwt_identity()

        # Fetch the user based on the user_id
        user = User.query.get(user_id)

        if user:
            role = user.role
            # Save society data to the database
            data = request.json
            society = Society(
                society_name=data['societyName'],
                address=data['address'],
                num_buildings=data['numBuildings'],
                num_admins=data['numAdmins'],
                flats_per_building=data['flatsPerBuilding'],
                overall_flats=data['overallFlats'],
                user_id=user.id
            )
            db.session.add(society)
            db.session.commit()

            return jsonify(message="Society onboarded successfully", role=role), 201
        else:
            return jsonify(message="User not found"), 404

    except jwt.ExpiredSignatureError:
        return jsonify(message="Token has expired"), 401
    except jwt.InvalidTokenError:
        return jsonify(message="Invalid token"), 401
    except Exception as e:
        return jsonify(message=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)
