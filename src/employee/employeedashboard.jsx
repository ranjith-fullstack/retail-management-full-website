import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import  Header from "./header";
import "./dashboard.css";
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
} from "@mui/material";
import {
  LowPriority as LowStockIcon,
  Category as CategoryIcon,
  TrendingUp as GrowthIcon, // Import TrendingUp icon for representing growth
  PeopleAlt as CustomersIcon,
  MonetizationOn as ProfitsIcon,
} from "@mui/icons-material";


import ReactApexChart from "react-apexcharts";
import { styled } from "@mui/material/styles";

import { ArrowUpward } from "@mui/icons-material";

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

const Employeedashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [privacyMode, setPrivacyMode] = useState(false);
  const totalProducts = 150;
  const totalSales = 201;
  const totalPurchases = 211;

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
      title: "Total Revenue",
      color: "orange",
      icon: <GrowthIcon fontSize="large" />, 
      value: "₹80,990", 
      percentage: 13,
      increase: false,
    },
    
    {
      title: "Total Sales",
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
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 153, 148, 153],
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
        text: "sales by Month",
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
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "oct",
          "nov",
          "Dec",
        ],
      },
    });

    return (
      <div className="apex-chart-container">
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
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
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
        text: "Sales Per Day Of Week",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
      colors: ["#76abae"],
    });

    return (
      <div className="apex-chart-container">
        <div id="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  };

  // Customized table with customer purchase details
  const CustomizedTable = () => {
    const rows = [
      {
        invoiceId: "INV12345",
        name: "Rajesh Kumar",
        totalItems: 1,
        purchaseAmount: "₹1200",
        dateTime: "2023-12-05 14:23",
      },
      {
        invoiceId: "INV12346",
        name: "Anita Sharma",
        totalItems: 2,
        purchaseAmount: "₹800",
        dateTime: "2023-12-04 10:10",
      },
      {
        invoiceId: "INV12347",
        name: "Vikram Singh",
        totalItems: 1,
        purchaseAmount: "₹200",
        dateTime: "2023-12-03 16:45",
      },
      {
        invoiceId: "INV12348",
        name: "Sunita Verma",
        totalItems: 1,
        purchaseAmount: "₹250",
        dateTime: "2023-12-02 12:30",
      },
      {
        invoiceId: "INV12349",
        name: "Rohit Patel",
        totalItems: 3,
        purchaseAmount: "₹750",
        dateTime: "2023-12-01 09:50",
      },
    ];

    // Sort rows by most recent purchase date and time
    const sortedRows = rows.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    return (
      <div className="tablebarr">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "black" }}>
                <StyledTableCell sx={{ color: "white" }}>Invoice ID</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Customer Name</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Total Items</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Purchase Amount</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Date and Time</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.map((row) => (
                <StyledTableRow key={row.invoiceId}>
                  <StyledTableCell component="th" scope="row">{row.invoiceId}</StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.totalItems}</StyledTableCell>
                  <StyledTableCell>{row.purchaseAmount}</StyledTableCell>
                  <StyledTableCell>{row.dateTime}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
        {/* Remove the line below that renders the increase or decrease label */}
        {/* <Typography className="stat">
          <b>{card.percentage}</b>{" "}
          {card.increase ? "increase" : "decrease"}
        </Typography> */}
      </Card>
    </Grid>
  ))}
</Grid>

        </div>
      </div>
      <div className="row" style={{ margin: "0" }}>
        <div className="col-lg-6 col-md-12">
          <ApexChart />
        </div>
        <div className="col-lg-6 col-md-12">
          <ApexChartt />
        </div>
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

    </div>
  );
};
export default Employeedashboard;