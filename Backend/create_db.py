from app import app, db

# Import models here to ensure SQLAlchemy can see them without causing circular import issues
from models import User, Society, Admin

def create_database():
    with app.app_context():
        db.create_all()
        print("Database created successfully!")

if __name__ == '__main__':
    create_database()
