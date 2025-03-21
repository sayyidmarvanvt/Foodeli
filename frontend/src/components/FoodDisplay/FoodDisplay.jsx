import React, { useContext } from "react";
import "./FoodDisplay.scss";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { foodlist, loading, clickedSearchResult } = useContext(StoreContext);
  const displayedFoodList = clickedSearchResult
    ? [
        clickedSearchResult,
        ...foodlist.filter((item) => item._id !== clickedSearchResult._id),
      ]
    : foodlist;

  if (loading) {
    return (
      <div className="loading-indicator">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="food-display" id="food-display">
      <div className="food-display-list">
        {displayedFoodList.map((item, index) => {
          if (category === "All" || category === item.category) {
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
