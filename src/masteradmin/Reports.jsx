import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header  from "./header";
import "./dashboard.css";
import { Form, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Breadcrumb from "./Breadcrumb";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button, FormControl, InputLabel, Menu, MenuItem, Modal, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Paper
  } from "@mui/material";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ArrowUpward } from "@mui/icons-material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "150px",
  },
}));

const Reports = () => {
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



  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [data] = useState([]);

  const handleClick = (event, row) => {
    setSelectedRow(row);
    fetchSalesInvoiceDetails(row.saleInvoiceId); //for sales view
    fetchPurchaseOrdersDetails(row.invoiceId); //for purchase view
    

    setViewDialogOpen(true);
  };
  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    // setSelectedRow(null);
    setSalesInvoicesView([]);   //for sales view
    setPurchaseOrdersView([]); //for purchase view
  };

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

 

  let filteredData = [...data];

  if (searchQuery) {
    filteredData = filteredData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.id).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

  const classes = useStyles();
  const [selectedDuration, setSelectedDuration] = useState("day");
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [activePage, setActivePage] = useState("Sales"); // State to track the active page

  // starts backend
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const [salesInvoicesView, setSalesInvoicesView] = useState([]); //for sales view data
  const [purchaseOrdersView, setPurchaseOrdersView] = useState([]); //for purchase view data

  useEffect(() => {
    fetchData();
    fetchSalesInvoices();

  }, []);


  const fetchSalesInvoiceDetails = async (invoiceId) => {    //for sales view
    setIsLoading(true);
    try {
      const token = Cookies.get("token");

        const response = await fetch(`http://localhost:3005/api/salesInvoices/${invoiceId}`,
        {headers: {
          Authorization: `Bearer ${token}`,
        },});
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setSalesInvoicesView(data);
    } catch (error) {
        console.error("Error fetching invoice details:", error.message);
    } finally {
        setIsLoading(false);
    }
};

  const fetchData = async () => {
    try {
      const token = Cookies.get("token");

      const response = await fetch("http://localhost:3005/api/products",{headers: {
        Authorization: `Bearer ${token}`,
      },});
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSalesInvoices = async () => {
    try {
      const token = Cookies.get("token");

      const response = await axios.get('http://localhost:3005/api/sales-invoices' ,{headers: {
        Authorization: `Bearer ${token}`,
      },});
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales invoices:', error.message);
    } finally {
      setIsLoading(false);
    }
  };


  
  //ends

  // purchase start
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const token = Cookies.get("token");

        const response = await axios.get('http://localhost:3005/api/purchase-orders',{headers: {
          Authorization: `Bearer ${token}`,
        },});
        setPurchaseOrders(response.data);
      } catch (error) {
        console.error('Error fetching purchase orders:', error);
      }
    };

    fetchPurchaseOrders();
  }, []);


const fetchPurchaseOrdersDetails = async (invoiceId) => {          //for purchase view
  setIsLoading(true);
  try {
    const token = Cookies.get("token");

    const response = await axios.get(`http://localhost:3005/api/purchase-orders/${invoiceId}`,{headers: {
      Authorization: `Bearer ${token}`,
    },});
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const data = response.data;
    console.log('Fetched Purchase Order Details:', data);  // Add this line to debug
    setPurchaseOrdersView(data);
  } catch (error) {
    console.error("Error fetching purchase order details:", error.message);
  } finally {
    setIsLoading(false);
  }
};
  //purchase end




  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleClickk = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (option) => {
    setSortOption(option);
    handleClose();
 
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleSetActivePage = (page) => {
    setActivePage(page);
  };
  







  if (isLoading) {
    return <div>Loading...</div>;
  }



  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <div className="d-flex flex-wrap justify-content-center">
          <button className="buttongngng " onClick={() => handleSetActivePage("Sales")} >
            <span className="button-content" >Sales</span>
          </button>
          <button className="buttongngng " onClick={() => handleSetActivePage("Stock")}>
            <span className="button-content">Stock</span>
          </button>
          <button className="buttongngng " onClick={() => handleSetActivePage("Purchase")}>
            <span className="button-content">Purchase</span>
          </button>
          <button className="buttongngng " onClick={() => handleSetActivePage("Items")}>
            <span className="button-content">Items</span>
          </button>
        </div>

        {activePage === "Sales" && (
            <>
            <div>
            <h1 className="d-flex justify-content-center">Sales</h1>
            <div className="reportsRow">
              <div className="duration">
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="duration-label">Select Duration</InputLabel>
                  <Select
                    labelId="duration-label"
                    id="duration"
                    value={selectedDuration}
                    onChange={handleDurationChange}
                    label="Select Duration"
                    sx={{ margin: "5px" }}
                  >
                    <MenuItem value="day">Day</MenuItem>
                    <MenuItem value="week">Week</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="quarter">Quarter</MenuItem>
                    <MenuItem value="half-year">Half Year</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                  </Select>
                </FormControl>
  
                {selectedDuration === "day" && (
                  <TextField
                    id="selected-date"
                    label="Date"
                    type="date"
                    value={selectedDate}
                    sx={{ margin: "5px" }}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
  
                {selectedDuration === "custom" && (
                  <>
                    <TextField
                      id="start-date"
                      label="Start Date"
                      type="date"
                      value={startDate}
                      sx={{ margin: "5px" }}
                      onChange={handleStartDateChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
  
                    <TextField
                      id="end-date"
                      label="End Date"
                      type="date"
                      value={endDate}
                      sx={{ margin: "5px" }}
                      onChange={handleEndDateChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </>
                )}
              </div>
  
              <div className="sortFilter">
                <Button
                  variant="outlined"
                  color="primary"
                  className="buttub"
                  onClick={handleClickk}
                  endIcon={<ArrowDropDownIcon />}
                  sx={{ margin: "5px" }}
                >
                  Manual Sort
                </Button>
                <Menu
                  id="sort-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleSort("A-Z")}>A-Z</MenuItem>
                  <MenuItem onClick={() => handleSort("Z-A")}>Z-A</MenuItem>
                  <MenuItem onClick={() => handleSort("Ascending")}>
                    Ascending
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("Descending")}>
                    Descending
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("Price (High-Low)")}>
                    Price (High-Low)
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("Price (Low-High)")}>
                    Price (Low-High)
                  </MenuItem>
                </Menu>
  
                
  
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Modal title
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <TextField
                          label="Total Categories"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
  
                        <TextField
                          label="Total Products"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
  
                        <TextField
                          label="Quantity"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
  
                        <TextField
                          label="Total Price"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
                      </div>{" "}
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div style={{ overflowX: "auto", maxWidth: "100%", padding: "15px" }}>
            <div>
              <TextField
                variant="outlined"
                label="Search by ID or Name:"
                value={searchQuery}
                onChange={handleSearchChange}
                className="hr-text"
                style={{ marginLeft: "10px", marginBottom: "20px" }}
              />
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead style={{ backgroundColor: "rgb(167, 165, 165)" }}>
                    <TableRow>
                      <TableCell>Invoice ID</TableCell>
                      <TableCell>Customer Name</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Total Categories</TableCell>
                      <TableCell>Total Products</TableCell>
                      <TableCell>Total Quantity</TableCell>
                      <TableCell>Total Price</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sales.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.saleInvoiceId}</TableCell>
                        <TableCell>{row.customerName}</TableCell>
                        <TableCell>{row.phoneNumber}</TableCell>
                        <TableCell>{row.totalCategories}</TableCell>
                        <TableCell>{row.totalProducts}</TableCell>
                        <TableCell>{row.totalQuantity}</TableCell>
                        <TableCell>{row.totalPrice}</TableCell>
                        <TableCell>
                          <Button onClick={(event) => handleClick(event, row)}>
                            <MoreHorizIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              
  

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
               
              </div>
  
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <div>
                  <Button disabled={currentPage === 1} onClick={handlePrevPage}>
                    <FaChevronLeft />
                  </Button>
                  <span style={{ margin: "0 10px" }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    <FaChevronRight />
                  </Button>
                </div>
                <Typography variant="body2">
                  {" "}
                  <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    style={{ width: "40px", height: "28px" }}
                  >
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                  </select>
                </Typography>
              </div>
              <Button
                  variant="contained"
                  color="primary"
                  // style={{ marginRight: "10px" }}
                  style={{ backgroundColor: "#4679a2",  marginRight: "10px" }}

                >
                  Print Reports
                </Button>
                <Button variant="contained" color="primary"
                  style={{ backgroundColor: "#4679a2"}}
                >
                  Get Reports
                </Button>


             
              
              <Modal open={viewDialogOpen} onClose={handleCloseViewDialog}>
                <div style={{ padding: '20px', background: 'white', margin: 'auto', marginTop: '0%' }}>
                    <h2>View Details</h2>
                    {selectedRow ? (
                        <div>
                            <h6>Invoice ID: {selectedRow.saleInvoiceId}</h6>
                            <h6>Customer Name: {selectedRow.customerName}</h6>
                            <h6>Phone Number: {selectedRow.phoneNumber}</h6>
                            <h6>Payment Method: {selectedRow.paymentMethod}</h6>
                            <h6>Total Price: {selectedRow.totalPrice}</h6>

                            <TableContainer component={Paper}>
                                <Table aria-label="sales table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product ID</TableCell>
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Total Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {salesInvoicesView.length > 0 ? (
                                            salesInvoicesView.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.productId}</TableCell>
                                                    <TableCell>{row.productName}</TableCell>
                                                    <TableCell>{row.quantity}</TableCell>
                                                    <TableCell>{row.price}</TableCell>
                                                    <TableCell>{row.totalAmount}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center">No data available</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    ) : (
                        <div>No row selected</div>
                    )}
                    <Button onClick={handleCloseViewDialog}>Close</Button>
                </div>
            </Modal>

            </div>
          </div>
            </>
        )}

        {activePage === "Stock" && (
            <>
            <div>
            <h1 className="d-flex justify-content-center">Stock</h1>
            <div className="reportsRow">
                
              <div className="duration">
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="duration-label">Select Duration</InputLabel>
                  <Select
                    labelId="duration-label"
                    id="duration"
                    value={selectedDuration}
                    onChange={handleDurationChange}
                    label="Select Duration"
                    sx={{ margin: "5px" }}
                  >
                    <MenuItem value="day">Day</MenuItem>
                    <MenuItem value="week">Week</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="quarter">Quarter</MenuItem>
                    <MenuItem value="half-year">Half Year</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                  </Select>
                </FormControl>
  
                {selectedDuration === "day" && (
                  <TextField
                    id="selected-date"
                    label="Date"
                    type="date"
                    value={selectedDate}
                    sx={{ margin: "5px" }}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
  
                {selectedDuration === "custom" && (
                  <>
                    <TextField
                      id="start-date"
                      label="Start Date"
                      type="date"
                      value={startDate}
                      sx={{ margin: "5px" }}
                      onChange={handleStartDateChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
  
                    <TextField
                      id="end-date"
                      label="End Date"
                      type="date"
                      value={endDate}
                      sx={{ margin: "5px" }}
                      onChange={handleEndDateChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </>
                )}
              </div>
  
              <div className="sortFilter">
                <Button
                  variant="outlined"
                  color="primary"
                  className="buttub"
                  onClick={handleClickk}
                  endIcon={<ArrowDropDownIcon />}
                  sx={{ margin: "5px" }}
                >
                  Manual Sort
                </Button>
                <Menu
                  id="sort-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleSort("A-Z")}>A-Z</MenuItem>
                  <MenuItem onClick={() => handleSort("Z-A")}>Z-A</MenuItem>
                  <MenuItem onClick={() => handleSort("Ascending")}>
                    Ascending
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("Descending")}>
                    Descending
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("Price (High-Low)")}>
                    Price (High-Low)
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("Price (Low-High)")}>
                    Price (Low-High)
                  </MenuItem>
                </Menu>
  
                
  
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Modal title
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <TextField
                          label="Total Categories"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
  
                        <TextField
                          label="Total Products"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
  
                        <TextField
                          label="Quantity"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
  
                        <TextField
                          label="Total Price"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
                      </div>{" "}
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div style={{ overflowX: "auto", maxWidth: "100%", padding: "15px" }}>
            <div>
              <TextField
                variant="outlined"
                label="Search by ID or Name:"
                value={searchQuery}
                onChange={handleSearchChange}
                className="hr-text"
                style={{ marginLeft: "10px", marginBottom: "20px" }}
              />
              <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ backgroundColor: "rgb(167, 165, 165)" }}>
          <TableRow>
          <TableCell>Product Id</TableCell>
          <TableCell>Product Name</TableCell>

      <TableCell>No. Of Suppliers</TableCell>
      <TableCell>Current Quantity</TableCell>
      <TableCell>Purchasing Price</TableCell>
      <TableCell>Selling Price</TableCell>
      <TableCell>Profit Percentage</TableCell>
      <TableCell>Trend</TableCell>
      <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.map((row, index) => (
            <TableRow key={index}>
            <TableCell>{row.productId}</TableCell>
            <TableCell>{row.productName}</TableCell>

        <TableCell>{row.supplierCount}</TableCell>
        <TableCell>{row.currentQuantity}</TableCell>
        <TableCell>{row.purchasePrice}</TableCell>
        <TableCell>{row.sellingPrice}</TableCell>
        <TableCell>{row.profitPercentage}</TableCell>
        <TableCell>{row.trend}</TableCell>
              
              <TableCell>
                <Button onClick={(event) => handleClick(event, row)}>
                  <MoreHorizIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
               
              </div>
  
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <div>
                  <Button disabled={currentPage === 1} onClick={handlePrevPage}>
                    <FaChevronLeft />
                  </Button>
                  <span style={{ margin: "0 10px" }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    <FaChevronRight />
                  </Button>
                </div>
                <Typography variant="body2">
                  {" "}
                  <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    style={{ width: "40px", height: "28px" }}
                  >
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                  </select>
                </Typography>
              </div>
              <Button
                  variant="contained"
                  color="primary"
                  // style={{ marginRight: "10px" }}
                  style={{ backgroundColor: "#4679a2",  marginRight: "10px" }}

                >
                  Print Reports
                </Button>
                <Button variant="contained" color="primary"
                  style={{ backgroundColor: "#4679a2"}}
                >
                  Get Reports
                </Button>
              <Modal open={viewDialogOpen} onClose={handleCloseViewDialog}>
                <div>
                  <h2>View Details</h2>
                  {selectedRow && (
                    <div>
                      <p>Pay Component ID: {selectedRow.id}</p>
                      <p>Pay Component Name: {selectedRow.name}</p>
                    </div>
                  )}
                  <Button onClick={handleCloseViewDialog}>Close</Button>
                </div>
              </Modal>
            </div>
          </div>
            </>
        )}
         
        {activePage === "Purchase" && (
            <>
            <div>
            <h1 className="d-flex justify-content-center">Purchase</h1>
            <div className="reportsRow">
               
              <div className="duration">
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="duration-label">Select Duration</InputLabel>
                  <Select
                    labelId="duration-label"
                    id="duration"
                    value={selectedDuration}
                    onChange={handleDurationChange}
                    label="Select Duration"
                    sx={{ margin: "5px" }}
                  >
                    <MenuItem value="day">Day</MenuItem>
                    <MenuItem value="week">Week</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="quarter">Quarter</MenuItem>
                    <MenuItem value="half-year">Half Year</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                  </Select>
                </FormControl>
 
                {selectedDuration === "day" && (
                  <TextField
                    id="selected-date"
                    label="Date"
                    type="date"
                    value={selectedDate}
                    sx={{ margin: "5px" }}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
 
                {selectedDuration === "custom" && (
                  <>
                    <TextField
                      id="start-date"
                      label="Start Date"
                      type="date"
                      value={startDate}
                      sx={{ margin: "5px" }}
                      onChange={handleStartDateChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
 
                    <TextField
                      id="end-date"
                      label="End Date"
                      type="date"
                      value={endDate}
                      sx={{ margin: "5px" }}
                      onChange={handleEndDateChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </>
                )}
              </div>
 
              <div className="sortFilter">
                <Button
                  variant="outlined"
                  color="primary"
                  className="buttub"
                  onClick={handleClickk}
                  endIcon={<ArrowDropDownIcon />}
                  sx={{ margin: "5px" }}
                >
                  Manual Sort
                </Button>
                <Menu
                  id="sort-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleSort("A-Z")}>A-Z</MenuItem>
                  <MenuItem onClick={() => handleSort("Z-A")}>Z-A</MenuItem>
                  <MenuItem onClick={() => handleSort("Ascending")}>
                    Ascending
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("Descending")}>
                    Descending
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("Price (High-Low)")}>
                    Price (High-Low)
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("Price (Low-High)")}>
                    Price (Low-High)
                  </MenuItem>
                </Menu>
 
                
 
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Modal title
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <TextField
                          label="Total Categories"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
 
                        <TextField
                          label="Total Products"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
 
                        <TextField
                          label="Quantity"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
 
                        <TextField
                          label="Total Price"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
                      </div>{" "}
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
          <div style={{ overflowX: "auto", maxWidth: "100%", padding: "15px" }}>
            <div>
              <TextField
                variant="outlined"
                label="Search by ID or Name:"
                value={searchQuery}
                onChange={handleSearchChange}
                className="hr-text"
                style={{ marginLeft: "10px", marginBottom: "20px" }}
              />
               <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ backgroundColor: "rgb(167, 165, 165)" }}>
          <TableRow>
            <TableCell>Purchase OrderID</TableCell>
            <TableCell>Purchase InvoiceId</TableCell>
            <TableCell>Supplier Name</TableCell>
            <TableCell>Total Products</TableCell>
            <TableCell>Total Quantity</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchaseOrders.map((orders) => (
            <TableRow key={orders.invoiceId}>
              <TableCell>{orders.invoiceId}</TableCell>
              <TableCell>{orders.purchaseInvoiceId}</TableCell>
              <TableCell>{orders.SupplierName}</TableCell>
              <TableCell>{orders.totalProducts}</TableCell>
              <TableCell>{orders.totalQuantity}</TableCell>
              <TableCell>{orders.totalAmount}</TableCell>
              <TableCell>
                <Button onClick={(event) => handleClick(event, orders)}>
                  <MoreHorizIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
               
              </div>
 
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <div>
                  <Button disabled={currentPage === 1} onClick={handlePrevPage}>
                    <FaChevronLeft />
                  </Button>
                  <span style={{ margin: "0 10px" }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    <FaChevronRight />
                  </Button>
                </div>
                <Typography variant="body2">
                  {" "}
                  <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    style={{ width: "40px", height: "28px" }}
                  >
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                  </select>
                </Typography>
              </div>
              <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px" }}
                >
                  Print Reports
                </Button>
                <Button variant="contained" color="primary">
                  Get Reports
                </Button>

              {/* <Modal open={viewDialogOpen} onClose={handleCloseViewDialog}>
                <div style={{ padding: '20px', background: 'white', margin: 'auto', marginTop: '0%' }}>
                    <h2>View Details</h2>
                    {selectedRow ? (
                        <div>
                            <h6>Invoice ID: {selectedRow.invoiceId}</h6>
                            <h6>Payment Method: {selectedRow.paymentTerms}</h6>
                           

                            <TableContainer component={Paper}>
                                <Table aria-label="sales table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Purchase InvoiceId</TableCell>
                                            <TableCell>Supplier Name</TableCell>
                                            <TableCell> Product ID</TableCell>
                                            <TableCell> Product Name</TableCell>

                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Discount</TableCell>
                                            <TableCell>Unit</TableCell>

                                           
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {purchaseOrdersView.length > 0 ? (
                                          purchaseOrdersView.map((row, index) => (
                                                <TableRow key={index}>
                                                <TableCell>{row.purchaseInvoiceId}</TableCell>
                                                <TableCell>{row.SupplierName}</TableCell>
                                                <TableCell>{row.productId}</TableCell>
                                                <TableCell>{row.productName}</TableCell>

                                                <TableCell>{row.quantity}</TableCell>
                                                <TableCell>{row.price}</TableCell>
                                                <TableCell>{row.discount}</TableCell>
                                                <TableCell>{row.unit}</TableCell>

                                               
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center">No data available</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    ) : (
                        <div>No row selected</div>
                    )}
                    <Button onClick={handleCloseViewDialog}>Close</Button>
                </div>
            </Modal> */}
            <Modal open={viewDialogOpen} onClose={handleCloseViewDialog}>
        <div style={{ padding: '20px', background: 'white', margin: 'auto', marginTop: '0%' }}>
          <h2>View Details</h2>
          {selectedRow ? (
            <div>
              <h6>Invoice ID: {selectedRow.invoiceId}</h6>
              {/* <h6>Payment Terms: {selectedRow.paymentTerms}</h6> */}
              <TableContainer component={Paper}>
                <Table aria-label="sales table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Purchase InvoiceId</TableCell>
                      <TableCell>Supplier Name</TableCell>
                      <TableCell>Payment Terms</TableCell>

                      <TableCell>Product ID</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>Unit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {purchaseOrdersView.length > 0 ? (
                      purchaseOrdersView.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.purchaseInvoiceId}</TableCell>
                          <TableCell>{row.SupplierName}</TableCell>
                          <TableCell>{row.paymentTerms}</TableCell>

                          <TableCell>{row.productId}</TableCell>
                          <TableCell>{row.productName}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>{row.price}</TableCell>
                          <TableCell>{row.discount}</TableCell>
                          <TableCell>{row.unit}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} align="center">No data available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <div>No row selected</div>
          )}
          <Button onClick={handleCloseViewDialog}>Close</Button>
        </div>
      </Modal>
            </div>
          </div>
            </>
        )}

        {activePage === "Items" && (
            <>
            <div>
            <h1 className="d-flex justify-content-center">Items</h1>
            <div className="reportsRow">
                
              <div className="duration">
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="duration-label">Select Duration</InputLabel>
                  <Select
                    labelId="duration-label"
                    id="duration"
                    value={selectedDuration}
                    onChange={handleDurationChange}
                    label="Select Duration"
                    sx={{ margin: "5px" }}
                  >
                    <MenuItem value="day">Day</MenuItem>
                    <MenuItem value="week">Week</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="quarter">Quarter</MenuItem>
                    <MenuItem value="half-year">Half Year</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                  </Select>
                </FormControl>
  
                {selectedDuration === "day" && (
                  <TextField
                    id="selected-date"
                    label="Date"
                    type="date"
                    value={selectedDate}
                    sx={{ margin: "5px" }}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
  
                {selectedDuration === "custom" && (
                  <>
                    <TextField
                      id="start-date"
                      label="Start Date"
                      type="date"
                      value={startDate}
                      sx={{ margin: "5px" }}
                      onChange={handleStartDateChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
  
                    <TextField
                      id="end-date"
                      label="End Date"
                      type="date"
                      value={endDate}
                      sx={{ margin: "5px" }}
                      onChange={handleEndDateChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </>
                )}
              </div>
  
              <div className="sortFilter">
                <Button
                  variant="outlined"
                  color="primary"
                  className="buttub"
                  onClick={handleClickk}
                  endIcon={<ArrowDropDownIcon />}
                  sx={{ margin: "5px" }}
                >
                  Manual Sort
                </Button>
                <Menu
                  id="sort-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleSort("A-Z")}>A-Z</MenuItem>
                  <MenuItem onClick={() => handleSort("Z-A")}>Z-A</MenuItem>
                  <MenuItem onClick={() => handleSort("Ascending")}>
                    Ascending
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("Descending")}>
                    Descending
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("Price (High-Low)")}>
                    Price (High-Low)
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("Price (Low-High)")}>
                    Price (Low-High)
                  </MenuItem>
                </Menu>
  
                
  
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Modal title
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <TextField
                          label="Total Categories"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
  
                        <TextField
                          label="Total Products"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
  
                        <TextField
                          label="Quantity"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
  
                        <TextField
                          label="Total Price"
                          variant="outlined"
                          fullWidth
                          sx={{ margin: "5px" }}
                        />
                      </div>{" "}
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div style={{ overflowX: "auto", maxWidth: "100%", padding: "15px" }}>
            <div>
              <TextField
                variant="outlined"
                label="Search by ID or Name:"
                value={searchQuery}
                onChange={handleSearchChange}
                className="hr-text"
                style={{ marginLeft: "10px", marginBottom: "20px" }}
              />
           
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ backgroundColor: "rgb(167, 165, 165)" }}>
          <TableRow>
          <TableCell>Date & Time</TableCell>
            <TableCell>Product ID</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Selling Price</TableCell>
            <TableCell>MRP</TableCell>
            <TableCell>Sales Description</TableCell>
            <TableCell>Barcode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row, index) => (
            <TableRow key={index}>
            <TableCell>{row.dateTime}</TableCell>
              <TableCell>{row.productId}</TableCell>
              <TableCell>{row.productName}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.SKU}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell>{row.unit}</TableCell>
              <TableCell>{row.sellingPrice}</TableCell>
              <TableCell>{row.mrp}</TableCell>
              <TableCell>{row.salesDescription}</TableCell>
              <TableCell>{row.barcode}</TableCell>
              {/* <TableCell>
                <Button onClick={(event) => handleClick(event, row)}>
                  <MoreHorizIcon />
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
               
              </div>
  
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <div>
                  <Button disabled={currentPage === 1} onClick={handlePrevPage}>
                    <FaChevronLeft />
                  </Button>
                  <span style={{ margin: "0 10px" }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    <FaChevronRight />
                  </Button>
                </div>
                <Typography variant="body2">
                  {" "}
                  <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    style={{ width: "40px", height: "28px" }}
                  >
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                  </select>
                </Typography>
              </div>
              <Button
                  variant="contained"
                  color="primary"
                  // style={{ marginRight: "10px" }}
                  style={{ backgroundColor: "#4679a2",  marginRight: "10px" }}

                >
                  Print Reports
                </Button>
                <Button variant="contained" color="primary"
                  style={{ backgroundColor: "#4679a2" }}
                >
                  Get Reports
                </Button>
              <Modal open={viewDialogOpen} onClose={handleCloseViewDialog}>
                <div>
                  <h2>View Details</h2>
                  {selectedRow && (
                    <div>
                      <p>Pay Component ID: {selectedRow.id}</p>
                      <p>Pay Component Name: {selectedRow.name}</p>
                    </div>
                  )}
                  <Button onClick={handleCloseViewDialog}>Close</Button>
                </div>
              </Modal>
            </div>
          </div>
            </>
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
export default Reports;

