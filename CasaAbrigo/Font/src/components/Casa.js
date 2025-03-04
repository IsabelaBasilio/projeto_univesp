import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "../css/Casa.module.css";

const Casa = () => {
  const [cozinhas, setCozinhas] = useState([]); // Estado para armazenar cozinhas
  const [quartos, setQuartos] = useState([]); // Estado para armazenar quartos

  // Carregar cozinhas da API ao iniciar
  useEffect(() => {
    fetch("http://localhost:8081/api/cozinha")
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta de cozinhas:", data); // Log para depuração
        setCozinhas(data);
      })
      .catch((error) => console.error("Erro ao carregar cozinhas:", error));
  }, []);

  // Carregar quartos da API ao iniciar
  useEffect(() => {
    fetch("http://localhost:8081/api/quarto")
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta de quartos:", data); // Log para depuração
        setQuartos(data);
      })
      .catch((error) => console.error("Erro ao carregar quartos:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Detalhes da Casa</h1>

        {/* Seção de Cozinhas */}
        <div className={styles.section}>
          <h2 className={styles.subtitle}>Cozinhas Cadastradas</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Produtos</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {cozinhas.length > 0 ? (
                cozinhas.map((cozinha) => (
                  <tr key={cozinha.id}>
                    <td>{cozinha.descricao}</td>
                    <td>{cozinha.produtos}</td>
                    <td>{cozinha.quantidade}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className={styles["no-data"]}>
                    Nenhuma cozinha cadastrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Seção de Quartos */}
        <div className={styles.section}>
          <h2 className={styles.subtitle}>Quartos Cadastrados</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Número de Leitos</th>
                <th>Ocupado</th>
                <th>Ativo</th>
              </tr>
            </thead>
            <tbody>
              {quartos.length > 0 ? (
                quartos.map((quarto) => (
                  <tr key={quarto.id}>
                    <td>{quarto.descricao}</td>
                    <td>{quarto.leitosNumero}</td>
                    <td>{quarto.ocupado ? "Sim" : "Não"}</td>
                    <td>{quarto.ativo ? "Sim" : "Não"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className={styles["no-data"]}>
                    Nenhum quarto cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Casa;