import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js"; // Import assets if needed
import "./Recommendation.scss"; // Import the CSS file

const Recommendation = () => {
  const { token, foodlist, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);
  const [recommendations, setRecommendations] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  // Fetch user order history
  const fetchUserHistory = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        "https://foodeli-backend-55b2.onrender.com/api/order/userorders",
        {},
        { headers: { token } } // Pass the token in headers
      );
      return response.data.data; // Return user's order history
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

  // Generate random recommendations
  const getRandomRecommendations = (foodlist, count) => {
    return foodlist
      .sort(() => 0.5 - Math.random()) // Shuffle the array
      .slice(0, count) // Pick the first `count` items
      .map((item) => ({
        id: item._id, // Include the ID
        name: item.name, // Include the name
        price: item.price, // Include the price
        image: item.image, // Include the image
      }));
  };

  // Determine the number of recommendations based on screen size
  const getRecommendationCount = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1024) {
      return 5; // Desktop
    } else if (screenWidth >= 768) {
      return 3; // Tablet
    } else {
      return 2; // Mobile
    }
  };

  const getRecommendations = async () => {
    try {
      // Fetch user order history
      const userHistory = await fetchUserHistory();

      // Check if data is valid
      if (!userHistory || userHistory.length === 0) {
        console.log("No data to send to the backend.");
        return;
      }

      // Determine the number of recommendations based on screen size
      const recommendationCount = getRecommendationCount();

      // Use random recommendations as a fallback
      const randomRecommendations = getRandomRecommendations(
        foodlist,
        recommendationCount
      );
      setRecommendations(randomRecommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast.error("Error fetching recommendations");

      // Use random recommendations if there's an error
      const recommendationCount = getRecommendationCount();
      const randomRecommendations = getRandomRecommendations(
        foodlist,
        recommendationCount
      );
      setRecommendations(randomRecommendations);
    }
  };

  useEffect(() => {
    getRecommendations();

    // Handle window resize
    const handleResize = () => {
      getRecommendations();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [foodlist]);

  return (
    <div className="my-orders">
      <h2>Recommended for You</h2>
      <div className="recom-container container">
        {recommendations.length > 0 ? (
          <ul className="container flexRow">
            {recommendations.map((item) => (
              <li
                key={item.id}
                className={`recom-item ${
                  activeItem === item.id ? "active" : ""
                }`}
                onClick={() =>
                  setActiveItem(activeItem === item.id ? null : item.id)
                }
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="recom-item-image"
                />
                {activeItem === item.id && (
                  <div className="active-details">
                    {!cartItems[item.id] ? (
                      <img
                        className="add"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent li onClick from firing
                          addToCart(item.id);
                        }}
                        src={assets.add_icon_white}
                        alt="Add to cart"
                      />
                    ) : (
                      <div className="recom-item-counter">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent li onClick from firing
                            removeFromCart(item.id);
                          }}
                        >
                          -
                        </button>
                        <p>{cartItems[item.id]}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent li onClick from firing
                            addToCart(item.id);
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                    <div className="recom-item-info">
                      <p>{item.name}</p>
                      <p className="recom-item-price">
                        <span>$</span>
                        {item.price}
                      </p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
