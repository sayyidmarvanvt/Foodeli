import React from "react";
import "./Services.scss";
import { assets } from "../../assets/assets";

const Services = () => {
  const services = [
    {
      heading: "Easy To Order",
      para: "You only need a few steps in ordering food",
      img: assets.Orderfood,
    },
    {
      heading: "Fastest Delivery",
      para: "Delivery that is always on time even faster",
      img: assets.TakeAway,
    },
    {
      heading: "Best Quality",
      para: "Not only fast for us quality is also number one",
      img: assets.Waiters,
    },
  ];
  return (
    <div className="services" id="services">
        <div className="services-heading">
            <h1>WHAT WE SERVE</h1>
            <p className="services-text">Your Favourite Food Delivery Partner</p>
        </div>

      <div className="service-content">
      {services.map((service, index) => (
        <div key={index} className="service">
          <img src={service.img} alt={service.heading} />
          <h3>{service.heading}</h3>
          <p>{service.para}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Services;
