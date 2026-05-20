import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Alerts() {

  const [alerts, setAlerts] =
    useState([]);

  useEffect(() => {

    fetchAlerts();

  }, []);

  const fetchAlerts = async () => {

    try {

      const response =
        await axios.get(
          "https://fraud-mlops-system.onrender.com"
        );

      setAlerts(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={styles.container}>

      <Sidebar />

      <div style={styles.main}>

        <Navbar />

        <h1 style={styles.heading}>
          Live Fraud Alerts
        </h1>

        <div style={styles.grid}>

          {alerts.length === 0 ? (

            <div style={styles.empty}>
              No Fraud Alerts Found
            </div>

          ) : (

            alerts.map((item, index) => (

              <div
                key={index}
                style={styles.card}
              >

                <div style={styles.icon}>
                  🚨
                </div>

                <h2>
                  Fraud Transaction
                </h2>

                <p>
                  Probability:
                  {" "}
                  {
                    item.fraud_probability
                  }
                </p>

                <p style={styles.red}>
                  High Risk Detected
                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

}

const styles = {

  container: {
    display: "flex",
    background: "#070f2b",
    minHeight: "100vh",
    color: "white"
  },

  main: {
    flex: 1,
  
    padding: "25px",

    marginLeft: "70px"
  },

  heading: {
    fontSize: "42px",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: "20px"
  },

  card: {
    background:
      "linear-gradient(135deg,#111c44,#0f172a)",

    padding: "25px",

    borderRadius: "20px",

    border: "1px solid #1e3a8a"
  },

  icon: {
    fontSize: "50px",
    marginBottom: "15px"
  },

  red: {
    color: "#ff4d4d",
    marginTop: "15px"
  },

  empty: {
    background: "#111c44",
    padding: "30px",
    borderRadius: "20px"
  }

};

export default Alerts;