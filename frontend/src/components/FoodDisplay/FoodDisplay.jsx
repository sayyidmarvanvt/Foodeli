import { useContext } from "react";
import "./FoodDisplay.scss";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import PropTypes from "prop-types";

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
          return null; // Explicit return for items that don't match the category
        })}
      </div>
    </div>
  );
};

// Add prop validation for the FoodDisplay component
FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};

export default FoodDisplay;
