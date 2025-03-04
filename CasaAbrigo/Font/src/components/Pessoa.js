import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "../css/Pessoa.module.css";

const Pessoa = () => {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState(""); // Valor bruto (sem formatação)
  const [rg, setRg] = useState(""); // Valor bruto (sem formatação)
  const [celularContato, setCelularContato] = useState(""); // Valor bruto (sem formatação)
  const [nascimento, setNascimento] = useState("");
  const [sexo, setSexo] = useState("Masculino");
  const [imagem, setImagem] = useState("");
  const [cidadeNatal, setCidadeNatal] = useState("");
  const [estadoNatal, setEstadoNatal] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  // Carregar pessoas da API ao iniciar
  useEffect(() => {
    fetch("http://localhost:8081/api/pessoa")
      .then((response) => response.json())
      .then((data) => setPessoas(data))
      .catch((error) => console.error("Erro ao carregar pessoas:", error));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagem(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    } else {
      setImagem("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaPessoa = {
      nome,
      cpf,
      rg,
      celularContato,
      nascimento: formatarData(nascimento),
      sexo,
      imagem,
      cidadeNatal,
      estadoNatal,
    };

    const url = editandoId
      ? `http://localhost:8081/api/pessoa/${editandoId}`
      : "http://localhost:8081/api/pessoa";
    const method = editandoId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaPessoa),
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
      .catch((error) => console.error("Erro ao salvar pessoa:", error));
  };

  const formatarData = (dataISO) => {
    const date = new Date(dataISO);
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const editarPessoa = (id) => {
    const pessoa = pessoas.find((p) => p.id === id);
    if (pessoa) {
      setNome(pessoa.nome);
      setCpf(pessoa.cpf);
      setRg(pessoa.rg);
      setCelularContato(pessoa.celularContato);

      let dataISO = "";
      if (pessoa.nascimento) {
        const [dia, mes, ano] = pessoa.nascimento.split("/");
        if (dia && mes && ano) {
          dataISO = new Date(`${ano}-${mes}-${dia}`).toISOString().split("T")[0];
        }
      }
      setNascimento(dataISO);

      setSexo(pessoa.sexo);
      setImagem(pessoa.imagem || "");
      setCidadeNatal(pessoa.cidadeNatal);
      setEstadoNatal(pessoa.estadoNatal);
      setEditandoId(pessoa.id);
    }
  };

  const apagarPessoa = (id) => {
    fetch(`http://localhost:8081/api/pessoa/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        alert("Pessoa apagada com sucesso!"); // Exibe a mensagem de sucesso
        window.location.reload(); // Recarrega a página após o usuário clicar em OK
      })
      .catch((error) => console.error("Erro ao apagar pessoa:", error));
  };

  // Funções de formatação
  const formatarCPF = (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  const formatarRG = (rg) => rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
  const formatarCelular = (celular) => celular.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

  const handleCpfChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setCpf(rawValue);
    e.target.value = formatarCPF(rawValue);
  };

  const handleRgChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setRg(rawValue);
    e.target.value = formatarRG(rawValue);
  };

  const handleCelularChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setCelularContato(rawValue);
    e.target.value = formatarCelular(rawValue);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>{editandoId ? "Editar Pessoa" : "Cadastrar Nova Pessoa"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            required
          />
          <input
            type="text"
            value={formatarCPF(cpf)}
            onChange={handleCpfChange}
            placeholder="CPF (xxx.xxx.xxx-xx)"
            required
          />
          <input
            type="text"
            value={formatarRG(rg)}
            onChange={handleRgChange}
            placeholder="RG (xx.xxx.xxx-x)"
            required
          />
          <input
            type="text"
            value={formatarCelular(celularContato)}
            onChange={handleCelularChange}
            placeholder="Celular ((xx) xxxxx-xxxx)"
            required
          />
          <input
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            required
          />
          <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <input
            type="text"
            value={cidadeNatal}
            onChange={(e) => setCidadeNatal(e.target.value)}
            placeholder="Cidade Natal"
            required
          />
          <input
            type="text"
            value={estadoNatal}
            onChange={(e) => setEstadoNatal(e.target.value)}
            placeholder="Estado Natal"
            required
          />
          <button type="submit" className={styles.button}>
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>
        </form>

        <h2 className={styles.title}>Pessoas Cadastradas</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>RG</th>
              <th>Celular</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pessoas.map((pessoa) => (
              <tr key={pessoa.id}>
                <td>{pessoa.nome}</td>
                <td>{formatarCPF(pessoa.cpf)}</td>
                <td>{formatarRG(pessoa.rg)}</td>
                <td>{formatarCelular(pessoa.celularContato)}</td>
                <td className={styles["action-buttons"]}>
                  <button
                    className={`${styles.button} ${styles["edit-button"]}`}
                    onClick={() => editarPessoa(pessoa.id)}
                  >
                    Editar
                  </button>
                  <button
                    className={`${styles.button} ${styles["delete-button"]}`}
                    onClick={() => apagarPessoa(pessoa.id)}
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

export default Pessoa;