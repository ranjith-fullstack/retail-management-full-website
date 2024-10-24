import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Sidebar from "./sidebar";
import  Header  from "./header";
import { Form, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Breadcrumb from "./Breadcrumb";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  InputLabel,
  DialogActions,
  Menu,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ArrowUpward } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from '@mui/material/TableCell';
import html2canvas from 'html2canvas';
import { toPng, toSvg } from 'html-to-image';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "150px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '80%',  // Adjust the width as needed
    maxWidth: '600px',  // Set a maximum width for larger screens
    maxHeight: '80vh', // Limit the modal height to 80% of viewport height
    overflowY: 'auto', // Enable vertical scrolling if content exceeds modal height
  },
  buttonGroup: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  cancelButton: {
    color: '#4679a2',
  },
  saveButton: {
    color: '#4679a2',
  },
}));

const Useremployee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [roleBasedData, setRoleBasedData] = useState([]);
  const [employeeFormData, setEmployeeFormData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [userData, setUserData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [reportAnchorEl, setReportAnchorEl] = useState(null);
  //
  const [selectedDuration, setSelectedDuration] = useState("day");
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

 
  
  useEffect(() => {
    const token = Cookies.get("token");
    const { username, role } = location.state || {};
    if (!token) {
      navigate("/login");
    } else {
      setUsername(username);
      setRole(role);
    }
  
    let url = "http://localhost:3005/api/employee_form";
    const params = new URLSearchParams();
  
    if (selectedDuration === "day" && selectedDate) {
      params.append('date', selectedDate);
    } else if (selectedDuration === "custom" && startDate && endDate) {
      params.append('startDate', startDate);
      params.append('endDate', endDate);
    }
  
    if (sortOption) {
      params.append('sort', sortOption);
    }
  
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
  
    axios
      .get(url)
      .then((response) => {
        setEmployeeFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee form data:", error);
      });
  }, [location, navigate, selectedDate, startDate, endDate, selectedDuration, sortOption]);
  
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
  };

  const filteredRoleBasedData = roleBasedData.filter(
    (item) =>
      (item.Name && item.Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.Employee_ID && String(item.Employee_ID).toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredEmployeeFormData = employeeFormData.filter(
    (item) =>
      (item.Name && item.Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.Employee_ID && String(item.Employee_ID).toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const startIndexEmployeeForm = (currentPage - 1) * rowsPerPage;
  const endIndexEmployeeForm = Math.min(startIndexEmployeeForm + rowsPerPage, filteredEmployeeFormData.length);
  const currentEmployeeFormData = filteredEmployeeFormData.slice(startIndexEmployeeForm, endIndexEmployeeForm);
  

  const totalRoleBasedPages = Math.ceil(filteredRoleBasedData.length / rowsPerPage);
  const totalEmployeeFormPages = Math.ceil(filteredEmployeeFormData.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredRoleBasedData.length);
  const currentRoleBasedData = filteredRoleBasedData.slice(startIndex, endIndex);

  // const startIndexEmployeeForm = (currentPage - 1) * rowsPerPage;
  // const endIndexEmployeeForm = Math.min(startIndexEmployeeForm + rowsPerPage, filteredEmployeeFormData.length);
  // const currentEmployeeFormData = filteredEmployeeFormData.slice(startIndexEmployeeForm, endIndexEmployeeForm);

  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = useState(null);
  
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  //
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSort = (option) => {
    setSortOption(option);
    setEmployeeFormData((prevData) => {
      const sortedData = [...prevData].sort((a, b) => {
        if (option === "Ascending") {
          return a.Employee_ID - b.Employee_ID;
        } else {
          return b.Employee_ID - a.Employee_ID;
        }
      });
      return sortedData;
    });
    handleClose(); // Close the menu after selecting the sort option
  };
  
  
  const handleClickk = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleEdit = (user) => {
    setEditFormData(user);
    setOpen(true);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    axios
      .put(`http://localhost:3005/api/employee_form/${editFormData.id}`, editFormData)
      .then((response) => {
        // Update employeeFormData state with edited user data
        setEmployeeFormData((prevData) =>
          prevData.map((user) =>
            user.id === editFormData.id ? response.data : user
          )
        );
        setOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };
  
 
  const handleDownloadSVG = () => {
    const table = document.getElementById('table-to-print');
    toSvg(table)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'table.svg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading SVG:', error);
      });
  };
  
  const handleDownloadPNG = () => {
    const table = document.getElementById('table-to-print');
    html2canvas(table)
      .then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'table.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading PNG:', error);
      });
  };
  
  const handleDownloadCSV = () => {
    const rows = document.querySelectorAll('#table-to-print tr');
    let csvContent = '';
    rows.forEach((row) => {
      const cols = row.querySelectorAll('td, th');
      const rowData = Array.from(cols).map(col => col.innerText).join(',');
      csvContent += rowData + '\n';
    });
  
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    link.download = 'table.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleReportMenuClick = (event) => {
    setReportAnchorEl(event.currentTarget);
  };
  

  const handleReportMenuClose = () => {
    setReportAnchorEl(null);
  };

  const handlePrint = () => {
    const tableContent = document.getElementById('table-to-print').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: black;
              color: white;
            }
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          ${tableContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };


  const handleDelete = (row) => {
    const updatedRow = { ...row, Status: "Deactive" };
  
    axios
      .put(`http://localhost:3005/api/employee_form/${row.id}`, updatedRow)
      .then((response) => {
        // Update the employeeFormData state with the updated user data
        setEmployeeFormData((prevData) =>
          prevData.map((user) =>
            user.id === row.id ? { ...user, Status: "Deactive" } : user
          )
        );
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
      });
  };
  

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <div className="d-flex flex-wrap justify-content-center">
          <Link to="/Userspage">
            <button className="buttongngng"
              style={{ width: 'auto' }}
            >
              <span  >Master Admins</span>
            </button>
          </Link>
         
          <Link to="/Useremployee">
            <button className="buttongngng">
              <span>Employes</span>
            </button>
          </Link>

        </div>

        
          <>
            <div>
              <h1 className="d-flex justify-content-center">Employees</h1>
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
                    // onChange={(event) => setSelectedDate(event.target.value)}
                    onChange={handleDateChange}
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
  <MenuItem onClick={() => handleSort("Ascending")}>Ascending</MenuItem>
  <MenuItem onClick={() => handleSort("Descending")}>Descending</MenuItem>
</Menu>



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
                <TableContainer component={Paper} id="table-to-print">
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "black" }}>

                        <StyledTableCell className="sticky-column" sx={{ color: "white" }}>Employee ID</StyledTableCell>
                        <StyledTableCell className="sticky-column-username" sx={{ color: "white" }}>Name</StyledTableCell>
                        <StyledTableCell sx={{ color: "white" }}>Contact</StyledTableCell>
                        <StyledTableCell sx={{ color: "white" }}>Email</StyledTableCell>
                        <StyledTableCell sx={{ color: "white" }}>Address</StyledTableCell>
                        <StyledTableCell sx={{ color: "white" }}>Password</StyledTableCell>
                        <StyledTableCell sx={{ color: "white" }}>Username</StyledTableCell>
                        <StyledTableCell sx={{ color: "white" }}>Status</StyledTableCell>
                        <StyledTableCell sx={{ color: "white" }}>Date and Time</StyledTableCell>
                        <StyledTableCell className="no-print" sx={{ color: "white" }}>Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentEmployeeFormData.map((row) => (
                        <StyledTableRow  key={row.Employee_ID} onClick={(event) => handleClick(event, row)}>
                          <StyledTableCell className="sticky-column" component="th" scope="row">
                            {row.Employee_ID}
                          </StyledTableCell>
                          <StyledTableCell className="sticky-column-username">{row.Name}</StyledTableCell>
                          <StyledTableCell>{row.Contact}</StyledTableCell>
                          <StyledTableCell>{row.Email}</StyledTableCell>
                          <StyledTableCell>{row.Address}</StyledTableCell>
                          <StyledTableCell>{row.Password}</StyledTableCell>
                          <StyledTableCell>{row.Username}</StyledTableCell>
                          <StyledTableCell>{row.Status}</StyledTableCell>
                          <StyledTableCell>{row.dateTime}</StyledTableCell>
                          <StyledTableCell className="no-print">


                          <StyledTableCell>
                          <Button
  className={`${classes.editButton} no-print`} // Add "no-print" class
  onClick={() => handleEdit(row)}
  style={{ color: "#4679a2" }}
>
  Edit
</Button>
<Button
  className={`${classes.deleteButton} no-print`} // Add "no-print" class
  onClick={() => handleDelete(row)}
  style={{ color: "#4679a2" }}
>
  Delete
</Button>
                            </StyledTableCell>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <h2>Edit User</h2>
          <TextField
            label="Employee ID"
            name="Employee_ID"
            value={editFormData.Employee_ID || ""}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Name"
            name="Name"
            value={editFormData.Name || ""}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact"
            name="Contact"
            value={editFormData.Contact || ""}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="Email"
            value={editFormData.Email || ""}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="Address"
            value={editFormData.Address || ""}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="EmpStatus"
            name="EmpStatus"
            value={editFormData.Status || ""}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            name="Role"
            value={editFormData.Role || ""}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="Password"
            value={editFormData.Password || ""}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Username"
            name="Username"
            value={editFormData.Username || ""}
            onChange={handleEditInputChange}
            fullWidth
            margin="normal"
          />
           <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          name="status"
                          value={editFormData.status || ""}
                          onChange={handleEditInputChange}
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Deactive</MenuItem>
                          
                        </Select>
                      </FormControl>
          
          <Grid container spacing={2} className={classes.buttonGroup}>
            <Grid item>
              <Button onClick={handleClose} style={{ color: "#4679a2" }}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleEditSubmit}
                color="primary"
                style={{ color: "#4679a2" }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                  <Button disabled={currentPage === 1} onClick={handlePrevPage}>
                    <FaChevronLeft />
                  </Button>
                  <span style={{ margin: "0 10px" }}>
                    Page {currentPage} of {totalRoleBasedPages}
                  </span>
                  <Button disabled={currentPage === totalRoleBasedPages} onClick={handleNextPage}>
                    <FaChevronRight />
                  </Button>
                  <Typography variant="body2">
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

                <Button onClick={handlePrint}
                  variant="contained"
                  color="primary"
                  
                  style={{ marginRight: "10px" ,backgroundColor: "#4679a2"  }}
                >
                  Print Reports
                </Button>
                
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleReportMenuClick}
                  endIcon={<ArrowDropDownIcon />}
                  style={{ backgroundColor: "#4679a2" }}
                >
                  Download Report
                </Button>

                <Menu
                  id="report-menu"
                  anchorEl={reportAnchorEl}
                  keepMounted
                  open={Boolean(reportAnchorEl)}
                  onClose={handleReportMenuClose}
                >
                  <MenuItem onClick={handleDownloadSVG}>Download SVG</MenuItem>
                  <MenuItem onClick={handleDownloadPNG}>Download PNG</MenuItem>
                  <MenuItem onClick={handleDownloadCSV}>Download CSV</MenuItem>
                </Menu>

              
              </div>
            </div>
          </>
       


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
          backgroundColor: "#76abae",
          color: "#222831",
        }}
      >
        <ArrowUpward />
      </Button>
    </div>
  );
};
export default Useremployee;