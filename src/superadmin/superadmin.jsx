import React, { useContext, useEffect,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Sidebar } from '../masteradmin/sidebar';

import { userContext } from '../App';
import { Superadmindashboard } from './Superadmindashboard';
 const Superadmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const {userRole} = useContext(userContext);
  useEffect(()=>{
    const role = localStorage.getItem('role')
    console.log(role,"loacl role")
    if(role !== 'superadmin' ){
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
     <Superadmindashboard/>
    </div>
  );
};
export default Superadmin;