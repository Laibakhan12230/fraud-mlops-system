import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  FaMoon,
  FaBell,
  FaUserShield,
  FaServer
} from "react-icons/fa";

function Settings() {

  const [darkMode, setDarkMode] =
    useState(true);

  const [notifications, setNotifications] =
    useState(true);

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
            System Settings
          </h1>

          <p style={styles.subHeading}>
            Configure AI monitoring preferences and platform settings.
          </p>

        </div>

        {/* SETTINGS GRID */}

        <div style={styles.grid}>

          {/* DARK MODE */}

          <div style={styles.card}>

            <div style={styles.cardHeader}>

              <FaMoon
                color="#7c4dff"
                size={22}
              />

              <h2 style={styles.title}>
                Dark Mode
              </h2>

            </div>

            <p style={styles.desc}>
              Enable futuristic cyber AI dark interface.
            </p>

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              style={{
                ...styles.button,

                background:
                  darkMode
                    ? "#00c853"
                    : "#7c4dff"
              }}
            >

              {
                darkMode
                  ? "Enabled"
                  : "Disabled"
              }

            </button>

          </div>

          {/* NOTIFICATIONS */}

          <div style={styles.card}>

            <div style={styles.cardHeader}>

              <FaBell
                color="#ff9800"
                size={22}
              />

              <h2 style={styles.title}>
                Notifications
              </h2>

            </div>

            <p style={styles.desc}>
              Receive fraud alerts and AI warnings.
            </p>

            <button
              onClick={() =>
                setNotifications(
                  !notifications
                )
              }
              style={{
                ...styles.button,

                background:
                  notifications
                    ? "#00c853"
                    : "#ff1744"
              }}
            >

              {
                notifications
                  ? "Notifications ON"
                  : "Notifications OFF"
              }

            </button>

          </div>

          {/* PROFILE */}

          <div style={styles.card}>

            <div style={styles.cardHeader}>

              <FaUserShield
                color="#00c8ff"
                size={22}
              />

              <h2 style={styles.title}>
                Admin Profile
              </h2>

            </div>

            <p style={styles.desc}>
              Manage admin credentials and profile settings.
            </p>

            <input
              placeholder="Admin Name"
              style={styles.input}
            />

            <input
              placeholder="Admin Email"
              style={styles.input}
            />

            <button style={styles.saveBtn}>
              Save Changes
            </button>

          </div>

          {/* SERVER */}

          <div style={styles.card}>

            <div style={styles.cardHeader}>

              <FaServer
                color="#ff1744"
                size={22}
              />

              <h2 style={styles.title}>
                AI Server Status
              </h2>

            </div>

            <p style={styles.desc}>
              Fraud detection infrastructure monitoring.
            </p>

            <div style={styles.serverBox}>

              <p>
                API Status:
                {" "}
                <span style={styles.online}>
                  ONLINE
                </span>
              </p>

              <p>
                Database:
                {" "}
                <span style={styles.online}>
                  CONNECTED
                </span>
              </p>

              <p>
                AI Engine:
                {" "}
                <span style={styles.online}>
                  ACTIVE
                </span>
              </p>

            </div>

          </div>

        </div>

      </div>

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

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(350px,1fr))",

    gap: "25px"
  },

  card: {
    background:
      "linear-gradient(135deg,#111c44,#0f172a)",

    padding: "30px",

    borderRadius: "24px",

    border:
      "1px solid #1e3a8a",

    boxShadow:
      "0 0 20px rgba(124,77,255,0.15)"
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "15px"
  },

  title: {
    color: "white"
  },

  desc: {
    color: "#94a3b8",
    marginBottom: "20px",
    lineHeight: "28px"
  },

  button: {
    padding: "14px 20px",
    border: "none",
    borderRadius: "14px",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold"
  },

  input: {
    width: "100%",
    padding: "15px",
    marginBottom: "18px",
    borderRadius: "14px",
    border: "1px solid #1e293b",
    background: "#0b1120",
    color: "white",
    outline: "none",
    fontSize: "15px"
  },

  saveBtn: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#7c4dff,#4338ca)",

    color: "white",

    fontSize: "16px",

    cursor: "pointer",

    marginTop: "5px"
  },

  serverBox: {
    background: "#0b1120",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #1e293b",
    lineHeight: "35px",
    color: "white"
  },

  online: {
    color: "#00e676",
    fontWeight: "bold"
  }

};

export default Settings;