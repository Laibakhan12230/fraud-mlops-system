import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import {
  FaShieldAlt,
  FaUser,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

function Signup() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const handleSignup =
    async () => {

      try {

        if (
          !name ||
          !email ||
          !password ||
          !confirmPassword
        ) {

          alert(
            "Please fill all fields"
          );

          return;

        }

        if (
          password !==
          confirmPassword
        ) {

          alert(
            "Passwords do not match"
          );

          return;

        }

        const response =
          await axios.post(
            "http://127.0.0.1:8000/signup",
            {
              name,
              email,
              password
            }
          );

        alert(
          response.data.message
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        alert(
          "Signup Failed"
        );

      }

    };

  return (

    <div style={styles.container}>

      {/* LEFT */}

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
          Secure AI Fraud Detection Platform
        </h2>

        <p style={styles.desc}>
          Create your secure account to access AI-powered fraud monitoring, advanced analytics, cybersecurity reports, and intelligent transaction analysis.
        </p>

        <div style={styles.featureBox}>

          <div style={styles.feature}>
            🤖 Intelligent Fraud Detection
          </div>

          <div style={styles.feature}>
            📊 Advanced AI Analytics
          </div>

          <div style={styles.feature}>
            🔒 Cybersecurity Monitoring
          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div style={styles.right}>

        <div style={styles.card}>

          <h1 style={styles.title}>
            Create Account
          </h1>

          <p style={styles.subtitle}>
            Signup to continue
          </p>

          {/* NAME */}

          <div style={styles.inputBox}>

            <FaUser color="#94a3b8" />

            <input
              placeholder="Full Name"
              style={styles.input}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>

          {/* EMAIL */}

          <div style={styles.inputBox}>

            <FaEnvelope
              color="#94a3b8"
            />

            <input
              type="email"
              placeholder="Email Address"
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
              placeholder="Password"
              value={password}
              style={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* CONFIRM */}

          <div style={styles.inputBox}>
            <FaLock color="#94a3b8" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              style={styles.input}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>


          {/* BUTTON */}

          <button
            style={styles.button}
            onClick={handleSignup}
          >
            Signup
          </button>

          {/* FOOTER */}

          <p style={styles.footer}>

            Already have account?

            {" "}

            <Link
              to="/"
              style={styles.link}
            >

              Login

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
    width: "520px",
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

    border:
      "1px solid #1e3a8a",

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
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: "16px",
    caretColor: "white",
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

export default Signup;