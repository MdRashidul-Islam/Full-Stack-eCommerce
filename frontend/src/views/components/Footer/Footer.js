import React from "react";
import appStore from "../../../assets/images/Appstore.png";
import logo from "../../../assets/images/logo.png";
import playStore from "../../../assets/images/playstore.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="col1">
        <h5>Customer Care</h5>

        <p>Help Center</p>
        <p>How to Buy</p>
        <p>Returns & Refunds</p>
        <p>Contact Us</p>
        <p>Terms & Conditions</p>
        <h5>Earn With eCommerce</h5>
        <p>eCommerce University</p>
        <p>Sell on eCommerce</p>
        <p>Code of Conduct</p>
        <p>Join the eCommerce Affiliate Program</p>
      </div>
      <div className="col2">
        <h5>ECommerce</h5>
        <p>About ECommerce</p>
        <p> Digital Payments</p>
        <p>Careers</p>
        <p>eCommerce Blog</p>
        <p>eCommerce Cares</p>
        <p>dMart</p>
        <p>Privacy Policy</p>
        <p>eCommerce App</p>
        <p>eCommerce Exclusives</p>
        <p>Hungrynaki Food Delivery</p>
        <p>BD Cricket Live</p>
        <p>Soybean Oil</p>
      </div>
      <div className="col3">
        <img
          className="barCode"
          src="https://laz-img-cdn.alicdn.com/images/ims-web/TB1nvAvXMFY.1VjSZFnXXcFHXXa.png"
          alt=""
        />
        <img className="appStore" src={appStore} alt="" />
      </div>
      <div className="col4">
        <img className="top" src={logo} alt="" />
        <h6 style={{ color: "#FF6347", marginBottom: "5px" }}>
          Happy Shopping
        </h6>
        <h6>Download App</h6>
        <img className="bottom" src={playStore} alt="" />
      </div>
    </div>
  );
};

export default Footer;
