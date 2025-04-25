import { useContext, useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./Navbar.scss";
import { assets } from "../../assets/assets";
import { IoLogInOutline } from "react-icons/io5";
import { StoreContext } from "../../context/StoreContext";
import SearchBar from "../Searchbar/Searchbar";
import PropTypes from "prop-types";

const Navbar = ({ setShowLogin }) => {
  const [activeMenu, setActiveMenu] = useState("header");
  const { getTotalCartAmount, token } = useContext(StoreContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      // if scrolling down
      setShowNavbar(false);
      setShowSearchBar(false);
    } else {
      // if scrolling up
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [controlNavbar]);

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
          </HashLink>
        </li>
        <li
          className={activeMenu === "services" ? "active" : ""}
          onClick={() => handleMenuClick("services")}
        >
          <HashLink smooth to="/#services">
            Services
          </HashLink>
        </li>
        <li
          className={activeMenu === "contact us" ? "active" : ""}
          onClick={() => handleMenuClick("contact us")}
        >
          <HashLink smooth to="/#app-download">
            App
          </HashLink>
        </li>
      </ul>
      <div className="navbar-right">
        {isHomePage && showSearchBar && (
          <div
            className={`search-bar-container ${
              showNavbar ? "visible" : "hidden"
            }`}
          >
            <SearchBar onClose={() => setShowSearchBar(false)} />
          </div>
        )}

        <img
          src={assets.search_icon}
          alt="Search icon"
          className="search-btn"
          onClick={() => setShowSearchBar(true)}
        />

        <div className="navbar-cart-icon">
          <Link to="/cart">
            <img
              src={assets.basket_icon}
              className="search-btn"
              alt="Cart icon"
            />
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
            <img src={assets.profile_icon} alt="Profile icon" />
          </div>
        )}
      </div>
    </div>
  );
};

// Add prop validation
Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
