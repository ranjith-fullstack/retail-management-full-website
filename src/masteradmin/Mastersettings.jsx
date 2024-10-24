
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import  Header  from "./header";
import "./dashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Breadcrumb from "./Breadcrumb";
import { jwtDecode } from "jwt-decode";
import bcrypt from 'bcryptjs';
import {
  Grid,
  Button,
  Menu,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  IconButton,
  Modal,
} from "@mui/material";
import {
  ArrowUpward,
  InfoOutlined,
  PersonAddOutlined,
} from "@mui/icons-material";
import Tempimg from "./img/i (1).png";
import Tempimgg from "./img/i (2).png";
import Tempimggg from "./img/i (3).png";
import axios from 'axios';

const Mastersettings = () => {
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

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const token = Cookies.get("token");
  //       const response = await axios.get("http://localhost:3005/categories", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //     } catch (error) {
  //       console.error("Error:", error);
  //       if (error.response && error.response.status === 401) {
  //         navigate("/");
  //       }
  //     }
  //   };

  //   fetchUserData();
  // }, [navigate]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showTaxRateForm, setShowTaxRateForm] = useState(false);
  const [showGSTForm, setShowGSTForm] = useState(false);
  const [showBusinessProfileForm, setShowBusinessProfileForm] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [Templates, setTemplates] = useState(false);
  const [users, setUsers] = useState([]);

   //
   const [businessProfile, setBusinessProfile] = useState({
    business_name: '',
    business_type: '',
    address_line1: '',
    phone: '',
    email: '',
    website: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: '',
    created_at: ''
  });

  const [userCredentials, setUserCredentials] = useState({
    username: username,
    password: ''
  });

  useEffect(() => {
    if (username) {
      axios.get(`http://localhost:3005/api/fetch-user-details/${username}`)
        .then(response => {
          const userData = response.data;
          setBusinessProfile({
            business_name: userData.business_name,
            business_type: userData.business_type,
            address_line1: userData.address_line1,
            phone: userData.phone,
            email: userData.email,
            website: userData.website,
            address_line2: userData.address_line2,
            city: userData.city,
            state: userData.state,
            zip_code: userData.zip_code,
            created_at: userData.created_at
          });
          setUserCredentials({
            username: userData.username,
            password: userData.password,// Do not set the hashed password directly in the input field
          });
        })
        .catch(error => {
          console.error("There was an error fetching the business profile!", error);
        });
    }
  }, [username]);


  const handleSave = async () => {
    try {
      // Hash the password before sending it to the backend
      const hashedPassword = bcrypt.hashSync(userCredentials.password, 10);
      const updatedProfile = { ...businessProfile, username: userCredentials.username, password: hashedPassword };
      
      const response = await axios.put('http://localhost:3005/api/updateBusinessProfile', updatedProfile);
  
      if (response.status === 200) {
        alert('Business profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating business profile:', error);
      alert('Failed to update business profile');
    }
  };
  
   //


  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleTaxesClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTaxRateClick = () => {
    setAnchorEl(null);
    setShowTaxRateForm(true);
    setShowGSTForm(false);
    setShowBusinessProfileForm(false);
    setShowUser(false);
  };

  const handleGSTRateClick = () => {
    setAnchorEl(null);
    setShowGSTForm(true);
    setShowTaxRateForm(false);
    setShowBusinessProfileForm(false);
    setShowUser(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowTaxRateForm(false);
    setShowGSTForm(false);

    //
    setShowBusinessProfileForm(false);
  };

  const handleBusinessProfileClick = () => {
    setAnchorEl(null);
    setShowTaxRateForm(false);
    setShowGSTForm(false);
    setShowUser(false);
    setShowBusinessProfileForm(true);
   //
  };


  //
 

  //
  const handlesetShowUser = () => {
    setAnchorEl(null);
    setShowTaxRateForm(false);
    setShowGSTForm(false);
    setShowBusinessProfileForm(false);
    setShowUser(true);
  };
  const handlesetTemplates = () => {
    setAnchorEl(null);
    setShowTaxRateForm(false);
    setShowGSTForm(false);
    setShowBusinessProfileForm(false);
    setShowUser(false);
    setTemplates(true);
  };

  const fetchUsers = () => {
    const usersData = [
      { id: 1, username: "user1", role: "Admin", status: "Active" },
      { id: 2, username: "user2", role: "User", status: "Active" },
      { id: 3, username: "user3", role: "User", status: "Inactive" },
    ];
    setUsers(usersData);
  };

  useEffect(() => {
    if (showBusinessProfileForm) {
      fetchUsers();
    }
  }, [showBusinessProfileForm]);

  const [selectedImage, setSelectedImage] = useState(null);
  const imageSources = [Tempimg, Tempimgg, Tempimggg]; // Array of image sources

  const handleImageSelect = (imageSrc) => {
    setSelectedImage(imageSrc);
    
    axios.post('http://localhost:3005/selectedImage', {
      selectedImageIndex: imageSources.indexOf(imageSrc) + 1 // Index starts from 1
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  
 
  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <div className="mt-5">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginLeft: "60px",
            }}
          >
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "60%", textAlign: "center" }}
                  onClick={handleBusinessProfileClick}
                >
                  Business Profile
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "60%", textAlign: "center" }}
                  onClick={handlesetShowUser}
                >
                  Users
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "60%", textAlign: "center" }}
                  onClick={handleTaxesClick}
                >
                  Taxes
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <MenuItem onClick={handleTaxRateClick}>Tax Rate</MenuItem>
                  <MenuItem onClick={handleGSTRateClick}>GST Rate</MenuItem>
                </Menu>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "60%", textAlign: "center" }}
                  onClick={handlesetTemplates}
                >
                  Templates
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
        {showTaxRateForm && (
          <div>
            <h2 style={{ textAlign: "center", margin: "20px" }}>Tax rate</h2>

            <Grid
              container
              spacing={2}
              justifyContent="center"
              style={{ marginTop: "20px" }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Tax Name"
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  fullWidth
                  label="Rate (%)"
                  style={{ marginBottom: "10px" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={12} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px" }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
        {showGSTForm && (
          <div>
            <h2 style={{ textAlign: "center", margin: "20px" }}>GST rate</h2>

            <Grid
              container
              spacing={2}
              justifyContent="center"
              style={{ marginTop: "20px" }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="GST Name"
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  fullWidth
                  label="Rate (%)"
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  fullWidth
                  label="GSTIN"
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  fullWidth
                  label="Business Name"
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  fullWidth
                  label="Trade Name"
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  fullWidth
                  label="GST Registered On"
                  style={{ marginBottom: "10px" }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Composition Scheme"
                  style={{ marginBottom: "10px" }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Reverse Charge"
                  style={{ marginBottom: "10px" }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Import/Export"
                  style={{ marginBottom: "10px" }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Digital Services"
                  style={{ marginBottom: "10px" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={12} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px" }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </div>
        )}

        
{showBusinessProfileForm && (
      <div>
        <h2 style={{ textAlign: 'center', margin: '20px' }}>Business Profile</h2>
        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              style={{ margin: '5px' }}
              label="Business Name"
              value={businessProfile.business_name}
              onChange={(e) => setBusinessProfile({ ...businessProfile, business_name: e.target.value })}
            />
            <TextField
              style={{ margin: '5px' }}
              label="Business Type"
              value={businessProfile.business_type}
              onChange={(e) => setBusinessProfile({ ...businessProfile, business_type: e.target.value })}
            />
            <TextField
              style={{ margin: '5px' }}
              label="Business Location"
              value={businessProfile.address_line1}
              onChange={(e) => setBusinessProfile({ ...businessProfile, address_line1: e.target.value })}
            />
            <TextField
              style={{ margin: '5px' }}
              label="Phone"
              value={businessProfile.phone}
              onChange={(e) => setBusinessProfile({ ...businessProfile, phone: e.target.value })}
            />
            <TextField
              style={{ margin: '5px' }}
              label="Email"
              value={businessProfile.email}
              onChange={(e) => setBusinessProfile({ ...businessProfile, email: e.target.value })}
            />
            <TextField
              style={{ margin: '5px' }}
              label="Website"
              value={businessProfile.website}
              onChange={(e) => setBusinessProfile({ ...businessProfile, website: e.target.value })}
            />
            <div style={{ margin: '5px' }}>
              <label htmlFor="logo-upload">Upload your logo:</label>
              <input type="file" id="logo-upload" style={{ display: 'block', margin: '5px' }} />
              <p>This logo will appear on transactions and email notifications.</p>
              <p>Preferred Image Size: 230px x 60px @ 72 DPI Maximum size of 1MB.</p>
            </div>
            <TextField
              style={{ margin: '5px' }}
              label="Address Line 1"
              value={businessProfile.address_line1}
              onChange={(e) => setBusinessProfile({ ...businessProfile, address_line1: e.target.value })}
            />
            <TextField
              style={{ margin: '5px' }}
              label="Address Line 2"
              value={businessProfile.address_line2}
              onChange={(e) => setBusinessProfile({ ...businessProfile, address_line2: e.target.value })}
            />
            <TextField
              style={{ margin: '5px' }}
              label="City"
              value={businessProfile.city}
              onChange={(e) => setBusinessProfile({ ...businessProfile, city: e.target.value })}
            />
            <TextField
              style={{ margin: '5px' }}
              label="State"
              value={businessProfile.state}
              onChange={(e) => setBusinessProfile({ ...businessProfile, state: e.target.value })}
            />
            <TextField
              style={{ margin: '5px' }}
              label="Zip/Postal Code"
              value={businessProfile.zip_code}
              onChange={(e) => setBusinessProfile({ ...businessProfile, zip_code: e.target.value })}
            />
            <TextField
              style={{ margin: '5px' }}
              label="Date Format"
              value={businessProfile.created_at}
              onChange={(e) => setBusinessProfile({ ...businessProfile, created_at: e.target.value })}
            />
            <TextField
              style={{ margin: '5px' }}
              label="Username"
              value={userCredentials.username}
              disabled
            />
            <TextField
              style={{ margin: '5px' }}
              label="Password"
              type="password"
              value={userCredentials.password}
              onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={12} style={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </div>
    )}


        {showUser && (
          <div>
            <div>
              <h2 style={{ textAlign: "center", margin: "20px" }}>Users</h2>
              <div className="d-flex justify-content-end">
                <IconButton
                  aria-label="instructions"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <InfoOutlined />
                </IconButton>

                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          {" "}
                          Role Permissions
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <table>
                          <thead>
                            <tr>
                              <th>MODULES/FEATURES</th>
                              <th>STORE MANAGER</th>
                              <th>STAFF</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Dashboard Access</td>
                              <td>Yes</td>
                              <td>No</td>
                            </tr>
                            <tr>
                              <td>Contacts: Customers</td>
                              <td>Full access</td>
                              <td>View, Create, Edit</td>
                            </tr>
                            <tr>
                              <td>Contacts: Vendors</td>
                              <td>Full access</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Items: Items</td>
                              <td>Full access</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Items: Item Groups</td>
                              <td>Full access</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Items: Composite Items</td>
                              <td>Full access</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Items: Item Categories</td>
                              <td>Full access</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Items: Inventory Adjustments</td>
                              <td>Full access</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Items: Price Lists</td>
                              <td>Full access</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Sales: Sales Orders</td>
                              <td>Full access</td>
                              <td>View, Create, Edit</td>
                            </tr>
                            <tr>
                              <td>Sales: Invoices</td>
                              <td>Full access</td>
                              <td>View, Create, Edit</td>
                            </tr>
                            <tr>
                              <td>Sales: Customer Payments</td>
                              <td>Full access</td>
                              <td>View, Create, Edit</td>
                            </tr>
                            <tr>
                              <td>Sales: Packages</td>
                              <td>Full access</td>
                              <td>View, Create, Edit</td>
                            </tr>
                            <tr>
                              <td>Sales: Shipments</td>
                              <td>Full access</td>
                              <td>View, Create</td>
                            </tr>
                            <tr>
                              <td>Sales: Sales Returns</td>
                              <td>Full access</td>
                              <td>View, Create, Edit</td>
                            </tr>
                            <tr>
                              <td>Sales: Sales Return Receives</td>
                              <td>Full access</td>
                              <td>View, Create</td>
                            </tr>
                            <tr>
                              <td>Sales: Credit Notes</td>
                              <td>Full access</td>
                              <td>View, Create, Edit</td>
                            </tr>
                            <tr>
                              <td>Sales: Conflict Orders</td>
                              <td>Full access</td>
                              <td>View, Resolve</td>
                            </tr>
                            <tr>
                              <td>Purchases: Bills</td>
                              <td>Full access</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Purchases: Purchase Receives</td>
                              <td>Full access</td>
                              <td>View, Create</td>
                            </tr>
                            <tr>
                              <td>Purchases: Payments Made</td>
                              <td>Full access</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Purchases: Purchase Orders</td>
                              <td>Full access</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Purchases: Vendor Credits</td>
                              <td>Full access</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Reports: Reports</td>
                              <td>Full access</td>
                              <td>No Access</td>
                            </tr>
                            <tr>
                              <td>Reports: Export Data</td>
                              <td>
                                Able to export data in reports section alone
                              </td>
                              <td>No Access</td>
                            </tr>
                            <tr>
                              <td>Settings: Business Profile</td>
                              <td>View only</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Settings: Users</td>
                              <td>View only</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Settings: Locations</td>
                              <td>Full access</td>
                              <td>View only</td>
                            </tr>
                            <tr>
                              <td>Settings: Sales Channel</td>
                              <td>No Access</td>
                              <td>No Access</td>
                            </tr>
                            <tr>
                              <td>Settings: Templates</td>
                              <td>Full access</td>
                              <td>No Access</td>
                            </tr>
                            <tr>
                              <td>Settings: Emails</td>
                              <td>Full access</td>
                              <td>No Access</td>
                            </tr>
                            <tr>
                              <td>Settings: Preferences</td>
                              <td>No Access</td>
                              <td>No Access</td>
                            </tr>
                            <tr>
                              <td>Settings: Taxes</td>
                              <td>No Access</td>
                              <td>No Access</td>
                            </tr>
                            <tr>
                              <td>Settings: SMS Notifications</td>
                              <td>No Access</td>
                              <td>No Access</td>
                            </tr>
                            <tr>
                              <td>Settings: Integrations</td>
                              <td>No Access</td>
                              <td>No Access</td>
                            </tr>
                            <tr>
                              <td>Settings: Payments</td>
                              <td>No Access</td>
                              <td>No Access</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <IconButton aria-label="view-role-permissions">
                  <PersonAddOutlined />
                </IconButton>
              </div>
            </div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {Templates && (
          <div>
            <h2 style={{ textAlign: "center", margin: "20px" }}>Templates</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
            {imageSources.map((imageSrc, index) => (
          <div key={index}>
            <div>
              <img
                src={imageSrc}
                alt="Template Image"
                className={selectedImage === imageSrc ? "selected-img img1" : "img1"}
                onClick={() => handleImageSelect(imageSrc)}
              />
            </div>
            {selectedImage === imageSrc ? (
              <button
                variant="contained"
                color="primary"
                onClick={() => handleImageSelect(null)}
                style={{ display: "block", margin: "auto" }}
              >
                Unselect
              </button>
            ) : (
              <button
                variant="contained"
                color="primary"
                onClick={() => handleImageSelect(imageSrc)}
                style={{ display: "block", margin: "auto" }}
              >
                Select
              </button>
            )}
          </div>
        ))}
             
            </div>
          </div>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleScrollToTop}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "70px",
        }}
      >
        <ArrowUpward />
      </Button>
    </div>
  );
};
export default Mastersettings;