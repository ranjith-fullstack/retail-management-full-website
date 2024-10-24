import React, { useContext,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { userContext } from '../App';
import  Employeedashboard  from './employeedashboard';
 const Employee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  const {userRole} = useContext(userContext);
  useEffect(()=>{
    const role = localStorage.getItem('role')
    console.log(role,"loacl role")
    if(role !== 'employee' ){
    navigate('/login')
    }
    console.log(userRole)
    },[userRole])
  useEffect(() => {
    const token = Cookies.get('token');
    const { username, role } = location;
     console.log(username,'username')

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
      <Employeedashboard/>
      
    </div>
  );
};
export default Employee;