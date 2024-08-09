import React from "react";
import "./Hero.scss";

const Hero = () => {
  return (
    <div className="header" id="header">
      <img src="./bg.svg" alt="" className="header-img"/>
      <div className="header-contents">
        <h2>
          It’s not just a <span>Food</span>,<br /> It's an{" "}
          <span>Experience!</span>
        </h2>
        <p>
          Our job is to filling your tummy with delicious food and with fast and
          free delivery
        </p>
        <button>Get Started</button>
      </div>
    </div>
  );
};

export default Hero;
