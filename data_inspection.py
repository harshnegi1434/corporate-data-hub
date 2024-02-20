from flask import Flask
from db_model import db, Company

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///company_data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    num_records = Company.query.count()
    print(f"Number of records in the table: {num_records}")
