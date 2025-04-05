import React from "react";
import "../css/Footer.css";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">Conectado</div>
      <div className="footer-right">
        <FaPhone className="icon" />
        <FaWhatsapp className="icon" />
      </div>
    </footer>
  );
};

export default Footer;