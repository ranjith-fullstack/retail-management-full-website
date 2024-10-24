import React, { useState } from 'react';
import './PricingCard.css';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = () => {
    setIsYearly(!isYearly);
  };

  const getPrice = (price) => {
    const yearlyPrice = price * 12; // Calculate the yearly price
    const discountedPrice = yearlyPrice - (yearlyPrice * 0.2); // Apply 20% discount
    const roundedDiscountedPrice = discountedPrice.toFixed(0); // Round off to zero decimal places

    const formattedPrice = isYearly ? `₹ ${roundedDiscountedPrice}/- ( excl. GST )` : `₹ ${price}/- ( excl. GST )`;
    return formattedPrice;
  };

  return (
    <div className="pricing-container">
      <header>
        <h1 className="pricing-header">Our Pricing</h1>
        <div className="pricing-toggle-switch">
          <span className="pricing-monthly-label">Monthly</span>
          <label className="pricing-switch">
            <input type="checkbox" className="pricing-checkbox" checked={isYearly} onChange={handleToggle} />
            <div className="pricing-slider"></div>
          </label>
          <span className="pricing-yearly-label"> Yearly</span>
          {/* <span className="pricing-save-text">(Save 20% on yearly)</span> */}
        </div>
        <span className="pricing-save-text">(Save 20% on yearly)</span>

      </header>

      <div className="pricing-cards-container">
        <div className="pricing-card">
          <div className="pricing-block-content">
            <span className="pricing-plan">Standard</span>
            <span className="pricing-price-value"> {getPrice(99)}</span>
            <span className="pricing-note">single user Account</span>
            <span className="pricing-note">No ads, No Branding</span>
            <span className="pricing-note">Sales & Purchase Invoice</span>
            <span className="pricing-note">Category Management</span>
            <span className="pricing-note">Product Management</span>
            <span className="pricing-note">Inventory Management</span>
            <span className="pricing-note">Supplier Management</span>
            <span className="pricing-note">Customer Management</span>
            <span className="pricing-note">Payment Receipt</span>
            <span className="pricing-note">Web App</span>
            <span className="pricing-note">Phone & Email Support</span>
            <span className="pricing-note">Purchase Order</span>
            <span className="pricing-note">Sale Order</span>
            <span className="pricing-note">Import and Export Category, Product & Supplier</span>
            <span className="pricing-note">Reports Download</span>
            <span className="pricing-note">Max 3000 Doc. /Year</span>
            <Link to='/PricingPage' ><button className="pricing-btn1">Learn More</button></Link>
          </div>
        </div>
        <div className="pricing-card">
          <div className="pricing-block-content">
            <span className="pricing-plan">Premium</span>
            <span className="pricing-price-value"> {getPrice(249)}</span>
            <span className="pricing-note">5 user Account</span>
            <span className="pricing-note">No ads, No Branding</span>
            <span className="pricing-note">Sales & Purchase Invoice</span>
            <span className="pricing-note">Category Management</span>
            <span className="pricing-note">Product Management</span>
            <span className="pricing-note">Inventory Management</span>
            <span className="pricing-note">Supplier Management</span>
            <span className="pricing-note">Customer Management</span>
            <span className="pricing-note">Payment Receipt</span>
            <span className="pricing-note">Mobile App</span>
            <span className="pricing-note">Phone & Email Support</span>
            <span className="pricing-note">Share on WhatsApp</span>
            <span className="pricing-note">Max 25 Items In Doc.</span>
            <span className="pricing-note">Max 15000 Doc. /Year</span>
            <span className="pricing-note">Share on Email</span>
            <span className="pricing-note">E-Invoices</span>
            <span className="pricing-note">Delivery Challan</span>
            <span className="pricing-note">Purchase Order</span>
            <span className="pricing-note">Sale Order</span>
            <span className="pricing-note">Import and Export Category, Product & Supplier</span>
            <span className="pricing-note">Reports Download</span>
            <span className="pricing-note">Daily Income / Expense</span>
            <span className="pricing-note">Invoice Header Design</span>
            <span className="pricing-note">Multiple Invoice Template</span>
            <span className="pricing-note">Thermal Printing</span>
            <Link to='/PricingPage' ><button className="pricing-btn11">Learn More</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

