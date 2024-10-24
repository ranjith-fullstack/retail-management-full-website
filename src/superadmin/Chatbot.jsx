import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
import Header from "./header";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Breadcrumb from "./Breadcrumb";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Paper,
  Modal,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  SupervisorAccount as AdminIcon,
  Handshake as PartnerIcon,
  TrendingUp as RevenueIcon,
  Person as UserIcon,
  MoreVert as MoreVertIcon,
  
} from "@mui/icons-material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ArrowUpward } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import html2canvas from 'html2canvas';
import { toPng, toSvg } from 'html-to-image';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "150px",
  },
}));

const Chatbot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]); // State for storing data
  const [userData, setUserData] = useState([]);
  const [reportAnchorEl, setReportAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortOption, setSortOption] = useState("");

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

  const handleSort = (option) => {
    setSortOption(option);
    setData(prevData => {
      const sortedData = [...prevData].sort((a, b) => {
        if (option === "Ascending") {
          return a.ViewersID - b.ViewersID;
        } else {
          return b.ViewersID - a.ViewersID;
        }
      });
      return sortedData;
    });
    handleClose(); // Close the menu after selecting the sort option
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const { username, role } = location.state || {}; // Updated to use location.state
    if (!token) {
      navigate("/login");
    } else {
      setUsername(username);
      setRole(role);
    }

    // Fetch data from the backend
    axios
      .get("http://localhost:3005/api/Chatbot")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [location, navigate]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

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
    setCurrentPage(1); // Reset to the first page on a new search
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  let filteredData = [...data];

  if (searchQuery) {
    const lowercasedQuery = searchQuery.toLowerCase();
    filteredData = filteredData.filter(
      (item) =>
        (item.Name && item.Name.toLowerCase().includes(lowercasedQuery)) ||
        (item.ViewersID && String(item.ViewersID).toLowerCase().includes(lowercasedQuery))
    );

    // Bring the matching row to the top
    const matchIndex = filteredData.findIndex(
      (item) =>
        (item.Name && item.Name.toLowerCase().includes(lowercasedQuery)) ||
        (item.ViewersID && String(item.ViewersID).toLowerCase().includes(lowercasedQuery))
    );
    if (matchIndex !== -1) {
      const matchedItem = filteredData.splice(matchIndex, 1)[0];
      filteredData.unshift(matchedItem);
    }
  }

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

  const classes = useStyles();

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

  const handleEdit = (row) => {
    setSelectedRow(row);
    setViewDialogOpen(true);
  };

  const handleDelete = (row) => {
    // Add your delete logic here
    console.log("Delete row:", row);
  };

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClickk = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <div className="reportsRow">
        <div className="duration">
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
 
                    <StyledTableCell className="sticky-column" sx={{ color: "white" }}>ID</StyledTableCell>
                    <StyledTableCell className="sticky-column-username" sx={{ color: "white" }}>Name</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Phone</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Email</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Question1</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Question2</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Question3</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Question4</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Question5</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Question6</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Question7</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Question8</StyledTableCell>
                    <StyledTableCell className="no-print" sx={{ color: "white" }}>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.map((user) => (
                    <StyledTableRow key={user.id}>
                      <StyledTableCell className="sticky-column" component="th" scope="row">
                        {user.ViewersID}
                      </StyledTableCell>
                      <StyledTableCell className="sticky-column-username">{user.Name}</StyledTableCell>
                      <StyledTableCell>{user.Phone}</StyledTableCell>
                      <StyledTableCell>{user.Email}</StyledTableCell>
                      <StyledTableCell>{user.Question1}</StyledTableCell>
                      <StyledTableCell>{user.Question2}</StyledTableCell>
                      <StyledTableCell>{user.Question3}</StyledTableCell>
                      <StyledTableCell>{user.Question4}</StyledTableCell>
                      <StyledTableCell>{user.Question5}</StyledTableCell>
                      <StyledTableCell>{user.Question6}</StyledTableCell>
                      <StyledTableCell>{user.Question7}</StyledTableCell>
                      <StyledTableCell>{user.Question8}</StyledTableCell>
                      <StyledTableCell className="no-print">
                       
                        <Button onClick={() => handleClickOpen(user)}>
                    <MoreVertIcon sx={{ color: '#4679a2' }} />
                  </Button>
                        <Button
                          className={classes.deleteButton}
                          onClick={() => handleDelete(user)}
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
            <Modal open={viewDialogOpen} onClose={handleCloseViewDialog}>
              <div>
                <h2>View Details</h2>
                {selectedRow && (
                  <div>
                    <p>ViewersID: {selectedRow.ViewersID}</p>
                    <p>Name: {selectedRow.Name}</p>
                    <p>Phone: {selectedRow.Phone}</p>
                    <p>Email: {selectedRow.Email}</p>
                    <p>Question1: {selectedRow.Question1}</p>
                    <p>Question2: {selectedRow.Question2}</p>
                    <p>Question3: {selectedRow.Question3}</p>
                    <p>Question4: {selectedRow.Question4}</p>
                    <p>Question5: {selectedRow.Question5}</p>
                    <p>Question6: {selectedRow.Question6}</p>
                    <p>Question7: {selectedRow.Question7}</p>
                    <p>Question8: {selectedRow.Question8}</p>
                  </div>
                )}
                <Button onClick={handleCloseViewDialog}>Close</Button>
              </div>
            </Modal>
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
          backgroundColor: "#76abae",
          color: "#222831",
        }}
      >
        <ArrowUpward />
      </Button>
      {selectedUser && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>User Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div>User ID: {selectedUser.ViewersID}</div>
              <div>Username: {selectedUser.Name}</div>
              <div>Phone: {selectedUser.Phone}</div>
              <div>Email: {selectedUser.Email}</div>
              <div>Question1: {selectedUser.Question1}</div>
              <div>Question2: {selectedUser.Question2}</div>
              <div>Question3: {selectedUser.Question3}</div>
              <div>Question4: {selectedUser.Question4}</div>
              <div>Question5: {selectedUser.Question5}</div>
              <div>Question6: {selectedUser.Question6}</div>
              <div>Question7: {selectedUser.Question7}</div>
              <div>Question8: {selectedUser.Question8}</div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ color: '#4679a2' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
export default Chatbot;