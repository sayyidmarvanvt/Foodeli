import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foodlist, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0); // Total amount
  const [discount, setDiscount] = useState(0); // Discount amount
  const [promoCode, setPromoCode] = useState(""); // Applied promo code

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        "https://foodeli-backend-55b2.onrender.com/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[itemId] > 1) {
        newCartItems[itemId] -= 1;
      } else {
        delete newCartItems[itemId];
      }
      return newCartItems;
    });
    if (token) {
      await axios.post(
        "https://foodeli-backend-55b2.onrender.com/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodlist.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    // setTotal(totalAmount+2)
    return totalAmount;
  };

  const fetchFoodList = async () => {
    setLoading(true); // Set loading to true when fetching starts
    const response = await axios.get(
      "https://foodeli-backend-55b2.onrender.com/api/food/list"
    );

    setFoodList(response.data.data);
    localStorage.setItem("foodlist", JSON.stringify(response.data.data));
    setLoading(false); // Set loading to false after the data is fetched
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      "https://foodeli-backend-55b2.onrender.com/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      const storedFoodList = localStorage.getItem("foodlist");
      if (storedFoodList) {
        setFoodList(JSON.parse(storedFoodList)); // Load from localStorage
        setLoading(false); // If foodlist is in localStorage, no need to fetch
      } else {
        await fetchFoodList(); // Fetch from API if not in localStorage
      }

      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    foodlist,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loading,
    total,
    setTotal,
    discount,
    setDiscount,
    promoCode,
    setPromoCode,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
