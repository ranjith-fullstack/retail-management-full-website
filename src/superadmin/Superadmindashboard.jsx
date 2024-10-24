import React, { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "./sidebar";
import  Header  from "./header";
import "./superadmindashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Breadcrumb from "./Breadcrumb";
import {
  Grid,
  Card,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
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
  ArrowUpward,
} from "@mui/icons-material";
import ReactApexChart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from '@mui/material/TableCell';
 
 
 
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
 
const UserDetailsPopup = ({ open, handleClose, user }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>ID: {user.id}</div>
          <div>Business Name: {user.business_name}</div>
          <div>Business Type: {user.business_type}</div>
          <div>Other Business Type: {user.other_business_type }</div>
          <div>Phone: {user.phone}</div>
          <div>Email: {user.email}</div>
          <div>Address Line1: {user.address_line1}</div>
          <div>Address Line2: {user.address_line2}</div>
          <div>City: {user. city}</div>
          <div>State: {user.state}</div>
          <div>Website: {user.zip_code}</div>
          <div>Email: {user.website}</div>
          <div>Created At: {user.created_at}</div>
          <div>Username: {user.username}</div>
         
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: '#4679a2' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
 
const SuperadminCustomizedTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState([]);
 
  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
  };
 
  useEffect(() => {
    axios.get('http://localhost:3005/api/masteradmin_popupForm')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);
 
  return (
    <div className="superadmin-tablebarr">
      <Typography variant="h6" className="superadmin-table-heading">
        User Details
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              <StyledTableCell className="sticky-column" sx={{ color: "white" }}> ID</StyledTableCell>
              <StyledTableCell className="sticky-column-username" sx={{ color: "white" }}>Business Name</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Business Type</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Other Business Type</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Phone</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Email</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Address Line1</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Address Line2</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>City</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>State</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Zip Code</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Website</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Created At</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Username</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <StyledTableRow key={user.userId}>
                <StyledTableCell className="sticky-column" component="th" scope="row">
                  {user.id}
                </StyledTableCell>
                <StyledTableCell className="sticky-column-username">{user.business_name}</StyledTableCell>
                <StyledTableCell>{user.business_type}</StyledTableCell>
                <StyledTableCell>{user.other_business_type}</StyledTableCell>
                <StyledTableCell>{user.phone}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.address_line1}</StyledTableCell>
                <StyledTableCell>{user.address_line2}</StyledTableCell>
                <StyledTableCell>{user.city}</StyledTableCell>
                <StyledTableCell>{user.state}</StyledTableCell>
                <StyledTableCell>{user.zip_code}</StyledTableCell>
                <StyledTableCell>{user.website}</StyledTableCell>
                <StyledTableCell>{user.created_at}</StyledTableCell>
                <StyledTableCell>{user.username}</StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => handleClickOpen(user)}>
                    <MoreVertIcon sx={{ color: '#4679a2' }} />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedUser && (
        <UserDetailsPopup
          open={open}
          handleClose={handleClose}
          user={selectedUser}
        />
      )}
    </div>
  );
};
 
const ApexChart = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
 
  useEffect(() => {
    axios.get('http://localhost:3005/api/sales_invoices/monthly')
      .then((response) => {
        const monthlyRevenue = response.data;
       
        setSeries([
          {
            name: "Revenue",
            data: monthlyRevenue,
          },
        ]);
 
        setOptions({
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          colors: ["#76abae"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            // text: "Revenue by Month",
            floating: true,
            offsetY: 330,
            align: "center",
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
            }
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"],
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ],
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return `₹${value / 1000}k`;
              },
            },
            min: 0,
            forceNiceScale: true,
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching monthly revenue data:', error);
      });
  }, []);
 
  return (
    <div className="superadmin-apex-chart-container">
      <Typography variant="h6" className="superadmin-chart-heading">
        Revenue by Month
      </Typography>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
 
 
const ApexChartt = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
 
  useEffect(() => {
    axios.get('http://localhost:3005/api/masteradmin_popupForm/daily')
      .then((response) => {
        const dailyNewUsers = response.data;
 
        // Get the total number of days in the current month
        const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
 
        // Generate the days of the month (1 through daysInMonth)
        const daysOfMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
 
        setSeries([{ name: "Users", data: dailyNewUsers }]);
 
        setOptions({
          chart: {
            height: 350,
            type: "bar",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
              dataLabels: {
                position: 'top', // Show data labels on top of bars
              },
            },
          },
          dataLabels: {
            enabled: true, // Enable data labels
            offsetY: -10, // Adjust the position of data labels
            style: {
              fontSize: '12px',
              colors: ['#000'], // Color of the data labels
            },
          },
          xaxis: {
            categories: daysOfMonth,
            title: {
              text: "Day of the Month"
            },
            labels: {
              formatter: function (value) {
                return value;
              },
            },
          },
          yaxis: {
            title: {
              text: "Number of Users"
            },
            min: 0,
            forceNiceScale: true,
          },
          tooltip: {
            fixed: {
              enabled: true, // Keep tooltip within the chart area
            },
            x: {
              formatter: function (value) {
                return `Day ${value}`;
              },
            },
            y: {
              formatter: function (value) {
                return `${value} users`;
              },
            },
          },
          grid: {
            borderColor: '#e7e7e7',
            strokeDashArray: 3,
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching daily new users data:', error);
      });
  }, []);
 
  return (
    <div className="superadmin-apex-chart-container">
      <Typography variant="h6" className="superadmin-chart-heading">
        Daily New Users for this Month
      </Typography>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};
 
export const Superadmindashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [privacyMode, setPrivacyMode] = useState(false);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalPartners, setTotalPartners] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
 
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
 
  const togglePrivacyMode = () => {
    setPrivacyMode(!privacyMode);
  };
 
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
 
 
  useEffect(() => {
    // Fetch total admins
    axios.get('http://localhost:3005/api/rolebased')
      .then((response) => {
        const admins = response.data.filter((user) => user.role === 'masteradmin');
        setTotalAdmins(admins.length);
      })
      .catch((error) => {
        console.error('Error fetching admins:', error);
      });
 
    // Fetch total partners
    axios.get("http://localhost:3005/api/partner_form")
      .then((response) => {
        setTotalPartners(response.data.totalPartners);
      })
      .catch((error) => {
        console.error("Error fetching total partners:", error);
      });
 
    // Fetch total revenue
    axios.get("http://localhost:3005/api/sales_invoices")
      .then((response) => {
        setTotalRevenue(response.data.totalRevenue);
      })
      .catch((error) => {
        console.error("Error fetching total revenue:", error);
      });
 
    // Fetch total users count
    axios.get('http://localhost:3005/api/rolebased/totalUsersCount')
      .then((response) => {
        setTotalUsersCount(response.data.totalUsersCount);
      })
      .catch((error) => {
        console.error('Error fetching total users count:', error);
      });
 
    // Fetch total active users
    axios.get('http://localhost:3005/api/rolebased/totalActiveUsers')
      .then((response) => {
        setTotalUsers(response.data.totalActiveUsers);
      })
      .catch((error) => {
        console.error('Error fetching total active users:', error);
      });
  }, []);
 
 
 
  const formatCurrency = (amount) => {
    return `₹${amount}`;
  };
 
 
  const cardsData = [
    {
      title: 'Total Master admins',
      color: 'blue',
      icon: <AdminIcon fontSize="large" />,
      value: totalAdmins,
    },
    {
      title: 'Total Partners',
      color: 'green',
      icon: <PartnerIcon fontSize="large" />,
      value: totalPartners,
    },
    {
      title: 'Total Revenue',
      color: 'orange',
      icon: <RevenueIcon fontSize="large" />,
      value: formatCurrency(totalRevenue),
    },
    {
      title: 'Total Active users',
      color: 'red',
      icon: <UserIcon fontSize="large" />,
      value: totalUsers,
    },
  ];
 
 
 
  return (
    <div>
      <Sidebar />
      <Header />
      <div className="superadmin-dashboard-maincontainer">
        <div className="superadmin-dashboard-container">
          <div
            className={`superadmin-masteradmin-container ${privacyMode ? "superadmin-blurred" : ""}`}
          >
            <Breadcrumb />
          </div>
          <button
            onClick={togglePrivacyMode}
            className="superadmin-hide-button d-none d-lg-block d-md-block"
          >
            {privacyMode ? "Show dashboard" : "Hide dashboard"}
          </button>
          {privacyMode && (
            <div className="superadmin-privacy-message">
              <div className="superadmin-privacy-message-content">
                Privacy Mode enabled. Please click the button to view your dashboard.
              </div>
            </div>
          )}
        </div>
        <div>
          <Grid container spacing={3}>
            {cardsData.map((card, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Card className={`superadmin-card ${card.color}`}>
                  <Typography variant="h6" className="superadmin-title">
                    {card.title}
                  </Typography>
                  <div className="superadmin-icon">{card.icon}</div>
                  <Typography variant="h4" className="superadmin-value">
                    {card.value}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className="superadmin-row" style={{ margin: "0" }}>
          <div className="superadmin-col-lg-6 superadmin-col-md-12">
            <ApexChartt />
          </div>
        </div>
        <div className="superadmin-barchart">
          <ApexChart />
        </div>
        <SuperadminCustomizedTable />
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
    </div>
  );
};