import React from "react";
import "./Review.scss";
import { assets } from "../../assets/assets";

const Review = () => {
  return (
    <div className="review">
        <img src="./review.png" alt="" className="review-img" />
      <div className="review-content">
        <h2>WHAT THEY SAY</h2>
        <h1>What Our Customer Say About Us</h1>
        <p>
          “Foodeli is the best. Besides the many and delicious meals, the service
          is also very good, especially in the very fast delivey. I highly
          recommend Foodeli to you”.
        </p>

        <div className="review-box">
          <img src={assets.people} alt="" />
          <div className="review-details">
            <h6>Threesa Jordan</h6>
            <p>Food Enthusiast</p>
            <img src={assets.rating_starts} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
