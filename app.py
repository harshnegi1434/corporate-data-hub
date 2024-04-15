# Standard library imports
import os
from collections import OrderedDict
from decimal import Decimal

# Third-party imports
from flask import (flash, redirect, request, Flask, jsonify, render_template, url_for)
from flask_login import LoginManager, login_user, logout_user, login_required
from sqlalchemy import text
from decouple import config

# Local application imports
from db_model import db, Company, User

app = Flask(__name__)

SECRET_KEY = config('SECRET_KEY')
app.config['SECRET_KEY'] = SECRET_KEY

# Configuring the SQLite database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///company_data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return db.session.query(User).get(int(user_id))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        if password != confirm_password:
            flash('Passwords do not match!')
            return redirect(url_for('signup'))

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash('Username already exists!')
            return redirect(url_for('signup'))

        User.create_user(username, password)
        flash('Registration successful! Please login.')
        return redirect(url_for('login'))

    return render_template('signup.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()
        if user and user.verify_password(password):
            login_user(user)
            return redirect(url_for('home'))
        flash('Invalid username or password')
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

# API Endpoint for querying by designation
@app.route('/records/designation/<designation>', methods=['GET'])
def get_companies_by_designation(designation):
    records = Company.query.filter_by(designation=designation).all()
    if records:
        company_list = []
        company_id = 1 
        for company in records:
            company_data = OrderedDict()
            company_data['ID'] = company_id
            company_data['Company Name'] = company.company_name
            company_data['Salary'] = company.salary
            company_data['Rating'] = company.rating
            company_data['Reported Salaries'] = company.reported_salaries
            company_data['Designation'] = company.designation
            
            company_list.append(company_data)
            company_id += 1  # Increment the company ID for the next record
        
        return jsonify({'companies': company_list})
    
    return jsonify({'error': 'No companies found with the given designation'}), 404

# API Endpoint for querying by company name
@app.route('/records/company/<company_name>', methods=['GET'])
def get_companies_by_name(company_name):
    companies = Company.query.filter_by(company_name=company_name).all()
    if companies:
        company_list = []
        company_id = 1  
        for company in companies:
            company_data = OrderedDict()
            company_data['ID'] = company_id
            company_data['Company Name'] = company.company_name
            company_data['Salary'] = company.salary
            company_data['Rating'] = company.rating
            company_data['Reported Salaries'] = company.reported_salaries
            company_data['Designation'] = company.designation
            
            company_list.append(company_data)
            company_id += 1 
        
        return jsonify({'companies': company_list})
    
    return jsonify({'error': 'No companies found with the given name'}), 404

# API endpoint to get the highest salary/rating for each designation
@app.route('/highest/<param>', methods=['GET'])
def get_highest(param):
    if param == 'rating':
        query = text('''
            SELECT designation, highest_stat, company_name
            FROM (
                SELECT designation, MAX(rating) AS highest_stat, company_name
                FROM Company
                GROUP BY designation
            ) AS max_ratings
            ORDER BY highest_stat DESC
        ''')
    elif param == 'salary':
        query = text('''
            SELECT designation, highest_stat, company_name
            FROM (
                SELECT designation, MAX(salary) AS highest_stat, company_name
                FROM Company
                GROUP BY designation
            ) AS max_salaries
            ORDER BY highest_stat DESC
        ''')
    elif param == 'reported_salaries':
        query = text('''
            SELECT designation, highest_stat, company_name
            FROM (
                SELECT designation, MAX(reported_salaries) AS highest_stat, company_name
                FROM Company
                GROUP BY designation
            ) AS max_reported_salaries
            ORDER BY highest_stat DESC
        ''')
    else:
        return jsonify({'error': 'Invalid parameter.'}), 400

    result = db.session.execute(query)
    
    highest_stats = {}
    for row in result:
        highest_stats[row[0]] = {'highest_value': row[1], 'company_name': row[2]}

    return jsonify(highest_stats)

# API endpoint to create a new record with company and designation
@app.route('/add-details', methods=['POST'])
def add_company():
    data = request.json
    
    company_name = data.get('company_name')
    salary = data.get('salary')
    rating = data.get('rating')
    reported_salaries = 1
    designation = data.get('designation')
    
    existing_company = Company.query.filter_by(company_name=company_name, designation=designation).first()
    if existing_company:
        return jsonify({'error': 'Company already exists or Company Designation already exists. Use the update option to modify company information.'}), 400
    else:
        new_company = Company(
        company_name=company_name,
        salary=salary,
        rating=rating,
        reported_salaries=reported_salaries,
        designation=designation
        )
    db.session.add(new_company)
    db.session.commit()
    
    return jsonify({'message': 'Company added successfully'}), 201

# API endpoint to update a exisiting record with company and designation details
@app.route('/update', methods=['PUT'])
def add_or_update_company():
    data = request.json
    
    company_name = data.get('company_name')
    salary = Decimal(data.get('salary'))  # Convert to Decimal
    rating = Decimal(data.get('rating'))  # Convert to Decimal
    designation = data.get('designation')
    
    existing_company = Company.query.filter_by(company_name=company_name, designation=designation).first()
    if existing_company:
        existing_company.reported_salaries += 1
        existing_company.rating = (existing_company.rating * existing_company.salary + rating) / (existing_company.salary + 1)
        existing_company.salary = (existing_company.salary * existing_company.reported_salaries + salary) / (existing_company.reported_salaries + 1)
        
        db.session.commit()
        
        return jsonify({'message': 'Company updated successfully'}), 200
    else:
        return jsonify({'error': 'Company does not exist. Use the add endpoint to add a new company.'}), 404

@app.route('/search')
def search():
    return render_template('search.html')

@app.route('/highest')
def highest():
    return render_template('highest.html')

@app.route('/statistics')
def statistics():
    return render_template('statistics.html')

@app.route('/add-update')
def add_update():
    return render_template('add.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)