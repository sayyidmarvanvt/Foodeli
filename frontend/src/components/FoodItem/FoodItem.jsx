import React, { useContext, useEffect, useState } from "react";
import "./FoodItem.scss";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, image }) => {
  const [active, setActive] = useState(false);

  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  

  useEffect(()=>{
    setActive(cartItems[id])
  },[cartItems,id])



  return (
    <div className={`food-item ${active ? "active" : ""}`}>
      <img
        src={"https://foodeli-backend-55b2.onrender.com/api/images/" + image}
        alt=""
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

export default FoodItem;
