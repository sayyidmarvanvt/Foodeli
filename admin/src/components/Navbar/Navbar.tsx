import "./Navbar.scss";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={assets.logo} alt="" />
        <p>Admin Panel</p>
      </div>
      <img src={assets.profile_image} alt="" className="profile" />
    </div>
  );
};

export default Navbar;
