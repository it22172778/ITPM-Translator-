import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="social-media">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>

        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="contact-info">
          <h3>Contact Us</h3>
          <h8>Email: ceylonspeaks@mail.com</h8><br></br>
          <h8>Phone: +94 (011) 456-7890</h8><br></br>
          <h8>Address: 123 malabe St, colombo, sri-lanka</h8><br></br>
        </div>

        <div className="newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <h3>&copy; {new Date().getFullYear()} Ceylon Speaks. All rights reserved.</h3>
      </div>
    </footer>
  );
};

export default Footer;
