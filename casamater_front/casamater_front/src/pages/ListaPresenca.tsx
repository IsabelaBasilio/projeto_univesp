import React, { useEffect, useState } from "react";

interface Presenca {
  id?: number;
  mae: string;
  documento: string;
  crianca: string;
  nis: string;
  nascimento: string;
  entrada: string;
  reuniao01: string;
  reuniao02: string;
  reuniao03: string;
}

const ListaPresenca: React.FC = () => {
  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const [form, setForm] = useState<Presenca>({
    mae: "",
    documento: "",
    crianca: "",
    nis: "",
    nascimento: "",
    entrada: "",
    reuniao01: "",
    reuniao02: "",
    reuniao03: "",
  });

  useEffect(() => {
    fetchPresencas();
  }, []);

  const fetchPresencas = async () => {
    const response = await fetch("http://localhost:8081/api/presenca");
    const data = await response.json();
    setPresencas(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Convertendo as datas para o formato "dd/MM/yyyy"
    const formattedData = {
      ...form,
      nascimento: form.nascimento ? new Date(form.nascimento).toLocaleDateString("pt-BR") : "",
      entrada: form.entrada ? new Date(form.entrada).toLocaleDateString("pt-BR") : "",
    };

    try {
      const response = form.id
        ? await fetch(`http://localhost:8081/api/presenca/${form.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formattedData),
          })
        : await fetch("http://localhost:8081/api/presenca", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formattedData),
          });

      if (!response.ok) throw new Error("Erro ao salvar presença");

      alert("Presença salva com sucesso!");
      fetchPresencas();
      setForm({ mae: "", documento: "", crianca: "", nis: "", nascimento: "", entrada: "", reuniao01: "", reuniao02: "", reuniao03: "" });
    } catch (error) {
      console.error("Erro ao salvar presença:", error);
      alert("Erro ao salvar presença");
    }
  };

  const handleEdit = (presenca: Presenca) => {
    setForm({
      ...presenca,
      nascimento: presenca.nascimento.split("/").reverse().join("-"), // Ajusta para input date (yyyy-MM-dd)
      entrada: presenca.entrada.split("/").reverse().join("-"),
    });
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    await fetch(`http://localhost:8081/api/presenca/${id}`, { method: "DELETE" });
    fetchPresencas();
  };

  return (
    <div>
      <h2>Lista de Presença</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="mae" value={form.mae} onChange={handleChange} placeholder="Mãe" required />
        <input type="text" name="documento" value={form.documento} onChange={handleChange} placeholder="Documento" required />
        <input type="text" name="crianca" value={form.crianca} onChange={handleChange} placeholder="Criança" required />
        <input type="text" name="nis" value={form.nis} onChange={handleChange} placeholder="NIS" required />
        <input type="date" name="nascimento" value={form.nascimento} onChange={handleChange} required />
        <input type="date" name="entrada" value={form.entrada} onChange={handleChange} required />
        <input type="text" name="reuniao01" value={form.reuniao01} onChange={handleChange} placeholder="Reunião 01" />
        <input type="text" name="reuniao02" value={form.reuniao02} onChange={handleChange} placeholder="Reunião 02" />
        <input type="text" name="reuniao03" value={form.reuniao03} onChange={handleChange} placeholder="Reunião 03" />
        <button type="submit">Salvar</button>
      </form>

      <h3>Presenças Cadastradas</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Mãe</th>
            <th>Documento</th>
            <th>Criança</th>
            <th>NIS</th>
            <th>Nascimento</th>
            <th>Entrada</th>
            <th>Reunião 01</th>
            <th>Reunião 02</th>
            <th>Reunião 03</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {presencas.map((p) => (
            <tr key={p.id}>
              <td>{p.mae}</td>
              <td>{p.documento}</td>
              <td>{p.crianca}</td>
              <td>{p.nis}</td>
              <td>{p.nascimento}</td>
              <td>{p.entrada}</td>
              <td>{p.reuniao01}</td>
              <td>{p.reuniao02}</td>
              <td>{p.reuniao03}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPresenca;