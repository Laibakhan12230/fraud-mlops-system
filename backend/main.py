from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import FileResponse
from typing import List
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

from typing import List
import numpy as np
import joblib

try:

    from database.db import (
        users_collection,
        prediction_collection,
        history_collection
    )

    from auth import create_access_token

except:

    from backend.database.db import (
        users_collection,
        prediction_collection,
        history_collection
    )

    from backend.auth import create_access_token
from security import (
    hash_password,
    verify_password
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# Request model
class UserSignup(BaseModel):
    name: str
    email: str
    password: str


# =========================
# FASTAPI APP
# =========================

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://fraud-mlops-system.onrender.com",
        "https://fraud-mlops-system.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# LOAD MODEL
# =========================
import os

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "saved_models",
    "fraud_model.pkl"
)

model = joblib.load(MODEL_PATH)

# =========================
# INPUT SCHEMA
# =========================


class Transaction(BaseModel):

    features: List[float]


# =========================
# HOME ROUTE
# =========================

@app.get("/")
def home():

    return {

        "message":
        "Fraud Detection API Running"

    }


# =========================
# PREDICTION ROUTE
# =========================

@app.post("/predict")
def predict(transaction: Transaction):

    try:

        # VALIDATION

        if len(transaction.features) != 30:

            return {

                "message":
                "Exactly 30 features required"

            }

        # CONVERT TO NUMPY

        input_data = np.array(
    transaction.features
).reshape(1, -1)

        # MODEL PREDICTION

        prediction = model.predict(
            input_data
        )[0]

        # FRAUD PROBABILITY

        probability = model.predict_proba(
            input_data
        )[0][1]

        # RESULT OBJECT

        result = {

            "features":
            transaction.features,

            "fraud_prediction":
            int(prediction),

            "fraud_probability":
            float(probability),

            "email":
            transaction.email

        }

        # STORE IN DATABASE

        prediction_collection.insert_one(
            result
        )

        # RETURN RESPONSE

        return {

            "fraud_prediction":
            int(prediction),

            "fraud_probability":
            float(probability)

        }

    except Exception as e:

        print(e)

        return {

            "message":
            str(e)

        }


# =========================
# HISTORY ROUTE
# =========================

@app.get("/history/{email}")
def get_history(email: str):

    history = list(

        prediction_collection.find(

            {
                "email": email
            },

            {
                "_id": 0
            }

        )

    )

    return history


# =========================
# ALERTS ROUTE
# =========================

@app.get("/alerts")
def get_alerts():

    alerts = list(

        prediction_collection.find(

            {
                "fraud_prediction": 1
            },

            {
                "_id": 0
            }

        )

    )

    return alerts


# =========================
# REPORT ROUTE
# =========================

@app.get("/report")
def generate_report():

    data = list(

        prediction_collection.find(

            {},
            {"_id": 0}

        )

    )

    total_transactions = len(data)

    fraud_cases = len(

        [

            x for x in data

            if x["fraud_prediction"] == 1

        ]

    )

    safe_cases = (
        total_transactions - fraud_cases
    )

    fraud_rate = (

        (fraud_cases / total_transactions)
        * 100

        if total_transactions > 0
        else 0

    )

    return {

        "total_transactions":
        total_transactions,

        "fraud_cases":
        fraud_cases,

        "safe_cases":
        safe_cases,

        "fraud_rate":
        round(fraud_rate, 2)

    }


# =========================
# SIGNUP ROUTE
# =========================

@app.post("/signup")
async def signup(user: UserSignup):

    # Empty password check
    if not user.password.strip():
        raise HTTPException(
            status_code=400,
            detail="Password cannot be empty"
        )

    # bcrypt max length validation
    if len(user.password) > 72:
        raise HTTPException(
            status_code=400,
            detail="Password too long (max 72 characters)"
        )

    try:

        # Hash password
        hashed_password = pwd_context.hash(
            user.password
        )

        # Example response
        return {
            "message": "Signup successful",
            "name": user.name,
            "email": user.email,
            "hashed_password": hashed_password
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =========================
# LOGIN ROUTE
# =========================
@app.post("/login")
def login(user: dict):

    try:

        existing_user = users_collection.find_one({

            "email":
            user["email"]

        })

        if not existing_user:

            return {

                "message":
                "Invalid credentials"

            }

        password_valid = verify_password(

            user["password"],

            existing_user["password"]

        )

        if not password_valid:

            return {

                "message":
                "Invalid credentials"

            }

        token = create_access_token(

            {

                "sub":
                user["email"]

            }

        )

        return {

            "access_token":
            token,

            "email":
            user["email"]

        }

    except Exception as e:

        print(e)

        return {

            "message":
            "Login failed"

        }


# =========================
# DOWNLOAD PDF REPORT
# =========================

@app.get("/download-report")
def download_report():

    file_name = "fraud_report.pdf"

    doc = SimpleDocTemplate(file_name)

    styles = getSampleStyleSheet()

    elements = []

    title = Paragraph(
        "Fraud Detection Report",
        styles['Title']
    )

    elements.append(title)

    elements.append(
        Spacer(1, 20)
    )

    data = list(

        prediction_collection.find(

            {},
            {"_id": 0}

        )

    )

    total = len(data)

    frauds = len(

        [

            x for x in data

            if x["fraud_prediction"] == 1

        ]

    )

    safe = total - frauds

    fraud_rate = (

        (frauds / total) * 100

        if total > 0

        else 0

    )

    report_text = f"""

    Total Transactions: {total}
    <br/><br/>

    Fraud Cases: {frauds}
    <br/><br/>

    Safe Transactions: {safe}
    <br/><br/>

    Fraud Rate: {round(fraud_rate, 2)}%

    """

    paragraph = Paragraph(

        report_text,

        styles['BodyText']

    )

    elements.append(paragraph)

    doc.build(elements)

    return FileResponse(

        file_name,

        media_type='application/pdf',

        filename=file_name

    )
@app.get("/analytics")
def analytics():

    data = list(
        prediction_collection.find(
            {},
            {"_id": 0}
        )
    )

    total = len(data)

    fraud = len(
        [
            x for x in data
            if x["fraud_prediction"] == 1
        ]
    )

    safe = total - fraud

    fraud_rate = (
        (fraud / total) * 100
        if total > 0
        else 0
    )

    return {

        "total_transactions": total,

        "fraud_transactions": fraud,

        "safe_transactions": safe,

        "fraud_rate": round(
            fraud_rate,
            2
        ),

        "chart_data": [
            {
                "name": "Fraud",
                "value": fraud
            },
            {
                "name": "Safe",
                "value": safe
            }
        ]
    }