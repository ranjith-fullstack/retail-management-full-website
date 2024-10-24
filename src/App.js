import React, { createContext, useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading  from './components/Loading';

const Superadmin = lazy(() => import('./superadmin/superadmin'));
const Loginpage = lazy(() => import('./components/loginpage'));
const Home = lazy(() => import('./components/Home'));
const FeaturesPage = lazy(() => import('./components/FeaturesPage'));
const PricingPage = lazy(() => import('./components/PricingPage'));
const PartnersPage = lazy(() => import('./components/PartnersPage'));
const ResourcesPage = lazy(() => import('./components/ResourcesPage'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const Admin = lazy(() => import('./admin/admin'));
const Masteradmin = lazy(() => import('./masteradmin/masteradmin'));
const Employee = lazy(() => import('./employee/employee'));
const Dashboard = lazy(() => import('./masteradmin/dashboard'));
const Signup = lazy(() => import('./components/signup'));
const Superadmindashboard = lazy(() => import('./superadmin/Superadmindashboard'));
const Employeedashboard = lazy(() => import('./employee/employeedashboard'));
const Categories = lazy(() => import('./masteradmin/Categories'));
const Products = lazy(() => import('./masteradmin/Products'));
const Stocks = lazy(() => import('./masteradmin/Stocks'));
const Salesorder = lazy(() => import('./masteradmin/Salesorder'));
const Invoices = lazy(() => import('./masteradmin/Invoices'));
const Supplier = lazy(() => import('./masteradmin/Supplier'));
const Purchaseorders = lazy(() => import('./masteradmin/Purchaseorders'));
const Reports = lazy(() => import('./masteradmin/Reports'));
const Employeeinfo = lazy(() => import('./masteradmin/Employeeinfo'));
const Customerdatabase = lazy(() => import('./masteradmin/Customerdatabase'));
const Mastersettings = lazy(() => import('./masteradmin/Mastersettings'));
const Employeesales = lazy(() => import('./employee/Employeesales'));
const Employeeinvoice = lazy(() => import('./employee/Employeeinvoice'));
const Emppersonaldetails = lazy(() => import('./employee/Emppersonaldetails'));
const Userspage = lazy(() => import('./superadmin/Userspage'));
const Partners = lazy(() => import('./superadmin/Partners'));
const MyProfile = lazy(() => import('./superadmin/MyProfile'));
const Chatbot = lazy(() => import('./superadmin/Chatbot'));
const Useremployee = lazy(() => import('./superadmin/Useremployee'));
const ErrorPage = lazy(() => import('./components/ErrorPage'));
const Cookiess = lazy(() => import('./components/Cookiess'));
const Privacypolicy = lazy(() => import('./components/Privacypolicy'));

export const userContext = createContext(null);

const App = () => {
  const [userRole, setuserRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    const removeListeners = () => {
      window.removeEventListener('beforeunload', handleRouteChangeStart);
      window.removeEventListener('load', handleRouteChangeComplete);
    };

    window.addEventListener('beforeunload', handleRouteChangeStart);
    window.addEventListener('load', handleRouteChangeComplete);

    return removeListeners;
  }, []);

  return (
    <BrowserRouter>
      <div>
        {loading && <Loading />} {/* Show loading component when loading is true */}
        <userContext.Provider value={{ userRole, setuserRole }}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/login" element={<Loginpage />} />
              <Route path="/Superadmin" element={<Superadmin />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/masteradmin" element={<Masteradmin />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/FeaturesPage" element={<FeaturesPage />} />
              <Route path="/PricingPage" element={<PricingPage />} />
              <Route path="/PartnersPage" element={<PartnersPage />} />
              <Route path="/ResourcesPage" element={<ResourcesPage />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              {/* masteradmin */}
              <Route path="/masteradmin/dashboard" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/masteradmin/Products" element={<Products />} />
              <Route path="/masteradmin/Stocks" element={<Stocks />} />
              <Route path="/masteradmin/Salesorder" element={<Salesorder />} />
              <Route path="/masteradmin/Invoices" element={<Invoices />} />
              <Route path="/masteradmin/Supplier" element={<Supplier />} />
              <Route path="/masteradmin/Purchaseorders" element={<Purchaseorders />} />
              <Route path="/masteradmin/Reports" element={<Reports />} />
              <Route path="/masteradmin/Employeeinfo" element={<Employeeinfo />} />
              <Route path="/masteradmin/Customerdatabase" element={<Customerdatabase />} />
              <Route path="/masteradmin/Mastersettings" element={<Mastersettings />} />
              {/* masteradmin */}
              {/* employee */}
              <Route path="/employee/Employeesales" element={<Employeesales />} />
              <Route path="/employee/Employeeinvoice" element={<Employeeinvoice />} />
              <Route path="/employee/Emppersonaldetails" element={<Emppersonaldetails />} />
              {/* employee */}
              <Route path="/superadmindashboard" element={<Superadmindashboard />} />
              <Route path="/Employeedashboard" element={<Employeedashboard />} />
              <Route path="/Userspage" element={<Userspage />} />
              <Route path="/Partners" element={<Partners />} />
              <Route path="/MyProfile" element={<MyProfile />} />
              <Route path="/Chatbot" element={<Chatbot />} />
              <Route path="/Useremployee" element={<Useremployee />} />
              {/* Handle 404 Not Found */}
              <Route path="*" element={<ErrorPage />} />
              <Route path="/Privacypolicy" element={<Privacypolicy />} />
            </Routes>
            <Cookiess />
          </Suspense>
        </userContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
