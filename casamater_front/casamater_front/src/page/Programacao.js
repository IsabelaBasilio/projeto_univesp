import React, { useEffect, useState } from "react";
import "../css/Programacao.css";

const Programacao = () => {
  const [form, setForm] = useState({
    responsavel: "",
    crianca: "",
    nascimento: "",
    nis: "",
    assinatura: "",
  });
  const [programacoes, setProgramacoes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/programacao")
      .then((res) => res.json())
      .then((data) => setProgramacoes(data))
      .catch((err) => console.error("Erro ao buscar programações:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:8081/api/programacao/${editingId}`
      : "http://localhost:8081/api/programacao";

    const formattedData = {
      ...form,
      nascimento: form.nascimento.split("-").reverse().join("/"),
    };

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    });

    setForm({ responsavel: "", crianca: "", nascimento: "", nis: "", assinatura: "" });
    setEditingId(null);
    fetch("http://localhost:8081/api/programacao")
      .then((res) => res.json())
      .then((data) => setProgramacoes(data));
  };

  const handleEdit = (programacao) => {
    setEditingId(programacao.id || null);
    setForm({
      ...programacao,
      nascimento: programacao.nascimento.split("/").reverse().join("-"),
    });
  };

  const handleDelete = async (id) => {
    if (!id) return;
    await fetch(`http://localhost:8081/api/programacao/${id}`, { method: "DELETE" });
    setProgramacoes(programacoes.filter((p) => p.id !== id));
  };

  const handleImport = async () => {
    await fetch("http://localhost:8081/api/programacao/importar", { method: "POST" });
    alert("Importação iniciada!");
  };

  return (
    <div className="programacao-container">
      <h2>Cadastro de Programação</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Responsável"
              value={form.responsavel}
              onChange={(e) => setForm({ ...form, responsavel: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Criança"
              value={form.crianca}
              onChange={(e) => setForm({ ...form, crianca: e.target.value })}
              required
            />
            <input
              type="date"
              value={form.nascimento}
              onChange={(e) => setForm({ ...form, nascimento: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="NIS"
              value={form.nis}
              onChange={(e) => setForm({ ...form, nis: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Assinatura"
              value={form.assinatura}
              onChange={(e) => setForm({ ...form, assinatura: e.target.value })}
            />
          </div>
          <div className="buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={handleImport}>Importar</button>
          </div>
        </form>
      </div>

      <h3>Lista de Programações</h3>
      <table className="tabela-programacoes">
        <thead>
          <tr>
            <th>Responsável</th>
            <th>Criança</th>
            <th>Nascimento</th>
            <th>NIS</th>
            <th>Assinatura</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {programacoes.map((programacao) => (
            <tr key={programacao.id}>
              <td>{programacao.responsavel}</td>
              <td>{programacao.crianca}</td>
              <td>{programacao.nascimento}</td>
              <td>{programacao.nis}</td>
              <td>{programacao.assinatura}</td>
              <td>
                <button onClick={() => handleEdit(programacao)}>Editar</button>
                <button onClick={() => handleDelete(programacao.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Programacao;