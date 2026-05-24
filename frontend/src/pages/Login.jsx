import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import {
  FaShieldAlt,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");
const handleLogin = async () => {

  try {

    const response = await axios.post(

      "https://fraud-mlops-system.onrender.com/login",

      {

        email,

        password

      }

    );

    if (response.data.access_token) {

      localStorage.setItem(

        "token",

        response.data.access_token

      );

      localStorage.setItem(

        "email",

        response.data.email

      );

      navigate("/dashboard");

    }

    else {

      alert("Invalid Credentials");

    }

  }

  catch (error) {

  console.log(error);

  if (error.response) {

    alert(
      error.response.data.detail ||
      "Login Failed"
    );

  }

  else {

    alert("Server Error");

  }

}

};
  return (

    <div style={styles.container}>

      {/* LEFT SIDE */}

      <div style={styles.left}>

        <div style={styles.logoBox}>

          <FaShieldAlt
            size={45}
            color="#7c4dff"
          />

          <h1 style={styles.logo}>
            FraudShield AI
          </h1>

        </div>

        <h2 style={styles.heading}>
          AI-Powered Fraud Detection Platform
        </h2>

        <p style={styles.desc}>
          Advanced cybersecurity analytics platform with real-time fraud monitoring, AI prediction engine, transaction risk analysis, and intelligent threat detection.
        </p>

        <div style={styles.featureBox}>

          <div style={styles.feature}>
            🚨 Real-Time Fraud Monitoring
          </div>

          <div style={styles.feature}>
            🤖 AI Risk Prediction Engine
          </div>

          <div style={styles.feature}>
            🔒 Secure Transaction Analytics
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div style={styles.right}>

        <div style={styles.card}>

          <h1 style={styles.title}>
            Welcome Back
          </h1>

          <p style={styles.subtitle}>
            Login to access your AI dashboard
          </p>

          {/* EMAIL */}

          <div style={styles.inputBox}>

            <FaEnvelope color="#94a3b8" />

            <input
              type="email"
              placeholder="Enter Email"
              style={styles.input}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          {/* PASSWORD */}

          <div style={styles.inputBox}>

            <FaLock color="#94a3b8" />

            <input
              type="password"
              placeholder="Enter Password"
              style={styles.input}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          {/* BUTTON */}

          <button
            style={styles.button}
            onClick={handleLogin}
          >
            Login
          </button>

          {/* FOOTER */}

          <p style={styles.footer}>

            Don't have an account?

            {" "}

            <Link
              to="/signup"
              style={styles.link}
            >

              Signup

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

const styles = {

  container: {
    display: "flex",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#070f2b,#0f172a)",
    overflow: "hidden"
  },

  left: {
    flex: 1,
    padding: "70px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "white"
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "25px"
  },

  logo: {
    fontSize: "42px"
  },

  heading: {
    fontSize: "42px",
    lineHeight: "60px",
    marginBottom: "25px"
  },

  desc: {
    color: "#94a3b8",
    lineHeight: "32px",
    fontSize: "18px",
    maxWidth: "650px"
  },

  featureBox: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },

  feature: {
    background:
      "linear-gradient(135deg,#111c44,#0f172a)",
    padding: "18px",
    borderRadius: "16px",
    border: "1px solid #1e3a8a",
    width: "fit-content"
  },

  right: {
    width: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  card: {
    width: "100%",
    background:
      "linear-gradient(135deg,#111c44,#0f172a)",
    padding: "40px",
    borderRadius: "28px",
    border: "1px solid #1e3a8a",
    boxShadow:
      "0 0 30px rgba(124,77,255,0.2)"
  },

  title: {
    color: "white",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: "35px"
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#0b1120",
    border: "1px solid #1e293b",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "22px"
  },

  input: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    width: "100%",
    fontSize: "15px"
  },

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#7c4dff,#4338ca)",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow:
      "0 0 20px rgba(124,77,255,0.35)"
  },

  footer: {
    marginTop: "25px",
    color: "#94a3b8",
    textAlign: "center"
  },

  link: {
    color: "#7c4dff",
    textDecoration: "none",
    fontWeight: "bold"
  }

};

export default Login;