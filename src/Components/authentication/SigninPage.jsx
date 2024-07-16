import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './SigninPage.css'; // Add your CSS file for styling

const SigninPage = () => {
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const handleCaptchaChange = (value) => {
      // Check if the captcha is successfully verified
      if (value) {
        setCaptchaVerified(true);
      }
    };
  
    return (
      <div className="login-page">
        <div className="login-form me-5">
          <h2 className='h2-signinpage'>Login</h2>
          <div className="input-group">
            <div className="input-icon-user">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <input type="text" placeholder="Username" />
          </div>
          <div className="input-group">
            <div className="input-icon-password">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input type="password" placeholder="Password" />
          </div>
          {/* Google reCAPTCHA */}
          <div className="g-recaptcha" data-sitekey="6LdN2NEpAAAAAKAcjZGZHtpvY6YAFxWybAnxwkXA" data-callback={handleCaptchaChange}></div>
          {/* Check if captcha is verified before enabling the login button */}
          <button className="btn btn-primary" disabled={!captchaVerified}>Login</button>
        </div>
      </div>
    );
};

export default SigninPage;
