import React from "react";
import BG from "../assets/images/girl.jpg";
const HeroSection = () => {
  return (
    <div className="HeroSectionContainer">
      <div className="HeroSectionLeft">
        <div className="heroText">
          Nurturing <span className="heroTextSpan1">Minds</span>, <br></br>
          Empowering <span className="heroTextSpan2">Futures</span>: <br></br>{" "}
          Connect, Learn, Succeed!
        </div>
        <div className="heroTextTagLine">
          Get Exclusive access to our 😎 mentors , 📚 resources and 👨‍💻project.
        </div>
        <div></div>
        <div className="HeroSectionLeftButton">Explore More</div>
      </div>
      <div className="HeroSectionRight">
        <img src={BG} className="HeroSectionRightImage" alt="" />
      </div>
    </div>
  );
};

export default HeroSection;
