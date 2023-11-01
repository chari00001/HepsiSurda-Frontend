import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>About Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, diam vel tincidunt suscipit, velit elit lacinia velit,
              vel bibendum sapien sapien vel nunc. Sed euismod, diam vel
              tincidunt suscipit, velit elit lacinia velit, vel bibendum sapien
              sapien vel nunc.
            </p>
          </div>
          <div className="col-md-6">
            <h3>Contact Us</h3>
            <ul>
              <li>123 Main Street</li>
              <li>Anytown, USA 12345</li>
              <li>Phone: 555-555-5555</li>
              <li>Email: info@example.com</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
