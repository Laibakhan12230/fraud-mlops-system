from pymongo import MongoClient

# MongoDB Connection
client = MongoClient(
    "mongodb://mongodb:27017"
)

# Database
db = client["fraud_detection"]

# Collections

prediction_collection = db["predictions"]

users_collection = db["users"]

history_collection = db["history"]