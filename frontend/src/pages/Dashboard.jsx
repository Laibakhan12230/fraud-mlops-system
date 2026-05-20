import { useEffect, useState } from "react";

import axios from "axios";

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,

  BarChart,
  Bar,

  XAxis,
  YAxis,
  CartesianGrid,

  LineChart,
  Line,

  AreaChart,
  Area,

  Legend,
  RadarChart,
PolarGrid,
PolarAngleAxis,
Radar,

RadialBarChart,
RadialBar

} from "recharts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
const lineData = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 800 },
  { name: "Mar", uv: 500 },
  { name: "Apr", uv: 900 },
  { name: "May", uv: 700 },
  { name: "Jun", uv: 1000 }
];

const pieData = [
  { name: "Desktop", value: 49 },
  { name: "Mobile", value: 36 },
  { name: "Tablet", value: 15 }
];

const COLORS = [
  "#ff9800",
  "#ff1744",
  "#7c4dff"
];

const barData = [
  { name: "1", uv: 10 },
  { name: "2", uv: 18 },
  { name: "3", uv: 12 },
  { name: "4", uv: 25 },
  { name: "5", uv: 20 },
  { name: "6", uv: 8 },
  { name: "7", uv: 15 },
  { name: "8", uv: 12 },
  { name: "9", uv: 6 },
  { name: "10", uv: 22 }
];

function Dashboard() {

  const [features, setFeatures] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const response =
        await axios.get(
          "https://fraud-mlops-system.onrender.com/analytics"
        );

      setAnalytics(response.data);

    } catch (error) {

      console.log(error);

    }

  };

 const analyzeTransaction = async () => {

  try {

    const values =
      features
        .split(",")
        .map(
          (item) =>
            Number(item.trim())
        );

    console.log(values);

    console.log(values.length);

    if (values.length !== 30) {

      alert(
        "Please enter exactly 30 features"
      );

      return;

    }

    if (
      values.some(
        (value) => isNaN(value)
      )
    ) {

      alert(
        "Invalid input values"
      );

      return;

    }

    const response =
      await axios.post(

        "https://fraud-mlops-system.onrender.com/predict",

        {
          features:
            values.map(Number)
        },

        {
          headers: {
            "Content-Type":
              "application/json"
          }
        }

      );

    setResult(response.data);
    console.log(response.data);

    alert(
      "Transaction analyzed successfully"
    );

    fetchAnalytics();

  } catch (error) {

    console.log(error);

    alert(
      "Prediction Failed"
    );

  }

};
  const COLORS = [
    "#ff1744",
    "#7c3aed"
  ];
  const trendData = [

  { day: "Mon", fraud: 2 },
  { day: "Tue", fraud: 5 },
  { day: "Wed", fraud: 3 },
  { day: "Thu", fraud: 7 },
  { day: "Fri", fraud: 4 },
  { day: "Sat", fraud: 8 },
  { day: "Sun", fraud: 6 }

];

const activityData = [

  { time: "1PM", transactions: 20 },
  { time: "2PM", transactions: 35 },
  { time: "3PM", transactions: 28 },
  { time: "4PM", transactions: 40 },
  { time: "5PM", transactions: 32 }

];
const riskData = [

  {
    subject: "Fraud",
    A: 120
  },

  {
    subject: "Security",
    A: 98
  },

  {
    subject: "Monitoring",
    A: 86
  },

  {
    subject: "Detection",
    A: 99
  },

  {
    subject: "AI",
    A: 100
  }

];

const severityData = [

  {
    name: "High Risk",
    value: 85,
    fill: "#ff1744"
  }

];

  return (

    <div style={styles.container}>

      <Sidebar />

      <div style={styles.main}>

        <Navbar />

        <h1 style={styles.heading}>
          Dashboard
        </h1>

        {/* INPUT CARD */}

        <div style={styles.card}>

          <h2>
            Real-Time Fraud Prediction
          </h2>

          <p>
            Enter 30 transaction features
          </p>

          <textarea
            rows="5"
            style={styles.textarea}
            placeholder="Enter comma-separated values"
            onChange={(e) =>
              setFeatures(e.target.value)
            }
          />

          <button
            style={styles.button}
            onClick={analyzeTransaction}
          >
            Analyze Transaction
          </button>

          {result && (

            <div style={styles.resultBox}>

              <h2>

                {
                  result.fraud_prediction === 1
                    ? "🚨 Fraud Transaction"
                    : "✅ Safe Transaction"
                }

              </h2>

            <h3>

  Fraud Probability:

  {" "}

  {

    result?.fraud_probability
      ?

      (
        result.fraud_probability * 100
      ).toFixed(2)

      :

      "0"

  }%

</h3>

            </div>

          )}

        </div>

        {/* ANALYTICS */}

        {analytics && (

          <>

            {/* TOP CARDS */}

            <div style={styles.grid}>

              <div style={styles.analyticsCard}>
                <h3>Total Transactions</h3>
                <h1>
                  {
                    analytics.total_transactions
                  }
                </h1>
              </div>

              <div style={styles.analyticsCard}>
                <h3>Fraud Transactions</h3>
                <h1 style={{ color: "#ff1744" }}>
                  {
                    analytics.fraud_transactions
                  }
                </h1>
              </div>

              <div style={styles.analyticsCard}>
                <h3>Safe Transactions</h3>
                <h1 style={{ color: "#00ff99" }}>
                  {
                    analytics.safe_transactions
                  }
                </h1>
              </div>

              <div style={styles.analyticsCard}>
                <h3>Fraud Rate</h3>
                <h1 style={{ color: "#00c3ff" }}>
                  {
                    analytics.fraud_rate
                  }%
                </h1>
              </div>

            </div>

            {/* CHARTS */}

            <div style={styles.chartGrid}>
              

              {/* PIE CHART */}

              <div style={styles.chartCard}>

                <h2>
                  Fraud Distribution
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={220}
                >

                  <PieChart
  style={{
    background: "transparent"
  }}
>

                    <Pie
                      data={
                        analytics.chart_data
                      }
                      dataKey="value"
                      outerRadius={100}
                      label
                    >

                      {
                        analytics.chart_data.map(
                          (
                            entry,
                            index
                          ) => (

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
              {/* FRAUD SEVERITY */}

  <div style={styles.smallChartCard}>

    <h2 style={styles.chartTitle}>
      Fraud Severity
    </h2>

    <ResponsiveContainer
  width="100%"
  height={250}
>

<RadialBarChart
  innerRadius="70%"
  outerRadius="100%"
  data={severityData}
  startAngle={180}
  endAngle={0}
>

  <RadialBar
    minAngle={15}
    background
    clockWise
    dataKey="value"
  />

  <Tooltip />

</RadialBarChart>

</ResponsiveContainer>
</div>

              {/* BAR CHART */}

              <div style={styles.chartCard}>

                <h2>
                  Transaction Analysis
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={220}
                >

                  <BarChart
                    data={[
                      {
                        name:
                          "Transactions",

                        value:
                          analytics.total_transactions
                      },

                      {
                        name:
                          "Fraud",

                        value:
                          analytics.fraud_transactions
                      },

                      {
                        name:
                          "Safe",

                        value:
                          analytics.safe_transactions
                      }
                    ]}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      fill="#7c3aed"
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>
            
            <div style={styles.chartGrid}>

  {/* LINE CHART */}

  <div style={styles.chartCard}>

    <h2>
      Fraud Trend Analysis
    </h2>

    <ResponsiveContainer
      width="100%"
      height={200}
    >

      <LineChart data={trendData}>

        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Line
          type="monotone"
          dataKey="fraud"
          stroke="#ff1744"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

  {/* AREA CHART */}

  <div style={styles.chartCard}>

    <h2>
      Live Transaction Activity
    </h2>

    <ResponsiveContainer
      width="100%"
      height={220}
    >

      <AreaChart
        data={activityData}
      >

        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis dataKey="time" />

        <YAxis />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="transactions"
          stroke="#7c3aed"
          fill="#7c3aed"
        />

      </AreaChart>

    </ResponsiveContainer>

  </div>
  {/* AI RISK ANALYSIS */}

  <div style={styles.smallChartCard}>

    <h2 style={styles.chartTitle}>
      AI Risk Analysis
    </h2>

    <ResponsiveContainer
  width="100%"
  height={250}
>

<RadarChart
  outerRadius={90}
  data={riskData}
>

  <PolarGrid stroke="#475569" />

  <PolarAngleAxis
    dataKey="subject"
    stroke="white"
  />

  <Radar
    name="Risk"
    dataKey="A"
    stroke="#ff1744"
    fill="#ff1744"
    fillOpacity={0.6}
  />

  <Tooltip />

</RadarChart>

</ResponsiveContainer>

  </div>


  

</div>


<div style={styles.aiCard}>

  <h2>
    AI Fraud Monitoring Status
  </h2>

  <p>
    ✅ Model Status:
    Active
  </p>

  <p>
    🚨 Fraud Detection:
    Running
  </p>

  <p>
    📊 Analytics Engine:
    Online
  </p>

  <p>
    🔒 Security Monitoring:
    Enabled
  </p>
  

</div>


          </>
          

        )}

      </div>

    </div>

  );

}

const styles = {

  container: {
    display: "flex",
    background: "#020817",
    minHeight: "100vh"
  },

  main: {
    flex: 1,
    padding: "25px",
    marginLeft: "70px"
  },

  heading: {
    color: "white",
    fontSize: "55px",
    marginBottom: "25px"
  },

  card: {
    background: "#101935",
    border: "1px solid #1e3a8a",
    borderRadius: "25px",
    padding: "35px",
    color: "white",
    marginBottom: "35px"
  },

  textarea: {
    width: "100%",
    marginTop: "20px",
    background: "#020817",
    border: "1px solid #1e3a8a",
    borderRadius: "18px",
    padding: "20px",
    color: "white",
    fontSize: "16px",
    resize: "none"
  },

  button: {
    marginTop: "20px",
    padding: "15px 25px",
    border: "none",
    borderRadius: "16px",
    background:
      "linear-gradient(to right,#7c3aed,#3b82f6)",
    color: "white",
    cursor: "pointer",
    fontSize: "18px"
  },

  resultBox: {
    marginTop: "30px",
    background: "#020817",
    borderRadius: "20px",
    padding: "25px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4,1fr)",
    gap: "20px",
    marginBottom: "30px"
  },

  analyticsCard: {
    background: "transparent",
    border:
      "transparent",
    borderRadius: "22px",
    padding: "25px",
    
    color: "white"
  },

  chartGrid: {

  display: "grid",

  gridTemplateColumns:
    "repeat(3,1fr)",

  gap: "20px",

  marginTop: "20px"

},

  chartCard: {

  background: "transparent",

  border:
    "transparent",

  borderRadius: "20px",

  padding: "18px",

  color: "white",

  minHeight: "320px"

},
  aiCard: {

  background: "transparent",

  border:
    "transparent",

  borderRadius: "22px",

  padding: "30px",

  color: "white",

  marginTop: "30px",

  lineHeight: "40px"

},
smallChartCard: {

  flex: 1,

  background: "transparent",

  border: "transparent",

  borderRadius: "22px",

  padding: "20px",

  height: "350px",
color: "white",

  overflow: "hidden"


},
bottomCharts: {

  display: "flex",

  gap: "20px",

  marginTop: "20px",

  alignItems: "stretch"

}

};
export default Dashboard;