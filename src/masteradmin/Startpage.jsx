import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Grid } from '@mui/material';

export const Startpage = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    phoneNumber: '',
    email: '',
    website: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="businessName"
            label="Business Name"
            value={formData.businessName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Business Type</InputLabel>
            <Select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
            >
              <MenuItem value="books">Books & Stationery</MenuItem>
              <MenuItem value="clothing_apparel">Clothing & Apparel</MenuItem>
              <MenuItem value="cosmetics_beauty_products">Cosmetics & Beauty Products</MenuItem>
              <MenuItem value="education_learning_materials">Education & Learning Materials</MenuItem>
              <MenuItem value="electronics_appliances">Electronics & Appliances</MenuItem>
              <MenuItem value="food_beverages">Food & Beverages</MenuItem>
              <MenuItem value="garden_supplies">Garden Supplies</MenuItem>
              <MenuItem value="hardware_diy">Hardware / DIY</MenuItem>
              <MenuItem value="home_decor_furniture">Home Decor & Furniture</MenuItem>
              <MenuItem value="hyper_market_departmental_stores">Hyper Market & Departmental Stores</MenuItem>
              <MenuItem value="jewelry_accessories">Jewelry & Accessories</MenuItem>
              <MenuItem value="music_entertainment">Music & Entertainment</MenuItem>
              <MenuItem value="office_supplies_stationery">Office Supplies & Stationery</MenuItem>
              <MenuItem value="pet_supplies">Pet Supplies</MenuItem>
              <MenuItem value="pharma_healthcare">Pharma & Healthcare</MenuItem>
              <MenuItem value="real_estate_property_management">Real Estate & Property Management</MenuItem>
              <MenuItem value="service">Service</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="supermarket_groceries">Supermarket & Groceries</MenuItem>
              <MenuItem value="toys">Toys</MenuItem>
              <MenuItem value="vehicle_parts">Vehicle & Parts</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="website"
            label="Website"
            value={formData.website}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="addressLine1"
            label="Address Line 1"
            value={formData.addressLine1}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="addressLine2"
            label="Address Line 2"
            value={formData.addressLine2}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="city"
            label="City"
            value={formData.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select State</InputLabel>
            <Select
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <MenuItem value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</MenuItem>
              <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
              <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
              <MenuItem value="Assam">Assam</MenuItem>
              <MenuItem value="Bihar">Bihar</MenuItem>
              <MenuItem value="Chandigarh">Chandigarh</MenuItem>
              <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
              <MenuItem value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</MenuItem>
              <MenuItem value="Daman and Diu">Daman and Diu</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Goa">Goa</MenuItem>
              <MenuItem value="Gujarat">Gujarat</MenuItem>
              <MenuItem value="Haryana">Haryana</MenuItem>
              <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
              <MenuItem value="Jharkhand">Jharkhand</MenuItem>
              <MenuItem value="Karnataka">Karnataka</MenuItem>
              <MenuItem value="Kerala">Kerala</MenuItem>
              <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
              <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
              <MenuItem value="Maharashtra">Maharashtra</MenuItem>
              <MenuItem value="Manipur">Manipur</MenuItem>
              <MenuItem value="Meghalaya">Meghalaya</MenuItem>
              <MenuItem value="Mizoram">Mizoram</MenuItem>
              <MenuItem value="Nagaland">Nagaland</MenuItem>
              <MenuItem value="Odisha">Odisha</MenuItem>
              <MenuItem value="Puducherry">Puducherry</MenuItem>
              <MenuItem value="Punjab">Punjab</MenuItem>
              <MenuItem value="Rajasthan">Rajasthan</MenuItem>
              <MenuItem value="Sikkim">Sikkim</MenuItem>
              <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
              <MenuItem value="Telangana">Telangana</MenuItem>
              <MenuItem value="Tripura">Tripura</MenuItem>
              <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
              <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
              <MenuItem value="West Bengal">West Bengal</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="zipCode"
            label="Zip/Postal Code"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </form>
  );
};
export default Startpage;
