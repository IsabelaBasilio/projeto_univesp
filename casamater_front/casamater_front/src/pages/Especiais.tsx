import React, { useEffect, useState } from "react";
//import "../css/Home.css";

interface Especiais {
  id?: number;
  tipoLeite: string;
  gramas: string;
  inicial: number;
  janeiro: number;
  fevereiro: number;
  marco: number;
  abril: number;
  maio: number;
  junho: number;
  julho: number;
  agosto: number;
  setembro: number;
  outubro: number;
  novembro: number;
  dezembro: number;
  total: number;
  ano: string;
}

const Especiais: React.FC = () => {
  const [especiais, setEspeciais] = useState<Especiais[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/especiais")
      .then((res) => res.json())
      .then((data) => setEspeciais(data))
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  const handleChange = (index: number, field: keyof Especiais, value: any) => {
    const updated = [...especiais];
    updated[index][field] = value;
    updated[index].total =
      updated[index].janeiro +
      updated[index].fevereiro +
      updated[index].marco +
      updated[index].abril +
      updated[index].maio +
      updated[index].junho +
      updated[index].julho +
      updated[index].agosto +
      updated[index].setembro +
      updated[index].outubro +
      updated[index].novembro +
      updated[index].dezembro;
    setEspeciais(updated);
  };

  const handleSave = async () => {
    await fetch("http://localhost:8081/api/especiais", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(especiais),
    });
    alert("Dados salvos com sucesso!");
  };

  const handleImport = async () => {
    await fetch("http://localhost:8081/api/especiais/importar", { method: "POST" });
    alert("Importação iniciada!");
  };

  return (
    <div>
      <h2>Cadastro de Leites Especiais</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Tipo de Leite</th>
            <th>Gramas</th>
            <th>Inicial</th>
            <th>Jan</th>
            <th>Fev</th>
            <th>Mar</th>
            <th>Abr</th>
            <th>Mai</th>
            <th>Jun</th>
            <th>Jul</th>
            <th>Ago</th>
            <th>Set</th>
            <th>Out</th>
            <th>Nov</th>
            <th>Dez</th>
            <th>Total</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>
          {especiais.map((item, index) => (
            <tr key={item.id}>
              <td>{item.tipoLeite}</td>
              <td>{item.gramas}</td>
              <td>{item.inicial}</td>
              {[
                "janeiro",
                "fevereiro",
                "marco",
                "abril",
                "maio",
                "junho",
                "julho",
                "agosto",
                "setembro",
                "outubro",
                "novembro",
                "dezembro",
              ].map((mes) => (
                <td key={mes}>
                  <input
                    type="number"
                    value={item[mes as keyof Especiais]}
                    onChange={(e) => handleChange(index, mes as keyof Especiais, Number(e.target.value))}
                  />
                </td>
              ))}
              <td>{item.total}</td>
              <td>{item.ano}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Salvar</button>
      <button onClick={handleImport}>Importar</button>
    </div>
  );
};

export default Especiais;
