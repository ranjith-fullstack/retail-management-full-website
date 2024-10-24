

import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const DialogBox = ({ isOpen, onSubmit, onClose }) => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [otherBusinessType, setOtherBusinessType] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const businessTypes = [
    { label: 'Retail', value: 'retail' },
    { label: 'Wholesale', value: 'wholesale' },
    { label: 'Service', value: 'service' },
    { label: 'Manufacturing', value: 'manufacturing' },
    { label: 'Others', value: 'others' }
  ];

  const indianStates = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
    "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleBusinessTypeChange = (e) => {
    setBusinessType(e.target.value);
    if (e.target.value !== "others") {
      setOtherBusinessType('');
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('Phone number should be 10 digits.');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setEmailError('Email should be in @gmail.com format.');
      return false;
    }
    setEmailError('');
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPhoneValid = validatePhone(phone);
    const isEmailValid = validateEmail(email);

    if (!businessName || !businessType || (businessType === 'others' && !otherBusinessType) || !addressLine1 || !city || !state || !zipCode || !phone || !email || !isPhoneValid || !isEmailValid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const formData = {
      businessName,
      businessType,
      otherBusinessType,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      phone,
      email,
      website,
    };

    try {
      await axios.post('http://localhost:3005/submit-business-form', formData);
      alert('Form submitted successfully!');
      setBusinessName('');
      setBusinessType('');
      setOtherBusinessType('');
      setAddressLine1('');
      setAddressLine2('');
      setCity('');
      setState('');
      setZipCode('');
      setPhone('');
      setEmail('');
      setWebsite('');
      onClose();
      navigate('/login');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.');
    }
};


  return (
    <Dialog open={isOpen}  fullWidth maxWidth="md">
      <DialogContent>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <TextField
              label="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth required margin="normal">
              <InputLabel>Business Type</InputLabel>
              <Select
                value={businessType}
                onChange={handleBusinessTypeChange}
                required
              >
                {businessTypes.map((type, index) => (
                  <MenuItem key={index} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {businessType === 'others' && (
              <TextField
                label="Other Business Type"
                value={otherBusinessType}
                onChange={(e) => setOtherBusinessType(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            )}
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              required
              margin="normal"
              error={!!phoneError}
              helperText={phoneError}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              label="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              fullWidth
              margin="normal"
            />
          </div>
          <div>
            <TextField
              label="Address Line 1"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Address Line 2"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth required margin="normal">
              <InputLabel>State</InputLabel>
              <Select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                MenuProps={{ PaperProps: { style: { maxHeight: '170px' } } }}
              >
                {indianStates.map((state, index) => (
                  <MenuItem key={index} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
