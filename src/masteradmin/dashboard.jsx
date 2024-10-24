import React, { useEffect, useState } from "react";
import DialogBox from './DialogBox';
import { jwtDecode } from 'jwt-decode';  // Change this to a named import
import Sidebar from "./sidebar";
import  Header  from "./header";
import "./dashboard.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  LowPriority as LowStockIcon,
  Category as CategoryIcon,
  TrendingUp as GrowthIcon,
  PeopleAlt as CustomersIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import ReactApexChart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import { ArrowUpward } from "@mui/icons-material";
import axios from "axios"; //

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.palette.background.default}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${theme.palette.text.primary}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


const Dashboard = () => {
 
  const [privacyMode, setPrivacyMode] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

const [invoices, setInvoices] = useState([]);
//

useEffect(() => {
  const fetchInvoices = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/');
      } else {
        const response = await axios.get('http://localhost:3005/api/sales_invoices', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setInvoices(response.data);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  fetchInvoices();
}, [navigate]);
//
  useEffect(() => {
    const token = Cookies.get('token');
       if (!token) {
      navigate('/');
    } 
  }, []);
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/');
    } else {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
      setRole(decoded.role);
      if (decoded.role !== 'masteradmin') {
        navigate('/');
      }
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

  const handleViewClick = (invoice) => {
    setSelectedInvoice(invoice);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInvoice(null);
  };

  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (location.state?.isNewUser) {
      setShowDialog(true);
    }
  }, [location]);

  const handleDialogSubmit = async (formData) => {
    try {
      console.log("Form Data Submitted: ", formData);
      setShowDialog(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };
  // Example dynamic data for cards
  const cardsData = [
    {
      title: "Low Stock Products",
      color: "blue",
      icon: <LowStockIcon fontSize="large" />,
      value: 89,
      percentage: 13,
      increase: true,
    },
    {
      title: "Total Categories",
      color: "green",
      icon: <CategoryIcon fontSize="large" />,
      value: 5990,
      percentage: 4,
      increase: true,
    },
    {
      title: "Total Profits",
      color: "orange",
      icon: <GrowthIcon fontSize="large" />,
      value: "₹80,990",
      percentage: 13,
      increase: false,
    },
    {
      title: "Total Customers",
      color: "red",
      icon: <CustomersIcon fontSize="large" />,
      value: 3,
      percentage: 13,
      increase: false,
    },
  ];

  // ApexChart component
  const ApexChart = () => {
    const [series] = useState([
      {
        name: "Sales",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 153, 123, 321],
      },
    ]);
    const [options] = useState({
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      colors: ['#76abae'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "",
        align: "left",
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
    });
  
    // Simulate data loading state
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000); // Simulate loading time
    }, []);
  
    return (
      <div className="apex-chart-container">
        <Typography variant="h6" align="center" className="superadmin-chart-heading">
          Sales by Month
        </Typography>
        {loading ? (
          <Skeleton height={350} />
        ) : (
          <div id="chart">
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={350}
            />
          </div>
        )}
        <div id="html-dist"></div>
      </div>
    );
  };
  
  const ApexChartt = () => {
    const [series, setSeries] = useState([
      {
        name: "Inflation",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2],
      },
    ]);
    const [options] = useState({
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: [
          "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",
        ],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          },
        },
      },
      title: {
        text: "",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
      colors: ["#76abae"],
    });
  
    // Simulate data loading state
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000); // Simulate loading time
    }, []);
  
    return (
      <div className="apex-chart-container">
        <Typography variant="h6" align="center" className="superadmin-chart-heading">
          Sales Per Day Of Week
        </Typography>
        {loading ? (
          <Skeleton height={350} />
        ) : (
          <div id="chart">
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={350}
            />
          </div>
        )}
        <div id="html-dist"></div>
      </div>
    );
  };
  const ApexCharttt = () => {
    const [series, setSeries] = useState([30, 70]);
    const [options] = useState({
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },
          dataLabels: {
            show: false,
            name: {
              offsetY: -20,
              show: false,
              color: "#888",
              fontSize: "13px",
            },
            value: {
              formatter: function (val) {
                return val + "%";
              },
              color: "#111",
              fontSize: "30px",
              show: false,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      colors: ["#ff726f", "#76abae"],
      labels: ["Loss", "Profit"],
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: -20,
        offsetY: 15,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },
        formatter: function (seriesName, opts) {
          return (
            seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%"
          );
        },
        itemMargin: {
          horizontal: 2,
        },
      },
      tooltip: {
        enabled: false,
      },
    });
  
    // Simulate data loading state
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000); // Simulate loading time
    }, []);
  
    return (
      <div className="apex-chart-container1">
        <Typography variant="h6" align="center" className="superadmin-chart-heading">
          Profit and Loss
        </Typography>
        {loading ? (
          <Skeleton height={400} />
        ) : (
          <div id="chart">
            <ReactApexChart
              options={options}
              series={series}
              type="radialBar"
              height={400}
            />
          </div>
        )}
        <div id="html-dist"></div>
      </div>
    );
  };
 


  // Customized table
  const CustomizedTable = () => {
    const [loading, setLoading] = useState(true);
    return (
      <div className="tablebarr">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "black" }}>
                <StyledTableCell sx={{ color: "white" }}>Invoice ID</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Customer Name</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Contact Number</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Total Items</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Purchase Amount</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Date & Time</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={7}>
                      <Skeleton variant="rectangular" width="100%" height={50} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                invoices.map((invoice) => (
                  <StyledTableRow key={invoice.saleInvoiceId}>
                    <StyledTableCell component="th" scope="row">
                      {invoice.saleInvoiceId}
                    </StyledTableCell>
                    <StyledTableCell>{invoice.customerName}</StyledTableCell>
                    <StyledTableCell>{invoice.phoneNumber}</StyledTableCell>
                    <StyledTableCell>{invoice.totalItems}</StyledTableCell>
                    <StyledTableCell>{invoice.totalAmount}</StyledTableCell>
                    <StyledTableCell>{invoice.dateandtime}</StyledTableCell>
                    <StyledTableCell>
                      <IconButton onClick={() => handleViewClick(invoice)}>
                        <MoreVertIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Invoice Details</DialogTitle>
          <DialogContent>
            {selectedInvoice && (
              <div>
                <Typography variant="body1">
                  <strong>Invoice ID:</strong> {selectedInvoice.saleInvoiceId}
                </Typography>
                <Typography variant="body1">
                  <strong>Customer Name:</strong> {selectedInvoice.customerName}
                </Typography>
                <Typography variant="body1">
                  <strong>Contact Number:</strong> {selectedInvoice.phoneNumber}
                </Typography>
                <Typography variant="body1">
                  <strong>Total Items:</strong> {selectedInvoice.totalItems}
                </Typography>
                <Typography variant="body1">
                  <strong>Purchase Amount:</strong> {selectedInvoice.totalAmount}
                </Typography>
                <Typography variant="body1">
                  <strong>Date & Time:</strong> {selectedInvoice.dateandtime}
                </Typography>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="dashboard-maincontainer">
        <div className="dashboard-container">
          <div
            className={`masteradmin-container ${privacyMode ? "blurred" : ""}`}
          >
            <Breadcrumb />
          </div>
          <button
            onClick={togglePrivacyMode}
            className="hide-button d-none d-lg-block d-md-block"
          >
            {privacyMode ? "Show dashboard" : "Hide dashboard"}
          </button>
          {privacyMode && (
            <div className="privacy-message">
              <div className="privacy-message-content">
                Privacy Mode enabled. Please click the button to view your
                dashboard.
              </div>
            </div>
          )}
        </div>
        <div>
          <Grid container spacing={3}>
            {cardsData.map((card, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Card className={`card ${card.color}`}>
                  <Typography variant="h6" className="title">
                    {card.title}
                  </Typography>
                  {card.icon}
                  <Typography variant="h4" className="value">
                    {card.value}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <div className="row" style={{ margin: "0" }}>
        <div className="col-lg-6 col-md-12">
        <ApexChartt />
         
        </div>
        <div className="col-lg-6 col-md-12">
        <ApexCharttt />
        </div>
      </div>
     <div className=" barchart">
     <ApexChart />
     </div>
      <CustomizedTable />
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
{showDialog && <DialogBox isOpen={showDialog} onSubmit={handleDialogSubmit} onClose={handleDialogClose} />}

    </div>
  );
};
export default Dashboard;