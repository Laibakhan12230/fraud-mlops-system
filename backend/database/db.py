from pymongo import MongoClient
import os

MONGO_URL = os.getenv("MONGO_URL")

client = MongoClient(MONGO_URL)

db = client["fraud_detection"]

prediction_collection = db["predictions"]
users_collection = db["users"]
history_collection = db["history"]