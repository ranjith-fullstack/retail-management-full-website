
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Signup.css';
import CloseIcon from '@mui/icons-material/Close';
import secure from './Images/Devices.png';
import Welcome from './Images/Welcome.png';
import Cookies from 'js-cookie';

 
 const Signup = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info'); // Default severity is 'info'
  const [isSendingOTP, setIsSendingOTP] = useState(false); // To track if OTP is being sent
  const [countdown, setCountdown] = useState(30); // Countdown timer initially set to 30 seconds
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  //
  const [signupSuccess, setSignupSuccess] = useState(false);
  //

  useEffect(() => {
    let timer;
    if (countdown > 0 && isSendingOTP) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && isSendingOTP) {
      setIsSendingOTP(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, isSendingOTP]);
 
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
 
  const handleErrorAlert = (message, severity = 'info', successMessage = null) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
    if (successMessage) {
      setTimeout(() => {
        setSnackbarMessage(successMessage);
        setSnackbarSeverity('success');
      }, 300);
    }
  };
 
  const handleLogin = async () => {
    if (!email) {
      handleErrorAlert('Please fill the email input', 'warning');
      return;
    }
    try {
      setIsSendingOTP(true); 
      const response = await axios.post('http://localhost:3005/logined', { email });
      if (response && response.data && response.data.success) {
        handleErrorAlert(response.data.message, 'success'); 
        setIsSendingOTP(false);
        setCountdown(30);
      } else {
        throw new Error(response.data && response.data.message ? response.data.message : 'Unexpected response from server');
      }
    } catch (error) {
      handleErrorAlert(error.response?.data?.error || error.response?.data?.message || error.message, 'error');
    }
  };
 
  const handleResendOTP = () => {
    if (countdown === 0) {
      setCountdown(30);
      handleLogin();
    } else {
      handleErrorAlert(`Please wait ${countdown} seconds before resending OTP`, 'warning');
    }
  };
 
  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:3005/verify', { email, otp });
      console.log('Response received:', response.data);
      if (response.data.success) {
        const { token, role, username, password } = response.data;
        
        localStorage.setItem('role', role);
              Cookies.set('token', token);
        alert(`Username: ${username}\nPassword: ${password}`);  
        setTimeout(() => {
                  navigate('/masteradmin', { state: { isNewUser: true } }); // Pass state indicating new user
                }, 1000);
                setMessage('OTP verified successfully.');
                setSignupSuccess(true);
      } else {
        setMessage('OTP verification failed.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('An error occurred while verifying OTP. Please try again.');
    }
  };
 
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:3005/google-login', { credentialResponse });
      window.open("http://localhost:3005/auth/google", "_self");
      if (response && response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        handleErrorAlert('Login successful!');
        navigate('/login');
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      handleErrorAlert(error.response?.data?.error || error.response?.data?.message || error.message);
    }
  };
 
  return (
    <div className="form-container-new">
      <div className="form-content1-new">
        <h3 className="formh3-new" data-before="Get Started with" data-after=" QuickRetail"></h3>
        <img
          src={Welcome}
          alt="Welcome"
          className="checkout-image1-new"
        />
      </div>
      <div className="form-content-new">
      <CloseIcon className="close-icon" onClick={() => navigate('/')} />
        <p className="title-new">Sign Up</p>
       
        <input type="email" className="input-new" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="d-flex flex-row justify-content-between">
          <div>
            <button className="form-btn-new" onClick={handleLogin} disabled={isSendingOTP}>
              {isSendingOTP ? `Sending OTP (${countdown})` : 'Send OTP'}
            </button>
          </div>
          <div>
            <button className="form-btn-new" onClick={handleResendOTP} disabled={countdown !== 0}>
              Resend OTP
            </button>
          </div>
        </div>
        <br />
        <input type="text" className="input-new" placeholder="OTP" value={otp} onChange={(e) => setOTP(e.target.value)} />
        <button className="form-btn1-new" onClick={handleVerify}>Verify OTP</button>
        <div className='already-user-button'>
          <Link to="/Login">
            <button className='already-user-button'>Already a user?   try LogIn</button>
          </Link>
        </div>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
 
};
 
export default Signup;
 