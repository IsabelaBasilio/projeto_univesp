import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("pt-BR"));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li className="nav-item"><Link to="/crianca">Criança</Link></li>
        <li className="nav-item"><Link to="/entrega">Entrega</Link></li>
        <li className="nav-item"><Link to="/especiais">Leites Especiais</Link></li>
        <li className="nav-item"><Link to="/presenca">Lista Presenças</Link></li>
        <li className="nav-item"><Link to="/programacao">Programação</Link></li>
        <li className="nav-item"><Link to="/leites">Leite Especial</Link></li>
      </ul>
      <div className="nav-right">{currentTime}</div>
    </nav>
  );
};

export default Navbar;
