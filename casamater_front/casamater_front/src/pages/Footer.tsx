import { FaPhone, FaWhatsapp } from "react-icons/fa";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <span>Conectado</span>
      <div className="icons">
        <FaPhone  /> 
        <FaWhatsapp />
      </div>
    </footer>
  );
};

export default Footer;