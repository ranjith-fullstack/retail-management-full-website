import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header  from "./header";
import "./dashboard.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Breadcrumb from "./Breadcrumb";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Barcode from "react-barcode";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
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
}));
const Products = () => {
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
    const fetchProductData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:3005/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Determine the next available product ID based on existing data
        const existingProducts = response.data;
        const highestId = existingProducts.reduce((maxId, product) => {
          return product.productId > maxId ? product.productId : maxId;
        }, 0);
        setProductId(highestId + 1);
      } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.status === 401) {
          navigate("/");
        }
      }
    };
  
    fetchProductData();
  }, [navigate]);
  

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [SKU, setSKU] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  const [productId ,setProductId]=useState(1);
  const [selectedCategory, setselectedCategory] = useState();

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };
  const handleClick = (event, row) => {
    setSelectedRow(row);
    setViewDialogOpen(true);
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

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
  };
  let filteredData = [...data];

  if (searchQuery) {
    filteredData = filteredData.filter(
      (item) =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.productId).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

  const classes = useStyles();
  const [showSalesInfo, setShowSalesInfo] = useState(false);

  const handleSalesInfoChange = () => {
    setShowSalesInfo(!showSalesInfo);
  };

  const [categoryNames, setCategoryNames] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:3005/api/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`Failed to fetch categories. Status: ${response.status}`);
        }
        setCategoryNames(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);
  


  const [sellingPriceInr, setSellingPriceInr] = useState("");
  const [mrp, setMrp] = useState("");
  const [salesDescription, setSalesDescription] = useState("");
  const [productNameError, setProductNameError] = useState("");
  const [selectedCategoryError, setSelectedCategoryError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [SKUError, setSKUError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [unitError, setUnitError] = useState("");
  const [sellingPriceInrError, setSellingPriceInrError] = useState("");
  const [mrpError, setMrpError] = useState("");
  const [salesDescriptionError, setSalesDescriptionError] = useState("");
 
  const handleSubmit = () => {
    setProductNameError("");
    setSelectedCategoryError("");
    setDescriptionError("");
    setSKUError("");
    setWeightError("");
    setUnitError("");
    setSellingPriceInrError("");
    setMrpError("");
    setSalesDescriptionError("");

    let hasErrors = false;
    if (!productName) {
      setProductNameError("Product name is required");
      hasErrors = true;
    }
    if (!selectedCategory) {
      setSelectedCategoryError("Category is required");
      hasErrors = true;
    }
    if (!description) {
      setDescriptionError("Description is required");
      hasErrors = true;
    }
    if (!SKU) {
      setSKUError("SKU is required");
      hasErrors = true;
    }
    if (!weight) {
      setWeightError("Weight is required");
      hasErrors = true;
    }
    if (!unit) {
      setUnitError("Unit is required");
      hasErrors = true;
    }
    if (!sellingPriceInr) {
      setSellingPriceInrError("Selling price is required");
      hasErrors = true;
    }
    if (!mrp) {
      setMrpError("MRP is required");
      hasErrors = true;
    }
    if (!salesDescription) {
      setSalesDescriptionError("Sales description is required");
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    // Fetch existing products from the database
    const token = Cookies.get("token");
    axios
      .get("http://localhost:3005/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const existingProducts = response.data;
        if (
          existingProducts.some(
            (product) => product.productName === productName
          )
        ) {
          setProductNameError("Product with this name already exists");
          return;
        }
        const currentDateAndTime = new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
        const generatedBarcode = generateBarcode();
        const productData = {
          productId: productId,
          productName: productName,
          category: selectedCategory,
          description: description,
          SKU: SKU,
          weight: weight,
          unit: unit,
          sellingPrice: sellingPriceInr,
          mrp: mrp,
          salesDescription: salesDescription,
          dateTime: currentDateAndTime,
          barcode: generatedBarcode,
          username: username, // Add username field
        };

        axios
          .post("http://localhost:3005/api/products", productData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData([...data, productData]);
            setProductId(productId + 1); // Set product ID
          })
          .catch((error) => {
            console.error("Error adding product: ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
      });
  };

  const generateBarcode = () => {
    return Math.floor(Math.random() * 1000000000000).toString();
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
    fetchData();
  }, []);
  
  const handleEditFieldChange = (event, field) => {
    const { value } = event.target;
    setSelectedRow((prevSelectedRow) => ({
      ...prevSelectedRow,
      [field]: value,
    }));
  };
  const handleEdit = (row) => {
    setSelectedRow(row);
    const selectedCategory = categoryNames.find(
      (category) => category.id === row.category
    );
    setselectedCategory(selectedCategory);
    setViewDialogOpen(true);
  };
  const handleSaveChanges = () => {
    const updatedRow = { ...selectedRow };
    delete updatedRow.originalProperty;
    axios
      .put(`http://localhost:3005/products/${updatedRow.productId}`, updatedRow)
      .then((response) => {
        console.log("Product updated successfully");
        fetchData();
        handleCloseViewDialog();
      })
      .catch((error) => {
        console.error("Error updating product: ", error);
      });
  };
  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:3005/api/products/${productId}`)
      .then((response) => {
        console.log("Product deleted successfully");
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting product: ", error);
      });
  };

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <div>
          <div>
            <div>
              <div
                className={`${classes.root}  dashboard-table-wrapper`}
                noValidate
                autoComplete="off"
              >
                <div className="row productsinputs">
                  <div>
                    <TextField
                      id="product-id"
                      label="Product ID"
                      variant="outlined"
                      value={productId}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div>
                    <TextField
                      id="product-name"
                      label="Product Name"
                      variant="outlined"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      error={!!productNameError}
                      helperText={productNameError}
                      required
                    />
                  </div>
                </div>
                <div className="row productsinputs">
                  <div>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={categoryNames}
                      value={selectedCategory}
                      onInputChange={(event, newInputValue) => {
                        setselectedCategory(newInputValue);
                      }}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Categories Name"
                          error={!!selectedCategoryError}
                          helperText={selectedCategoryError}
                          required
                        />
                      )}
                    />
                  </div>

                  <div>
                    <TextField
                      id="description"
                      label="Description"
                      variant="outlined"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      error={!!descriptionError}
                      helperText={descriptionError}
                      required
                    />
                  </div>
                </div>
                <div className="row productsinputs">
                  <div>
                    <TextField
                      id="SKU"
                      label="SKU"
                      variant="outlined"
                      value={SKU}
                      onChange={(e) => setSKU(e.target.value)}
                      error={!!SKUError}
                      helperText={SKUError}
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      id="weight"
                      label="Weight"
                      variant="outlined"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      error={!!weightError}
                      helperText={weightError}
                      required
                    />
                    <Select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      style={{ marginTop: "8px" }}
                      error={!!unitError}
                      required
                    >
                      <MenuItem value="kg">kg</MenuItem>
                      <MenuItem value="g">g</MenuItem>
                      <MenuItem value="lb">lb</MenuItem>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showSalesInfo}
                    onChange={handleSalesInfoChange}
                  />
                }
                label="Sales Information"
              />
            </div>
            {showSalesInfo && (
              <div className="infoproducts">
                <TextField
                  label="Selling Price (INR)"
                  style={{ margin: "3px" }}
                  value={sellingPriceInr}
                  onChange={(e) => setSellingPriceInr(e.target.value)}
                  error={!!sellingPriceInrError}
                  helperText={sellingPriceInrError}
                  required
                />

                <TextField
                  label="MRP"
                  style={{ margin: "3px" }}
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  error={!!mrpError}
                  helperText={mrpError}
                  required
                />

                <TextField
                  label="Sales Description"
                  style={{ margin: "3px" }}
                  value={salesDescription}
                  onChange={(e) => setSalesDescription(e.target.value)}
                  error={!!salesDescriptionError}
                  helperText={salesDescriptionError}
                  required
                />
              </div>
            )}
          </div>
          <div className="row productsbutton">
            <button
              className="buttongngn"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
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
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Sku</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Selling Price</TableCell>
                    <TableCell>Sales-Mrp</TableCell>
                    <TableCell>Sales-Description</TableCell>
                    <TableCell>Date and Time</TableCell>
                    <TableCell>Barcode</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.map((row, index) => (
                    <TableRow key={index}>
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
                      <TableCell>{row.dateTime}</TableCell>
                      <TableCell>
                        <Barcode value={row.barcode} />
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(row)}>Edit</Button>
                        <Button onClick={() => handleDelete(row.productId)}>
                          Delete
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

            <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogContent>
                {selectedRow && (
                  <div>
                    <TextField
                      label="Product ID"
                      value={selectedRow.productId}
                      disabled
                      fullWidth
                      style={{ marginBottom: "10px" }}
                    />
                    <TextField
                      label="Product Name"
                      value={selectedRow.productName}
                      fullWidth
                      style={{ marginBottom: "10px" }}
                      onChange={(event) =>
                        handleEditFieldChange(event, "productName")
                      } // Pass the field name here
                    />
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={categoryNames}
                      value={selectedRow.category}
                      onChange={(event, newValue) =>
                        handleEditFieldChange(newValue, "category")
                      }
                      fullWidth
                      style={{ marginBottom: "10px" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Category" />
                      )}
                    />
                    <TextField
                      label="Description"
                      value={selectedRow.description}
                      fullWidth
                      style={{ marginBottom: "10px" }}
                      onChange={(event) =>
                        handleEditFieldChange(event, "description")
                      }
                    />
                    <TextField
                      label="SKU"
                      value={selectedRow.SKU}
                      fullWidth
                      style={{ marginBottom: "10px" }}
                      onChange={(event) => handleEditFieldChange(event, "SKU")}
                    />
                    <TextField
                      label="Weight"
                      value={selectedRow.weight}
                      fullWidth
                      style={{ marginBottom: "10px" }}
                      onChange={(event) =>
                        handleEditFieldChange(event, "weight")
                      }
                    />
                    <Select
                      value={selectedRow.unit}
                      onChange={(event) => handleEditFieldChange(event, "unit")}
                      fullWidth
                      style={{ marginBottom: "10px" }}
                    >
                      <MenuItem value="kg">kg</MenuItem>
                      <MenuItem value="g">g</MenuItem>
                      <MenuItem value="lb">lb</MenuItem>
                    </Select>
                    <TextField
                      label="Selling Price (INR)"
                      value={selectedRow.sellingPrice}
                      fullWidth
                      style={{ marginBottom: "10px" }}
                      onChange={(event) =>
                        handleEditFieldChange(event, "sellingPrice")
                      }
                    />
                    <TextField
                      label="Sales MRP"
                      value={selectedRow.mrp}
                      fullWidth
                      style={{ marginBottom: "10px" }}
                      onChange={(event) => handleEditFieldChange(event, "mrp")}
                    />
                    <TextField
                      label="Sales Description"
                      value={selectedRow.salesDescription}
                      fullWidth
                      style={{ marginBottom: "10px" }}
                      onChange={(event) =>
                        handleEditFieldChange(event, "salesDescription")
                      }
                    />
                    <TextField
                      label="Date and Time"
                      value={selectedRow.dateTime}
                      fullWidth
                      style={{ marginBottom: "10px" }}
                      disabled
                    />
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseViewDialog}>Cancel</Button>
                <Button onClick={handleSaveChanges}>Save</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
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
export default Products;