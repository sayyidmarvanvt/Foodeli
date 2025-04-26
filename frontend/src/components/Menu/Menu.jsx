import "./Menu.scss";
import { menu_list } from "../../assets/assets";
import FoodDisplay from "../FoodDisplay/FoodDisplay";
import PropTypes from "prop-types";
import MenuListItem from "../MenuListItem/MenuListItem"

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
            <MenuListItem
              key={index}
              item={item}
              isActive={category === item.menu_name}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
            />
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
