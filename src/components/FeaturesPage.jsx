// import React, { useEffect } from 'react';
// import Header from './Header';
// import Footer from './Footer';
// import './FeaturesPage.css'; // Import CSS file for styling
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom'
// import Minichatbot from './Minichatbot';
// import {
//   faBoxOpen as BoxOpenIcon, // Inventory Management
//   faCashRegister as CashRegisterIcon, // Point of Sale
//   faUsers as UsersIcon, // Customer Management
//   faUserTie as UserTieIcon, // Employee Management
//   faChartLine as ChartLineIcon, // Sales Reporting
//   faBoxes as BoxesIcon, // Inventory Replenishment
//   faMapMarkedAlt as MapMarkedAltIcon, // Multi-location Support
//   faAward as AwardIcon, // Customer Loyalty Program
//   faMobileAlt as MobileAltIcon, // Mobile Point of Sale
//   faTruck as TruckIcon, // Supplier Management
//   faBarcode as BarcodeIcon, // Barcode Scanning
//   faFileAlt as FileAltIcon, // Customizable Reports
//   faLifeRing as LifeRingIcon, // Support
//   faClock as ClockIcon, // Time
//   faHeadset as faHeadset,

// } from '@fortawesome/free-solid-svg-icons';
// import { ArrowUpward } from "@mui/icons-material";
// import { Button } from "@mui/material";

// const handleScrollToTop = () => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// };
// function FeaturesPage() {
//   useEffect(() => {
//     window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
//   }, []); // Run this effect only once when the component mounts

//   // Dummy data for features
//   const features = [
//     {
//       name: "Inventory Management",
//       description: "Efficiently manage your inventory with real-time tracking and analytics.",
//       icon: BoxOpenIcon
//     },
//     {
//       name: "Point of Sale",
//       description: "Streamline your sales process with our intuitive point of sale system.",
//       icon: CashRegisterIcon
//     },
//     // Add more dummy features as needed
//     {
//       name: "Customer Management",
//       description: "Keep track of your customers and their purchase history.",
//       icon: UsersIcon
//     },
//     {
//       name: "Employee Management",
//       description: "Manage your employees' schedules, roles, and performance.",
//       icon: UserTieIcon
//     },
//     {
//       name: "Sales Reporting",
//       description: "Generate detailed reports on sales performance and trends.",
//       icon: ChartLineIcon
//     },
//     {
//       name: "Inventory Replenishment",
//       description: "Automatically reorder stock when inventory levels are low.",
//       icon: BoxesIcon
//     },
//     {
//       name: "Multi-location Support",
//       description: "Manage multiple stores or warehouses from a single interface.",
//       icon: MapMarkedAltIcon
//     },
//     {
//       name: "Customer Loyalty Program",
//       description: "Reward loyal customers with discounts and special offers.",
//       icon: AwardIcon
//     },
//     {
//       name: "Mobile Point of Sale",
//       description: "Take orders and process payments on-the-go with mobile devices.",
//       icon: MobileAltIcon
//     },
//     {
//       name: "Supplier Management",
//       description: "Keep track of suppliers, orders, and delivery schedules.",
//       icon: TruckIcon
//     },
//     {
//       name: "Barcode Scanning",
//       description: "Scan barcodes to quickly add items to the system and process sales.",
//       icon: BarcodeIcon
//     },
//     {
//       name: "Customizable Reports",
//       description: "Create custom reports tailored to your business needs.",
//       icon: FileAltIcon
//     }
//   ];

//   return (
//     <div>
//       <Header />
//       <div className='content-topic-custom1'>
//         <div className='content-topic-custom'>
//           <div className="content-matter-custom">
//             <h2 className="content-heading-custom">Start 30-Days Free QuickRetail Trial</h2>
//           </div>

//           {/* Button for creating account */}
//           <div className="billing-container-custom">
//             <Link to='/Signup'><button className="billing-button-custom">Create Your Free Account</button></Link>
//           </div>
//         </div>

//         <div className='main-heading-custom'>
//           <h1>Explore QuickRetail Features</h1>
//           <p>Best Retail Software for Small & Medium Businesses</p>
//         </div>
//         <div className="features-container-custom">
//           {features.map((feature, index) => (
//             <div className="feature-card-custom" key={index}>
//               <FontAwesomeIcon icon={feature.icon} className="feature-icon-custom" />
//               <h2 className="feature-heading-custom">{feature.name}</h2>
//               <p className="feature-description-custom">{feature.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Section for "Why You Should Use Retail" */}
//         <div className='additional-features-custom'>
//           <div className="why-use-retail-custom">
//             <h2 className="why-use-retail-heading-custom">Why You Should Use QuickRetail?</h2>
//           </div>

//           {/* Extra features section */}
//           <div className="extra-features-custom">
//             {/* Extra feature cards */}
//             <div className="extra-feature-card-custom">
//               <FontAwesomeIcon icon={LifeRingIcon} className="feature-icon-custom" />
//               <h2 className="feature-heading-custom">30-Days Free Trial</h2>
//               <p className="feature-description-custom">With Support</p>
//             </div>
//             <div className="extra-feature-card-custom">
//               <FontAwesomeIcon icon={ClockIcon} className="feature-icon-custom" />
//               <h2 className="feature-heading-custom">Create Your Invoices In Less than 10 Sec</h2>
//             </div>
//             <div className="extra-feature-card-custom">
//               <FontAwesomeIcon icon={faHeadset} className="feature-icon-custom" />
//               <h2 className="feature-heading-custom">Whatsapp, Phone & Email Support</h2>
//             </div>
//             <div className="extra-feature-card-custom">
//               <FontAwesomeIcon icon={MobileAltIcon} className="feature-icon-custom" />
//               <h2 className="feature-heading-custom">Use From Any Device, Anywhere</h2>
//             </div>
//           </div>

//           <h2 className="why-use-retail-heading-custom">More Than 1 Lakh+ Business Owners Trust QuickRetail Software</h2>
//           <h3 className="fastest-growing-heading-custom">Fastest Growing Retail Software In India</h3>
//           <div className="buttons-container-custom">
//             <Link to='/ContactUs'><button className="button-custom demo-request-button-custom">Request a Free Demo</button></Link>
//           </div>
//           <Footer />
//         </div>
//       </div>
//       <Minichatbot />
//       <Button
//   variant="contained"
//   color="primary"
//   onClick={handleScrollToTop}
//   style={{
//     position: "fixed",
//     bottom: "20px",
//     right: "20px",
//     borderRadius: "70px",
//     backgroundColor: "#76abae",
//     color: "#222831",
//   }}
// >
//   <ArrowUpward />
// </Button>
//     </div>
//   );
// }

// export default FeaturesPage;

import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './FeaturesPage.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import Minichatbot from './Minichatbot';
import {
  faBoxOpen as BoxOpenIcon, // Inventory Management
  faCashRegister as CashRegisterIcon, // Point of Sale
  faUsers as UsersIcon, // Customer Management
  faUserTie as UserTieIcon, // Employee Management
  faChartLine as ChartLineIcon, // Sales Analytics
  faCogs as CogsIcon, // Integrations
  faFileInvoice as FileInvoiceIcon, // Invoicing
  faMobileAlt as MobileAltIcon, // Mobile Accessibility
  faHeadset as HeadsetIcon, // Customer Support
  faCloud as CloudIcon, // Cloud Backup
  faShieldAlt as ShieldAltIcon, // Security
  faStore as StoreIcon, // Multi-store Support
} from '@fortawesome/free-solid-svg-icons';

const FeaturesPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="content-topic-custom">
        <div className="main-heading-custom">
          <h1>Explore Our Features</h1>
          <p>Enhance your retail experience with our comprehensive suite of tools</p>
        </div>

        <div className="billing-container-custom">
          <Link to="/billing" className="billing-button-custom">
            Try Billing
          </Link>
        </div>
      </div>

      <div className="additional-features-custom">
        <div className="features-container-custom">
          <div className="feature-card-custom">
            <FontAwesomeIcon icon={BoxOpenIcon} className="feature-icon-custom" />
            <h2 className="feature-heading-custom">Inventory Management</h2>
            <p className="feature-description-custom">Track and manage your inventory levels with ease.</p>
          </div>
          <div className="feature-card-custom">
            <FontAwesomeIcon icon={CashRegisterIcon} className="feature-icon-custom" />
            <h2 className="feature-heading-custom">Point of Sale</h2>
            <p className="feature-description-custom">Streamline your checkout process with our POS system.</p>
          </div>
          <div className="feature-card-custom">
            <FontAwesomeIcon icon={UsersIcon} className="feature-icon-custom" />
            <h2 className="feature-heading-custom">Customer Management</h2>
            <p className="feature-description-custom">Maintain customer profiles and enhance relationships.</p>
          </div>
          <div className="feature-card-custom">
            <FontAwesomeIcon icon={UserTieIcon} className="feature-icon-custom" />
            <h2 className="feature-heading-custom">Employee Management</h2>
            <p className="feature-description-custom">Manage employee schedules, roles, and performance.</p>
          </div>
          <div className="feature-card-custom">
            <FontAwesomeIcon icon={ChartLineIcon} className="feature-icon-custom" />
            <h2 className="feature-heading-custom">Sales Analytics</h2>
            <p className="feature-description-custom">Gain insights into sales trends and performance.</p>
          </div>
          <div className="feature-card-custom">
            <FontAwesomeIcon icon={CogsIcon} className="feature-icon-custom" />
            <h2 className="feature-heading-custom">Integrations</h2>
            <p className="feature-description-custom">Seamlessly integrate with other business tools.</p>
          </div>
        </div>

        <div className="features-container-custom">
          <div className="feature-card-custom">
            <FontAwesomeIcon icon={FileInvoiceIcon} className="feature-icon-custom" />
            <h2 className="feature-heading-custom">Invoicing</h2>
            <p className="feature-description-custom">Create and manage invoices effortlessly.</p>
          </div>
          <div className="feature-card-custom">
            <FontAwesomeIcon icon={MobileAltIcon} className="feature-icon-custom" />
            <h2 className="feature-heading-custom">Mobile Accessibility</h2>
            <p className="feature-description-custom">Access your retail system from any mobile device.</p>
          </div>
          <div className="feature-card-custom">
            <FontAwesomeIcon icon={HeadsetIcon} className="feature-icon-custom" />
            <h2 className="feature-heading-custom">Customer Support</h2>
            <p className="feature-description-custom">Provide excellent customer support with our tools.</p>
          </div>
          <div className="feature-card-custom">
            <FontAwesomeIcon icon={CloudIcon} className="feature-icon-custom" />
            <h2 className="feature-heading-custom">Cloud Backup</h2>
            <p className="feature-description-custom">Keep your data safe with automatic cloud backups.</p>
          </div>
          <div className="feature-card-custom">
            <FontAwesomeIcon icon={ShieldAltIcon} className="feature-icon-custom" />
            <h2 className="feature-heading-custom">Security</h2>
            <p className="feature-description-custom">Ensure the security of your retail data.</p>
          </div>
          <div className="feature-card-custom">
            <FontAwesomeIcon icon={StoreIcon} className="feature-icon-custom" />
            <h2 className="feature-heading-custom">Multi-store Support</h2>
            <p className="feature-description-custom">Manage multiple stores from a single system.</p>
          </div>
        </div>
      </div>

      <Minichatbot />
      <Footer />
    </>
  );
};

export default FeaturesPage;
