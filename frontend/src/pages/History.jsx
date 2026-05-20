import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function History() {

  const [history, setHistory] =
    useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

    const email = localStorage.getItem("email");

const response = await axios.get(
  `https://fraud-mlops-system.onrender.com/history/${localStorage.getItem("email")}`
);
      setHistory(response.data);

    } catch (error) {

      console.log(error);

    }

  };

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
            Prediction History
          </h1>

          <p style={styles.subHeading}>
            Monitor all previous fraud predictions and AI risk analysis.
          </p>

        </div>

        {/* STATS */}

        <div style={styles.statsGrid}>

          <div style={styles.statCard}>

            <h3>
              Total Predictions
            </h3>

            <h1 style={styles.number}>
              {history.length}
            </h1>

          </div>

          <div style={styles.statCard}>

            <h3>
              Fraud Cases
            </h3>

            <h1
              style={{
                ...styles.number,
                color: "#ff1744"
              }}
            >

              {
                history.filter(
                  item =>
                    item.fraud_prediction === 1
                ).length
              }

            </h1>

          </div>

          <div style={styles.statCard}>

            <h3>
              Safe Transactions
            </h3>

            <h1
              style={{
                ...styles.number,
                color: "#00e676"
              }}
            >

              {
                history.filter(
                  item =>
                    item.fraud_prediction === 0
                ).length
              }

            </h1>

          </div>

        </div>

        {/* TABLE */}

        <div style={styles.tableCard}>

          <div style={styles.tableHeader}>

            <h2>
              Transaction Logs
            </h2>

            <span style={styles.live}>
              ● LIVE DATA
            </span>

          </div>

          <div style={styles.tableWrapper}>

            <table style={styles.table}>

              <thead>

                <tr>

                  <th style={styles.th}>
                    Transaction ID
                  </th>

                  <th style={styles.th}>
                    Prediction
                  </th>

                  <th style={styles.th}>
                    Fraud Probability
                  </th>

                  <th style={styles.th}>
                    Risk Level
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  history.map(
                    (item, index) => (

                      <tr
                        key={index}
                        style={styles.row}
                      >

                        <td style={styles.td}>
                          TXN-
                          {1000 + index}
                        </td>

                        <td
                          style={{
                            ...styles.td,

                            color:
                              item.fraud_prediction === 1
                                ? "#ff1744"
                                : "#00e676",

                            fontWeight: "bold"
                          }}
                        >

                          {
                            item.fraud_prediction === 1
                              ? "Fraud"
                              : "Safe"
                          }

                        </td>

                        <td style={styles.td}>

                          {
                            item.fraud_probability
                          }

                        </td>

                        <td style={styles.td}>

                          <span
                            style={{
                              background:
                                item.fraud_prediction === 1
                                  ? "#ff1744"
                                  : "#00c853",

                              color: "white",

                              padding:
                                "8px 14px",

                              borderRadius:
                                "30px",

                              fontSize: "13px"
                            }}
                          >

                            {
                              item.fraud_prediction === 1
                                ? "HIGH"
                                : "LOW"
                            }

                          </span>

                        </td>

                      </tr>

                    )
                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

const styles = {

  headerBox: {
    marginBottom: "25px"
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

  statCard: {
    background:
      "linear-gradient(135deg,#111c44,#0f172a)",
    padding: "25px",
    borderRadius: "22px",
    border: "1px solid #1e3a8a",
    boxShadow:
      "0 0 20px rgba(124,77,255,0.15)"
  },

  number: {
    color: "#7c4dff",
    marginTop: "10px",
    fontSize: "40px"
  },

  tableCard: {
    background:
      "linear-gradient(135deg,#111c44,#0f172a)",
    borderRadius: "24px",
    padding: "25px",
    border: "1px solid #1e3a8a",
    overflow: "hidden"
  },

  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    color: "white"
  },

  live: {
    color: "#00e676",
    fontWeight: "bold"
  },

  tableWrapper: {
    overflowX: "auto"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "700px"
  },

  th: {
    textAlign: "left",
    padding: "18px",
    background: "#0b1120",
    color: "#94a3b8",
    fontSize: "14px"
  },

  row: {
    borderBottom:
      "1px solid #1e293b"
  },

  td: {
    padding: "18px",
    color: "white"
  }

};

export default History;