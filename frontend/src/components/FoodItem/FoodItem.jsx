import React, { useContext, useEffect, useState } from "react";
import "./FoodItem.scss";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import PropTypes from "prop-types";

const FoodItem = ({ id, name, price, image }) => {
  const [active, setActive] = useState(false);

  const { cartItems, addToCart, removeFromCart, clickedSearchResult } =
    useContext(StoreContext);

  useEffect(() => {
    if (clickedSearchResult && clickedSearchResult._id === id) {
      setActive(true);
      window.scrollTo({ top: 400, behavior: "smooth" });
    } else {
      setActive(cartItems[id]);
    }
  }, [clickedSearchResult, cartItems, id]);

  return (
    <div className={`food-item ${active ? "active" : ""}`}>
      <img
        src={image}
        alt={name}
        className="food-item-image"
        onClick={() => setActive(!active)}
      />
      {active && (
        <div className="active-details">
          {!cartItems[id] ? (
            <img
              className="add"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt=""
            />
          ) : (
            <div className="food-item-counter">
              <button onClick={() => removeFromCart(id)}>-</button>
              <p>{cartItems[id]}</p>
              <button onClick={() => addToCart(id)}>+</button>
            </div>
          )}
          <div className="food-item-info">
            <p>{name}</p>
            <p className="food-item-price">
              <span>$</span>
              {price}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

FoodItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default React.memo(FoodItem);
