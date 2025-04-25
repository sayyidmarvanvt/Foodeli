import { assets } from "../../assets/assets";
import "./Hero.scss";

const Hero = () => {
  return (
    <div className="header" id="header">
      <div className="header-contents">
        <h2>
          It&apos;s not just a <span>Food</span>,<br /> It&apos;s an{" "}
          <span>Experience!</span>
        </h2>
        <p>
          Our job is to fill your tummy with delicious food and with fast and
          free delivery
        </p>
        <button>Get Started</button>
      </div>
      <img src={assets.hero_dish} alt="dish" className="header-img" />
    </div>
  );
};

export default Hero;
