from pymongo import MongoClient
import os

client = MongoClient(
    os.getenv("mongodb+srv://Laiba_khan:Laibanaaz1234@cluster0.839rxof.mongodb.net/?appName=Cluster0")
)

db = client["fraud_detection"]

prediction_collection = db["predictions"]

users_collection = db["users"]

history_collection = db["history"]