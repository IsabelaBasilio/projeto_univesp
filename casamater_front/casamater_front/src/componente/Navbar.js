import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <ul className="menu">
        <li><Link to="/crianca">Crianças</Link></li>
        <li><Link to="/entrega">Entrega</Link></li>
        <li><Link to="/especiais">Leites Especiais</Link></li>
        <li><Link to="/presenca">Lista Presença</Link></li>
        <li><Link to="/medidas">Medidas</Link></li>
        <li><Link to="/programacao">Programação</Link></li>
      </ul>
      <div className="datetime">{dateTime.toLocaleString()}</div>
    </nav>
  );
};

export default Navbar;
