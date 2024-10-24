import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset, faCalendarAlt, faShieldAlt } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons
import Header from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './PricingPage.css';
import { ArrowUpward } from "@mui/icons-material";
import { Button } from "@mui/material";
import Minichatbot from './Minichatbot';
const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
function PricingPage() {
  // Ensure the page scrolls to the top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='pricing-body'>
      <Header />
      <div className='content-topic-customm'>
        <div className="content-matter-customm">
          <h2 className="content-heading-customm">Start 30-Days Free QuickRetail Trial</h2>
        </div>

        {/* Button for creating account */}
        <div className="billing-container-customm">
          <Link to='/Signup'><button className="billing-button-customm">Create Your Free Account</button></Link>
        </div>
      </div>

      <div className='pricingPage-main-heading-custom'>
        <h1> Pricing</h1>
        <p>Choose a plan that's right for you.</p>
      </div>
      <div className='pricingPage-card0'></div>
      <div className='pricingPage-card'>
        <div className='pricingPage-card1'>
          <h1>
            STANDARD 
            <hr />
            <span className='premiumclass'>(Rs. 950 /Year + GST)</span>
            <span className='popular-choice-text'>*Popular Choice</span>
          </h1>

          <div className='pricingPage-div1'>
            <p>Single User<br /></p>
            <p>No ads, No Branding<br /></p>
            <p>Sales & Purchase Invoice<br /></p>
            <p>Customer & Product<br /></p>
            <p>Inventory<br /></p>
            <p>Payment Receipt<br /></p>
            <p>Web App<br /></p>
            <p>Phone & Email Support<br /></p>
            <p>Reports<br /></p>
            <p>Max 25 Items In Doct.<br /></p>
            <p>Max 3000 Doc. /Year</p>
          </div>
        </div>
        <div className='pricingPage-card2'>
          <h1>PREMIUM <hr /><span className='premiumclass'>(Rs. 2390 /Year + GST)</span></h1>

          <div className='innercards'>
            <div className='pricingPage-div2'>
              <p>No ads, No Branding<br /></p>
              <p>Sales & Purchase Invoice<br /></p>
              <p>Customer & Product<br /></p>
              <p>Inventory<br /></p>
              <p>Payment Receipt<br /></p>
              <p>Mobile App<br /></p>
              <p>Phone & Email Support<br /></p>
              <p>Share on WhatsApp<br /></p>
              <p>Max 25 Items In Doct.<br /></p>
              <p>Max 15000 Doc. /Year</p>
              <p>Share on Email</p>
            </div>
            <div className='pricingPage-div3'>
              <p>E-Way Bill<br /></p>
              <p>E-Invoices<br /></p>
              <p>Quotation<br /></p>
              <p>Proforma Invoice<br /></p>
              <p>Delivery Challan<br /></p>
              <p>Purchase Order<br /></p>
              <p>Sale Order<br /></p>
              <p>Job Work<br /></p>
              <p>Credit / Debit Note<br /></p>
              <p>Activity Log</p>
              <p>Import Customer & Product</p>
            </div>
            <div className='pricingPage-div4'>
              <p>Multi-Location<br /></p>
              <p>Reports<br /></p>
              <p>GST Return Filling Reports<br /></p>
              <p>Export/ SEZ Invoices<br /></p>
              <p>Daily Income / Expense<br /></p>
              <p>10 Staff Account<br /></p>
              <p>Invoice Header Design<br /></p>
              <p>Multiple Invoice Template<br /></p>
              <p>Thermal Printing<br /></p>
              <p>Document Conversion<br /></p>
              <p>Document Duplicate</p>
            </div>
          </div>
        </div>
      </div>
      <div className="App">
        <header className="App-header">
          <h1>What more do I get?</h1>
        </header>
        <div className="cardss">
          <div className="card1">
            <FontAwesomeIcon icon={faHeadset} size="3x" />
            <div className="card1-content">
              <h3>Free Support</h3>
              <p>All plans come with free phone and email support.</p>
            </div>
          </div>
          <div className="card2">
            <FontAwesomeIcon icon={faCalendarAlt} size="3x" />
            <div className="card1-content">
              <h3>30 Days Free Standard Trial</h3>
              <p>Get all the features of Standard membership free for 30 days.</p>
            </div>
          </div>
          <div className="card3">
            <FontAwesomeIcon icon={faShieldAlt} size="3x" />
            <div className="card1-content">
              <h3>Secure & Reliable Service</h3>
              <p>We use the best server to keep your data safe & provide you reliable & fastest software.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='pricingPage-additional-features-custom'>
        <h2 className="pricingPage-why-use-retail-heading-custom">More Than 1 Lakh+ Business Owners Trust QuickRetail Software</h2>
        <h3 className="pricingPage-fastest-growing-heading-custom">Fastest Growing Retail Software In India</h3>
        <div className="pricingPage-buttons-container-custom">
          <Link to='/ContactUs'><button className="billing-button-customm">Request A Free Demo</button></Link>
        </div>
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
      <Footer />
    </div>
  );
}

export default PricingPage;
