import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="781602785902-povmtgcupeqhmjhgvm20sgv69tkftbue.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
