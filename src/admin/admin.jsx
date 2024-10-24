import React, { useContext,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { userContext } from '../App';
export const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const {userRole} = useContext(userContext);
  useEffect(()=>{
    const role = localStorage.getItem('role')
    console.log(role,"loacl role")
    if(role !== 'admin' ){
    navigate('/login')
    }
    console.log(userRole)
    },[userRole])
  useEffect(() => {
    const token = Cookies.get('token');
    const { username,role } = location;
   

    if (!token) {
      navigate('/login');
    } else {
      setUsername(username);
      setRole(role);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome to the Admin Page!</h2>
      <p>Username: {username}</p>
      <p>Role: {role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
