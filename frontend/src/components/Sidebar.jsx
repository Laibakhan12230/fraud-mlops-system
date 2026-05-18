import {
  LayoutDashboard,
  Bell,
  History,
  FileText,
  Settings,
  ShieldAlert,
  Menu,
  X
} from "lucide-react";

import {
  NavLink
} from "react-router-dom";

import {
  useState
} from "react";

function Sidebar() {

  const [open, setOpen] =
    useState(false);

  const menuItems = [

    {
      name: "Dashboard",
      icon: <LayoutDashboard size={22} />,
      path: "/dashboard"
    },

    {
      name: "Alerts",
      icon: <Bell size={22} />,
      path: "/alerts"
    },

    {
      name: "History",
      icon: <History size={22} />,
      path: "/history"
    },

    {
      name: "Reports",
      icon: <FileText size={22} />,
      path: "/reports"
    },

    {
      name: "Settings",
      icon: <Settings size={22} />,
      path: "/settings"
    }

  ];

  return (

    <>

      {/* MINI SIDEBAR */}

      <div style={styles.miniSidebar}>

        <div
          style={styles.menuButton}
          onClick={() =>
            setOpen(true)
          }
        >

          <Menu
            color="white"
            size={28}
          />

        </div>

      </div>

      {/* FULL SIDEBAR */}

      {

        open && (

          <div style={styles.sidebar}>

            {/* TOP */}

            <div>

              <div style={styles.top}>

                <div style={styles.logoSection}>

                  <ShieldAlert
                    size={34}
                    color="#7c4dff"
                  />

                  <div>

                    <h1 style={styles.logo}>
                      Fraud AI
                    </h1>

                    <p style={styles.subtitle}>
                      Analytics System
                    </p>

                  </div>

                </div>

                <X
                  color="white"
                  cursor="pointer"
                  onClick={() =>
                    setOpen(false)
                  }
                />

              </div>

              {/* MENU */}

              <div style={styles.menu}>

                {

                  menuItems.map(
                    (item, index) => (

                      <NavLink
                        key={index}
                        to={item.path}

                        onClick={() =>
                          setOpen(false)
                        }

                        style={({
                          isActive
                        }) => ({

                          ...styles.link,

                          background:

                            isActive
                              ? "linear-gradient(to right,#7c4dff,#4338ca)"
                              : "transparent"

                        })}
                      >

                        {item.icon}

                        <span>
                          {item.name}
                        </span>

                      </NavLink>

                    )
                  )

                }

              </div>

            </div>

            {/* BOTTOM */}

            <div style={styles.bottomBox}>

              <h3>
                AI Monitoring
              </h3>

              <p>
                System Status
              </p>

              <div style={styles.online}>
                ● ONLINE
              </div>

            </div>

          </div>

        )

      }

    </>

  );

}

const styles = {

  miniSidebar: {

    width: "70px",

    height: "100vh",

    background:
      "linear-gradient(180deg,#0f172a,#111c44)",

    borderRight:
      "1px solid #1e3a8a",

    position: "fixed",

    top: 0,

    left: 0,

    display: "flex",

    justifyContent: "center",

    paddingTop: "20px",

    zIndex: 1200
  },

  menuButton: {

    width: "45px",

    height: "45px",

    borderRadius: "12px",

    background: "#111827",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    cursor: "pointer"
  },

  sidebar: {

    width: "260px",

    height: "100vh",

    background:
      "linear-gradient(180deg,#0f172a,#111c44)",

    borderRight:
      "1px solid #1e3a8a",

    position: "fixed",

    top: 0,

    left: 0,

    padding: "25px 18px",

    display: "flex",

    flexDirection: "column",

    justifyContent: "space-between",

    zIndex: 1300
  },

  top: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: "40px"
  },

  logoSection: {

    display: "flex",

    alignItems: "center",

    gap: "12px"
  },

  logo: {

    color: "white",

    margin: 0,

    fontSize: "34px"
  },

  subtitle: {

    color: "#94a3b8",

    margin: 0,

    fontSize: "13px"
  },

  menu: {

    display: "flex",

    flexDirection: "column",

    gap: "14px"
  },

  link: {

    display: "flex",

    alignItems: "center",

    gap: "14px",

    padding: "16px 18px",

    borderRadius: "16px",

    color: "white",

    textDecoration: "none",

    fontSize: "17px",

    transition: "0.3s"
  },

  bottomBox: {

    background: "#111827",

    padding: "20px",

    borderRadius: "18px",

    border: "1px solid #1e3a8a"
  },

  online: {

    color: "#00e676",

    marginTop: "10px",

    fontWeight: "bold"
  }

};

export default Sidebar;