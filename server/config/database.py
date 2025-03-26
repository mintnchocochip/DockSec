from pymongo import MongoClient
from pymongo.server_api import ServerApi

# MongoDB Atlas URI
MONGO_URI = "mongodb+srv://test:test123@cluster0.kn4ommh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

DB_NAME = "docksec_db"

# Initialize MongoDB Client with Server API version
client = MongoClient(MONGO_URI, server_api=ServerApi('1'))
database = client[DB_NAME]
container_collection = database["containers"]

# Check connection to MongoDB
try:
    # The ping command returns nothing if successful
    client.admin.command('ping')
    print("✅ Successfully connected to MongoDB!")
except Exception as e:
    print(f"❌ Failed to connect to MongoDB: {e}")