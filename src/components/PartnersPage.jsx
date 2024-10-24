import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { faSmile as SmileIcon } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillWave as MoneyBillWaveIcon } from '@fortawesome/free-solid-svg-icons';
import checkout from './Images/checkout.png';
import partner from './Images/partner.png';
import join from './Images/join.png';
import Refer from './Images/Refer.png';
import Earn from './Images/Earn.png';
import why from './Images/why.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import {
  faHandshake as HandshakeIcon,
  faAward as AwardIcon,
  faRocket as RocketIcon,
  faUserFriends as UserFriendsIcon,
  faHandHoldingHeart as HandHoldingHeartIcon,
  faChartLine as ChartLineIcon,
  faBalanceScale as BalanceScaleIcon,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import './PartnersPage.css'; // Import CSS file for styling
import { ArrowUpward } from "@mui/icons-material";
import { Button } from "@mui/material";
import Minichatbot from './Minichatbot';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const PartnersPage = () => {
 
  const partnersContainerRef = useRef(null);
 
  const scrollToPartnersContainer = () => {
    partnersContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };
 
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
 
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []); // Run this effect only once when the component mounts
 
 
  const features = [
    {
        name: "Easy to Get Started",
        description: "Unlock unlimited benefits with our partner program.",
        icon: HandshakeIcon
      },
      {
        name: "Lifetime Commissions",
        description: "Earn commissions for a lifetime from your referrals.",
        icon: AwardIcon
      },
      {
        name: "Quick & Transparent Payments",
        description: "Receive quick and transparent payments on time.",
        icon: MoneyBillWaveIcon
      },
      {
        name: "Fastest Growing Billing Software",
        description: "Join the fastest-growing billing software in the industry.",
        icon: RocketIcon
      },
      {
        name: "Dedicated Support",
        description: "Get dedicated support for all your queries and concerns.",
        icon: UserFriendsIcon
      },
      {
        name: "Strong Brand Presence",
        description: "Leverage our strong brand presence in the market.",
        icon: HandHoldingHeartIcon
      },
      {
        name: "User Friendly Product",
        description: "Offer your customers a user-friendly product.",
        icon: SmileIcon // Change icon here
      },
      {
        name: "Competitive Pricing",
        description: "Competitive pricing to attract more customers.",
        icon: BalanceScaleIcon
      },
  ];
 
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    profession: '',
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
      const response = await fetch('http://localhost:3005/submit-partner-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Form submitted successfully');
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          profession: '',
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
   <div className='partnerspage-body'>
      <Header />
      <div className="partners-page-body-container">
        <div className="partnersmargin">
          <div className="checkout-image-containerrr">
            <img
              src={partner}
              alt="partner"
              className="checkout-imagee"
            />
          </div>
          <div className="image-text">
            <h2>Unlock Unlimited Benefits with The QuickRetail</h2>
            <div className="image-text1">
              <ul>
                <li><FontAwesomeIcon icon={faCheck} className="partners-page-tick-icon" /> Zero Investment</li>
                <li><FontAwesomeIcon icon={faCheck} className="partners-page-tick-icon" /> Lifetime Commissions</li>
              </ul>
            </div>
            <div className="partners-page-buttons-container-custom">
              <button className="partners-page-button-custom partners-page-create-account-button-custom" onClick={scrollToPartnersContainer}>
                JOIN THE PARTNER PROGRAM
              </button>
            </div>
          </div>
        </div>
 
        {/* Include 8 cards from FeaturesPage */}
        <div className="partners-page-features-container-custom">
          {features.map((feature, index) => (
            <div className="partners-page-feature-card-custom" key={index}>
              <FontAwesomeIcon icon={feature.icon} className="partners-page-feature-icon-custom" />
              <h2 className="partners-page-feature-heading-custom">{feature.name}</h2>
              <p className="partners-page-feature-description-custom">{feature.description}</p>
            </div>
          ))}
        </div>
 
        <div className="partners-page-image-container-custom">
          <div className="partners-page-column">
            <div className="partners-page-checkout-image-container">
              <img
                src={join}
                alt="join"
                className="partners-page-checkout-image"
              />
            </div>
            <div className="partners-page-image-text">
              <h2>step 1</h2>
              <p className="partners-page-details-paragraph">Join Our Partner Program</p>
            </div>
          </div>
 
          <div className="partners-page-column">
            <div className="partners-page-checkout-image-container">
              <img
                src={Refer}
                alt="Refer"
                className="partners-page-checkout-image"
              />
            </div>
            <div className="partners-page-image-text">
              <h2>step 2</h2>
              <p className="partners-page-details-paragraph">Refer QuickRetail To Your Customers</p>
            </div>
          </div>
 
          <div className="partners-page-column">
            <div className="partners-page-checkout-image-container">
              <img
                src={Earn}
                alt="Earn"
                className="partners-page-checkout-image"
              />
            </div>
            <div className="partners-page-image-text">
              <h2>Step 3</h2>
              <p className="partners-page-details-paragraph">Earn Commission When Your Referral Upgrade</p>
            </div>
          </div>
        </div>
 
        <div className="checkout-image-containerr">
          <div className="checkout-image-container-S">
            <img
              src={why}
              alt="why"
              className="checkout-image-partnerspage"
            />
          </div>
          <div className="image-text">
            <h2>Why Partner With QuickRetail?</h2>
            <p className="summary-paragraph2">Partnering with QuickRetail offers numerous advantages for businesses aiming to excel in the retail landscape. As a QuickRetail partner, you gain access to a comprehensive platform, dedicated support, and valuable training resources.</p>
            <p className="summary-paragraph2">By aligning with QuickRetail, you position yourself at the forefront of the retail industry, equipped with cutting-edge tools to streamline operations, enhance customer satisfaction, and drive growth.</p>
          </div>
        </div>
 
        <div ref={partnersContainerRef} className="Partners-container">
          <div className="contact-form-container">
          <form className="contact-form" id="partnerForm" onSubmit={handleSubmit}>
            <h3>Become A Partner</h3>
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
                placeholder="Profession (optional)"
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset>
              <textarea
                placeholder="What services or products you are selling and how you will sell QuickRetail?"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </fieldset>
            <fieldset className='fieldbuttonn'>
              <button type="submit" id="partner-submit">Submit</button>
            </fieldset>
          </form>
        </div>
      </div>
 
 
      <div className='partners-page-additional-features-custom'>
          <h2 className="partners-page-why-use-retail-heading-custom">More Than 1 Lakh+ Business Owners Trust QuickRetail Software</h2>
          <h3 className="partners-page-fastest-growing-heading-custom">Fastest Growing Retail Software In India</h3>
          <div className="partners-page-buttons-container-custom">
            <Link to='/ContactUs'><button className="partners-page-button-custom demo-request-button-custom">Request a Free Demo</button></Link>
          </div>
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
      <ToastContainer />
    </div>
  );
}
 
export default PartnersPage;