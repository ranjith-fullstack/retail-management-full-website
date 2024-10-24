import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    const fetchBusinessName = async () => {
      try {
        const response = await axios.get('http://localhost:3005/get-business-name', {
          withCredentials: true,
        });
        setBusinessName(response.data.businessName);
      } catch (error) {
        console.error('Error fetching business name:', error);
      }
    };

    fetchBusinessName();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
    localStorage.removeItem('role');
  };

  return (
    <div style={{ backgroundColor: "#eeeeee", height: '8vh' }} className='d-flex flex-column justify-content-center '>
      <div className="d-flex flex-row justify-content-around ">
        <div className='headername'>
          {businessName || 'Loading...'}
        </div>
        <div>
          <div className="deleteButton">
            <FaUser />
            <div className="tooltip" onClick={handleLogout}>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;