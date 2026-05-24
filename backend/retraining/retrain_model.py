import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from xgboost import XGBClassifier

import joblib

import mlflow
import mlflow.sklearn


# LOAD DATA

data = pd.read_csv(
    "../data/creditcard.csv"
)

roc_auc = roc_auc_score(
    y_test,
    y_pred
)

mlflow.log_metric(
    "roc_auc",
    roc_auc
)

cm = confusion_matrix(
    y_test,
    y_pred
)

print(cm)
# FEATURES + TARGET

X = data.drop("Class", axis=1)

y = data["Class"]


# SPLIT

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# START MLFLOW

mlflow.set_experiment(
    "Auto Retraining"
)


with mlflow.start_run():

    # MODEL

    model = XGBClassifier(
        n_estimators=200,
        max_depth=6,
        learning_rate=0.1
    )

    # TRAIN

    model.fit(
        X_train,
        y_train
    )

    # PREDICT

    y_pred = model.predict(
        X_test
    )

    # ACCURACY

    accuracy = accuracy_score(
        y_test,
        y_pred
    )

    print(
        f"Accuracy: {accuracy}"
    )

    # LOG METRIC

    mlflow.log_metric(
        "accuracy",
        accuracy
    )

    # SAVE MODEL

    joblib.dump(
    model,
    "saved_models/fraud_model.pkl"
)

    # LOG MODEL

    mlflow.sklearn.log_model(
        model,
        "fraud_model"
    )

    print(
        "Retraining Completed"
    )