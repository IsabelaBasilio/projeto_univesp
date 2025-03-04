import React, { useEffect, useState } from "react";
import CasaAbrigoIcone from "../imagem/CasaAbrigo-icone.ico"; // Importa a imagem

const Navbar = () => {
  // Estado para armazenar a data e hora atual
  const [currentDateTime, setCurrentDateTime] = useState("");

  // Função para formatar a data e hora
  const formatDateTime = (date) => {
    const day = String(date.getDate()).padStart(2, "0"); // Dia com dois dígitos
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês com dois dígitos
    const year = date.getFullYear(); // Ano completo
    const hours = String(date.getHours()).padStart(2, "0"); // Horas com dois dígitos
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Minutos com dois dígitos
    const seconds = String(date.getSeconds()).padStart(2, "0"); // Segundos com dois dígitos

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  // Atualiza a data e hora a cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(formatDateTime(new Date()));
    }, 1000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav style={styles.navbar}>
      
      {/* Ícone no canto direito */}
      <div style={styles.rightSection}>
        <img
          src={CasaAbrigoIcone} // Usa a variável importada
          alt="Ícone Casa Abrigo"
          style={styles.icon}
        />
      </div>

      {/* Título centralizado */}
      <div style={styles.centerSection}>Casa Abrigo</div>

      {/* Data e hora no canto esquerdo */}
      <div style={styles.leftSection}>{currentDateTime}</div>
    </nav>
  );
};

// Estilos inline para o Navbar
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between", // Distribui os elementos nos cantos e no centro
    alignItems: "center", // Alinha verticalmente os elementos
    padding: "10px 20px", // Espaçamento interno
    backgroundColor: "#007bff", // Cor de fundo azul
    color: "#fff", // Cor do texto branco
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para destacar o navbar
  },
  leftSection: {
    fontSize: "14px", // Tamanho da fonte para a data e hora
  },
  centerSection: {
    fontSize: "26px", // Tamanho da fonte para o título
    fontWeight: "bold", // Negrito para destacar o título
  },
  rightSection: {
    display: "flex",
    alignItems: "center", // Centraliza o ícone verticalmente
  },
  icon: {
    width: "60px", // Largura do ícone
    height: "60px", // Altura do ícone
  },
};

export default Navbar;