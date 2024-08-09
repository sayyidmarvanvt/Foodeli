import React, { useContext } from "react";
import "./FoodDisplay.scss";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
const FoodDisplay = ({ category, setCategory }) => {
  const { foodlist } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <div className="food-display-list">
        {foodlist.map((item, index) => {
          if (category  === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
