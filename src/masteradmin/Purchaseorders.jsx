import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./dashboard.css";
import axios from "axios";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { ImBin2 } from "react-icons/im";
import { IoPrintSharp } from "react-icons/io5";
import DatePicker from "@mui/lab/DatePicker";
import { ArrowUpward } from "@mui/icons-material";
import Sidebar from "./sidebar";
import  Header  from "./header";
import Breadcrumb from "./Breadcrumb";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SlipPrint = ({
  invoiceId,
  products,
  SupplierName,
}) => {
  const getTotalPrice = () => {
    return products.reduce(
      (acc, product) => acc + (product.quantity * product.price || 0),
      0
    );
  };

  return (
    <div className="orders-main">
      <Typography variant="h2">Invoice Slip</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>Invoice Number:</strong>
              </TableCell>
              <TableCell>{invoiceId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Supplier ID:</strong>
              </TableCell>
              <TableCell>{SupplierName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Total Price:</strong>
              </TableCell>
              <TableCell>₹{getTotalPrice()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className="product-details-section">
        <Typography variant="h2">Product Details</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Discount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.productId}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>
                    {product.discount} {product.unit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

const Purchaseorders = () => {
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
    const fetchPurchaseInvoices = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:3005/api/purchase-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Determine the next available purchase invoice ID based on existing data
        const existingInvoices = response.data;
        const highestId = existingInvoices.reduce((maxId, invoice) => {
          return invoice.invoiceId > maxId ? invoice.invoiceId : maxId;
        }, 0);
        setInvoiceId(highestId + 1);
      } catch (error) {
        console.error("Error fetching purchase invoices: ", error);
        if (error.response && error.response.status === 401) {
          navigate("/");
        }
      }
    };
  
    fetchPurchaseInvoices();
  }, [navigate]);
  
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [SupplierName, setSupplierName] = useState("");
  const [purchaseInvoiceId, setPurchaseInvoiceId] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(new Date());
  const [products, setProducts] = useState([
    {
      productId: "",
      productName: "",
      quantity: 0,
      price: 0,
      discount: "",
      unit: "",
    },
  ]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showPrintButton, setShowPrintButton] = useState(false);
  const [paymentType, setPaymentType] = useState("");
 
  const [errors, setErrors] = useState({});
  const purchaseordersIdRef = useRef(null);
  const SupplierNameRef = useRef(null);
  const expectedDeliveryDateRef = useRef(null);
  const purchaseInvoiceIdRef = useRef(null);

  const [invoiceId, setInvoiceId] = useState(1)

  const validateForm = () => {
    const newErrors = {};
    if (!purchaseInvoiceId) {
      newErrors.purchaseInvoiceId = "Purchase Invoice ID is required";
    }
    if (!SupplierName) {
      newErrors.SupplierName = "Supplier ID is required";
    }
    if (!paymentType) {
      newErrors.paymentType = "Payment Terms are required";
    }
    if (products.some(product => !product.productId || !product.productName || !product.quantity || !product.price || !product.discount || !product.unit)) {
      newErrors.products = "All product details are required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const getTotalPrice = () => {
    const totalPrice = products.reduce(
      (acc, product) => acc + (product.quantity * product.price || 0),
      0
    );
    return totalPrice;
  };

  const getProductTotalPrice = (product) => {
    return product.quantity * product.price || 0;
  };

  const handleKeyDown = (e, nextInputRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        nextInputRef &&
        nextInputRef.current &&
        typeof nextInputRef.current.focus === "function"
      ) {
        nextInputRef.current.focus();
      } else if (
        nextInputRef === purchaseordersIdRef &&
        SupplierNameRef.current &&
        typeof SupplierNameRef.current.focus === "function"
      ) {
        SupplierNameRef.current.focus();
      } else {
        handleSubmit(e);
      }
    }
  };
  const [existingOrders, setExistingOrders] = useState([]); 
  
  const handleSubmit = (e) => {
    e.preventDefault();  
    if (validateForm()) {
      const formData = {
        purchaseInvoiceId,
        SupplierName,
        paymentType,
        products,
        username,
      };
  
      const token = Cookies.get("token");
  
      axios
        .post("http://localhost:3005/api/purchase-orders", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const newInvoiceId = response.data.invoiceId;
          setInvoiceId(newInvoiceId + 1);  
          setExistingOrders([...existingOrders, { ...formData, invoiceId: newInvoiceId }]);
          toast.success("Invoice submitted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        })
        .catch((error) => {
          console.error("Error submitting purchase order: ", error);
          toast.error("Failed to submit invoice. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        });
    } else {
      toast.error("Please fix the validation errors", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  
  
  

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<!DOCTYPE html>
      <html><head><title>Invoice Slip</title>
      <style>
        @media print {
          .no-print { display: none; }
          .slip-print {
            margin: 20px;
            font-family: sans-serif; /* Set a basic font family */
          }
          .purchase-info-section,
          .product-details-section {
            margin: 20px;
          }
          table {
            width: 100%; /* Ensure table fills available space */
            border-collapse: collapse; /* Remove table borders */
          }
          th, td {
            padding: 10px; /* Add padding for better readability */
            border: 1px solid #ddd; /* Add thin table borders */
            text-align: left; /* Align content to the left */
          }
          th {
            background-color: #f2f2f2; /* Light gray background for headings */
          }
        }
      </style>
      </head><body>`
    );

    // Purchase Information Section
    printWindow.document.write(
      `
    <div class="slip-print">
      <div class="header">
        <h2>Purchase Order Information</h2>
      </div>
      <div class="info-section">
        <div><strong>Purchase Order ID:</strong> ` +
        invoiceId +
        `</div>
        <div><strong>Supplier ID:</strong> ` +
        SupplierName +
        `</div>
        <div><strong>Expected Delivery Date:</strong> ` +
        expectedDeliveryDate.toLocaleDateString() +
        `</div>
        <div><strong>Date and Time:</strong> ` +
        new Date().toLocaleString() +
        `</div>
        <div><strong>Total Purchase Price:</strong> ₹` +
        getTotalPrice() +
        `</div>
      </div>
    </div>
  
    <style>
      @media print {
        .slip-print {
          margin: 20px;
          font-family: sans-serif;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .info-section {
          display: flex;
          flex-direction: column;
          gap: 10px; /* Spacing between info items */
        }
        .info-section div {
          font-weight: bold;
        }
      }
    </style>
  `
    );

    // Product Details Section
    printWindow.document.write(`
      <div class="product-details-section">
        <h2>Product Details</h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
    `);

    products.forEach((product, index) => {
      printWindow.document.write(
        `
        <tr>
          <td>` +
          product.productId +
          `</td>
          <td>` +
          product.productName +
          `</td>
          <td>` +
          product.quantity +
          `</td>
          <td>₹` +
          product.price +
          `</td>
          <td>₹` +
          getProductTotalPrice(product) +
          `</td>
        </tr>
      `
      );
    });

    printWindow.document.write(`
          </tbody>
        </table>
      </div>
    `);

    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        productId: "",
        productName: "",
        quantity: 0,
        price: 0,
        discount: "",
        unit: "",
      },
    ]);
  };


  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [supplierData, setSupplierData] = useState([]);

 

  const fetchData = () => {
    const token = Cookies.get("token");
    axios
      .get("http://localhost:3005/api/suppliers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSupplierData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suppliers: ", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSupplierNameChange = (event, value) => {
    setSupplierName(value || ""); 
  };

  const handleInputChangee = (event, value) => {
    setSupplierName(value || "");
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [productNames, setProductNames] = useState([]);
  const [productId, setProductId] = useState("");
  const setProductName=(i,value)=>{
    const productsupdate = [...products]
    const obj =productsupdate[i];
    obj.productName = value;
    fetchProductId(obj,value);
    productsupdate[i]=obj;
    setProducts([...productsupdate])
    
  }

  const handleSearchChange = (e, i) => {
    const token = Cookies.get("token");
    const { value } = e.target;
    setSearchTerm(value);
  
    fetch(`http://localhost:3005/api/productss?searchTerm=${value}`,{
       headers: {
            Authorization: `Bearer ${token}`,
          },
    })
      .then((response) => response.json())
      .then((data) => {
        setProductNames(data);
      })
      .catch((error) => {
        console.error("Error fetching product names: ", error);
      });
  };

  useEffect(() => {
    if (searchTerm) {
      fetchProductId();
    }
  }, [searchTerm]);

  const fetchProductId = async (obj,value) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `http://localhost:3005/api/productts/${value}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.length > 0) {
        obj.productId = response.data[0].productId
      } else {
        setProductId("");
      }
    } catch (error) {
      console.error("Error fetching product ID:", error);
    }
  };
 
  
  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <div className="purchase-main">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="invoiceId"
                label="Purchase Order ID"
                variant="outlined"
                value={invoiceId}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="purchaseInvoiceId"
                label="Purchase Invoice ID"
                variant="outlined"
                value={purchaseInvoiceId}
                onChange={(e) => setPurchaseInvoiceId(e.target.value)}
                inputRef={purchaseInvoiceIdRef}
                onKeyDown={(e) => handleKeyDown(e, purchaseInvoiceIdRef)}
                required
                error={!!errors.purchaseInvoiceId}
                helperText={errors.purchaseInvoiceId}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="SupplierName"
                options={supplierData}
                getOptionLabel={(option) => option}
                value={SupplierName}
                onChange={handleSupplierNameChange}
                inputValue={SupplierName}
                onInputChange={handleInputChangee}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: 210 }}
                    label="Supplier Name"
                    variant="outlined"
                    required
                    error={!!errors.SupplierName}
                    helperText={errors.SupplierName}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="paymentType"
                label="Payment Type"
                variant="outlined"
                select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                SelectProps={{ native: true }}
                error={!!errors.paymentType}
                helperText={errors.paymentType}
                required
              >
                <option value=""></option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
               </TextField>
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                id="expectedDeliveryDate"
                label="Expected Delivery Date"
                value={expectedDeliveryDate}
                onChange={(e) => setExpectedDeliveryDate(e.target.value)}      
                inputRef={expectedDeliveryDateRef}
                renderInput={(params) => <TextField {...params} />}
                required
              
                
              />
            </Grid>
          </Grid>
          <div>
            <Grid spacing={2}>
              {products.map((product, index) => (
                <React.Fragment key={index}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={2}>
                      <TextField
                        type="text"
                        label="Product ID"
                        variant="outlined"
                        value={product.productId}
                        error={!!errors.productId}
                helperText={errors.productId} 
                required
                        style={{ margin: "5px" }}
                        disabled={true}
                      />
                      
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Autocomplete
                        options={productNames}
                        freeSolo
                        
                        onInputChange={(event, newInputValue) => {
                          setProductName(index,newInputValue);
                          
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Product Name"
                            variant="outlined"
                            onChange={(e)=>handleSearchChange(e,index)}
                            value={product.productName}
                          />
                        )}
                        error={!!errors.productName}
                helperText={errors.productName} 
                required
                        style={{ margin: "5px" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        type="number"
                        label="Quantity"
                        variant="outlined"
                        value={product.quantity || ""}
                        onChange={(e) => {
                          const updatedProducts = [...products];
                          updatedProducts[index].quantity = e.target.value;
                          setProducts(updatedProducts);
                        }}
                        required
                        error={!!errors.quantity}
                helperText={errors.quantity} 
                        style={{ margin: "5px" }}
                      />
                     
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        type="number"
                        label="Price"
                        variant="outlined"
                        value={product.price || ""}
                        onChange={(e) => {
                          const updatedProducts = [...products];
                          updatedProducts[index].price = e.target.value;
                          setProducts(updatedProducts);
                        }}
                        required
                        error={!!errors.price}
                helperText={errors.price} 
                        style={{ margin: "5px" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <div className="discount-group">
                        <TextField
                          type="text"
                          label="Discount"
                          variant="outlined"
                          onChange={(e) => {
                            const updatedProducts = [...products];
                            updatedProducts[index].discount = e.target.value;
                            setProducts(updatedProducts);
                          }}
                          required
                          error={!!errors.discount}
                helperText={errors.discount} 
                          style={{ margin: "5px" }}
                        />
                        <TextField
                          select
                          label="Unit"
                          variant="outlined"
                          onChange={(e) => {
                            const updatedProducts = [...products];
                            updatedProducts[index].unit = e.target.value;
                            setProducts(updatedProducts);
                          }}
                          error={!!errors.unit}
                helperText={errors.unit} 
                          SelectProps={{ native: true }}
                          style={{ margin: "5px" }}
                        >
                          <option value=""></option>
                          <option value="%">%</option>
                          <option value="Rs">Rs</option>
                        </TextField>
                      </div>
                    </Grid>
                    <Grid item xs={1} md={1}>
                      <Grid className="d-flex flex-column justify-content-center">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteProduct(index)}
                        >
                          <ImBin2 />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddProduct}
                >
                  Add Product
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                {showPrintButton && (
                  <Button
                    className="Pnt-btn"
                    variant="secondary"
                    onClick={handlePrint}
                  >
                    <IoPrintSharp /> Print Invoice
                  </Button>
                )}
              </Grid>
            </Grid>
          </div>

          {showInvoice && (
            <SlipPrint
              invoiceId={invoiceId}
              products={products}
              customerName={customerName}
              phoneNumber={phoneNumber}
              SupplierName={SupplierName}
            />
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
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Purchaseorders;
