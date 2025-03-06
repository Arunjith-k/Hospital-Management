import React from "react";
import Header from "../Header";
import SpecialityMenu from "../SpecialityMenu";
import TopDoctors from "../TopDoctors";
import Banner from "../Banner";

const Home = () => {
  console.log("Home component rendering"); // Add logging to check if component renders
  
  return (
    <div className="home-container">
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;