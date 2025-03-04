import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "../css/Cozinha.module.css";

const Cozinha = () => {
  const [cozinhas, setCozinhas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [produtos, setProdutos] = useState(""); // Alterado para "produtos"
  const [quantidade, setQuantidade] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  // Carregar cozinhas da API ao iniciar
  useEffect(() => {
    fetch("http://localhost:8081/api/cozinha")
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta do backend:", data); // Log para depuração
        setCozinhas(data);
      })
      .catch((error) => console.error("Erro ao carregar cozinhas:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaCozinha = {
      descricao,
      produtos, // Alterado para "produtos"
      quantidade: parseInt(quantidade, 10), // Converte para número inteiro
    };

    const url = editandoId
      ? `http://localhost:8081/api/cozinha/${editandoId}`
      : "http://localhost:8081/api/cozinha";
    const method = editandoId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaCozinha),
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
      .catch((error) => console.error("Erro ao salvar cozinha:", error));
  };

  const editarCozinha = (id) => {
    const cozinha = cozinhas.find((c) => c.id === id);
    if (cozinha) {
      setDescricao(cozinha.descricao);
      setProdutos(cozinha.produtos); // Alterado para "produtos"
      setQuantidade(cozinha.quantidade.toString()); // Converte para string para o input
      setEditandoId(cozinha.id);
    }
  };

  const apagarCozinha = (id) => {
    fetch(`http://localhost:8081/api/cozinha/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        alert("Cozinha apagada com sucesso!"); // Exibe a mensagem de sucesso
        window.location.reload(); // Recarrega a página após o usuário clicar em OK
      })
      .catch((error) => console.error("Erro ao apagar cozinha:", error));
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>{editandoId ? "Editar Cozinha" : "Cadastrar Nova Cozinha"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            required
          />
          <input
            type="text"
            value={produtos} // Alterado para "produtos"
            onChange={(e) => setProdutos(e.target.value)} // Alterado para "produtos"
            placeholder="Produtos"
            required
          />
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Quantidade"
            required
          />
          <button type="submit" className={styles.button}>
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>
        </form>

        <h2 className={styles.title}>Cozinhas Cadastradas</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Produtos</th> {/* Alterado para "Produtos" */}
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cozinhas.map((cozinha) => (
              <tr key={cozinha.id}>
                <td>{cozinha.descricao}</td>
                <td>{cozinha.produtos}</td> {/* Alterado para "produtos" */}
                <td>{cozinha.quantidade}</td>
                <td className={styles["action-buttons"]}>
                  <button
                    className={`${styles.button} ${styles["edit-button"]}`}
                    onClick={() => editarCozinha(cozinha.id)}
                  >
                    Editar
                  </button>
                  <button
                    className={`${styles.button} ${styles["delete-button"]}`}
                    onClick={() => apagarCozinha(cozinha.id)}
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

export default Cozinha;