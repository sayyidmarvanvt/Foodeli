import React, { useState } from "react";
import "./Home.scss";
import Hero from "../../components/Hero/Hero";
import Menu from "../../components/Menu/Menu";
import Review from "../../components/Review/Review";
import AppDownload from "../../components/AppDownload/AppDownload";
import Services from "../../components/Services/Services";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className="home">
      <Hero />
      <Menu category={category} setCategory={setCategory} />
      <Services />
      <Review />
      <AppDownload />
    </div>
  );
};

export default Home;
