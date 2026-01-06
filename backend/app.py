from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Debug: print MongoDB URI
print("🔍 MONGO_URI =", os.getenv("MONGO_URI"))

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient(os.getenv("MONGO_URI"))

try:
    client.admin.command("ping")
    print("✅ MongoDB connection successful")
except Exception as e:
    print("❌ MongoDB connection failed:", e)

db = client.civicbridge
collection = db.grievances

@app.route("/", methods=["GET"])
def home():
    return "Flask backend is running"

@app.route("/grievances", methods=["POST"])
def add_grievance():
    try:
        data = request.json
        print("📩 Received grievance:", data)

        result = collection.insert_one(data)
        print("✅ Inserted ID:", result.inserted_id)

        return jsonify({
            "message": "Grievance saved",
            "id": str(result.inserted_id)
        }), 201

    except Exception as e:
        print("❌ Error inserting grievance:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/grievances", methods=["GET"])
def get_grievances():
    grievances = list(collection.find({}, {"_id": 0}))
    return jsonify(grievances)

if __name__ == "__main__":
    app.run(debug=True)
