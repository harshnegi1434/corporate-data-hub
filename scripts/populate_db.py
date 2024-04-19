from flask import Flask
from app.models import db, Company
import pandas as pd

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///company_data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

df = pd.read_csv("data/csv/company_data_processed.csv")

with app.app_context():
    db.create_all()

    for index, row in df.iterrows():
        company = Company(
            company_name=row['Company Name'],
            salary=row['Salary'],
            rating=row['Rating'],
            reported_salaries=row['Reported Salaries'],
            designation=row['Designation']
        )
        db.session.add(company)

    db.session.commit()
