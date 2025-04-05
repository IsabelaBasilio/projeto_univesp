import React, { useEffect, useState } from "react";
//import "../css/Entrega.css";

interface Entrega {
  id: number;
  responsavel: string;
  crianca: string;
  contato: string;
  nascimento: string;
  tipo: string;
}

const Entrega: React.FC = () => {
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const [novaEntrega, setNovaEntrega] = useState<Entrega>({
    id: 0,
    responsavel: "",
    crianca: "",
    contato: "",
    nascimento: "",
    tipo: "",
  });

  useEffect(() => {
    fetch("http://localhost:8081/api/entrega")
      .then((res) => res.json())
      .then((data) => setEntregas(data))
      .catch((error) => console.error("Erro ao buscar entregas:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovaEntrega({ ...novaEntrega, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:8081/api/entrega", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaEntrega),
    })
      .then(() => {
        setNovaEntrega({ id: 0, responsavel: "", crianca: "", contato: "", nascimento: "", tipo: "" });
        return fetch("http://localhost:8081/api/entrega");
      })
      .then((res) => res.json())
      .then((data) => setEntregas(data));
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8081/api/entrega/${id}`, { method: "DELETE" })
      .then(() => setEntregas(entregas.filter((entrega) => entrega.id !== id)));
  };

  const handleEdit = (entrega: Entrega) => {
    setNovaEntrega(entrega);
  };

  return (
    <div className="entrega-container">
      <h2>Entrega</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="responsavel" placeholder="Responsável" value={novaEntrega.responsavel} onChange={handleChange} required />
        <input type="text" name="crianca" placeholder="Criança" value={novaEntrega.crianca} onChange={handleChange} required />
        <input type="text" name="contato" placeholder="Contato" value={novaEntrega.contato} onChange={handleChange} required />
        <input type="text" name="nascimento" placeholder="Nascimento (dd/MM/yyyy)" value={novaEntrega.nascimento} onChange={handleChange} required />
        <input type="text" name="tipo" placeholder="Tipo" value={novaEntrega.tipo} onChange={handleChange} required />
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => fetch("http://localhost:8081/api/entrega/importar", { method: "POST" })}>Importar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Responsável</th>
            <th>Criança</th>
            <th>Contato</th>
            <th>Nascimento</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {entregas.map((entrega) => (
            <tr key={entrega.id}>
              <td>{entrega.responsavel}</td>
              <td>{entrega.crianca}</td>
              <td>{entrega.contato}</td>
              <td>{entrega.nascimento}</td>
              <td>{entrega.tipo}</td>
              <td>
                <button onClick={() => handleEdit(entrega)}>Editar</button>
                <button onClick={() => handleDelete(entrega.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Entrega;