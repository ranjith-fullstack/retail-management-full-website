
import React, { useState, useEffect} from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import {
  FormControlLabel,
  Checkbox,
  TextField,
  Radio,
  RadioGroup,
  FormLabel,
  MenuItem,
  Button,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment 
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumb from "./Breadcrumb";
import  Header  from "./header";
import Sidebar from "./sidebar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
}));

const Customerdatabase = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
    } else {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
      setRole(decoded.role);
      if (decoded.role !== "masteradmin") {
        navigate("/");
      }
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:3005/saveCustomer", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.status === 401) {
          navigate("/");
        }
      }
    };

    fetchUserData();
  }, [navigate]);
  const [showSalesInfo, setShowSalesInfo] = useState(false);
  const [customerType, setCustomerType] = useState("");
  const [salutation, setSalutation] = useState("");
  const [showOtherDetails, setShowOtherDetails] = useState(false);
  const [currency, setCurrency] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [rowsPerPage, setRowsPerPage] = useState(4); 
  const [customers, setCustomers] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [tempData, setTempData] = useState(null);

  const handleSalesInfoChange = () => {
    setShowSalesInfo(!showSalesInfo);
  };

  const handleCustomerTypeChange = (event) => {
    setCustomerType(event.target.value);
  };

  const handleSalutationChange = (event) => {
    setSalutation(event.target.value);
  };

  const handleOtherDetailsClick = () => {
    setShowOtherDetails(!showOtherDetails);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handlePaymentTermsChange = (event) => {
    setPaymentTerms(event.target.value);
  };

  const classes = useStyles();

  const [showAddress, setShowAddress] = useState(false);
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [showRemark, setShowRemark] = useState(false);
  const [customerId, setCustomerId] = useState(''); 

  const handleAddressClick = () => {
    setShowAddress(!showAddress);
    setShowBillingAddress(!showBillingAddress);
    setShowShippingAddress(!showShippingAddress);
    setShowOtherDetails(false); 
  };

  const handleRemarkClick = () => {
    setShowRemark(!showRemark);
    setShowOtherDetails(false); 
  };

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const [selectedRow, setSelectedRow] = useState(null);

 ;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

//  for state dropdown
const indianStates = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
  "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

  const [formData, setFormData] = useState({
    customerType: '',
    customerName: '',
    mobile: '',
    customerEmail: '',
    companyName: '',
    panNumber: '',
    customerPaymentTerms: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    faxNumber: '',
    remark: ''
  });



const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value
  });
};


// date and time format for edit dialogue box
const formatDateTime = (dateTime) => {
  if (!dateTime) return '';
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const handleSubmit = async (event) => {
  event.preventDefault();

  // Email validation
  if (!formData.customerEmail.endsWith("@gmail.com")) {
    alert("Please provide a valid Gmail address.");
    return;
  }

  // Capture the current date and time
  const currentDateTime = new Date().toISOString();

  try {
    const token = Cookies.get("token");
    const response = await axios.get("http://localhost:3005/saveCustomer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const existingCustomers = response.data;
    const customerId = existingCustomers.length + 1;

    const formDataWithExtraFields = {
      ...formData,
      username: username,
      state: state,
      customerType: customerType,
      customerPaymentTerms: paymentTerms,
      dateandtime: currentDateTime,
      customerId: customerId, // Include the generated customer ID
    };

    if (customerType === "Business") {
      if (
        formData.companyName === "" ||
        formData.panNumber === "" ||
        paymentTerms === "" ||
        formData.address1 === "" ||
        formData.city === "" ||
        formData.zipCode === "" ||
        formData.country === "" ||
        formData.gst === ""
      ) {
        alert("Please fill out all required fields for Business customers.");
        return;
      }
    }

    const postResponse = await axios.post(
      "http://localhost:3005/saveCustomer",
      formDataWithExtraFields,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(postResponse.data);

    const newCustomer = {
      dateandtime: currentDateTime,
      customerType: customerType,
      customerName: formData.customerName,
      mobile: formData.mobile,
      customerEmail: formData.customerEmail,
      companyName: formData.companyName,
      panNumber: formData.panNumber,
      customerPaymentTerms: paymentTerms,
      gst: formData.gst,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      state: state,
      zipCode: formData.zipCode,
      country: formData.country,
      faxNumber: formData.faxNumber,
      remark: formData.remark,
      customerId: customerId, // Include the generated customer ID
    };

    setCustomers([...customers, newCustomer]);

    setFormData({
      customerType: "",
      customerName: "",
      mobile: "",
      customerEmail: "",
      companyName: "",
      panNumber: "",
      customerPaymentTerms: "",
      gst: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      faxNumber: "",
      remark: ""
    });

    window.location.reload();

  } catch (error) {
    console.error("Error saving customer data:", error);
  }
};



useEffect(() => {
  const fetchCustomerData = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:3005/saveCustomer', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to fetch customer data. Status: ${response.status}`);
      }
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  fetchCustomerData();
}, []);

  const filteredData = [...customers].filter(
    (item) =>
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(item.customerId).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);


  const handleEdit = (rowData, customerType) => {
    setEditedData(rowData);
    setTempData({ ...rowData });
    setOpenDialog(true);
    setCustomerType(customerType);
  };

  // new
  const handleUpdate = async () => {
    try {
      const currentDateTime = new Date().toISOString(); // Capture current date and time
      // Validation for individual customer type
      if (customerType === "Individual") {
        // Check if customer name is provided
        if (!tempData.customerName) {
          alert("Customer name is required for individual customers.");
          return;
        }
        // Check if mobile number is provided and is 10 digits
        if (!tempData.mobile || tempData.mobile.length !== 10) {
          alert("Mobile number is required and should be 10 digits for individual customers.");
          return;
        }
        // Check if email is provided and ends with gmail.com
        if (tempData.customerEmail && !tempData.customerEmail.endsWith("@gmail.com")) {
          alert("If provided, email should end with gmail.com for individual customers.");
          return;
        }
      }
      
      // Validation for business customer type
      if (customerType === "Business") {
        // Check if all fields are provided
        const requiredFields = ["customerName", "mobile", "customerEmail","companyName", "panNumber", "customerPaymentTerms", "gst", "address1", "address2", "city", "state",  "zipCode", "country", "faxNumber"];
        for (const field of requiredFields) {
          if (!tempData[field]) {
            alert(`${field} is required for business customers.`);
            return;
          }
        }
        // Check if mobile number is 10 digits
        if (!tempData.mobile || tempData.mobile.length !== 10) {

          alert("Mobile number should be 10 digits for business customers.");
          return;
        }
        // Check if email ends with gmail.com
        if (!tempData.customerEmail.endsWith("@gmail.com")) {
          alert("Email should end with gmail.com for business customers.");
          return;
        }
        // Check if GST number is 15 digits
        if (tempData.gst.length !== 15) {
          alert("GST should be 15 digits for business customers.");
          return;
        }
      }

       // Update tempData with the current date and time
    const updatedTempData = {
      ...tempData,
      dateandtime: currentDateTime
    };
  
      // If all validations pass, proceed with the update
      const updatedCustomers = customers.map((customer) => {
        if (customer.customerId === tempData.customerId) {
          return tempData; 
        } else {
          return customer; 
        }
      });
  
      setCustomers(updatedCustomers);
  
      await axios.put(`http://localhost:3005/updateCustomer/${tempData.customerId}`, tempData);
  
      setOpenDialog(false);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };
  

  
  const handleCancel = () => {
    setTempData(null);
    setOpenDialog(false);
  };
  const handleChangeDialog = (name, value) => {
    setTempData({ ...tempData, [name]: value });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };


  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`http://localhost:3005/deleteCustomer/${customerId}`);
      
      setCustomers(customers.filter(customer => customer.customerId !== customerId));
      
      console.log('Customer deleted successfully');
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };


  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showSalesInfo}
                    onChange={handleSalesInfoChange}
                  />
                }
                label="New Customers"
              />
              {showSalesInfo && (
                <div className="infoproducts">
                  <div>
                    <FormLabel>Customer Type</FormLabel>
                    <RadioGroup
                      value={customerType}
                      onChange={handleCustomerTypeChange}
                    >
                      <FormControlLabel
                        value="Business"
                        control={<Radio />}
                        label="Business"
                      />
                      <FormControlLabel
                        value="Individual"
                        control={<Radio />}
                        label="Individual"
                      />
                    </RadioGroup>
                  </div>

           {customerType === "Individual" && (
                  <div className="row">
                    <div className="col-md-3">
                    <TextField
                        id="customerId"
                        label="Customer ID"
                        variant="outlined"
                        value={customerId}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      </div>
                  <div className="col-md-3">
                    <TextField
                      id="salutation"
                      select
                      label="Salutation"
                      value={salutation}
                      onChange={handleSalutationChange}
                      variant="outlined"
                      style={{ margin: "5px", width: "100%" }}
                    >
                      <MenuItem value="Mr.">Mr.</MenuItem>
                      <MenuItem value="Ms.">Ms.</MenuItem>
                      <MenuItem value="Miss">Miss</MenuItem>
                      <MenuItem value="Mrs.">Mrs.</MenuItem>
                      <MenuItem value="Dr.">Dr.</MenuItem>
                    </TextField>
                    </div>
                  <div className="col-md-3">
                    <TextField
                      id="customerName"
                      name="customerName"
                      label="Name"
                      style={{ margin: "5px", width: "100%" }}
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                    />
                    </div>
                  <div className="col-md-3">
                    <TextField
                      id="mobile"
                      name="mobile"
                      label="Mobile"
                      style={{ margin: "5px", width: "100%" }}
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      inputProps={{ minLength: 10, maxLength: 10 }} 
                      InputProps={{
                          startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                      }}
                    />
                    </div>
                    <div className="col-md-3">

                    <TextField
                      id="customerEmail"
                      name="customerEmail"
                      label="Customer Email"
                      style={{ margin: "5px", width: "100%" }}
                      value={formData.customerEmail}
                      onChange={handleChange}
                      type="email"
                    />

                    </div>
                  </div>
                )}

                {customerType === "Business" && (

                  <div>
                  <div className="row">
                  <div className="col-md-3">
                    <TextField
                        id="customerId"
                        label="Customer ID"
                        variant="outlined"
                        value={customerId}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      </div>
                  <div className="col-md-3">
                    <TextField
                      id="salutation"
                      select
                      label="Salutation"
                      value={salutation}
                      onChange={handleSalutationChange}
                      variant="outlined"
                      style={{ margin: "5px", width: "100%" }}
                    >
                      <MenuItem value="Mr.">Mr.</MenuItem>
                      <MenuItem value="Ms.">Ms.</MenuItem>
                      <MenuItem value="Miss">Miss</MenuItem>
                      <MenuItem value="Mrs.">Mrs.</MenuItem>
                      <MenuItem value="Dr.">Dr.</MenuItem>
                    </TextField>
                    </div>
                  <div className="col-md-3">

                    <TextField
                      id="customerName"
                      name="customerName"
                      label="Name"
                      style={{ margin: "5px", width: "100%" }}
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                    />
                    </div>

                  <div className="col-md-3">

                    <TextField
                      id="mobile"
                      name="mobile"
                      label="Mobile"
                      style={{ margin: "5px", width: "100%" }}
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      inputProps={{ minLength: 10, maxLength: 10 }} 
                      InputProps={{
                          startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                      }}
                    />
                    </div>

                  <div className="col-md-3">

                    <TextField
                      id="customerEmail"
                      name="customerEmail"
                      label="Customer Email"
                      style={{ margin: "5px", width: "100%" }}
                      value={formData.customerEmail}
                      onChange={handleChange}
                      type="email"
                    />
                    </div>
                    </div>

                    <Button
                      variant="contained"
                      style={{ margin: "3px" }}
                      onClick={handleOtherDetailsClick}
                    >
                      {showOtherDetails ? "Hide Other Details" : "Other Details"}
                    </Button>
                    <Button
                      variant="contained"
                      style={{ margin: "3px" }}
                      onClick={handleAddressClick}
                    >
                      {showAddress ? "Hide Address" : "Address"}
                    </Button>
                    <Button
                      variant="contained"
                      style={{ margin: "3px" }}
                      onClick={handleRemarkClick}
                    >
                      {showRemark ? "Hide Remark" : "Remark"}
                    </Button>
                    {showOtherDetails && (
                      <div>
                        <Typography variant="h6">Other Details</Typography>
                        <TextField
                          id="companyName"
                          name="companyName"
                          label="Company Name"
                          style={{ margin: "5px", width: "200px" }}
                          value={formData.companyName}
                          onChange={handleChange}
                          required={customerType === "Business"}
                        />
                        <TextField
                          id="panNumber"
                          name="panNumber"
                          label="PAN"
                          style={{ margin: "3px", width: "200px" }}
                          value={formData.panNumber}
                          onChange={handleChange}
                          required={customerType === "Business"}
                        />
                        <TextField
                          id="customerPaymentTerms"
                          name="customerPaymentTerms"
                          select
                          label="Payment Terms"
                          variant="outlined"
                          value={paymentTerms}
                          onChange={handlePaymentTermsChange}
                          style={{ margin: "3px", width: "200px" }}
                          required={customerType === "Business"}
                        >
                          <MenuItem value="Net 30">Net 30</MenuItem>
                          <MenuItem value="Net 60">Net 60</MenuItem>
                          <MenuItem value="Net 90">Net 90</MenuItem>
                        </TextField>
                        <TextField
                          id="gst"
                          name="gst"
                          label="GST"
                          style={{ margin: "3px", width: "200px" }}
                          value={formData.gst}
                          onChange={handleChange}
                          inputProps={{ minLength: 15, maxLength: 15 }} 

                          required={customerType === "Business"}
                        />
                      </div>
                    )}
                    {showAddress && (
                      <Grid item xs={12} md={6}>
                        <div className={classes.addressContainer}>
                          {showBillingAddress && (
                            <div>
                              <Typography variant="h6">Billing Address</Typography>
                              <TextField
                                id="address1"
                                name="address1"
                                label="Address 1"
                                style={{ margin: "3px" }}
                                value={formData.address1}
                                onChange={handleChange}
                                required={customerType === "Business"}
                              />
                              <TextField
                                id="address2"
                                name="address2"
                                label="Address 2"
                                style={{ margin: "3px" }}
                                value={formData.address2}
                                onChange={handleChange}
                                required={customerType === "Business"}
                              />
                              <TextField
                                id="city"
                                name="city"
                                label="City"
                                style={{ margin: "3px" }}
                                value={formData.city}
                                onChange={handleChange}
                                required={customerType === "Business"}
                              />
                              
                              <TextField
                                select
                                className="form-group"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                label="Select State"
                                variant="outlined"
                                required={customerType === "Business"}
                                style={{ margin: "3px", width: "200px" }}
                              >
                                <MenuItem value="">Select State</MenuItem>
                                {indianStates.map((state, index) => (
                                  <MenuItem key={index} value={state}>
                                    {state}
                                  </MenuItem>
                                ))}
                              </TextField>

                              <TextField
                                id="zipCode"
                                name="zipCode"
                                label="Zip Code"
                                style={{ margin: "3px" }}
                                value={formData.zipCode}
                                onChange={handleChange}
                                required={customerType === "Business"}
                              />
                              <TextField
                                id="country"
                                name="country"
                                label="Country"
                                style={{ margin: "3px" }}
                                value={formData.country}
                                onChange={handleChange}
                                required={customerType === "Business"}
                                disabled
                              />
                              <TextField
                                id="faxNumber"
                                name="faxNumber"
                                label="Fax Number"
                                style={{ margin: "3px" }}
                                value={formData.faxNumber}
                                onChange={handleChange}
                                required={customerType === "Business"}
                              />
                            </div>
                          )}
                        </div>
                      </Grid>
                    )}
                    {showRemark && (
                      <div>
                        <TextField
                          id="remark"
                          name="remark"
                          label="Remark"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                          style={{ margin: "3px" }}
                          value={formData.remark}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                  </div>
                )}

                 
                  <button className="buttongngng" type="submit">Submit</button>
                </div>
              )}
            </div>
          </div>
        </form>
        {/* Table Section */}
        <div style={{ overflowX: "auto", maxWidth: "100%", padding: "15px" }}>
          <div>
            {/* Search TextField */}
            <TextField
              variant="outlined"
              label="Search by ID or Name:"
              value={searchQuery}
              onChange={handleSearchChange}
              className="hr-text"
              style={{ marginLeft: "10px", marginBottom: "20px" }}
            />
            {/* Table Container */}
            <TableContainer component={Paper}>
              <Table aria-label="customer table">
                <TableHead style={{ backgroundColor: "rgb(167, 165, 165)" }}>
                  <TableRow>
                  <TableCell> Date & Time</TableCell>
                    <TableCell>Customer ID</TableCell>
                    <TableCell>Customer Type</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Customer Email</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Pan Number</TableCell>
                    <TableCell>Customer Payment Terms</TableCell>
                    <TableCell>GST</TableCell>
                    <TableCell>Address 1</TableCell>
                    <TableCell>Address 2</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Zip Code</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>Fax Number</TableCell>
                    <TableCell>Remark</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.map((row) => (
                    <TableRow key={row.customerId}>
                    <TableCell>{row.dateandtime}</TableCell>
                      <TableCell>{row.customerId}</TableCell>
                      <TableCell>{row.customerType}</TableCell>
                      <TableCell>{row.customerName}</TableCell>
                      <TableCell>{row.mobile}</TableCell>
                      <TableCell>{row.customerEmail}</TableCell>
                      <TableCell>{row.companyName}</TableCell>
                      <TableCell>{row.panNumber}</TableCell>
                      <TableCell>{row.customerPaymentTerms}</TableCell>
                      <TableCell>{row.gst}</TableCell>
                      <TableCell>{row.address1}</TableCell>
                      <TableCell>{row.address2}</TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>{row.state}</TableCell>
                      <TableCell>{row.zipCode}</TableCell>
                      <TableCell>{row.country}</TableCell>
                      <TableCell>{row.faxNumber}</TableCell>
                      <TableCell>{row.remark}</TableCell>
                      <TableCell>
                        {/* <Button onClick={() => handleEdit(row)}>Edit</Button> */}
                        <Button onClick={() => handleEdit(row, row.customerType)}>Edit</Button>

                        <Button onClick={() => handleDelete(row.customerId)}> Delete </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{ float: "right", marginTop: "10px" }}>
              <Typography variant="body2">
                Page {currentPage} of {totalPages}
              </Typography>
              <Button
                variant="contained"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                startIcon={<FaChevronLeft />}
              >
                Prev
              </Button>
              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                endIcon={<FaChevronRight />}
              >
                Next
              </Button>
              <TextField
                select
                label="Rows per page"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                style={{ marginLeft: "10px" }}
              >
                {[4, 8, 12, 16].map((rowOption) => (
                  <MenuItem key={rowOption} value={rowOption}>
                    {rowOption}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </div>
      </div>

                {/* Dialog for editing */}
      


<Dialog open={openDialog} onClose={handleDialogClose}>
  <DialogTitle>Edit Customer</DialogTitle>
  <DialogContent>
    <form>
      {tempData && ( 
        <>
        <TextField
              label="Date and Time"
              type="datetime-local"
              value={formatDateTime(tempData.dateandtime)}
              fullWidth
              margin="normal"
              disabled
            />
          {customerType === "Individual" && (
            <>
              <TextField
                label="Customer ID"
                value={tempData.customerId}
                fullWidth
                margin="normal"
                disabled 
              />
              <TextField
                label="Customer Type"
                value="Individual"
                fullWidth
                margin="normal"
                disabled 
              />
              <TextField
                label="Customer Name"
                value={tempData.customerName}
                onChange={(e) => handleChangeDialog("customerName", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Mobile"
                value={tempData.mobile}
                onChange={(e) => handleChangeDialog("mobile", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Customer Email"
                value={tempData.customerEmail}
                onChange={(e) => handleChangeDialog("customerEmail", e.target.value)}
                fullWidth
                margin="normal"
              />
            </>
          )}
          {customerType === "Business" && (
            <>
              <TextField
                label="Customer ID"
                value={tempData.customerId}
                fullWidth
                margin="normal"
                disabled 
              />
              <TextField
                label="Customer Type"
                value="Business"
                fullWidth
                margin="normal"
               disabled
              />
              <TextField
                label="Customer Name"
                value={tempData.customerName}
                onChange={(e) => handleChangeDialog("customerName", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Mobile"
                value={tempData.mobile}
                onChange={(e) => handleChangeDialog("mobile", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Customer Email"
                value={tempData.customerEmail}
                onChange={(e) => handleChangeDialog("customerEmail", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Company Name"
                value={tempData.companyName}
                onChange={(e) => handleChangeDialog("companyName", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Pan Number"
                value={tempData.panNumber}
                onChange={(e) => handleChangeDialog("panNumber", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                select
                label="Payment Terms"
                value={tempData.customerPaymentTerms}
                onChange={(e) => handleChangeDialog("customerPaymentTerms", e.target.value)}
                fullWidth
                margin="normal"
              >
                <MenuItem value="Net 30">Net 30</MenuItem>
                <MenuItem value="Net 60">Net 60</MenuItem>
                <MenuItem value="Net 90">Net 90</MenuItem>
              </TextField>
              
              <TextField
                label="GST"
                value={tempData.gst}
                onChange={(e) => handleChangeDialog("gst", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address 1"
                value={tempData.address1}
                onChange={(e) => handleChangeDialog("address1", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address 2"
                value={tempData.address2}
                onChange={(e) => handleChangeDialog("address2", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="City"
                value={tempData.city}
                onChange={(e) => handleChangeDialog("city", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                select
                label="State"
                value={tempData.state}
                onChange={(e) => handleChangeDialog("state", e.target.value)}
                fullWidth
                margin="normal"
              >
                {indianStates.map((state, index) => (
                  <MenuItem key={index} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Zip Code"
                value={tempData.zipCode}
                onChange={(e) => handleChangeDialog("zipCode", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Country"
                value={tempData.country}
                onChange={(e) => handleChangeDialog("country", e.target.value)}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Fax Number"
                value={tempData.faxNumber}
                onChange={(e) => handleChangeDialog("faxNumber", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Remark"
                value={tempData.remark}
                onChange={(e) => handleChangeDialog("remark", e.target.value)}
                fullWidth
                margin="normal"
              />
            </>
          )}
        </>
      )}
    </form>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCancel}>Cancel</Button>
    <Button onClick={handleUpdate}>Update</Button>
  </DialogActions>
</Dialog>
    </div>
  );
};
export default Customerdatabase;