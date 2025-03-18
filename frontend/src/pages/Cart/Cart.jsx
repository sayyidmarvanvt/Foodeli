import React, { useContext, useState } from "react";
import "./Cart.scss";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    foodlist,
    removeFromCart,
    getTotalCartAmount,
    total,
    setTotal,
    discount,
    setDiscount,
    promoCode,
    setPromoCode,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const applyPromoCode = () => {
    const validPromoCodes = {
      SAVE10: 10, // $10 discount
      FREESHIP: 2, // Free delivery (subtract delivery fee)
    };

    if (!promoCode.trim()) {
      // If promo code is empty, reset discount and clear states
      setDiscount(0);
      setIsPromoApplied(false);
      setErrorMessage("");
      setTotal(getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)); // Reset total in context
      return;
    }

    if (!validPromoCodes[promoCode]) {
      setDiscount(0);
      setIsPromoApplied(false);
      setErrorMessage("Invalid promo code.");
      setTotal(getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)); 
      return;
    }

    if (validPromoCodes[promoCode]) {
      const newDiscount = validPromoCodes[promoCode];
      const newTotal =
        getTotalCartAmount() -
        newDiscount +
        (getTotalCartAmount() === 0 ? 0 : 2);

      // Ensure the total doesn't go below 0
      if (newTotal >= 0) {
        setDiscount(newDiscount);
        setIsPromoApplied(true);
        setErrorMessage("");
        setTotal(newTotal); // Update total in context
      } else {
        setErrorMessage("Promo code cannot make the total negative.");
      }
    } else {
      setErrorMessage("Invalid promo code.");
    }
  };

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const calculatedTotal = subtotal + deliveryFee - discount;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodlist.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            <hr />
            {isPromoApplied && (
              <div className="cart-total-details">
                <p>Discount</p>
                <p>-${discount}</p>
              </div>
            )}
            <br />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${calculatedTotal}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/order")}
            disabled={Object.keys(cartItems).length === 0}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              />
              <button onClick={applyPromoCode}>Submit</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
