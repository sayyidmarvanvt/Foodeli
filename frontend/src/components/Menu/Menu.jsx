import "./Menu.scss";
import { menu_list } from "../../assets/assets";
import FoodDisplay from "../FoodDisplay/FoodDisplay";
import PropTypes from "prop-types";

const Menu = ({ category, setCategory }) => {
  return (
    <div className="menu" id="menu">
      <h1>OUR MENU</h1>
      <p className="menu-text">
        Menu That Always <br /> Makes You Fall In Love
      </p>
      <div className="menu-list">
        <div className="menu-right">
          {menu_list.map((item, index) => (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className={`menu-list-item ${
                category === item.menu_name ? "active" : ""
              }`}
            >
              <img src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
        <FoodDisplay category={category} />
      </div>
    </div>
  );
};

// Add prop validation
Menu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default Menu;
