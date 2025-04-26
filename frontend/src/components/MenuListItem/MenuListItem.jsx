import React, { memo } from "react";
import PropTypes from "prop-types";

const MenuListItem = memo(({ item, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`menu-list-item ${isActive ? "active" : ""}`}
    >
      <img src={item.menu_image} alt={item.menu_name} />
      <p>{item.menu_name}</p>
    </div>
  );
});

MenuListItem.propTypes = {
  item: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuListItem;