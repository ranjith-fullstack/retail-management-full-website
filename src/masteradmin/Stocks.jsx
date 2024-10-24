import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import  Header  from "./header";
import "./dashboard.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Breadcrumb from "./Breadcrumb";
import { makeStyles } from "@material-ui/core/styles";
import Barcode from "react-barcode";
import { Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Paper, Select, MenuItem } from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ArrowUpward } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
 
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  inputProps: {
    borderRadius: "10px",
    padding: "10px 15px",
    height: "50px",
    color: "#31363F",
  },
  inputLabelProps: {
    padding: "0 10px",
    color: "#31363F",
  },
  commonStyles: {
    marginRight: "10px",
    marginBottom: "20px",
    width: "300px",
  },
}));
 
const Stocks = () => {
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
        const response = await axios.get("http://localhost:3005/api/products", {
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

  const [initialSearchQuery, setInitialSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [tableSearchQuery, setTableSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [error, setError] = useState("");
 
  const handleInitialSearchChange = (event) => {
    setInitialSearchQuery(event.target.value);
    if (event.target.value) {
      setError(""); // Clear error when the input is valid
    }
  };
 
  const handleSubmitSearch = () => {
    if (!initialSearchQuery) {
      setError("Please enter a valid Product ID or Name.");
      return;
    }
    setSubmittedQuery(initialSearchQuery);
    setSearchSubmitted(true);
    fetchData();
  };
 
  const handleTableSearchChange = (event) => {
    setTableSearchQuery(event.target.value);
  };
 
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
 
  const fetchData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:3005/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };
 
  useEffect(() => {
    if (searchSubmitted) {
      fetchData();
    }
  }, [searchSubmitted]);
 
  const filteredData = data.filter(
    (item) =>
      item.productName.toLowerCase().includes(submittedQuery.toLowerCase()) ||
      String(item.productId).toLowerCase().includes(submittedQuery.toLowerCase())
  );
 
  const tableFilteredData = filteredData.filter(
    (item) =>
      item.productName.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      String(item.productId).toLowerCase().includes(tableSearchQuery.toLowerCase())
  );
 
  const totalPages = Math.ceil(tableFilteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, tableFilteredData.length);
  const currentData = tableFilteredData.slice(startIndex, endIndex);
 
  const classes = useStyles();
 
  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <br />
        <div>
          <div>
            <TextField
              id="product-id"
              label="Product ID/Name"
              variant="outlined"
              value={initialSearchQuery}
              onChange={handleInitialSearchChange}
              InputProps={{ className: classes.inputProps }}
              InputLabelProps={{ className: classes.inputLabelProps }}
              className={classes.commonStyles}
              error={!!error}
              helperText={error}
            />
            <Button onClick={handleSubmitSearch} variant="contained" color="primary">
              Submit
            </Button>
          </div>
          {searchSubmitted && (
            <div style={{ marginTop: 30 }}>
              <TextField
                variant="outlined"
                label="Search by ID or Name:"
                value={tableSearchQuery}
                onChange={handleTableSearchChange}
                className="hr-text"
                style={{ marginLeft: "10px", marginBottom: "20px" }}
              />
              {tableFilteredData.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
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
                        <TableCell>Purchase Price</TableCell>
                        <TableCell>Purchase Description</TableCell>
                        <TableCell>Barcode</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentData.map((row) => (
                        <TableRow key={row.productId}>
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
                          <TableCell>{row.purchasePrice}</TableCell>
                          <TableCell>{row.purchaseDescription}</TableCell>
                          <TableCell>
                            <Barcode value={row.barcode} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No products found.</Typography>
              )}
              <div>
                <Button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  variant="contained"
                  color="primary"
                >
                  <FaChevronLeft />
                </Button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  variant="contained"
                  color="primary"
                >
                  <FaChevronRight />
                </Button>
                <div>
                  <span>Rows per page:</span>
                  <Select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    variant="outlined"
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            borderRadius: "50%",
            minWidth: "40px",
            minHeight: "40px",
          }}
          onClick={handleScrollToTop}
        >
          <ArrowUpward />
        </Button>
      </div>
    </div>
  );
};
 
export default Stocks;