import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MyProfile.css";

import Sidebar from "./sidebar";
import Header  from "./header";
import Breadcrumb from "./Breadcrumb";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ArrowUpward } from "@mui/icons-material";

const MyProfile = () => {
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Fetch username and current password from backend on component mount
  useEffect(() => {
    axios.get('http://localhost:3005/api/rolebased')
      .then(response => {
        const { username, password } = response.data;
        setUsername(username);  // Set username from backend
        setCurrentPassword(password); // Set current password from backend
      })
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);

  // Handle password update
  const handleUpdate = () => {
    console.log('Update button clicked');
    console.log('Current state:', { username, currentPassword, newPassword, confirmNewPassword });

    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match. Please re-enter.");
      return;
    }

    axios.post('http://localhost:3005/api/rolebased', {
      username,
      currentPassword,
      newPassword
    })
    .then(response => {
      alert(response.data);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    })
    .catch(error => console.error('Error updating password:', error));
  };

  // Handle cancel button click
  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  // Handle scroll to top button click
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <Box className="MyProfile-dashboard-table-wrapper" sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
          <Box display="flex" flexDirection="column" mb={2}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              value={username}
              InputProps={{
                readOnly: true,  // Make username field read-only
              }}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              id="currentPassword"
              label="Current Password"
              variant="outlined"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              id="newPassword"
              label="New Password"
              variant="outlined"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              id="confirmNewPassword"
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              fullWidth
              sx={{ mr: 1 }}
            >
              Update Password
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              fullWidth
              sx={{ ml: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleScrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            borderRadius: "70px",
            backgroundColor: "#76abae",
            color: "#222831",
          }}
        >
          <ArrowUpward />
        </Button>
      </div>
    </div>
  );
};

export default MyProfile;
