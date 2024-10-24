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
    width: '80%',  
    maxWidth: '600px', 
    maxHeight: '80vh', 
    overflowY: 'auto',
  },
}));

const Userspage = () => {
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
  const [editFormData, setEditFormData] = useState({
    id: '',
    username: '',
    password: '',
    email: '',
    role: '',
    status: ''
  });

  const [filteredRoleBasedData, setFilteredRoleBasedData] = useState([]);


  useEffect(() => {
    const token = Cookies.get("token");
    const { username, role } = location.state || {};
    if (!token) {
      navigate("/login");
    } else {
      setUsername(username);
      setRole(role);
    }
  
    axios
      .get("http://localhost:3005/api/rolebased")
      .then((response) => {
        setRoleBasedData(response.data);
        setFilteredRoleBasedData(response.data); // Initialize filtered data
      })
      .catch((error) => {
        console.error("Error fetching role-based data:", error);
      });
  }, [location, navigate]);
  

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
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  
    const filteredData = roleBasedData.filter(
      (item) =>
        item.username.toLowerCase().includes(query) ||
        String(item.id).toLowerCase().includes(query)
    );
  
    setFilteredRoleBasedData(filteredData);
  };
  

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
  };

 

  const filteredEmployeeFormData = employeeFormData.filter(
    (item) =>
      (item.Name && item.Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.Employee_ID && String(item.Employee_ID).toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalRoleBasedPages = Math.ceil(filteredRoleBasedData.length / rowsPerPage);
  const totalEmployeeFormPages = Math.ceil(filteredEmployeeFormData.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredRoleBasedData.length);
  const currentRoleBasedData = filteredRoleBasedData.slice(startIndex, endIndex);

  const startIndexEmployeeForm = (currentPage - 1) * rowsPerPage;
  const endIndexEmployeeForm = Math.min(startIndexEmployeeForm + rowsPerPage, filteredEmployeeFormData.length);
  const currentEmployeeFormData = filteredEmployeeFormData.slice(startIndexEmployeeForm, endIndexEmployeeForm);

  const classes = useStyles();
  const [selectedDuration, setSelectedDuration] = useState("day");
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [activePage, setActivePage] = useState("Sales");
  const [reportAnchorEl, setReportAnchorEl] = useState(null);
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

  const handleClickk = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSort = (option) => {
    setSortOption(option);
    setRoleBasedData(prevData => {
      const sortedData = [...prevData].sort((a, b) => {
        if (option === "Ascending") {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      });
      return sortedData;
    });
    handleClose(); // Close the menu after selecting the sort option
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSetActivePage = (page) => {
    setActivePage(page);
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
    setEditFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditSubmit = () => {
    axios.put(`http://localhost:3005/api/rolebased/${editFormData.id}`, editFormData)
      .then(response => {
        setRoleBasedData(prevData =>
          prevData.map(user =>
            user.id === editFormData.id ? editFormData : user
          )
        );
        setOpen(false);
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleDelete = (user) => {
    if (user.Status === 'Active') {
      const newStatus = 'Deactive';

      axios.put(`http://localhost:3005/api/rolebased/${user.id}`, { Status: newStatus })
        .then(response => {
          setRoleBasedData(prevData =>
            prevData.map(u =>
              u.id === user.id ? { ...u, Status: newStatus } : u
            )
          );
        })
        .catch(error => {
          console.error('Error updating user status:', error);
        });
    }
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

  //
    const filterData = () => {
    let data = [...roleBasedData]; // Copy original data

    // If day duration is selected
    if (selectedDuration === "day" && selectedDate) {
      const selectedDateObj = new Date(selectedDate);
      data = data.filter(item => {
        const itemDate = new Date(item.Date); // Assuming item.Date is a string in YYYY-MM-DD format
        return itemDate.toDateString() === selectedDateObj.toDateString(); // Check if dates match
      });
    }

    // If custom duration is selected
    if (selectedDuration === "custom" && startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      endDateObj.setDate(endDateObj.getDate() + 1); // Add one day to include the entire end date

      data = data.filter(item => {
        const itemDate = new Date(item.Date); // Assuming item.Date is a string in YYYY-MM-DD format
        return itemDate >= startDateObj && itemDate < endDateObj; // Check if item date falls within the range
      });
    }

    setFilteredRoleBasedData(data); // Update filtered data state
  };

  useEffect(() => {
    filterData(); // Call filter function when roleBasedData or filters change
  }, [selectedDuration, selectedDate, startDate, endDate, roleBasedData]);


  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <div className="d-flex flex-wrap justify-content-center">
        <Link to="/Userspage">
          <button className="buttongngng"  
          style={{width: 'auto'}}
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


        {activePage === "Sales" && (
            <>
            <div>
            <h1 className="d-flex justify-content-center">Master Admins</h1>
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
                    onChange={(event) =>{
                     setSelectedDate(event.target.value);
                      filterData(); // Filter data when date is selected
                    }}
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
                      // onChange={handleStartDateChange}
                      onChange={(event) => {
                      setStartDate(event.target.value);
                      filterData(); // Filter data when start date is selected
                    }}
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
                      // onChange={handleEndDateChange}
                      onChange={(event) => {
                      setEndDate(event.target.value);
                      filterData(); // Filter data when end date is selected
                    }}
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
  onClose={handleClose} // Ensure this line is present to handle closing the menu when clicking outside
>
  <MenuItem onClick={() => handleSort("Ascending")}>
    Ascending
  </MenuItem>
  <MenuItem onClick={() => handleSort("Descending")}>
    Descending
  </MenuItem>
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
                   
                    <StyledTableCell className="sticky-column" sx={{ color: "white" }}>id</StyledTableCell>
                    <StyledTableCell className="sticky-column-username" sx={{ color: "white" }}>username</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>password</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>email</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>role</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Status</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Date</StyledTableCell>
                    <StyledTableCell className="no-print" sx={{ color: "white" }}>Actions</StyledTableCell>
                  </TableRow>
          </TableHead>
          <TableBody>
          {filteredRoleBasedData.slice(startIndex, endIndex).map((user) => (
               <StyledTableRow key={user.id}>
               <StyledTableCell className="sticky-column" component="th" scope="row">
                 {user.id}
               </StyledTableCell>
               <StyledTableCell className="sticky-column-username">{user.username}</StyledTableCell>
               <StyledTableCell>{user.password}</StyledTableCell>
               <StyledTableCell>{user.email}</StyledTableCell>
               <StyledTableCell>{user.role}</StyledTableCell>
               <StyledTableCell>{user.Status}</StyledTableCell>
               <StyledTableCell>{user.Date}</StyledTableCell>
               <StyledTableCell className="no-print">
               
               <StyledTableCell>
            <Button
  className={`${classes.editButton} no-print`} // Add "no-print" class
  onClick={() => handleEdit(user)}
  style={{ color: "#4679a2" }}
>
  Edit
</Button>
<Button
  className={`${classes.deleteButton} no-print`} // Add "no-print" class
  onClick={() => handleDelete(user)}
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

        <Modal open={open} onClose={handleClose} className={classes.modal}>
      <div className={classes.paper}>
        <h2>Edit User</h2>
        <TextField
          name="id"
          label="ID"
          value={editFormData.id}
          onChange={handleEditInputChange}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          name="username"
          label="Username"
          value={editFormData.username}
          onChange={handleEditInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="password"
          label="Password"
          value={editFormData.password}
          onChange={handleEditInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={editFormData.email}
          onChange={handleEditInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="role"
          label="Role"
          value={editFormData.role}
          onChange={handleEditInputChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={editFormData.status}
            onChange={handleEditInputChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Deactive">Deactive</MenuItem>
          </Select>
        </FormControl>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: '#4679a2' }}>
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary" style={{ color: '#4679a2' }}>
            Save Changes
          </Button>
        </DialogActions>
      </div>
    </Modal>

  
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
               
              </div>
  
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
                    Page {currentPage} of {totalRoleBasedPages}
                  </span>
                  <Button
                    disabled={currentPage === totalRoleBasedPages}
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
    backgroundColor: "#76abae",
    color: "#222831", 
  }}
>
  <ArrowUpward />
</Button>
    </div>
  );
};

export default Userspage;