# Foodeli

Foodeli is a comprehensive food ordering platform designed to provide users with a seamless experience from browsing to payment. Built with the MERN stack (MongoDB, Express, React, Node.js), Foodeli features user authentication, shopping cart functionality, and order status updates, with payment integration via Stripe.

## 🚀 Features

- **User Authentication:** Secure login and registration system.
- **Shopping Cart:** Add food items to the cart and place orders.
- **Stripe Payment Gateway:** Integrated for online payments.
- **Order Management:** Admin panel for tracking and updating order statuses.
- **Responsive Design:** Optimized for both desktop and mobile users.

## 📚 Tech Stack

- **Frontend:** React JS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payment Integration:** Stripe
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
- 
