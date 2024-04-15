from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(100), nullable=False)

    @staticmethod
    def create_user(username, password):
        user = User(username=username)
        user.password = password
        db.session.add(user)
        db.session.commit()
        return user
    
    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute.')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100))
    salary = db.Column(db.Numeric(precision=10, scale=2))  # Adjust precision and scale as needed
    rating = db.Column(db.Numeric(precision=5, scale=2))
    reported_salaries = db.Column(db.Integer)
    designation = db.Column(db.String(100))

    def __repr__(self):
        return f"<Company {self.id}>"
