import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import Sidebar from "./sidebar";
import  Header  from "./header";
import Breadcrumb from "./Breadcrumb";

const Employeeinvoice = () => {
  const [invoiceId, setInvoiceId] = useState("");

  const handleInputChange = (e) => {
    setInvoiceId(e.target.value);
  };

  const handleGetDetails = () => {
    // Add your logic to fetch details based on the invoiceId
    console.log(`Fetching details for Invoice ID: ${invoiceId}`);
  };

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <div className=" row justify-content-center" style={{ gridArea: "main" }}>
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
        </div>
      </div>
    </div>
  );
};
export default Employeeinvoice;