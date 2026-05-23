import pandas as pd

from evidently.report import Report

from evidently.metric_preset import (
    DataDriftPreset
)


# REFERENCE DATA

reference_data = pd.read_csv(
    "../data/creditcard.csv"
).drop("Class", axis=1).head(1000)


# CURRENT DATA

current_data = pd.read_csv(
    "../data/creditcard.csv"
).drop("Class", axis=1).tail(1000)


# CREATE REPORT

report = Report(
    metrics=[
        DataDriftPreset()
    ]
)


# RUN REPORT

report.run(
    reference_data=reference_data,
    current_data=current_data
)


# SAVE REPORT

report.save_html(
    "drift_report.html"
)

print("Drift Report Generated")