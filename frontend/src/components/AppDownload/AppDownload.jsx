import React from "react";
import "./AppDownload.scss";


const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <img src="./download.png" alt="" className="download-img" />
      <div className="app-download-content">
        <h2>DOWNLOAD APP</h2>
        <h1>Get Started With Fudo Today!</h1>
        <p>
          Discover food wherever and whenever and get your food delivered
          quickly.
        </p>
        <button>Get The App</button>
      </div>
    </div>
  );
};

export default AppDownload;
