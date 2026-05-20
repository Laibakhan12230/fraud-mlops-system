import {
  Bell,
  Search,
  UserCircle2,
  X
} from "lucide-react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import {
  useState,
  useEffect
} from "react";

function Navbar() {

  const navigate = useNavigate();

  const [alertCount, setAlertCount] =
    useState(0);

  const [alerts, setAlerts] =
    useState([]);

  const [showAlerts, setShowAlerts] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const email =
    localStorage.getItem("email");

  // FETCH ALERTS

  useEffect(() => {

    fetchAlerts();

  }, []);

  const fetchAlerts = async () => {

    try {

      const response =
        await axios.get(
          "https://fraud-mlops-system.onrender.com/alerts"
        );

      setAlerts(response.data);

      setAlertCount(
        response.data.length
      );

    } catch (error) {

      console.log(error);

    }

  };

  // SEARCH FUNCTION

  const handleSearch = (e) => {

    setSearch(e.target.value);

  };

  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("email");

    navigate("/");

  };

  return (

    <div style={styles.navbar}>

      {/* SEARCH */}

      <div style={styles.searchBox}>

        <Search
          size={20}
          color="#94a3b8"
        />

        <input
          type="text"
          placeholder="Search analytics..."
          style={styles.search}
          value={search}
          onChange={handleSearch}
        />

      </div>

      {/* RIGHT */}

      <div style={styles.right}>

        {/* ALERT ICON */}

        <div
          style={styles.bellBox}
          onClick={() =>
            setShowAlerts(
              !showAlerts
            )
          }
        >

          <Bell color="white" />

          {
            alertCount > 0 && (

              <div style={styles.dot}>
                {alertCount}
              </div>

            )
          }

        </div>

        {/* ALERT DROPDOWN */}

        {
          showAlerts && (

            <div style={styles.alertPopup}>

              <div style={styles.popupHeader}>

                <h3>
                  Fraud Alerts
                </h3>

                <X
                  size={18}
                  cursor="pointer"
                  onClick={() =>
                    setShowAlerts(false)
                  }
                />

              </div>

              {

                alerts.length === 0

                  ? (

                    <p>
                      No alerts found
                    </p>

                  )

                  : (

                    alerts.slice(0, 5).map(
                      (item, index) => (

                        <div
                          key={index}
                          style={styles.alertItem}
                        >

                          🚨 Fraud Detected

                          <p
                            style={{
                              color:
                                "#94a3b8",
                              fontSize: "13px"
                            }}
                          >

                            Probability:

                            {" "}

                            {
                              (
                                item.fraud_probability * 100
                              ).toFixed(2)
                            }

                            %

                          </p>

                        </div>

                      )
                    )

                  )

              }

            </div>

          )
        }

        {/* USER */}

        <div style={styles.userBox}>

          <UserCircle2
            color="white"
            size={34}
          />

          <div>

            <h4
              style={{
                margin: 0,
                color: "white"
              }}
            >
              Admin
            </h4>

            <p
              style={{
                margin: 0,
                color: "#94a3b8",
                fontSize: "13px"
              }}
            >
              {email}
            </p>

          </div>

        </div>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          style={styles.logoutBtn}
        >

          Logout

        </button>

      </div>

    </div>

  );

}

const styles = {

  navbar: {
    width: "100%",
    background: "#101935",
    border: "1px solid #1e3a8a",
    borderRadius: "24px",
    padding: "18px 25px",
    marginBottom: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative"
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "#020817",
    padding: "14px 18px",
    borderRadius: "18px",
    width: "40%",
    gap: "10px"
  },

  search: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    width: "100%",
    fontSize: "15px"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "18px"
  },

  bellBox: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    background: "#020817",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    cursor: "pointer"
  },

  dot: {
    minWidth: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "#ff1744",
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "white",
    fontSize: "11px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2px"
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#020817",
    padding: "10px 18px",
    borderRadius: "18px"
  },

  logoutBtn: {
    background:
      "linear-gradient(to right,#ef4444,#dc2626)",
    border: "none",
    padding: "12px 20px",
    borderRadius: "14px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },

  alertPopup: {
    position: "absolute",
    top: "90px",
    right: "140px",
    width: "320px",
    background: "#0f172a",
    border: "1px solid #1e3a8a",
    borderRadius: "18px",
    padding: "20px",
    zIndex: 999,
    boxShadow:
      "0 0 20px rgba(0,0,0,0.4)"
  },

  popupHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },

  alertItem: {
    background: "#111827",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "12px",
    color: "white"
  }

};

export default Navbar;