import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
import './Breadcrumb.css'; 

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="breadcrumbs-container"> 
      <Breadcrumbs aria-label="breadcrumb">
        <Link className="breadcrumb-link" to="/Login">
          Login
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={name} className="active-breadcrumb" color="textPrimary"> 
              {name}
            </Typography>
          ) : (
            <Link key={name} className="breadcrumb-link" to={routeTo}> 
              {name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
