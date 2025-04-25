import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js";
import "./Recommendation.scss";

const Recommendation = () => {
  const { token, foodlist, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);
  const [recommendations, setRecommendations] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  // Fetch user order history
  const fetchUserHistory = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        "https://foodeli-backend-55b2.onrender.com/api/order/userorders",
        {},
        { headers: { token } }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  }, [token]);

  // Generate random recommendations
  const getRandomRecommendations = useCallback((foodlist, count) => {
    return foodlist
      .sort(() => 0.5 - Math.random())
      .slice(0, count)
      .map((item) => ({
        id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
      }));
  }, []);

  // Determine the number of recommendations based on screen size
  const getRecommendationCount = useCallback(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1024) {
      return 5; // Desktop
    } else if (screenWidth >= 768) {
      return 3; // Tablet
    } else {
      return 2; // Mobile
    }
  }, []);

  const getRecommendations = useCallback(async () => {
    try {
      const userHistory = await fetchUserHistory();

      if (!userHistory || userHistory.length === 0) {
        console.log("No data to send to the backend.");
        return;
      }

      const recommendationCount = getRecommendationCount();

      const randomRecommendations = getRandomRecommendations(
        foodlist,
        recommendationCount
      );
      setRecommendations(randomRecommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast.error("Error fetching recommendations");
    }
  }, [
    fetchUserHistory,
    foodlist,
    getRecommendationCount,
    getRandomRecommendations,
  ]);

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
  }, [getRecommendations]);

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
                          e.stopPropagation();
                          addToCart(item.id);
                        }}
                        src={assets.add_icon_white}
                        alt="Add to cart"
                      />
                    ) : (
                      <div className="recom-item-counter">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(item.id);
                          }}
                        >
                          -
                        </button>
                        <p>{cartItems[item.id]}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
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
