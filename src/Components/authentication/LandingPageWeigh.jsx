import React from "react";
import { Link } from "react-router-dom";
import "./LandingPageWeigh.css";

const LandingPageWeigh = () => {
  return (
    <div className="landing-page">
      <header className="header">
        {/* <h1 className="header__title">Welcome to Weigh Bridge</h1> */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/" className="header__nav-link">
                Home
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/about" className="header__nav-link">
                About Us
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/contact" className="header__nav-link">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <h1 className="header__title">Welcome to Weigh Bridge</h1>

        <div className="signin-signup-page">
          <Link to="/signin">
            <button className="btn btn-primary">Signup</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-primary" style={{ marginLeft: "10px" }}>
              Signin
            </button>
          </Link>
        </div>
        {/* <section className="section">
          <h2 className="section__title">Our Services</h2>
          <p className="section__description">
            We offer a wide range of services tailored to meet your needs.
          </p>
        </section>
        <section className="section">
          <h2 className="section__title">Our Team</h2>
          <p className="section__description">
            Meet the dedicated team behind our success.
          </p>
        </section> */}
      </main>

      <footer className="footer">
        <p className="footer__copyright">
          &copy; 2024 Our Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPageWeigh;
