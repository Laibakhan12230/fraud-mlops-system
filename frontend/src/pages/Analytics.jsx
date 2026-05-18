import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

const lineData = [
  { month: "Jan", fraud: 30 },
  { month: "Feb", fraud: 45 },
  { month: "Mar", fraud: 25 },
  { month: "Apr", fraud: 60 },
  { month: "May", fraud: 40 },
  { month: "Jun", fraud: 80 }
];

const pieData = [
  { name: "Safe", value: 70 },
  { name: "Fraud", value: 30 }
];

const COLORS = [
  "#7c4dff",
  "#ff1744"
];

const barData = [
  { name: "Banking", value: 85 },
  { name: "Ecommerce", value: 60 },
  { name: "Crypto", value: 95 },
  { name: "Retail", value: 40 }
];

function Analytics() {

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
          padding: "20px",
          overflowY: "auto",
          overflowX: "hidden"
        }}
      >

        <Navbar />

        <h1 style={styles.heading}>
          Advanced Analytics
        </h1>

        {/* TOP CARDS */}

        <div style={styles.grid}>

          <div style={styles.card}>
            <h3>Total Fraud Cases</h3>
            <h1 style={styles.number}>
              1,245
            </h1>
          </div>

          <div style={styles.card}>
            <h3>Detection Accuracy</h3>
            <h1 style={styles.number}>
              98.2%
            </h1>
          </div>

          <div style={styles.card}>
            <h3>Blocked Amount</h3>
            <h1 style={styles.number}>
              $245K
            </h1>
          </div>

        </div>

        {/* CHARTS */}

        <div style={styles.chartGrid}>

          {/* LINE CHART */}

          <div style={styles.chartCard}>

            <h2 style={styles.chartTitle}>
              Fraud Trend
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <LineChart data={lineData}>

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="fraud"
                  stroke="#7c4dff"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* PIE CHART */}

          <div style={styles.chartCard}>

            <h2 style={styles.chartTitle}>
              Fraud Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                >

                  {
                    pieData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    ))
                  }

                </Pie>

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}

        <div style={styles.chartCard}>

          <h2 style={styles.chartTitle}>
            Sector Risk Analysis
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
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

    </div>

  );

}

const styles = {

  heading: {
    color: "white",
    marginBottom: "25px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginBottom: "30px"
  },

  card: {
    background:
      "linear-gradient(135deg,#111c44,#0f172a)",
    padding: "25px",
    borderRadius: "22px",
    border: "1px solid #1e3a8a",
    color: "white",
    boxShadow:
      "0 0 20px rgba(124,77,255,0.15)"
  },

  number: {
    color: "#7c4dff",
    marginTop: "10px",
    fontSize: "40px"
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
    borderRadius: "22px",
    border: "1px solid #1e3a8a",
    marginBottom: "25px",
    overflow: "hidden"
  },

  chartTitle: {
    color: "white",
    marginBottom: "20px"
  }

};

export default Analytics;