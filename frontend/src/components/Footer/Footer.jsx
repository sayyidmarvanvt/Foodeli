import "./Footer.scss";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <hr />
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="heading">
            <img src={assets.logo} alt="" />
            <h2>Foodeli</h2>
          </div>
          <p>
            Our job is to filling your tummy with delicious food and with fast
            and free delivery.
          </p>
          <div className="footer-social-icons">
            <img src={assets.instagram_icon} alt="" />
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>Question or feedback?</li>
            <li>We’d love to hear from you</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © Foodeli.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
