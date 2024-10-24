import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faTachometerAlt, faBoxes, faCashRegister, faShoppingCart, faFileInvoice, faUsers, faTruck, faChartBar, faUserFriends, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [featDropdownVisible, setFeatDropdownVisible] = useState(false);
  const [salesDropdownVisible, setSalesDropdownVisible] = useState(false);
  const [purchasesDropdownVisible, setPurchasesDropdownVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const handleSidebarToggle = () => {
    setSidebarVisible(!isSidebarVisible);
    
  };

  const handleFeatToggle = (event) => {
    event.preventDefault();
    setFeatDropdownVisible(!featDropdownVisible);
  };

  const handleSalesToggle = (event) => {
    event.preventDefault();
    setSalesDropdownVisible(!salesDropdownVisible);
  };

  const handlePurchasesToggle = (event) => {
    event.preventDefault();
    setPurchasesDropdownVisible(!purchasesDropdownVisible);
  };

  const handleActiveIndex = (index) => {
    setActiveIndex(index);
    setSidebarVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
    localStorage.removeItem('role');
  };
  return (
    <div>
      <div className="sidebar-btn" onClick={handleSidebarToggle}>
        <span className="material-symbols-outlined">menu</span>
      </div>

      <nav ref={sidebarRef} className={`sidebar-nav ${isSidebarVisible ? 'show' : ''}`}>
        <div className="sidebar-text">Master Admin</div>
        <ul>
          <li className={activeIndex === 0 ? 'active' : ''} onClick={() => handleActiveIndex(0)}>
            <div className='bigbig d-flex flex-row justify-content-start'>
                <div className='icononh'>
                    <FontAwesomeIcon icon={faTachometerAlt} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                    <Link to="/masteradmin/dashboard" onClick={() => setSidebarVisible(false)} className='linklink'>Dashboard</Link>
                </div>
            </div>
          </li>
          <li>
            <div className='bigbig d-flex flex-row justify-content-start'>
                <div className='icononh'>
                    <FontAwesomeIcon icon={faBoxes} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                    <Link to="#" onClick={handleFeatToggle} className='linklink'>Inventory <FontAwesomeIcon icon={faCaretDown} className={`first ${featDropdownVisible ? 'rotate' : ''} white-icon`} /></Link>
                </div>
            </div>
            <ul className={`sidebar-feat-show ${featDropdownVisible ? 'show' : ''}`}>
              <li className={activeIndex === 1 ? 'active' : ''} onClick={() => handleActiveIndex(1)}>
                <div className='bigbigg d-flex flex-row justify-content-start'>
                <div className='icononhh'>
                    <FontAwesomeIcon icon={faChartBar} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                    <Link to="/categories" onClick={() => setSidebarVisible(false)} className='linklink'>Categories</Link>
                </div>
            </div>
              </li>
              <li className={activeIndex === 2 ? 'active' : ''} onClick={() => handleActiveIndex(2)}>
                <div className='bigbigg d-flex flex-row justify-content-start'>
                <div className='icononhh'>
                    <FontAwesomeIcon icon={faBoxes} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                    <Link to="/masteradmin/Products" onClick={() => setSidebarVisible(false)} className='linklink'>Products</Link>
                </div>
            </div>
              </li>
              <li className={activeIndex === 3 ? 'active' : ''} onClick={() => handleActiveIndex(3)}>
                <div className='bigbigg d-flex flex-row justify-content-start'>
                <div className='icononhh'>
                    <FontAwesomeIcon icon={faShoppingCart} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                    <Link to="/masteradmin/Stocks" onClick={() => setSidebarVisible(false)} className='linklink'>Stock</Link>
                </div>
            </div>
              </li>
              
            </ul>
          </li>
          <li>
            <div className='bigbig d-flex flex-row justify-content-start'>
                <div className='icononh'>
                    <FontAwesomeIcon icon={faCashRegister} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                    <Link to="#" onClick={handleSalesToggle} className='linklink'>Sales <FontAwesomeIcon icon={faCaretDown} className={`first ${salesDropdownVisible ? 'rotate' : ''} white-icon`} /></Link>
                </div>
            </div>
            <ul className={`sidebar-feat-show ${salesDropdownVisible ? 'show' : ''}`}>
              <li className={activeIndex === 4 ? 'active' : ''} onClick={() => handleActiveIndex(4)}>
                <div className='bigbigg d-flex flex-row justify-content-start'>
                <div className='icononhh'>
                    <FontAwesomeIcon icon={faFileInvoice} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                    <Link to="/masteradmin/Salesorder" onClick={() => setSidebarVisible(false)} className='linklink'>Sales Orders</Link>
                </div>
            </div>
              </li>
              <li className={activeIndex === 5 ? 'active' : ''} onClick={() => handleActiveIndex(5)}>
                <div className='bigbigg d-flex flex-row justify-content-start'>
                <div className='icononhh'>
                    <FontAwesomeIcon icon={faUsers} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                    <Link to="/masteradmin/Invoices" onClick={() => setSidebarVisible(false)} className='linklink'>Invoices</Link>
                </div>
            </div>
              </li>
              <li className={activeIndex === 6 ? 'active' : ''} onClick={() => handleActiveIndex(6)}>
                <div className='bigbigg d-flex flex-row justify-content-start'>
                <div className='icononhh'>
                    <FontAwesomeIcon icon={faUserFriends} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                    <Link to="/masteradmin/Customerdatabase" onClick={() => setSidebarVisible(false)} className='linklink'>Customers</Link>
                </div>
            </div>
              </li>
              
            </ul>
          </li>
          <li>
            <div className='bigbig d-flex flex-row justify-content-start'>
                <div className='icononh'>
                    <FontAwesomeIcon icon={faShoppingCart} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                    <Link to="#" onClick={handlePurchasesToggle} className='linklink'>Purchases <FontAwesomeIcon icon={faCaretDown} className={`first ${purchasesDropdownVisible ? 'rotate' : ''} white-icon`} /></Link>
                </div>
            </div>
            <ul className={`sidebar-feat-show ${purchasesDropdownVisible ? 'show' : ''}`}>
              <li className={activeIndex === 7 ? 'active' : ''} onClick={() => handleActiveIndex(7)}>
                <div className='bigbigg d-flex flex-row justify-content-start'>
                <div className='icononhh'>
                    <FontAwesomeIcon icon={faTruck} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                    <Link to="/masteradmin/Supplier" onClick={() => setSidebarVisible(false)} className='linklink'>Supplier</Link>
                </div>
            </div>
              </li>
              <li className={activeIndex === 8 ? 'active' : ''} onClick={() => handleActiveIndex(8)}>
                <div className='bigbigg d-flex flex-row justify-content-start'>
                <div className='icononhh'>
                    <FontAwesomeIcon icon={faShoppingCart} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                    <Link to="/masteradmin/Purchaseorders" onClick={() => setSidebarVisible(false)} className='linklink'>Purchase Orders</Link>
                </div>
            </div>
              </li>
            </ul>
          </li>
            <li className={activeIndex === 9 ? 'active' : ''} onClick={() => handleActiveIndex(9)}>
              <div className='bigbig d-flex flex-row justify-content-start'>
                <div className='icononh'>
                  <FontAwesomeIcon icon={faChartBar} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                  <Link to="/masteradmin/Reports" onClick={() => setSidebarVisible(false)} className='linklink'>Reports</Link>
                </div>
              </div>
            </li>
            <li className={activeIndex === 10 ? 'active' : ''} onClick={() => handleActiveIndex(10)}>
              <div className='bigbig d-flex flex-row justify-content-start'>
                <div className='icononh'>
                  <FontAwesomeIcon icon={faUserFriends} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                  <Link to="/masteradmin/Employeeinfo" onClick={() => setSidebarVisible(false)} className='linklink'>Employee info</Link>
                </div>
              </div>
            </li>
            <li className={activeIndex === 11 ? 'active' : ''} onClick={() => handleActiveIndex(11)}>
              <div className='bigbig d-flex flex-row justify-content-start'>
                <div className='icononh'>
                  <FontAwesomeIcon icon={faCog} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                  <Link to="/masteradmin/Mastersettings" onClick={() => setSidebarVisible(false)} className='linklink'>Settings</Link>
                </div>
              </div>
            </li>
            <li className={activeIndex === 12 ? 'active' : ''} onClick={() => handleActiveIndex(12)}>
              <div className='bigbig d-flex flex-row justify-content-start'>
                <div className='icononh'>
                  <FontAwesomeIcon icon={faSignOutAlt} className="white-icon" />
                </div>
                <div className='sidebarlink' onClick={handleLogout}>
                  <Link to="/login" onClick={() => setSidebarVisible(false)} className='linklink'>Logout</Link> 
                </div>
              </div>
            </li>

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
