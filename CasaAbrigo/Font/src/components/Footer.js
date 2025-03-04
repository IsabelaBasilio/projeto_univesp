import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faFacebook, faInstagram, faPhone } from "@fortawesome/free-brands-svg-icons";
import { faPhone as solidPhone } from "@fortawesome/free-solid-svg-icons"; // Ícone de telefone sólido
import styles from "../css/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Ícones de redes sociais e telefone */}
      <div className={styles.social}>
        <a href="https://wa.me/SEU_NUMERO" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faWhatsapp} className={styles.icon} />
        </a>
        <a href="https://facebook.com/SEU_PERFIL" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
        </a>
        <a href="https://instagram.com/SEU_PERFIL" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
        </a>
        <a href="tel:SEU_TELEFONE" className={styles.phone}>
          <FontAwesomeIcon icon={solidPhone} className={styles.icon} />
        </a>
      </div>

      {/* Marca registrada e nome "Univesp" */}
      <div className={styles.univesp}>
        <span>© 2023 Univesp</span>
      </div>
    </footer>
  );
};

export default Footer;