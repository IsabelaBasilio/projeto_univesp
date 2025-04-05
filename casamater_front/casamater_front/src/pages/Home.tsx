import React, { useEffect, useState } from "react";
import casaMater from "../imagem/casaMater.png";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import "../css/Home.css";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

function Home() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <Navbar dateTime={dateTime} />
      <div className="home-content">
        <h1 className="bem-vindo">Bem-vindo</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
