import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts";

const COLORS = [
  "#7c4dff",
  "#ff1744"
];

function Reports() {

  const [report, setReport] =
    useState(null);

  useEffect(() => {

    fetchReport();

  }, []);

  const fetchReport = async () => {

    try {

      const response =
        await axios.get(
          "https://fraud-mlops-system.onrender.com"
        );

      setReport(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const pieData = report
    ? [
        {
          name: "Safe",
          value: report.safe_cases
        },
        {
          name: "Fraud",
          value: report.fraud_cases
        }
      ]
    : [];

  const barData = report
    ? [
        {
          name: "Transactions",
          value:
            report.total_transactions
        },
        {
          name: "Fraud",
          value: report.fraud_cases
        },
        {
          name: "Safe",
          value: report.safe_cases
        }
      ]
    : [];

  return (

    <div
      style={{
        display: "flex",
        background: "#070f2b",
        minHeight: "100vh",
        overflow: "hidden",
        width: "100%"
      }}
    >

      <Sidebar />

      <div
        style={{
         flex: 1,
  
    padding: "25px",

    marginLeft: "70px",
          overflowY: "auto",
          overflowX: "hidden"
        }}
      >

        <Navbar />

        {/* HEADER */}

        <div style={styles.headerBox}>

          <h1 style={styles.heading}>
            Fraud Reports
          </h1>

          <p style={styles.subHeading}>
            AI-powered transaction reporting and fraud analytics dashboard.
          </p>

        </div>
        <button

  onClick={() =>

    window.open(
      "http://127.0.0.1:8000/download-report"
    )

  }

  style={{

    padding: "14px 22px",

    border: "none",

    borderRadius: "12px",

    background:
      "linear-gradient(to right,#7c3aed,#3b82f6)",

    color: "white",

    fontWeight: "bold",

    marginBottom: "25px",

    cursor: "pointer"

  }}

>

  Download PDF Report

</button>

        {/* STATS */}

        {
          report && (

            <div style={styles.statsGrid}>

              <Card
                title="Total Transactions"
                value={
                  report.total_transactions
                }
                color="#7c4dff"
              />

              <Card
                title="Fraud Cases"
                value={
                  report.fraud_cases
                }
                color="#ff1744"
              />

              <Card
                title="Safe Cases"
                value={
                  report.safe_cases
                }
                color="#00e676"
              />

              <Card
                title="Fraud Rate"
                value={`${report.fraud_rate}%`}
                color="#00c8ff"
              />

            </div>

          )
        }

        {/* CHARTS */}

        {
          report && (

            <div style={styles.chartGrid}>

              {/* PIE CHART */}

              <div style={styles.chartCard}>

                <h2 style={styles.chartTitle}>
                  Fraud Distribution
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={320}
                >

                  <PieChart>

                    <Pie
                      data={pieData}
                      dataKey="value"
                      outerRadius={110}
                    >

                      {
                        pieData.map(
                          (entry, index) => (

                            <Cell
                              key={index}
                              fill={
                                COLORS[index]
                              }
                            />

                          )
                        )
                      }

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

              {/* BAR CHART */}

              <div style={styles.chartCard}>

                <h2 style={styles.chartTitle}>
                  Transaction Analysis
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={320}
                >

                  <BarChart data={barData}>

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      fill="#7c4dff"
                      radius={[10,10,0,0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          )
        }

        {/* REPORT SUMMARY */}

        {
          report && (

            <div style={styles.summaryCard}>

              <h2 style={styles.summaryTitle}>
                AI Fraud Analysis Summary
              </h2>

              <p style={styles.summaryText}>

                The FraudShield AI engine analyzed
                {" "}
                <span style={styles.highlight}>
                  {
                    report.total_transactions
                  }
                </span>
                {" "}
                total transactions.

                {" "}

                <span style={styles.highlightRed}>
                  {
                    report.fraud_cases
                  }
                </span>
                {" "}
                suspicious fraud activities were detected and blocked successfully.

                The AI model achieved an estimated fraud detection rate of
                {" "}
                <span style={styles.highlightBlue}>
                  {report.fraud_rate}%
                </span>
                .

              </p>

            </div>

          )
        }

      </div>

    </div>

  );

}

function Card({
  title,
  value,
  color
}) {

  return (

    <div
      style={{
        background:
          "linear-gradient(135deg,#111c44,#0f172a)",

        padding: "25px",

        borderRadius: "22px",

        border:
          `1px solid ${color}`,

        boxShadow:
          `0 0 20px ${color}30`
      }}
    >

      <h3
        style={{
          color: "#94a3b8"
        }}
      >

        {title}

      </h3>

      <h1
        style={{
          color,
          fontSize: "40px",
          marginTop: "12px"
        }}
      >

        {value}

      </h1>

    </div>

  );

}

const styles = {

  headerBox: {
    marginBottom: "30px"
  },

  heading: {
    color: "white",
    fontSize: "38px",
    marginBottom: "10px"
  },

  subHeading: {
    color: "#94a3b8"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",

    gap: "20px",

    marginBottom: "30px"
  },

  chartGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(450px,1fr))",

    gap: "20px",

    marginBottom: "30px"
  },

  chartCard: {
    background:
      "linear-gradient(135deg,#111c44,#0f172a)",

    padding: "25px",

    borderRadius: "24px",

    border:
      "1px solid #1e3a8a",

    overflow: "hidden",

    boxShadow:
      "0 0 20px rgba(124,77,255,0.15)"
  },

  chartTitle: {
    color: "white",
    marginBottom: "20px"
  },

  summaryCard: {
    background:
      "linear-gradient(135deg,#111c44,#0f172a)",

    padding: "30px",

    borderRadius: "24px",

    border:
      "1px solid #1e3a8a",

    boxShadow:
      "0 0 20px rgba(124,77,255,0.15)"
  },

  summaryTitle: {
    color: "white",
    marginBottom: "20px"
  },

  summaryText: {
    color: "#cbd5e1",
    lineHeight: "34px",
    fontSize: "17px"
  },

  highlight: {
    color: "#7c4dff",
    fontWeight: "bold"
  },

  highlightRed: {
    color: "#ff1744",
    fontWeight: "bold"
  },

  highlightBlue: {
    color: "#00c8ff",
    fontWeight: "bold"
  }

};

export default Reports;