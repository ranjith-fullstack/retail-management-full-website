import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import  Header  from "./header";
import "./dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Breadcrumb from "./Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
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
import { jwtDecode } from "jwt-decode";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
 const Supplier = () => {
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
        const response = await axios.get("http://localhost:3005/supplier", {
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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [supplierName, setSupplierName] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  const [supplierID, setSupplierId] = useState("");
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

  if (searchQuery !== null && searchQuery !== undefined) {
    filteredData = filteredData.filter(
      (item) =>
        item.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.supplierID)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
  const supplierData = filteredData.slice(startIndex, endIndex);

  const classes = useStyles();

  const handleSubmit = () => {
    if (!supplierName.trim() || !contactInfo.trim()) {
      toast.error("Please fill in all input fields.");
      return;
    }
    if (supplierName.trim().length < 3) {
      toast.error("Supplier name must be at least 3 characters.");
      return;
    }
    if (contactInfo.trim().length < 10) {
      toast.error("Contact info must be at least 10 characters.");
      return;
    }

    const token = Cookies.get("token");

    axios
      .get("http://localhost:3005/supplier", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const existingSuppliers = response.data;
        const supplierID = existingSuppliers.length + 1;
        if (
          existingSuppliers.some(
            (supplier) => supplier.contactInfo === contactInfo
          )
        ) {
          toast.error("Supplier with this contact information already exists.");
          return;
        }

        const currentDateAndTime = new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
        const supplierData = {
          supplierID: supplierID, 
          supplierName: supplierName,
          contactInfo: contactInfo,
          dateandtime: currentDateAndTime,
        };

        axios
          .post("http://localhost:3005/supplier", supplierData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setSupplierId(supplierID); 
            setData([...data, supplierData]);
            setSupplierName("");
            setContactInfo("");
            toast.success("Supplier added successfully!");
          })
          .catch((error) => {
            console.error("Error adding supplier: ", error);
            toast.error("Error adding supplier. Please try again later.");
          });
      })
      .catch((error) => {
        console.error("Error fetching suppliers: ", error);
        toast.error("Error fetching suppliers. Please try again later.");
      });
  };

  const fetchData = () => {
    const token = Cookies.get("token");
    axios
      .get("http://localhost:3005/supplier", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suppliers: ", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setViewDialogOpen(true);
  };

  const handleEditFieldChange = (event, fieldName) => {
    const value = event.target.value;
    setSelectedRow((prevRow) => ({
      ...prevRow,
      [fieldName]: value,
    }));
  };
  const handleSaveChanges = () => {
    axios
      .put(
        `http://localhost:3005/supplier/${selectedRow.supplierID}`,
        selectedRow
      )
      .then((response) => {
        console.log("Changes saved successfully");
        fetchData();
        handleCloseViewDialog();
      })
      .catch((error) => {
        console.error("Error saving changes: ", error);
      });
  };

  const handleDelete = (row) => {
    const token = Cookies.get("token");
    axios
      .delete(`http://localhost:3005/supplier/${row.supplierID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedData = data.filter(
          (item) => item.supplierID !== row.supplierID
        );
        setData(updatedData);
        handleCloseViewDialog();
      })
      .catch((error) => {
        console.error("Error deleting supplier: ", error);
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
                id="supplier-id"
                label="Supplier ID"
                variant="outlined"
                value={supplierID}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <TextField
                id="supplier-name"
                label="Supplier Name"
                variant="outlined"
                value={supplierName}
                onChange={(event) => setSupplierName(event.target.value)}
                error={
                  supplierName.trim() !== "" && supplierName.trim().length < 3
                }
                helperText={
                  supplierName.trim() !== "" && supplierName.trim().length < 3
                    ? "Supplier name must be at least 3 characters"
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
            <div style={{ position: "relative" }}>
              <TextField
                id="contact-info"
                label="Contact Info"
                variant="outlined"
                value={contactInfo}
                onChange={(event) => {
                  const inputValue = event.target.value;
                  const numericValue = inputValue.replace(/\D/g, "");
                  setContactInfo(numericValue);
                }}
                error={
                  contactInfo.trim() !== "" && contactInfo.trim().length < 10
                }
                helperText={
                  contactInfo.trim() !== "" && contactInfo.trim().length < 10
                    ? "Contact info must be at least 10 characters"
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
                    <TableCell>Supplier ID</TableCell>
                    <TableCell>Supplier Name</TableCell>
                    <TableCell>Contact Information</TableCell>
                    <TableCell>Data & Time</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supplierData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.supplierID}</TableCell>
                      <TableCell>{row.supplierName}</TableCell>
                      <TableCell>{row.contactInfo}</TableCell>
                      <TableCell>
                        {row.dateandtime ||
                          new Date()
                            .toISOString()
                            .slice(0, 19)
                            .replace("T", " ")}
                      </TableCell>
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
                      id="edit-supplier-id"
                      label="Supplier ID"
                      value={selectedRow.supplierID}
                      onChange={(event) =>
                        handleEditFieldChange(event, "supplierID")
                      }
                      variant="outlined"
                      fullWidth
                      disabled
                      style={{ marginBottom: "10px" }}
                    />
                    <TextField
                      id="edit-supplier-name"
                      label="Supplier Name"
                      value={selectedRow.supplierName}
                      onChange={(event) =>
                        handleEditFieldChange(event, "supplierName")
                      }
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: "10px" }}
                    />
                    <TextField
                      id="edit-contact-info"
                      label="Contact Info"
                      value={selectedRow.contactInfo}
                      onChange={(event) =>
                        handleEditFieldChange(event, "contactInfo")
                      }
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: "10px" }}
                    />
                    <TextField
                      id="edit-data-time"
                      label="Date & Time"
                      value={selectedRow.dateandtime}
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
      <ToastContainer />
    </div>
  );
};
export default Supplier;