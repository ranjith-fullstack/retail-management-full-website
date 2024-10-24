
import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import  Header  from "./header";
import "./dashboard.css";
import axios from "axios";
import Breadcrumb from "./Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  MenuItem,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ArrowUpward } from "@mui/icons-material";

const Employeeinfo = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [status, setStatus] = useState("active");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isErrorr, setIsErrorr] = useState(false);
  
  const [customPosition, setCustomPosition] = useState("");
  // for businessname

  const [businessName, setBusinessName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState(1);





  useEffect(() => {
    const fetchBusinessNameAndMaxId = async () => {
      try {
        const response = await axios.get("http://localhost:3005/get-business-name", {
          withCredentials: true,
        });
        const fetchedBusinessName = response.data.businessName;
        setBusinessName(fetchedBusinessName);

        const maxIdResponse = await axios.get("http://localhost:3005/get-max-employee-id", {
          withCredentials: true,
        });
        const maxId = maxIdResponse.data.maxId;
        setEmployeeNumber(maxId);
        const newEmployeeId = `${fetchedBusinessName}_${String(maxId + 1).padStart(3, '0')}`;
        setEmployeeId(newEmployeeId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBusinessNameAndMaxId();
  }, []);
  //


  const handleEmployeeIdChange = (e) => {
    const id = e.target.value.replace(businessName, '').replace('_', '');
    setEmployeeId(`${businessName}_${id}`);
  };

  //


  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3005/employees", {
        withCredentials: true, 
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  
  useEffect(() => {
    fetchEmployees();
  }, []);
  

  const handleSubmit = async () => {
      if (!employeeName || !contactInfo || !email || !address || !employeePosition || (employeePosition === 'other' && !customPosition)) {
      toast.error("Please fill all fields");
      return;
    }
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address (example@gmail.com)");
    return;
  }

  const contactRegex = /^\d{10}$/;
  if (!contactRegex.test(contactInfo)) {
    toast.error("Please enter a valid 10-digit contact number");
    return;
  }

    const generatedUsername = `Emp${String(employees.length + 1).padStart(4, '0')}`;
    const generatedPassword = Math.random().toString(36).slice(-8);

    const newEmployee = {
      Employee_ID: employeeId,
      Name: employeeName,
      Contact: contactInfo,
      Email: email,
      Address: address,
      position: employeePosition === 'other' ? customPosition : employeePosition,
      Password: generatedPassword,
      Username: generatedUsername,
      Status: status,
      role: "employee"
    };

    try {
      await axios.post("http://localhost:3005/employee_form", newEmployee, {
        withCredentials: true, 
      });
      fetchEmployees();
      setEmployeeId("");
      setEmployeeName("");
      setContactInfo("");
      setEmail("");
      setAddress("");
      setEmployeePosition("");
      setCustomPosition(""); 
      toast.success("Employee added successfully");

     
   

      setEmployeeNumber((prev) => {
        const newNumber = prev + 1;
        const newEmployeeId = `${businessName}_${String(newNumber + 1).padStart(3, '0')}`;
        setEmployeeId(newEmployeeId);
        return newNumber;
      });
      
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Error adding employee");
    }
  };

// for editing starts here
const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
const [editRowData, setEditRowData] = useState({});
const [errors, setErrors] = useState({});



const predefinedPositions = ["cashier", "help-desk", "manager", "other"];
const handleEdit = (row) => {
  console.log('Editing row:', row);
  setEditRowData(row);

  if (predefinedPositions.includes(row.position)) {
    setEmployeePosition(row.position);
    setCustomPosition("");
  } else {
    setEmployeePosition("other");
    setCustomPosition(row.position);
  }

  setIsEditDialogOpen(true);
};


const handleUpdate = () => {
  const newErrors = {};

  if (!editRowData.Employee_ID) newErrors.Employee_ID = "Employee ID is required";
  if (!editRowData.Name) newErrors.Name = "Name is required";
  if (!editRowData.Contact) newErrors.Contact = "Contact is required";
  if (!editRowData.Email) newErrors.Email = "Email is required";
  if (!editRowData.Address) newErrors.Address = "Address is required";
  if (!editRowData.position) newErrors.position = "Position is required";
  if (!editRowData.Status) newErrors.Status = "Status is required";


  if (editRowData.Email && !editRowData.Email.endsWith("@gmail.com")) {
    newErrors.Email = "Email must end with @gmail.com";
  }

  if (editRowData.Contact && !/^\d{10}$/.test(editRowData.Contact)) {
    newErrors.Contact = "Contact number must be exactly 10 digits";
  }
  if (employeePosition === "other" && !customPosition) newErrors.customPosition = "Custom position is required";


  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return;
  }
      const updatedEmployee = {
      ...editRowData,
      position: employeePosition === 'other' ? customPosition : employeePosition,
    };

  fetch("http://localhost:3005/employees", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify(updatedEmployee),

  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error updating employee:", data.error);
      } else {
        console.log("Employee updated successfully:", data.message);
        setIsEditDialogOpen(false);
        fetchEmployees();
      }
    })
    .catch((error) => {
      console.error("Error updating employee:", error);
    });
};




const handleDelete = (id) => {
  fetch(`http://localhost:3005/employees/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error deleting employee:", data.error);
      } else {
        console.log("Employee deleted successfully:", data.message);
        fetchEmployees();
      }
    })
    .catch((error) => {
      console.error("Error deleting employee:", error);
    });
};



  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  const filteredEmployees = employees.filter(
    (employee) =>
      String(employee.Employee_ID).toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentData = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <Breadcrumb />
        <div>
          <div>
            <div className="dashboard-table-wrapper" noValidate autoComplete="off">
              <div className="row productsinputs">
                <div>
                  <TextField
                    id="employee-id"
                    label="Employee ID"
                    variant="outlined"
                    value={employeeId}
                    onChange={handleEmployeeIdChange}
                    disabled
                     margin="dense"
                  />
                </div>
                <div>
                  <TextField
                    id="address"
                    label="Address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                     margin="dense"
                  />
                </div>
              </div>
              <div className="row productsinputs">
                <div>
                  <TextField
                    id="employee-name"
                    label="Employee Name"
                    variant="outlined"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                     margin="dense"
                  />
                </div>
                <div>
                  <TextField
                    type="tel"
                    error={isError}
                    value={contactInfo}
                     margin="dense"
                    label="Contact"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (
                        (inputValue.startsWith("+91") &&
                          inputValue.length > 12) ||
                        (!inputValue.startsWith("+91") &&
                          inputValue.length > 10)
                      ) {
                        setIsError(true);
                        alert("Please provide a valid phone number.");
                        return;
                      }
                      setContactInfo(inputValue);
                      setIsError(false);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+91</InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="row productsinputs">
                <div>
                  <TextField
                    type="text"
                    error={isErrorr}
                    value={email}
                    label="Email"
                     margin="dense"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (!e.target.value.includes("@gmail.com")) {
                        setIsErrorr(true);
                      } else {
                        setIsErrorr(false);
                      }
                    }}
                  />
                </div>
                
                  <TextField
                    id="employee-position"
                    select
                    label="Employee Position"
                    variant="outlined"
                    value={employeePosition}
                    onChange={(e) => setEmployeePosition(e.target.value)}
                     margin="dense"
                  >
                    <MenuItem value="cashier">Cashier</MenuItem>
                    <MenuItem value="help-desk">Help Desk</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                  {employeePosition === "other" && (
                <TextField
                  label="Custom Position"
                  value={customPosition}
                  onChange={(e) => setCustomPosition(e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                />
              )}
                  
              
              </div>
            </div>

            
          </div>

          <div className="d-flex flex-row justify-content-center">
              <button
                className="buttongngn"
                variant="primary"
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
              <Table aria-label="employee table">
                <TableHead style={{ backgroundColor: "rgb(167, 165, 165)" }}>
                  <TableRow>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Date and Time</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.map((row) => (
                    <TableRow key={row.id}>
                    
                      <TableCell>{row.Employee_ID}</TableCell>
                      <TableCell>{row.Name}</TableCell>
                      <TableCell>{row.Contact}</TableCell>
                      <TableCell>{row.Email}</TableCell>
                      <TableCell>{row.Address}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>{row.Status}</TableCell>
                      <TableCell>{row.Username}</TableCell>
                      <TableCell>{row.Password}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.dateTime}</TableCell>
                      <TableCell>
                      <Button
              onClick={() => handleEdit(row)}
              style={{ marginRight: '8px' }}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(row.id)}
            >
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
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </Typography>
            </div>
          </div>
        </div>
<Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
  <DialogTitle>Edit Employee</DialogTitle>
  <DialogContent>
    <TextField
      label="Employee ID"
      value={editRowData.Employee_ID || ''}
      onChange={(e) =>
        setEditRowData({ ...editRowData, Employee_ID: e.target.value })
      }
      fullWidth
      margin="dense"
      disabled
      error={!!errors.Employee_ID}
      helperText={errors.Employee_ID}
    />
    <TextField
      label="Employee Name"
      value={editRowData.Name || ''}
      onChange={(e) =>
        setEditRowData({ ...editRowData, Name: e.target.value })
      }
      fullWidth
      margin="dense"
      error={!!errors.Name}
      helperText={errors.Name}
    />
    <TextField
      label="Contact"
      value={editRowData.Contact || ''}
      onChange={(e) =>
        setEditRowData({ ...editRowData, Contact: e.target.value })
      }
      fullWidth
      margin="dense"
      error={!!errors.Contact}
      helperText={errors.Contact}
    />
    <TextField
      label="Email"
      value={editRowData.Email || ''}
      onChange={(e) =>
        setEditRowData({ ...editRowData, Email: e.target.value })
      }
      fullWidth
      margin="dense"
      error={!!errors.Email}
      helperText={errors.Email}
    />
    <TextField
      label="Address"
      value={editRowData.Address || ''}
      onChange={(e) =>
        setEditRowData({ ...editRowData, Address: e.target.value })
      }
      fullWidth
      margin="dense"
      error={!!errors.Address}
      helperText={errors.Address}
    />
   
    <TextField
            select
            label="Position"
            value={employeePosition}
            onChange={(e) => setEmployeePosition(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.position}
            helperText={errors.position}
          >
           
            <MenuItem value="cashier">Cashier</MenuItem>
                    <MenuItem value="help-desk">Help Desk</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
          </TextField>
          {employeePosition === "other" && (
             <TextField
               label="Custom Position"
               value={customPosition}
               onChange={(e) => setCustomPosition(e.target.value)}
               fullWidth
               margin="normal"
               error={!!errors.customPosition}
               helperText={errors.customPosition}
             />
           )}
    <TextField
      select
      label="Status"
      value={editRowData.Status || ''}
      onChange={(e) =>
        setEditRowData({ ...editRowData, Status: e.target.value })
      }
      fullWidth
      margin="dense"
      error={!!errors.Status}
      helperText={errors.Status}
    >
      <MenuItem value="active">Active</MenuItem>
      <MenuItem value="inactive">Inactive</MenuItem>
    </TextField>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsEditDialogOpen(false)} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleUpdate} color="primary">
      Update
    </Button>
  </DialogActions>
</Dialog>
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
export default Employeeinfo;
