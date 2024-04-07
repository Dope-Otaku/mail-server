# models.py
from app import db
from uuid import uuid4

def get_uuid():
    return uuid4().hex

class Society(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    num_buildings = db.Column(db.Integer, nullable=False)
    # Add more fields as needed

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    society_id = db.Column(db.Integer, db.ForeignKey('society.id'), nullable=False)
    society = db.relationship('Society', backref=db.backref('admins', lazy=True))
    # Add more fields as needed

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    role = db.Column(db.String(50), nullable=False)  # To store user role (society, admin, resident)
    # Add more models as needed