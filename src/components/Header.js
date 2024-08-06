import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <header>
        <h2 className="logo">
          <Link to="/">BOOKNOW</Link>
        </h2>
        <nav className="navigation">
          <a href="/">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <button className="btnLogin-popup" onClick={togglePopup}>
            Login
          </button>
        </nav>
      </header>

      {showPopup && (
        <div className="wrapper">
          <span className="icon-close" onClick={togglePopup}>
            &times;
          </span>
          {isLogin ? (
            <div className="form-box login">
              <h1>Login</h1>
              <form action="#">
                <div className="input-box">
                  <input type="text" placeholder="Username" required />
                  <i className="bx bxs-user"></i>
                </div>
                <div className="input-box">
                  <input type="password" placeholder="Password" required />
                  <i className="bx bxs-lock"></i>
                </div>
                <div className="remember-forgot">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="#">Forgot password?</a>
                </div>
                <button type="submit" className="btn">Login</button>
                <div className="login-register">
                  <p>
                    Don't have an account?
                    <a href="#" className="register-link" onClick={toggleForm}>
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="form-box register">
              <h1>Registration</h1>
              <form action="#">
                <div className="input-box">
                  <input type="text" placeholder="Username" required />
                  <i className="bx bxs-user"></i>
                </div>
                <div className="input-box">
                  <input type="email" placeholder="Email" required />
                  <i className="bx bx-envelope"></i>
                </div>
                <div className="input-box">
                  <input type="password" placeholder="Password" required />
                  <i className="bx bxs-lock"></i>
                </div>
                <div className="remember-forgot">
                  <label>
                    <input type="checkbox" /> Agree to the terms & conditions
                  </label>
                </div>
                <button type="submit" className="btn">Register</button>
                <div className="login-register">
                  <p>
                    Already have an account?
                    <a href="#" className="login-link" onClick={toggleForm}>
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
