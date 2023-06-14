import React from "react";
import HeroSection from "../components/HeroSection";
import Contributions from "../components/Contributions";
import CardSection from "../components/CardSection";
import MentorSection from "../components/MentorSection";
import ResourcesSection from "../components/ResourcesSection";
import Footer from "../components/Footer";
import ProjectHelpSection from "../components/ProjectHelpSection";

const HomePage = () => {
  return (
    <div className="App">
      <HeroSection />
      <CardSection />
      <MentorSection />
      <ResourcesSection />
      <ProjectHelpSection/>
      <Contributions />
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;

