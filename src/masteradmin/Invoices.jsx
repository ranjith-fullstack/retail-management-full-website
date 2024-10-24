import React, { useState ,useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Sidebar from "./sidebar";
import Header  from "./header";
import Breadcrumb from "./Breadcrumb";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Invoices = () => {
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [error, setError] = useState("");
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
        const response = await axios.get("http://localhost:3005/api/invoice/:invoiceId", {
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
  const handleInputChange = (e) => {
    setInvoiceId(e.target.value);
  };

  const handleGetDetails = () => {
    const token = Cookies.get("token");
    axios
      .get(`http://localhost:3005/api/invoice/${invoiceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const invoiceData = response.data;
        if (invoiceData.length > 0 && invoiceData[0].username === username) {
          setInvoiceDetails(invoiceData);
          setError("");
        } else {
          setError("Invoice not found or unauthorized access");
          setInvoiceDetails([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching invoice details: ", error);
        setError("Failed to fetch invoice details. Please try again.");
        setInvoiceDetails([]);
      });
  };
  
  const {
    saleInvoiceId,
    customerName,
    phoneNumber,
    paymentMethod,
    totalPrice
  } = invoiceDetails.length > 0 ? invoiceDetails[0] : {};

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <div className="row justify-content-center" style={{ gridArea: "main" }}>
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Invoice ID"
                variant="outlined"
                value={invoiceId}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGetDetails}
                style={{ background: "green" }}
              >
                Get Details
              </Button>
            </Grid>
          </Grid>
          {error && (
            <Typography color="error" style={{ marginTop: 20 }}>
              {error}
            </Typography>
          )}
          {invoiceDetails.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <Typography variant="h6"><b>INVOICE DETAILS</b></Typography>
              <h6>Invoice Id: {saleInvoiceId}</h6>
              <h6>Customer Name: {customerName}</h6>
              <h6>Phone Number: {phoneNumber}</h6>
              <h6>Payment Method: {paymentMethod}</h6>
              <h6>Total Price: {totalPrice}</h6>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#f0f0f0" }}>
                      {/* <TableCell>ID</TableCell> */}
                      <TableCell>Product ID</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Total Amount</TableCell>
                      {/* <TableCell>Total Price</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoiceDetails.map((row) => (
                      <TableRow key={row.id}>
                        {/* <TableCell>{row.id}</TableCell> */}
                        <TableCell>{row.productId}</TableCell>
                        <TableCell>{row.productName}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.totalAmount}</TableCell>
                        {/* <TableCell>{row.totalPrice}</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Invoices;