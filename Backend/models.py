# models.py
from app import db
from uuid import uuid4

def get_uuid():
    return uuid4().hex

class Society(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    #name of the chairman or key contact persoon
    #mobile no, email, !=num_buildings, !=flats
    #
    num_buildings = db.Column(db.Integer, nullable=False)
    num_admins = db.Column(db.Integer, nullable=False)
    flats_per_building = db.Column(db.Integer, nullable=False)
    overall_flats = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    society_id = db.Column(db.Integer, db.ForeignKey('society.id'), nullable=False)
    society = db.relationship('Society', backref=db.backref('admins', lazy=True))

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    role = db.Column(db.String(50), nullable=False)
    societies = db.relationship('Society', backref='user', lazy=True)