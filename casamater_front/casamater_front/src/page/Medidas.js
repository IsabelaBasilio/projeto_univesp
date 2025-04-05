import React, { useEffect, useState } from "react";
import "../css/Medidas.css";

const Medidas = () => {
  const [form, setForm] = useState({
    id: null,
    responsavel: "",
    crianca: "",
    nisMae: "",
    entrada: "",
    nascimento: "",
    mesAno: "",
    peso: "",
    estatura: "",
    observacao: "",
  });
  const [medidas, setMedidas] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Buscar medidas do backend
  useEffect(() => {
    fetch("http://localhost:8081/api/medidas")
      .then((res) => res.json())
      .then((data) => setMedidas(data))
      .catch((err) => console.error("Erro ao buscar medidas:", err));
  }, []);

  // Manipulação do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Enviar formulário (Salvar ou Editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:8081/api/medidas/${editingId}`
      : "http://localhost:8081/api/medidas";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Medida salva com sucesso!");
        setForm({
          id: null,
          responsavel: "",
          crianca: "",
          nisMae: "",
          entrada: "",
          nascimento: "",
          mesAno: "",
          peso: "",
          estatura: "",
          observacao: "",
        });
        setEditingId(null);
        fetch("http://localhost:8081/api/medidas")
          .then((res) => res.json())
          .then((data) => setMedidas(data));
      } else {
        alert("Erro ao salvar medida.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  // Editar uma medida
  const handleEdit = (medida) => {
    setEditingId(medida.id || null);
    setForm({
      ...medida,
      entrada: medida.entrada.split("/").reverse().join("-"), // Converte dd/MM/yyyy para yyyy-MM-dd
      nascimento: medida.nascimento.split("/").reverse().join("-"), // Converte dd/MM/yyyy para yyyy-MM-dd
    });
  };

  // Excluir uma medida
  const handleDelete = async (id) => {
    if (!id) return;
    if (window.confirm("Deseja apagar esta medida?")) {
      await fetch(`http://localhost:8081/api/medidas/${id}`, { method: "DELETE" });
      setMedidas(medidas.filter((m) => m.id !== id));
    }
  };

  // Importar dados
  const handleImport = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/medidas/importar", {
        method: "POST",
      });
      if (response.ok) {
        alert("Importação concluída!");
        fetch("http://localhost:8081/api/medidas")
          .then((res) => res.json())
          .then((data) => setMedidas(data));
      } else {
        alert("Erro na importação.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="medidas-container">
      <h2>Cadastro de Medidas</h2>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              name="responsavel"
              placeholder="Responsável"
              value={form.responsavel}
              onChange={handleChange}
              required
            />
            <input
              name="crianca"
              placeholder="Criança"
              value={form.crianca}
              onChange={handleChange}
              required
            />
            <input
              name="nisMae"
              placeholder="NIS da Mãe"
              value={form.nisMae}
              onChange={handleChange}
              required
            />
            <input
              name="entrada"
              type="date"
              value={form.entrada}
              onChange={handleChange}
              required
            />
            <input
              name="nascimento"
              type="date"
              value={form.nascimento}
              onChange={handleChange}
              required
            />
            <input
              name="mesAno"
              placeholder="Mês/Ano"
              value={form.mesAno}
              onChange={handleChange}
              required
            />
            <input
              name="peso"
              placeholder="Peso (kg)"
              type="number"
              step="0.01"
              value={form.peso}
              onChange={handleChange}
              required
            />
            <input
              name="estatura"
              placeholder="Estatura (cm)"
              type="number"
              step="0.01"
              value={form.estatura}
              onChange={handleChange}
              required
            />
            <input
              name="observacao"
              placeholder="Observação"
              value={form.observacao}
              onChange={handleChange}
            />
          </div>

          <div className="buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={handleImport}>Importar</button>
          </div>
        </form>
      </div>

      <table className="tabela-medidas">
        <thead>
          <tr>
            <th>Responsável</th>
            <th>Criança</th>
            <th>NIS da Mãe</th>
            <th>Entrada</th>
            <th>Nascimento</th>
            <th>Mês/Ano</th>
            <th>Peso (kg)</th>
            <th>Estatura (cm)</th>
            <th>Observação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {medidas.map((medida) => (
            <tr key={medida.id}>
              <td>{medida.responsavel}</td>
              <td>{medida.crianca}</td>
              <td>{medida.nisMae}</td>
              <td>{medida.entrada}</td>
              <td>{medida.nascimento}</td>
              <td>{medida.mesAno}</td>
              <td>{medida.peso}</td>
              <td>{medida.estatura}</td>
              <td>{medida.observacao}</td>
              <td>
                <button onClick={() => handleEdit(medida)}>Editar</button>
                <button onClick={() => handleDelete(medida.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medidas;