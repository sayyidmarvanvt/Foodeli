import userModal from "../models/userModal.js";

// Add items to user cart
export const addToCart = async (req, res) => {
  try {
    let userData = await userModal.findById(req.body.userId);
    let cartData = await userData.cartData;

    // Directly accessing the cartData field
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModal.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({ success: true, message: "Added to cart", cartData }); // 200 OK
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" }); // 500 Internal Server Error
  }
};

// Remove item from user cart
export const removeFromCart = async (req, res) => {
  try {
    let userData = await userModal.findById(req.body.userId);
    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    if (cartData[req.body.itemId] === 0) {
      delete cartData[req.body.itemId];
    }

    await userModal.findByIdAndUpdate(req.body.userId, { cartData });
    res
      .status(200)
      .json({ success: true, message: "Removed from cart", cartData }); // 200 OK
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" }); // 500 Internal Server Error
  }
};

// Fetch user cart data
export const getCart = async (req, res) => {
  try {
    let userData = await userModal.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.status(200).json({ success: true, cartData }); // 200 OK
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" }); // 500 Internal Server Error
  }
};
