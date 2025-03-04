import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "../css/Quartos.module.css";

const Quartos = () => {
  const [quartos, setQuartos] = useState([]);
  const [descricao, setDescricao] = useState(""); // Descrição do quarto
  const [leitosNumero, setLeitosNumero] = useState(""); // Número de leitos
  const [ocupado, setOcupado] = useState(false); // Ocupado (padrão: false)
  const [ativo, setAtivo] = useState(true); // Ativo (padrão: true)
  const [editandoId, setEditandoId] = useState(null);

  // Carregar quartos da API ao iniciar
  useEffect(() => {
    fetch("http://localhost:8081/api/quarto")
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta do backend:", data); // Log para depuração
        setQuartos(data);
      })
      .catch((error) => console.error("Erro ao carregar quartos:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoQuarto = {
      descricao,
      leitosNumero: parseInt(leitosNumero, 10), // Converte para número inteiro
      ocupado,
      ativo,
    };

    const url = editandoId
      ? `http://localhost:8081/api/quarto/${editandoId}`
      : "http://localhost:8081/api/quarto";
    const method = editandoId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoQuarto),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        return response.text();
      })
      .then((mensagem) => {
        alert(mensagem); // Exibe a mensagem de sucesso
        window.location.reload(); // Recarrega a página após o usuário clicar em OK
      })
      .catch((error) => console.error("Erro ao salvar quarto:", error));
  };

  const editarQuarto = (id) => {
    const quarto = quartos.find((q) => q.id === id);
    if (quarto) {
      setDescricao(quarto.descricao);
      setLeitosNumero(quarto.leitosNumero.toString()); // Converte para string para o input
      setOcupado(quarto.ocupado);
      setAtivo(quarto.ativo);
      setEditandoId(quarto.id);
    }
  };

  const apagarQuarto = (id) => {
    fetch(`http://localhost:8081/api/quarto/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        alert("Quarto apagado com sucesso!"); // Exibe a mensagem de sucesso
        window.location.reload(); // Recarrega a página após o usuário clicar em OK
      })
      .catch((error) => console.error("Erro ao apagar quarto:", error));
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>{editandoId ? "Editar Quarto" : "Cadastrar Novo Quarto"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            required
          />
          <input
            type="number"
            value={leitosNumero}
            onChange={(e) => setLeitosNumero(e.target.value)}
            placeholder="Número de Leitos"
            required
          />
          <label>
            <input
              type="checkbox"
              checked={ocupado}
              onChange={(e) => setOcupado(e.target.checked)}
            />
            Ocupado
          </label>
          <label>
            <input
              type="checkbox"
              checked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
            />
            Ativo
          </label>
          <button type="submit" className={styles.button}>
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>
        </form>

        <h2 className={styles.title}>Quartos Cadastrados</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Número de Leitos</th>
              <th>Ocupado</th>
              <th>Ativo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {quartos.map((quarto) => (
              <tr key={quarto.id}>
                <td>{quarto.descricao}</td>
                <td>{quarto.leitosNumero}</td>
                <td>{quarto.ocupado ? "Sim" : "Não"}</td>
                <td>{quarto.ativo ? "Sim" : "Não"}</td>
                <td className={styles["action-buttons"]}>
                  <button
                    className={`${styles.button} ${styles["edit-button"]}`}
                    onClick={() => editarQuarto(quarto.id)}
                  >
                    Editar
                  </button>
                  <button
                    className={`${styles.button} ${styles["delete-button"]}`}
                    onClick={() => apagarQuarto(quarto.id)}
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Quartos;