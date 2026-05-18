import pandas as pd
import mlflow
import mlflow.sklearn

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)

from xgboost import XGBClassifier
import joblib


# LOAD DATASET

data = pd.read_csv(
    "../data/creditcard.csv"
)


# FEATURES + TARGET

X = data.drop("Class", axis=1)
y = data["Class"]


# TRAIN TEST SPLIT

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# START MLFLOW

mlflow.set_experiment(
    "Fraud Detection"
)


with mlflow.start_run():
    mlflow.log_param(
        "model_type",
        "XGBoost"
    )

    mlflow.log_param(
        "test_size",
        0.2
    )

    mlflow.log_param(
        "random_state",
        42
    )

    # MODEL

    model = XGBClassifier()

    model.fit(X_train, y_train)

    # PREDICTIONS

    y_pred = model.predict(X_test)

    # METRICS

    accuracy = accuracy_score(
        y_test,
        y_pred
    )

    precision = precision_score(
        y_test,
        y_pred
    )

    recall = recall_score(
        y_test,
        y_pred
    )

    f1 = f1_score(
        y_test,
        y_pred
    )

    # LOG METRICS

    mlflow.log_metric(
        "accuracy",
        accuracy
    )

    mlflow.log_metric(
        "precision",
        precision
    )

    mlflow.log_metric(
        "recall",
        recall
    )

    mlflow.log_metric(
        "f1_score",
        f1
    )

    # SAVE MODEL

    joblib.dump(
        model,
        "../saved_models/fraud_model.pkl"
    )

    # LOG MODEL

    mlflow.sklearn.log_model(
        model,
        "fraud_model"
    )

    print("Model Trained Successfully")