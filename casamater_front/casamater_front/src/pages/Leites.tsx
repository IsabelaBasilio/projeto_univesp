import React, { useEffect, useState } from "react";
//import "../css/Home.css";

interface LeiteEspecial {
  id?: number;
  tipo: string;
  gramas: string;
}

const LeitesEspeciais: React.FC = () => {
  const [form, setForm] = useState<LeiteEspecial>({
    tipo: "",
    gramas: "",
  });
  const [leites, setLeites] = useState<LeiteEspecial[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/leitesEspeciais")
      .then((res) => res.json())
      .then((data) => setLeites(data))
      .catch((err) => console.error("Erro ao buscar leites especiais:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:8081/api/leitesEspeciais/${editingId}`
      : "http://localhost:8081/api/leitesEspeciais";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ tipo: "", gramas: "" });
    setEditingId(null);
    fetch("http://localhost:8081/api/leitesEspeciais")
      .then((res) => res.json())
      .then((data) => setLeites(data));
  };

  const handleEdit = (leite: LeiteEspecial) => {
    setForm(leite);
    setEditingId(leite.id || null);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    await fetch(`http://localhost:8081/api/leitesEspeciais/${id}`, { method: "DELETE" });
    setLeites(leites.filter((l) => l.id !== id));
  };

  const handleImport = async () => {
    await fetch("http://localhost:8081/api/leitesEspeciais/importar", { method: "POST" });
    alert("Importação iniciada!");
  };

  return (
    <div>
      <h2>Cadastro de Leites Especiais</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tipo"
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Gramas"
          value={form.gramas}
          onChange={(e) => setForm({ ...form, gramas: e.target.value })}
          required
        />
        <button type="submit">Salvar</button>
        <button type="button" onClick={handleImport}>Importar</button>
      </form>

      <h3>Lista de Leites Especiais</h3>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Gramas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {leites.map((leite) => (
            <tr key={leite.id}>
              <td>{leite.tipo}</td>
              <td>{leite.gramas}</td>
              <td>
                <button onClick={() => handleEdit(leite)}>Editar</button>
                <button onClick={() => handleDelete(leite.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeitesEspeciais;

