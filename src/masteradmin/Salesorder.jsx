import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material";
import Cookies from "js-cookie";

import { ImBin2 } from "react-icons/im";
import MenuItem from "@material-ui/core/MenuItem";
import Sidebar from "./sidebar";
import Breadcrumb from "./Breadcrumb";
import  Header  from "./header";
import axios from "axios";
import "./dashboard.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import logo from './img/1639571094387.jpg';


const SlipPrint = ({ invoiceId, products }) => {
  const getTotalPrice = () => {
    return products.reduce(
      (acc, product) => acc + (product.quantity * product.price || 0),
      0
    );
  };

  const getProductTotalPrice = (product) => {
    return product.quantity * product.price || 0;
  };

  return (
    <div className="slip-print">
      <Typography variant="h5">Invoice Slip</Typography>
      <div>
        <strong>Invoice Number:</strong> {invoiceId}
      </div>
      <div>
        <strong>Total Price:</strong> ₹{getTotalPrice()}
      </div>
      <div className="es-print-details-section">
        <Typography variant="h5">Product Details</Typography>
        {products.map((product, index) => (
          <div key={index} className="es-print-details-row">
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <strong>Product ID:</strong> {product.productId}
              </Grid>
              <Grid item xs={3}>
                <strong>Quantity:</strong> {product.quantity}
              </Grid>
              <Grid item xs={3}>
                <strong>Price:</strong> ₹{product.price}
              </Grid>
              <Grid item xs={3}>
                <strong>Total Price:</strong> ₹{getProductTotalPrice(product)}
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
    </div>
  );
};

const Salesorder = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, []);

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (!token) {
  //     navigate("/");
  //   } else {
  //     const decoded = jwtDecode(token);
  //     setUsername(decoded.username);
  //     setRole(decoded.role);
  //     if (decoded.role !== "masteradmin") {
  //       navigate("/");
  //     }
  //   }
  // }, []);

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
  }, [navigate]);

  //
  useEffect(() => {
    const fetchSalesInvoices = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:3005/api/sales-invoices", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Determine the next available sale invoice ID based on existing data
        const existingInvoices = response.data;
        const highestId = existingInvoices.reduce((maxId, invoice) => {
          return invoice.saleInvoiceId > maxId ? invoice.saleInvoiceId : maxId;
        }, 0);
        setSaleInvoiceId(highestId + 1);
      } catch (error) {
        console.error("Error fetching sales invoices: ", error);
        if (error.response && error.response.status === 401) {
          navigate("/");
        }
      }
    };
  
    fetchSalesInvoices();
  }, [navigate]);
  
  
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [products, setProducts] = useState([{}]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [productNames, setProductNames] = useState([]);
  const [productName, setProductName] = useState("");
  const [scannerChecked, setScannerChecked] = useState(false);
  const [saleInvoiceId, setSaleInvoiceId] = useState(1)

  const getTotalPrice = () => {
    // const totalPrice = products.reduce(
        return products.reduce(
      (acc, product) => acc + (product.quantity * product.price || 0),
      0
    );
    // return totalPrice;
  };

  const getProductTotalPrice = (product) => {
    return product.quantity * product.price || 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   // Get current date and time formatted as YYYY-MM-DD HH:mm:ss (MySQL datetime format)
  const currentDate = new Date();
  const formattedDateTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');


    if (!customerName || !phoneNumber || !paymentMethod || products.some(product => !product.productId || !product.productName || !product.quantity || !product.price)) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
  
    // Map product names from productIds
    const formData = {
      customerName,
      phoneNumber,
      paymentMethod,
      products: products.map((product) => {
        const matchedProduct = productNames.find(
          (p) => p.productId === product.productId
        );
        return {
          ...product,
          productName: matchedProduct ? matchedProduct.productName : "Unknown", // Set to "Unknown" if no match is found
        };
      }),
      totalPrice: getTotalPrice(),
      username,
      // saleInvoiceId: saleInvoiceId, 
      saleInvoiceId,
      dateandtime: formattedDateTime, // Include formatted date and time in your formData
    };
  
    // Check for any undefined product names
    formData.products.forEach(product => {
      if (!product.productName || product.productName === "Unknown") {
        console.log('Undefined product name for product ID:', product.productId);
      }
    });
  
    axios
      .post("http://localhost:3005/api/save-sales-invoice", formData)
      .then((response) => {
        const newSaleInvoiceId = response.data.saleInvoiceId;
        setSaleInvoiceId(newSaleInvoiceId + 1);
        toast.success("Invoice submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setShowInvoice(true); 
      })
      .catch((error) => {
        console.error("Error submitting sales invoice: ", error);
        toast.error("Failed to submit invoice. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      });
  };
  
  


  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    const productsTable = `
      <table style="width:100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #dddddd; padding: 8px; background-color: #f2f2f2;">Product ID</th>
            <th style="border: 1px solid #dddddd; padding: 8px; background-color: #f2f2f2;">Quantity</th>
            <th style="border: 1px solid #dddddd; padding: 8px; background-color: #f2f2f2;">Price</th>
            <th style="border: 1px solid #dddddd; padding: 8px; background-color: #f2f2f2;">Total Price</th>
          </tr>
        </thead>
        <tbody>
          ${products
            .map(
              (product) => `
            <tr>
              <td style="border: 1px solid #dddddd; padding: 8px;">${
                product.productId
              }</td>
              <td style="border: 1px solid #dddddd; padding: 8px;">${
                product.quantity
              }</td>
              <td style="border: 1px solid #dddddd; padding: 8px;">₹${
                product.price
              }</td>
              <td style="border: 1px solid #dddddd; padding: 8px;">₹${getProductTotalPrice(
                product
              )}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    printWindow.document.write(
      `<html>
        <head>
          <title>Invoice Slip</title>
          <style>
            @media print {
              .no-print { display: none; }
              .slip-print { margin: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="slip-print">
            <h1>Invoice Slip</h1>
            <div><strong>Invoice Number:</strong> ${saleInvoiceId}</div>
            <div><strong>Total Price:</strong> ₹${getTotalPrice()}</div>
            <div class="es-print-details-section">
              <h2>Product Details</h2>
              ${productsTable}
            </div>
          </div>
        </body>
      </html>`
    );

    printWindow.document.close();
    // printWindow.print();
  };

  // const handleSearchChange = (value, index) => {
  //   setProductName(value);
  
  //   fetch(`http://localhost:3005/api/sale-orders?productName=${value}&username=${username}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.length > 0) {
  //         const { productId, productName, price } = data[0];
  //         const updatedProducts = [...products];
  //         updatedProducts[index] = {
  //           ...updatedProducts[index],
  //           productId,
  //           productName,
  //           price,
  //         };
  //         setProducts(updatedProducts);
  
  //         // Ensure productNames array is updated to prevent undefined productName
  //         setProductNames((prevProductNames) => {
  //           // Check if productId already exists in productNames
  //           const exists = prevProductNames.some((p) => p.productId === productId);
  //           if (!exists) {
  //             return [...prevProductNames, { productId, productName }];
  //           }
  //           return prevProductNames;
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching product details: ", error);
  //     });
  // };


  
  
  // useEffect(() => {
  //   fetchProductNames("");
  // }, []);
  
  // const fetchProductNames = (productName) => {
  //   fetch(`http://localhost:3005/api/sale-orders?productName=${productName}&username=${username}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setProductNames(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching product names: ", error);
  //     });
  // };

  useEffect(() => {
        const fetchProductNames = async () => {
          try {
            const token = Cookies.get("token");
            const response = await axios.get("http://localhost:3005/api/products", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const productNamesData = response.data.map((product) => ({
              productId: product.productId,
              productName: product.productName,
            }));
            setProductNames(productNamesData);
          } catch (error) {
            console.error("Error fetching product names: ", error);
          }
        };
        fetchProductNames();
      }, []);
    //

  const paymentHandler = async (e) => {
  const amount = getTotalPrice() * 100; // Convert to paisa
  const response = await fetch("http://localhost:3005/order", {
    method: "POST",
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt: "qwsaq1", // Replace with your receipt ID logic if necessary
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const order = await response.json();
  console.log(order);

  var options = {
    key: "rzp_live_2EWSvUx7aMmKbv",
    amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Yatayati", // Your business name
    description: "Test Transaction",
    image: logo,
    order_id: order.id,
    handler: async function (response) {
      const body = {
        ...response,
      };

      const validateRes = await fetch("http://localhost:3005/order/validate", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonRes = await validateRes.json();
      console.log(jsonRes);

      // After successful payment validation, proceed with form submission
      handleSubmit(e);
    },
    prefill: {
      name: "Web Dev Matrix", // Your customer's name
      email: "webdevmatrix@example.com",
      contact: "9000000000", // Provide the customer's phone number for better conversion rates
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  var rzp1 = new window.Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
  rzp1.open();
  e.preventDefault();
};

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <div className="emp-sales-main">
          <Container>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Sales Invoice ID"
                    type="text"
                    value={saleInvoiceId}
                    onChange={(e) => setSaleInvoiceId(e.target.value)}
                    required
                    style={{ margin: "5px" }}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Customer Name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    style={{ margin: "5px" }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Phone Number"
                    type="text"
                    pattern="[0-9]*"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    style={{ margin: "5px" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    label="Payment Method"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                    style={{ margin: "5px", minWidth: "160px" }}
                  >
                    <MenuItem value="">Select Payment Method</MenuItem>
                    <MenuItem value="phonePay">Phone Pay</MenuItem>
                    <MenuItem value="googlePay">Google Pay</MenuItem>
                    <MenuItem value="paytm">Paytm</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              {/* <div style={{ display: 'flex', alignItems: 'center' }}>
  <Checkbox
    checked={scannerChecked}
    onChange={handleScannerToggle}
  />
  <span>Scanner</span>
</div> */}

{/* {scannerChecked && <BarcodeScanner onScan={handleBarcodeScan} scannerChecked={scannerChecked} />}    */}
<div className="es-section">
                <Typography variant="h5">Products</Typography>
                {products.map((product, index) => (
                  <div key={index} className="d-flex">
                    <div>
                      <Grid container spacing={2}>
                        <Grid item xs={2}>
                          <TextField
                            label="Product ID"
                            type="text"
                            value={product.productId || ""}
                            onChange={(e) => {
                              const updatedProducts = [...products];
                              updatedProducts[index].productId = e.target.value;
                              setProducts(updatedProducts);
                            }}
                            disabled
                            required
                            style={{ margin: "5px" }}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          {/* <Autocomplete
                            options={productNames.map(
                              (option) => option.productName
                            )}
                            freeSolo
                            onInputChange={(event, newInputValue) => {
                              handleSearchChange(newInputValue, index); // Pass index here
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Product Name"
                                variant="outlined"
                                value={productName}
                              />
                            )}
                            required
                            style={{ margin: "5px" }}
                          /> */}
                          <Autocomplete
                    options={productNames.map(
                      (product) => product.productName
                    )}
                    value={product.productName || ""}
                    onChange={(e, newValue) => {
                      const updatedProducts = [...products];
                      updatedProducts[index].productName = newValue;
                      setProducts(updatedProducts);
                      const matchedProduct = productNames.find(
                        (p) => p.productName === newValue
                      );
                      if (matchedProduct) {
                        updatedProducts[index].productId =
                          matchedProduct.productId;
                        setProducts(updatedProducts);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Product Name" />
                    )}
                  />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            label="Quantity"
                            type="number"
                            value={product.quantity || ""}
                            onChange={(e) => {
                              const updatedProducts = [...products];
                              updatedProducts[index].quantity = e.target.value;
                              setProducts(updatedProducts);
                            }}
                            required
                            style={{ margin: "5px" }}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            label="Price"
                            type="number"
                            value={product.price || ""}
                            onChange={(e) => {
                              const updatedProducts = [...products];
                              updatedProducts[index].price = e.target.value;
                              setProducts(updatedProducts);
                            }}
                            required
                            style={{ margin: "5px" }}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            label="Total Price"
                            type="text"
                            value={`₹${getProductTotalPrice(product)}`}
                            readOnly
                            style={{ margin: "5px" }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteProduct(index)}
                        style={{ margin: "5px" }}
                      >
                        <ImBin2 />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setProducts([...products, {}])}
                  style={{ margin: "5px" }}
                >
                  Add Product
                </Button>

                <Button type="submit" variant="contained" color="success" onClick={paymentHandler}>
                  Submit
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handlePrint}
                  >
                    Print
                  </Button>
              </div>
            </form>

            {showInvoice && (
              <>
                {/* <div className="qr-code-section">
                  <QRCode value={`Payment information for ${paymentMethod}`} />
                </div> */}

                <div className="total-section">
                  <Grid container spacing={2}>
                  <Grid item xs={6}>
                      <TextField
                        label="Invoice Number"
                        type="text"
                        value={saleInvoiceId}
                        readOnly
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Total Amount"
                        type="text"
                        value={`₹${getTotalPrice()}`}
                        readOnly
                      />
                    </Grid>
                   
                  </Grid>
                </div>

                
              </>
            )}
          </Container>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
export default Salesorder;