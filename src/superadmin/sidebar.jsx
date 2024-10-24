import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faChartBar, faUsers, faCog, faSignOutAlt, faBars, faHandshake } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';

const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const sidebarRef = useRef(null);

  const handleSidebarToggle = () => {
    setSidebarVisible(!isSidebarVisible);
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

  return (
    <div>
      <div className="sidebar-btn" onClick={handleSidebarToggle}>
        <span className="material-symbols-outlined">menu</span>
      </div>

      <nav ref={sidebarRef} className={`sidebar-nav ${isSidebarVisible ? 'show' : ''}`}>
        <div className="sidebar-text">Super Admin</div>
        <ul>
          <li className={activeIndex === 0 ? 'active' : ''} onClick={() => handleActiveIndex(0)}>
            <div className='bigbig d-flex flex-row justify-content-start'>
                <div className='icononh'>
                    <FontAwesomeIcon icon={faTachometerAlt} className="white-icon" />
                </div>
                <div className='sidebarlink'>
                    <Link to="/Superadmindashboard" onClick={() => setSidebarVisible(false)} className='linklink'>Dashboard</Link>
                </div>
            </div>
          </li>
          
          <li className={activeIndex === 1 ? 'active' : ''} onClick={() => handleActiveIndex(1)}>
            <div className='bigbig d-flex flex-row justify-content-start'>
              <div className='icononh'>
                <FontAwesomeIcon icon={faUsers} className="white-icon" />
              </div>
              <div className='sidebarlink'>
                <Link to="/Userspage" onClick={() => setSidebarVisible(false)} className='linklink'>Users</Link>
              </div>
            </div>
          </li>
          <li className={activeIndex === 2 ? 'active' : ''} onClick={() => handleActiveIndex(2)}>
            <div className='bigbig d-flex flex-row justify-content-start'>
              <div className='icononh'>
                <FontAwesomeIcon icon={faHandshake} className="white-icon" />
              </div>
              <div className='sidebarlink'>
                <Link to="/Partners" onClick={() => setSidebarVisible(false)} className='linklink'>Partners</Link>
              </div>
            </div>
          </li>
          <li className={activeIndex === 2 ? 'active' : ''} onClick={() => handleActiveIndex(2)}>
            <div className='bigbig d-flex flex-row justify-content-start'>
              <div className='icononh'>
                <FontAwesomeIcon icon={faHandshake} className="white-icon" />
              </div>
              <div className='sidebarlink'>
                <Link to="/Chatbot" onClick={() => setSidebarVisible(false)} className='linklink'>Chatbot</Link>
              </div>
            </div>
          </li>
          <li className={activeIndex === 3 ? 'active' : ''} onClick={() => handleActiveIndex(3)}>
            <div className='bigbig d-flex flex-row justify-content-start'>
              <div className='icononh'>
                <FontAwesomeIcon icon={faCog} className="white-icon" />
              </div>
              <div className='sidebarlink'>
                <Link to="/MyProfile" onClick={() => setSidebarVisible(false)} className='linklink'>My Profile</Link>
              </div>
            </div>
          </li>
          <li className={activeIndex === 4 ? 'active' : ''} onClick={() => handleActiveIndex(4)}>
            <div className='bigbig d-flex flex-row justify-content-start'>
              <div className='icononh'>
                <FontAwesomeIcon icon={faSignOutAlt} className="white-icon" />
              </div>
              <div className='sidebarlink'>
                <Link to="/" onClick={() => setSidebarVisible(false)} className='linklink'>Logout</Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
