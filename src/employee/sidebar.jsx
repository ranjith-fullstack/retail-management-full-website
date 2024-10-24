import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faShoppingCart,
  faReceipt,
  faUser,
  faCog,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";

const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const sidebarRef = useRef(null);

  const handleSidebarToggle = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleActiveIndex = (index) => {
    setActiveIndex(index);
    setSidebarVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="sidebar-btn" onClick={handleSidebarToggle}>
        <span className="material-symbols-outlined">menu</span>{" "}
      </div>

      <nav
        ref={sidebarRef}
        className={`sidebar-nav ${isSidebarVisible ? "show" : ""}`}
      >
        <div className="sidebar-text">Employee</div>
        <ul>
          <li
            className={activeIndex === 0 ? "active" : ""}
            onClick={() => handleActiveIndex(0)}
          >
            <div className="bigbig d-flex flex-row justify-content-start">
              <div className="icononh">
                <FontAwesomeIcon icon={faChartBar} className="white-icon" />
              </div>
              <div className="sidebarlink">
                <Link
                  to="/employeedashboard"
                  onClick={() => setSidebarVisible(false)}
                  className="linklink"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </li>

          <li
            className={activeIndex === 1 ? "active" : ""}
            onClick={() => handleActiveIndex(1)}
          >
            <div className="bigbig d-flex flex-row justify-content-start">
              <div className="icononh">
                <FontAwesomeIcon icon={faShoppingCart} className="white-icon" />
              </div>
              <div className="sidebarlink">
                <Link
                  to="/employee/Employeesales"
                  onClick={() => setSidebarVisible(false)}
                  className="linklink"
                >
                  Sales
                </Link>
              </div>
            </div>
          </li>
          <li
            className={activeIndex === 2 ? "active" : ""}
            onClick={() => handleActiveIndex(2)}
          >
            <div className="bigbig d-flex flex-row justify-content-start">
              <div className="icononh">
                <FontAwesomeIcon icon={faReceipt} className="white-icon" />
              </div>
              <div className="sidebarlink">
                <Link
                  to="/employee/Employeeinvoice"
                  onClick={() => setSidebarVisible(false)}
                  className="linklink"
                >
                  Invoice
                </Link>
              </div>
            </div>
          </li>
          <li
            className={activeIndex === 3 ? "active" : ""}
            onClick={() => handleActiveIndex(3)}
          >
            <div className="bigbig d-flex flex-row justify-content-start">
              <div className="icononh">
                <FontAwesomeIcon icon={faUser} className="white-icon" />
              </div>
              <div className="sidebarlink">
                <Link
                  to="/employee/Emppersonaldetails"
                  onClick={() => setSidebarVisible(false)}
                  className="linklink"
                >
                  Personal Details
                </Link>
              </div>
            </div>
          </li>
          <li
            className={activeIndex === 4 ? "active" : ""}
            onClick={() => handleActiveIndex(4)}
          >
            <div className="bigbig d-flex flex-row justify-content-start">
              <div className="icononh">
                <FontAwesomeIcon icon={faCog} className="white-icon" />
              </div>
              <div className="sidebarlink">
                <Link
                  to="/employee/Settings"
                  onClick={() => setSidebarVisible(false)}
                  className="linklink"
                >
                  Settings
                </Link>
              </div>
            </div>
          </li>
          <li
            className={activeIndex === 5 ? "active" : ""}
            onClick={() => handleActiveIndex(5)}
          >
            <div className="bigbig d-flex flex-row justify-content-start">
              <div className="icononh">
                <FontAwesomeIcon icon={faSignOutAlt} className="white-icon" />
              </div>
              <div className="sidebarlink">
                <Link
                  to="/logout"
                  onClick={() => setSidebarVisible(false)}
                  className="linklink"
                >
                  Logout
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
