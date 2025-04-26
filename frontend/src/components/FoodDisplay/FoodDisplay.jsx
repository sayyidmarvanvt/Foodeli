import React,{ useContext,Suspense } from "react";
import "./FoodDisplay.scss";
import { StoreContext } from "../../context/StoreContext";
const FoodItem = React.lazy(() => import("../FoodItem/FoodItem"));
import PropTypes from "prop-types";

const FoodDisplay = ({ category }) => {
  const { foodlist, clickedSearchResult } = useContext(StoreContext);
  const displayedFoodList = clickedSearchResult
    ? [
        clickedSearchResult,
        ...foodlist.filter((item) => item._id !== clickedSearchResult._id),
      ]
    : foodlist;

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-list">
        {displayedFoodList.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <Suspense fallback={<div className="spinner"></div>}>
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              </Suspense>
            );
          }
          return null;
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
