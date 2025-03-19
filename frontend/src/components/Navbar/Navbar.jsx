import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./Navbar.scss";
import { assets } from "../../assets/assets";
import { IoIosArrowDown } from "react-icons/io";
import { IoLogInOutline } from "react-icons/io5";
import { StoreContext } from "../../context/StoreContext";
import SearchBar from "../Searchbar/Searchbar";

const Navbar = ({ setShowLogin }) => {
  const [activeMenu, setActiveMenu] = useState("header");
  const { getTotalCartAmount, token } = useContext(StoreContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true); // Correct usage of setShowLogin
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // if scrolling down
      setShowNavbar(false);
    } else {
      // if scrolling up
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`navbar ${showNavbar ? "navbar--visible" : "navbar--hidden"}`}
    >
      <Link to="/">
        <div className="logo" onClick={() => handleMenuClick("header")}>
          <img src={assets.logo} alt="Foodeli logo" />
          <p>Foodeli</p>
        </div>
      </Link>
      <ul className="navbar-menu">
        <li
          className={activeMenu === "menu" ? "active" : ""}
          onClick={() => handleMenuClick("menu")}
        >
          <HashLink smooth to="/#menu">
            Menu
            <IoIosArrowDown />
          </HashLink>
        </li>
        <li
          className={activeMenu === "services" ? "active" : ""}
          onClick={() => handleMenuClick("services")}
        >
          <HashLink smooth to="/#services">
            Services
            <IoIosArrowDown />
          </HashLink>
        </li>
        <li
          className={activeMenu === "contact us" ? "active" : ""}
          onClick={() => handleMenuClick("contact us")}
        >
          <HashLink smooth to="/#app-download">
            App
            {/* <IoIosArrowDown /> */}
          </HashLink>
        </li>
      </ul>
      <div className="navbar-right">
        {token && showSearchBar && (
          <div className="search-bar-container">
            <SearchBar onClose={() => setShowSearchBar(false)} />
          </div>
        )}
        <button className="search-btn" onClick={() => setShowSearchBar(true)}>
          <img src={assets.search_icon} alt="Search icon" />
        </button>

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"} />
        </div>
        {!token ? (
          <button onClick={handleLoginClick}>
            <IoLogInOutline size={16} />
            Login
          </button>
        ) : (
          <div className={`navbar-profile`} onClick={handleLoginClick}>
            <img src={assets.profile_icon} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
