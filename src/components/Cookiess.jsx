import React, { useState, useEffect } from 'react';
import './Cookies.css';
import Cookies from 'js-cookie'; // Import the js-cookie library
import 'aos/dist/aos.css'; // Import AOS CSS
import AOS from 'aos'; // Import AOS library

 const Cookiess = () => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    AOS.init(); // Initialize AOS
    const cookiesAccepted = Cookies.get('cookiesAccepted');
    if (cookiesAccepted === 'true') {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookiesAccepted', 'true', { expires: 30 }); // Expires in 30 days
    setAccepted(false);
  };

  if (!accepted) {
    return null; // Render nothing if accepted
  }

  return (
    <div className="cookies-container" data-aos="fade-up">
      <section className="cookie-banner notification-bar transparent dark bottom">
        <section className="wide-container container">
          <div className="description-left">
            <p>
              We use cookies to make your experience of our websites better. By using and further navigating this website you accept this. Detailed information about the use of cookies on this website is available by clicking on{' '}
              <a href="/Privacypolicy" target="_blank">more information</a>.
            </p>
          </div>
          <button className="button accept-button green close-button" onClick={handleAccept}>
            Accept and Close
          </button>
        </section>
      </section>
    </div>
  );
};
export default Cookiess;
