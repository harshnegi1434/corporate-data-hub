import secrets
import string
from decouple import config

def generate_secret_key(length=24):
    alphabet = string.ascii_letters + string.digits + string.punctuation
    secret_key = ''.join(secrets.choice(alphabet) for _ in range(length))
    return secret_key

# Generate a new secret key
secret_key = generate_secret_key()

# Save the secret key to an .env file
with open('.env', 'w') as f:
    f.write(f"SECRET_KEY={secret_key}\n")
