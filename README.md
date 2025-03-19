# Foodeli

Foodeli is a comprehensive food ordering platform designed to provide users with a seamless experience from browsing to payment. Built with the MERN stack (MongoDB, Express, React, Node.js), Foodeli features user authentication, shopping cart functionality, and order status updates, with payment integration via Stripe.

## 🚀 Features

- **User Authentication:** Secure login and registration system.
- **Shopping Cart:** Add food items to the cart and place orders.
- **Stripe Payment Gateway:** Integrated for online payments.
- **Order Management:** Admin panel for tracking and updating order statuses.
- **Responsive Design:** Optimized for both desktop and mobile users.
- **Search Functionality:** Quickly find food items using a powerful search bar.
- **Real-Time Updates:** Order status updates in real-time using Socket.IO.
- **Rate Limiting:** Protect the API from abuse with rate limiting.
- **AI-Powered Recommendations:** Get personalized food recommendations using OpenAI (with a fallback to random recommendations if the daily quota is exhausted).

## 📚 Tech Stack

- **Frontend:** React JS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payment Integration:** Stripe
- **Real-Time Communication:** Socket.IO
- **AI Recommendations:** OpenAI API
- **Rate Limiting:** Express Rate Limit
- **Deployment:** Render

## 🛠 Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sayyidmarvanvt/Foodeli.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd Foodeli
   ```
3. **Install the dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     STRIPE_SECRET_KEY=your_stripe_secret_key
     OPENAI_API_KEY=your_openai_api_key
     ```
5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser and visit:**
   ```
   http://localhost:4000
   ```

## 📦 Deployment

- This project is deployed on Render. You can access the live version [here](https://foodeli-frontend.onrender.com).

---

## 🔍 Search Functionality

- Users can search for food items by name, category, or price range.
- The search bar dynamically filters results as the user types.

**Implementation:**
- The search functionality is implemented using a combination of MongoDB queries and React state management.

---

## 📡 Real-Time Updates with Socket.IO

- Admins can update the status of orders (e.g., "Out for Delivery", "Delivered").
- Users receive real-time updates on their order status without refreshing the page.

**Implementation:**
- Socket.IO is used to establish a real-time connection between the frontend and backend.
- When an admin updates an order status, the change is broadcast to all connected clients.

---

## 🛑 Rate Limiting

- The API is protected against abuse using rate limiting.
- Each IP address is allowed a maximum of 100 requests per 15 minutes.

**Implementation:**
- The `express-rate-limit` middleware is used to enforce rate limits on API endpoints.

---

## 🤖 AI-Powered Recommendations

- Users receive personalized food recommendations based on their order history and the available food list.
- Recommendations are generated using OpenAI's GPT models.
- If the daily API quota is exhausted, the system falls back to random recommendations.

**Implementation:**
- The OpenAI API is used to generate recommendations.
- A fallback mechanism ensures that users always receive recommendations, even if the API quota is exhausted.

---

## 🛠️ Code Examples

### **Socket.IO Real-Time Updates**
```javascript
// Backend: Socket.IO setup
io.on("connection", (socket) => {
  socket.on("updateOrderStatus", (orderId, status) => {
    // Update order status in the database
    io.emit("orderStatusUpdated", orderId, status);
  });
});
```

### **Rate Limiting**
```javascript
// Backend: Rate limiting middleware
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

### **AI-Powered Recommendations**
```javascript
// Backend: Generate recommendations
const getRecommendations = async (foodList, userHistory) => {
  try {
    const prompt = `Suggest 3 dishes from ${foodList.join(", ")} for someone who ordered ${userHistory.join(", ")}.`;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return getFallbackRecommendations(foodList); // Fallback to random recommendations
  }
};
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Thanks to OpenAI for providing the GPT API for AI-powered recommendations.
- Thanks to Stripe for the seamless payment integration.
- Thanks to the MERN community for the wealth of resources and support.

