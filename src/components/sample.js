// Body.js
import React, { useState, useEffect } from 'react';
import './Body.css';
import Grocery from './Images/Grocery.png';
import amico from './Images/amico.png';
import bro from './Images/bro.png';
import Scan from './Images/Scan.png';
import checkout from './Images/checkout.png';
import cuate from './Images/cuate.png';
import fruitshop from './Images/fruitshop.png';
import Barcode from './Images/Barcode.png';
import Bicycle from './Images/Bicycle.png';
import Bookshop from './Images/Bookshop.png';
import cake from './Images/cake.png';
import Furniture from './Images/Furniture.png';
import Jewelry from './Images/Jewelry.png';
import Optical from './Images/Optical.png';
import supplies from './Images/supplies.png';
import Receipt from './Images/Receipt.png';
import sales from './Images/sales.png';
import Support from './Images/Support.png';
import Transfer from './Images/Transfer.png';
import Report from './Images/Report.png';
import webpage from './Images/webpage.png';
import PricingCard from './PricingCard';
import Review from './Review';
import { ArrowUpward } from "@mui/icons-material";
import { Button } from "@mui/material";
import Minichatbot from './Minichatbot';
const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const images = [Grocery, amico, bro, checkout, cuate, fruitshop, webpage, Barcode, Bicycle, Bookshop,cake,Furniture,Jewelry,Optical,supplies,Receipt, Scan  ];

const Body = () => {
  const [currentImageIndexes, setCurrentImageIndexes] = useState([0, 1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes(prevIndexes => {
        const nextIndexes = prevIndexes.map(index => (index + 1) % images.length);
        return nextIndexes;
      });
    }, 2000); // Change image every 2 seconds (adjust as needed)
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="body-container">
      <div className="text-container">
        <p className="intro-paragraph">
          Welcome to QuickRetail: Your All-in-One Retail Solution
        </p>
        <p className='highlight'> Unleash Your Retail Potential, Seamlessly. </p>
        <p className="summary-paragraph">
          Elevate your retail operations with QuickRetail. Our comprehensive platform is designed to enhance sales, streamline inventory management, and propel your business into the digital age effortlessly. Experience the future of retail management with QuickRetail.
        </p>
      </div>
      
      <div className="image-container">
        <div className="slideshow-container">
          {currentImageIndexes.map((index, i) => (
            <img
              key={i}
              src={images[index]}
              alt="Slideshow"
              className="slideshow-image"
            />
          ))}


        </div>


        
        <div className="checkout-image-container">
            <img
              src={sales}
              alt="sales"
              className="checkout-image"
            />

        </div>

<div className="image-text">
  <h2>Sales & Purchase Invoice</h2>
  <p className="details-paragraph">Unlock the potential of QuickRetail with our cutting-edge Sales & Purchase Invoice feature. Our platform empowers businesses to excel in the digital era by offering comprehensive solutions for sales, inventory management, customer engagement, and more.</p>
</div>

<div className="checkout-image-container1">
  <img
    src={Report}
    alt="Report"
    className="checkout-image1"
  />
</div>
<div className="image-text1">
  <h2>Reports Download</h2>
  <p className="details-paragraph1">Access vital insights and analytics with QuickRetail's Reports Download functionality. Our platform enables businesses to harness the power of data by providing detailed reports for sales, inventory management, customer engagement, and more.</p>


</div>

<div className="checkout-image-container">
  <img
    src={Transfer}
    alt="Transfer"
    className="checkout-image"
  />
</div>
<div className="image-text">
  <h2>Import and Export Category, Product & Supplier</h2>
  <p className="details-paragraph">Expand your horizons with QuickRetail's Import and Export feature for categories, products, and suppliers. Our platform facilitates seamless integration with external systems, empowering businesses to optimize their supply chain and drive growth.</p>
</div>
 
     
       
        <div className="checkout-image-container1">
          <img
            src={Support}
            alt="Support"
            className="checkout-image1"
          />
        </div>
        <div className="image-text1">
          <h2>Phone & Email Support</h2>
          <p className="details-paragraph1">Experience exceptional customer service with QuickRetail's dedicated phone and email support. Our team of experts is available round-the-clock to assist you with any queries, technical issues, or guidance you may need. Rest assured, we're here to ensure a seamless experience every step of the way.</p>

       
 
        </div>
        <PricingCard />
        <Review />
      </div>
   
<Minichatbot />
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

export default Body;
