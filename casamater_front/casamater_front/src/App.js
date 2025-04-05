import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Home from "./page/Home";
import Crianca from "./page/Crianca";
import Entrega from "./page/Entrega";
import ListaPresenca from "./page/Presenca";
import Programacao from "./page/Programacao";
import Medidas from "./page/Medidas";
import Especiais from "./page/Especiais";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/crianca" element={<Crianca />} />
        <Route path="/entrega" element={<Entrega />} />
        <Route path="/presenca" element={<ListaPresenca />} />
        <Route path="/programacao" element={<Programacao />} />
        <Route path="/medidas" element={<Medidas />} />
        <Route path="/especiais" element={<Especiais />} />
      </Routes>
    </Router>
  );
};

export default App;