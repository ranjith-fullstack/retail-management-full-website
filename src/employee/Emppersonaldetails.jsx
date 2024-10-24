import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./sidebar";
import  Header  from "./header";
import Breadcrumb from "./Breadcrumb";
import { TextField, Button, Grid } from "@mui/material";

export const Emppersonaldetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [employeeRole, setEmployeeRole] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    const { username, role } = location;
    if (!token) {
      navigate("/login");
    } else {
      setUsername(username);
      setRole(role);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit the form data
    console.log("Submitted:", {
      employeeId,
      employeeName,
      contactInfo,
      email,
      address,
      employeeRole,
      password,
    });
  };

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Employee ID"
              variant="outlined"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Employee Name"
              variant="outlined"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Contact Information"
              variant="outlined"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Employee Role"
              variant="outlined"
              value={employeeRole}
              onChange={(e) => setEmployeeRole(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
