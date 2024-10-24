import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import  Header  from "./header";
import axios from "axios";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Breadcrumb from "./Breadcrumb";
import { jwtDecode } from "jwt-decode";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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
} from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ArrowUpward } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

 const Categories = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [nextCategoryId, setNextCategoryId] = useState(1); // State for next category ID

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
        const response = await axios.get("http://localhost:3005/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const existingCategories = response.data;
        const highestId = existingCategories.reduce((maxId, category) => {
          return category.category_id > maxId ? category.category_id : maxId;
        }, 0);
        setNextCategoryId(highestId + 1);
      } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.status === 401) {
          navigate("/");
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const handleClick = (event, row) => {
    setSelectedRow(row);
    setViewDialogOpen(true);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
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
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.category_id).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

  const classes = useStyles();

  const handleEdit = (row) => {
    setSelectedRow(row);
    setViewDialogOpen(true);
  };

  const handleEditFieldChange = (event, fieldName) => {
    setSelectedRow((prevRow) => ({
      ...prevRow,
      [fieldName]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    // Check if categoryName is empty or less than 3 characters
    if (!categoryName.trim()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fill the input field");
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 2000);
      return;
    }
    if (categoryName.trim().length < 3) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Category name must be at least 3 characters");
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 2000);
      return;
    }

    // Prepare category data
    const currentDateAndTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const categoryData = {
      category_id: nextCategoryId, // Use nextCategoryId as the new category ID
      name: categoryName,
      dataandtime: currentDateAndTime,
      username: username,
    };

    // Fetch existing categories from the database
    const token = Cookies.get("token");
    axios
      .get("http://localhost:3005/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const existingCategories = response.data;
        if (existingCategories.some((category) => category.name === categoryName)) {
          setSnackbarSeverity("error");
          setSnackbarMessage("Category with the same name already exists");
          setSnackbarOpen(true);
          setTimeout(() => {
            setSnackbarOpen(false);
          }, 2000);
        } else {
          // Add new category
          axios
            .post("http://localhost:3005/categories", categoryData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setData([...data, categoryData]);
              setCategoryName("");
              setNextCategoryId(nextCategoryId + 1); // Increment nextCategoryId
              setSnackbarSeverity("success");
              setSnackbarMessage("Category added successfully");
              setSnackbarOpen(true);
              setTimeout(() => {
                setSnackbarOpen(false);
              }, 2000);
            })
            .catch((error) => {
              console.error("Error adding category: ", error);
              setSnackbarSeverity("error");
              setSnackbarMessage("Error adding category");
              setSnackbarOpen(true);
              setTimeout(() => {
                setSnackbarOpen(false);
              }, 2000);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
        setSnackbarSeverity("error");
        setSnackbarMessage("Error fetching categories");
        setSnackbarOpen(true);
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 2000);
      });
  };

  const fetchData = () => {
    const token = Cookies.get("token");
    axios
      .get("http://localhost:3005/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveChanges = () => {
    const token = Cookies.get("token");
    axios
      .put(`http://localhost:3005/categories/${selectedRow.id}`, selectedRow, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        fetchData();
        handleCloseViewDialog();
        setSnackbarSeverity("success");
        setSnackbarMessage("Category updated successfully");
        setSnackbarOpen(true);
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating category: ", error);
        setSnackbarSeverity("error");
        setSnackbarMessage("Error updating category");
        setSnackbarOpen(true);
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 2000);
      });
  };

  const handleDelete = (row) => {
    const token = Cookies.get("token");
    axios
      .delete(`http://localhost:3005/categories/${row.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        fetchData();
        setSnackbarSeverity("success");
        setSnackbarMessage("Category deleted successfully");
        setSnackbarOpen(true);
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error deleting category: ", error);
        setSnackbarSeverity("error");
        setSnackbarMessage("Error deleting category");
        setSnackbarOpen(true);
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 2000);
      });
  };

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <div>
          <div
            className={`${classes.root}  dashboard-table-wrapper`}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="category-id"
                label="Category ID"
                variant="outlined"
                value={nextCategoryId}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <TextField
                id="category-name"
                label="Category Name"
                variant="outlined"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                error={
                  categoryName.trim() !== "" && categoryName.trim().length < 3
                }
                helperText={
                  categoryName.trim() !== "" && categoryName.trim().length < 3
                    ? "Category name must be at least 3 characters"
                    : ""
                }
                FormHelperTextProps={{
                  style: {
                    position: "absolute",
                    top: "100%",
                    zIndex: 1000,
                  },
                }}
              />
            </div>

            <div className="d-flex flex-column justify-content-center">
              <button
                className="buttongngn"
                variant="primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
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
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Data & Time</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.category_id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.dataandtime}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(row)}>Edit</Button>
                        <Button onClick={() => handleDelete(row)}>
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
              <DialogTitle>Edit Details</DialogTitle>
              <DialogContent>
                {selectedRow && (
                  <div>
                    <TextField
                      id="edit-category-id"
                      label="Category ID"
                      value={selectedRow.id}
                      onChange={(event) => handleEditFieldChange(event, "id")}
                      variant="outlined"
                      fullWidth
                      disabled
                      style={{ marginBottom: "10px" }}
                    />
                    <TextField
                      id="edit-category-name"
                      label="Category Name"
                      value={selectedRow.name}
                      onChange={(event) => handleEditFieldChange(event, "name")}
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: "10px" }}
                    />
                    <TextField
                      id="edit-category-datetime"
                      label="Date & Time"
                      value={selectedRow.dataandtime}
                      onChange={(event) =>
                        handleEditFieldChange(event, "dataandtime")
                      }
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: "10px" }}
                    />
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseViewDialog}>Cancel</Button>
                <Button onClick={handleSaveChanges} color="primary">
                  Save Changes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
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
export default Categories;

