// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
// import './Header.css';

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <header className="header">
//       <div className="menu-toggle" onClick={toggleMenu}>
//         <div className={`menu-bar ${isOpen ? 'open' : ''}`}></div>
//         <div className={`menu-bar ${isOpen ? 'open' : ''}`}></div>
//         <div className={`menu-bar ${isOpen ? 'open' : ''}`}></div>
//       </div>

//       <div className='logoNameAndMenu'>

//         <div>
//         <h1 className='logo-quick'>
//           <span className="logo-q">Q</span >uickRetail.
//         </h1>
//         </div>

//         <div className='nav-bar'>
//           <nav className={`navigation ${isOpen ? 'open' : ''}`}>
//             <Link to="/" className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}>
//               Home
//             </Link>
//             <Link to="/FeaturesPage" className={`nav-button ${location.pathname === '/FeaturesPage' ? 'active' : ''}`}>
//               Features
//             </Link>
//             <Link to="/PricingPage" className={`nav-button ${location.pathname === '/PricingPage' ? 'active' : ''}`}>
//               Pricing
//             </Link>
//             <Link to="/PartnersPage" className={`nav-button ${location.pathname === '/PartnersPage' ? 'active' : ''}`}>
//               Partners
//             </Link>
//             {/* <Link to="/ResourcesPage" className={`nav-button ${location.pathname === '/ResourcesPage' ? 'active' : ''}`}>
//               Resources
//             </Link> */}
//             <Link to="/ContactUs" className="nav-button contact-button">
//               <FontAwesomeIcon icon={faPhoneAlt} className="icon" />
//               Contact Us
//             </Link>
//             <Link to="/Login" className="nav-button unique-button">
//               Login
//             </Link>
//             <Link to="/Signup" className="nav-button unique-button">
//               Signup
//             </Link>
//           </nav>
//         </div>

//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`menu-bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`menu-bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`menu-bar ${isOpen ? 'open' : ''}`}></div>
      </div>

      <div className="logoNameAndMenu">
        <h1 className="logo-quick">
          <span className="logo-q">Q</span>uickRetail.
        </h1>
        
        <nav className={`navigation ${isOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/FeaturesPage" className={`nav-button ${location.pathname === '/FeaturesPage' ? 'active' : ''}`}>
            Features
          </Link>
          <Link to="/PricingPage" className={`nav-button ${location.pathname === '/PricingPage' ? 'active' : ''}`}>
            Pricing
          </Link>
          <Link to="/PartnersPage" className={`nav-button ${location.pathname === '/PartnersPage' ? 'active' : ''}`}>
            Partners
          </Link>
          <Link to="/ContactUs" className="nav-button contact-button">
            <FontAwesomeIcon icon={faPhoneAlt} className="icon" />
            Contact Us
          </Link>
          <Link to="/Login" className="nav-button unique-button">
            Login
          </Link>
          <Link to="/Signup" className="nav-button unique-button">
            Signup
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
