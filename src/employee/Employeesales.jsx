import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Grid, TextField, Button, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import { ImBin2 } from "react-icons/im";
import MenuItem from "@material-ui/core/MenuItem";
import Sidebar from "./sidebar";
import Breadcrumb from "./Breadcrumb";
import Header from "./header";
import "./dashboard.css";

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

const Employeesales = () => {
  const [invoiceId, setInvoiceId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [products, setProducts] = useState([
    { productId: "", quantity: 0, price: 0 },
  ]);
  const [showInvoice, setShowInvoice] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Invoice submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    setShowInvoice(true);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Invoice Slip</title></head><body>"
    );
    printWindow.document.write(
      "<style>@media print{.no-print{display:none;}.slip-print{margin: 20px;}}</style>"
    );
    printWindow.document.write(
      '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">'
    );
    ReactDOM.render(
      <SlipPrint invoiceId={invoiceId} products={products} />,
      printWindow.document.body
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const handleAddProduct = () => {
    setProducts([...products, { productId: "", quantity: 0, price: 0 }]);
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
                    label="Invoice ID"
                    type="text"
                    value={invoiceId}
                    onChange={(e) => setInvoiceId(e.target.value)}
                    required
                    style={{ margin: "5px" }}
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
              <div className="es-section">
                <Typography variant="h5">Products</Typography>
                {products.map((product, index) => (
                  <div key={index} className="d-flex">
                    <div>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <TextField
                            label="Product ID"
                            type="text"
                            value={product.productId || ""}
                            onChange={(e) => {
                              const updatedProducts = [...products];
                              updatedProducts[index].productId = e.target.value;
                              setProducts(updatedProducts);
                            }}
                            required
                            style={{ margin: "5px" }}
                          />
                        </Grid>
                        <Grid item xs={3}>
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
                        <Grid item xs={3}>
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
                        <Grid item xs={3}>
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
                  onClick={handleAddProduct}
                  style={{ margin: "5px" }}
                >
                  Add Product
                </Button>
                <Button type="submit" variant="contained" color="success">
                  Submit
                </Button>
              </div>
            </form>
            {showInvoice && (
              <>
                <div className="qr-code-section">
                  <QRCode value={`Payment information for ${paymentMethod}`} />
                </div>
                <div className="total-section">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Total Price"
                        type="text"
                        value={`₹${getTotalPrice()}`}
                        readOnly
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Invoice Number"
                        type="text"
                        value={invoiceId}
                        readOnly
                      />
                    </Grid>
                  </Grid>
                </div>
                <div className="es-details-section">
                  <Typography variant="h5">Product Details</Typography>
                  {products.map((product, index) => (
                    <div key={index}>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <TextField
                            label="Product ID"
                            type="text"
                            value={product.productId || ""}
                            readOnly
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Quantity"
                            type="text"
                            value={product.quantity || ""}
                            readOnly
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Price"
                            type="text"
                            value={`₹${product.price || ""}`}
                            readOnly
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Total Price"
                            type="text"
                            value={`₹${getProductTotalPrice(product)}`}
                            readOnly
                          />
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handlePrint}
                  >
                    Print
                  </Button>
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
export default Employeesales;