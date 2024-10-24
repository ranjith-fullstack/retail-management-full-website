import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import flag from './Images/flag.png';

const Footer = () => {
  return (
    <footer className="custom-footer">

      <ul className="footer-navigation">

        <div className="footer-address">
          <h1 className="footer-logo">
            <span style={{ color: '#76ABAE', textTransform: 'uppercase' }}>Q</span>uickRetail.
          </h1>
          <address>
         A product of Yatayati Info Solutions.
          </address>
        </div>
        
        <li className="footer-nav-item">
          <h2 className="footer-title">Products</h2>
          <ul className="footer-nav-ul">
            <li>
             
              <Link to="/FeaturesPage">Point of Sale (POS)</Link>
            </li>
            <li>
            
              <Link to="/FeaturesPage">Category Management</Link>
            </li>
            <li>
            
              <Link to="/FeaturesPage">Product Management</Link>
            </li>
            <li>
          
              <Link to="/FeaturesPage">Billing Software</Link>
            </li>
            <li>
              <Link to="/FeaturesPage">Mobile Ordering App</Link>
            </li>
          </ul>
        </li>
        <li className="footer-nav-item footer-nav-item-extra">
          <h2 className="footer-title">Services</h2>
          <ul className="footer-nav-ul footer-nav-ul-extra">
            <li>
              <Link to="/ContactUs">Installation & Setup</Link>
            </li>
            <li>
              <Link to="/ContactUs">Training & Support</Link>
            </li>
            <li>
              <Link to="/ContactUs">Customization</Link>
            </li>
          </ul>
        </li>
        <li className="footer-nav-item">
          <h2 className="footer-title">Company</h2>
          <ul className="footer-nav-ul">
            <li>
              <Link to="/ContactUs">Contact Us</Link>
            </li>
          </ul>
        </li>

      </ul>
      
      <div className="legal">
      
      <p>&copy; 2024 QuickRetail. All rights reserved. Proudly Made in Bharath <img src={flag} alt="flag" style={{ width: '20px', height: '15px', marginLeft: '5px' }} />  with <span className="heart">♥</span> </p>
      </div>
    </footer>
  );
};

export default Footer;
