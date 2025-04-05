import React from "react";
import "../css/Home.css";
import Navbar from "../componente/Navbar";
import Footer from "../componente/Footer";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div>
        <h2>Bem vindo a Casa Mater</h2>
      </div>
      <Footer />
    </div>
  );
};

export default Home;