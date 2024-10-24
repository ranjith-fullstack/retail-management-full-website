import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import  Header  from "./header";
import { Form, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Breadcrumb from "./Breadcrumb";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Button,
  FormControl,
  InputLabel,
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
}));
const Partners = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    const { username, role } = location;
    if (!token) {
      navigate("/login");
    } else {
      setUsername(username);
      setRole(role);
    }
  }, []);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [filteredRoleBasedData, setFilteredRoleBasedData] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    axios.get("http://localhost:3005/api/partner_form")
      .then((response) => {
        const { totalPartners, partners } = response.data;
        console.log(`Total Partners: ${totalPartners}`);
        setUserData(partners);
        setFilteredRoleBasedData(partners); // Initialize filtered data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  
  const handleSort = (option) => {
    setSortOption(option);
    setUserData(prevData => {
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
  
    const filteredData = userData.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        String(item.id).toLowerCase().includes(query)
    );
  
    setFilteredRoleBasedData(filteredData);
  };
  

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
  };

  let filteredData = [...userData];

  if (searchQuery) {
    filteredData = filteredData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.id).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  // const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);

  
  const totalRoleBasedPages = Math.ceil(filteredRoleBasedData.length / rowsPerPage);
  const endIndex = Math.min(startIndex + rowsPerPage, filteredRoleBasedData.length);

  const currentData = filteredRoleBasedData.slice(startIndex, endIndex);
  

  const classes = useStyles();
  const [selectedDuration, setSelectedDuration] = useState("day");
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [activePage, setActivePage] = useState("Sales");
  const [reportAnchorEl, setReportAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
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
    axios.delete(`http://localhost:3005/api/partner_form/${row.id}`)
      .then((response) => {
        console.log(response.data.message);
        setUserData(userData.filter(user => user.id !== row.id));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  

  const filterData = () => {
    let data = [...userData]; // Copy original data

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
  }, [selectedDuration, selectedDate, startDate, endDate, userData]);
  

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        
          <>
            <div>
              <h1 className="d-flex justify-content-center">Partners</h1>
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
                      onChange={(event) => setSelectedDate(event.target.value)}
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
                    <TableHead style={{ backgroundColor: "rgb(167, 165, 165)" }}>
                      <TableRow sx={{ backgroundColor: "black" }}>
                        <StyledTableCell className="sticky-column" sx={{ color: "white" }}>
                          Id
                        </StyledTableCell>
                        
                        <StyledTableCell className="sticky-column-username" sx={{ color: "white" }}>
                        Name
                        </StyledTableCell>
                        <StyledTableCell sx={{ color: "white" }}>Phone Number</StyledTableCell>
                        <StyledTableCell sx={{ color: "white" }}>Email</StyledTableCell>
                        <StyledTableCell sx={{ color: "white" }}>Profession</StyledTableCell>
                        <StyledTableCell sx={{ color: "white" }}>Message</StyledTableCell>
                        <StyledTableCell sx={{ color: "white" }}>Create At</StyledTableCell>
                        <StyledTableCell className="no-print" sx={{ color: "white" }}>Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredRoleBasedData.slice(startIndex, endIndex).map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell className="sticky-column" component="th" scope="row">
                            {row.id}
                          </StyledTableCell>

                          <StyledTableCell className="sticky-column-username">{row.name}</StyledTableCell>
                          <StyledTableCell>{row.phone_number}</StyledTableCell>
                          <StyledTableCell>{row.email}</StyledTableCell>
                          <StyledTableCell>{row.profession}</StyledTableCell>
                          <StyledTableCell>{row.message}</StyledTableCell>
                          <StyledTableCell>{row.Date}</StyledTableCell>
                          <StyledTableCell className="no-print">
                           
                            <Button
                              className={classes.deleteButton}
                              onClick={() => handleDelete(row)}
                              style={{ color: "#4679a2" }}
                            >
                              Delete
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
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
export default Partners;