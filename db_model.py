from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100))
    salary = db.Column(db.Numeric(precision=10, scale=2))  # Adjust precision and scale as needed
    rating = db.Column(db.Numeric(precision=5, scale=2))
    reported_salaries = db.Column(db.Integer)
    designation = db.Column(db.String(100))

    def __repr__(self):
        return f"<Company {self.id}>"
