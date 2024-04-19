from decouple import config

class Config:
    DEBUG = config('DEBUG', default=False, cast=bool)
    SQLALCHEMY_DATABASE_URI = config('DATABASE_URL', default='sqlite:///company_data.db')
    SECRET_KEY = config('SECRET_KEY')

