import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './ContactUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { ArrowUpward } from "@mui/icons-material";
import { Button } from "@mui/material";
import Minichatbot from './Minichatbot';
const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const ContactUs = () => {
  // Ensure the page scrolls to the top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    website: '',
    message: ''
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3005/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Form submitted successfully');
        // Clear form fields after successful submission
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          website: '',
          message: ''
        });
      } else {
        toast.error('Failed to submit form. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting the form. Please try again later.');
    }
  };
  return (
    <div>
      <Header />
      <div className='contactus-body'>
      <div className='content-topic-custommm'>
        <div className="content-matter-custommm">
          <h2 className="content-heading-customm">Lifetime FREE GST Billing Software</h2>
        </div>
 
        {/* Button for creating account */}
        <div className="billing-container-custommm">
        <Link to='/Signup'><button className="billing-button-custommm">Create Your Free Account</button></Link>
        </div>
      </div>
 
      <div className="contact-us-content">
        <div className="contact-us-form-container">
          <form className="contact-us-form" id="contact" onSubmit={handleSubmit}>
            <h3>Contact Form</h3>
 
            <fieldset>
              <input
                placeholder="Your name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoFocus
              />
            </fieldset>
            <fieldset>
              <input
                placeholder="Your Phone Number"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset>
              <input
                placeholder="Your Email Address (optional)"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset>
              <input
                placeholder="Your Web Site (optional)"
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset>
              <textarea
                placeholder="Type your message here...."
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </fieldset>
            <fieldset className='fieldbutton'>
              <button type="submit" id="contact-submit">Submit</button>
            </fieldset>
          </form>
        </div>
 
 
          <div className="contact-us-details-container">
            <h3>Feel free to reach out</h3>
            <h2><FontAwesomeIcon icon={faPhoneAlt} className="contact-us-icon" /> 0123456789</h2>
            <p>(10 AM To 6 PM - Everyday)</p>
            <h2><FontAwesomeIcon icon={faEnvelope} /> help@quickretail.com</h2>
            <h2><FontAwesomeIcon icon={faMapMarkerAlt} /> Yatayati info solutions Pvt. Ltd.</h2>
            <p>4th floor,</p>
            <p>Above Telangana Co-operative Bank, Old Alwal,</p>
            <p>Secunderabad - 500010</p>
          </div>
        </div>
 
        <Footer />
        <ToastContainer />
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
 
export default ContactUs;