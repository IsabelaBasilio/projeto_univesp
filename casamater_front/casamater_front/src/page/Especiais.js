import React, { useState, useEffect } from "react";
import "../css/Especiais.css";

const Especiais = () => {
  const [especiais, setEspeciais] = useState([]);

  // Função para buscar os dados da API
  const fetchEspeciais = () => {
    fetch("http://localhost:8081/api/especiais")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          id: item.id,
          tipoLeite: item.tipoLeite,
          gramas: item.gramas,
          inicial: item.inicial,
          jan: item.janeiro,
          fev: item.fevereiro,
          mar: item.marco,
          abr: item.abril,
          mai: item.maio,
          jun: item.junho,
          jul: item.julho,
          ago: item.agosto,
          set: item.setembro,
          out: item.outubro,
          nov: item.novembro,
          dez: item.dezembro,
          total: item.total,
          ano: item.ano,
        }));
        setEspeciais(formattedData);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  };

  // Buscar dados ao carregar o componente
  useEffect(() => {
    fetchEspeciais();
  }, []);

  // Atualiza o estado quando o usuário altera um campo
  const handleChange = (id, field, value) => {
    setEspeciais((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Função para somar todos os valores de cada linha
  const somarTodos = () => {
    setEspeciais((prev) =>
      prev.map((item) => ({
        ...item,
        total:
          Number(item.inicial || 0) +
          Number(item.jan || 0) +
          Number(item.fev || 0) +
          Number(item.mar || 0) +
          Number(item.abr || 0) +
          Number(item.mai || 0) +
          Number(item.jun || 0) +
          Number(item.jul || 0) +
          Number(item.ago || 0) +
          Number(item.set || 0) +
          Number(item.out || 0) +
          Number(item.nov || 0) +
          Number(item.dez || 0),
      }))
    );
  };

  // Função para salvar as alterações no backend
  const handleSave = async () => {
    try {
      await Promise.all(
        especiais.map((item) =>
          fetch(`http://localhost:8081/api/especiais/${item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          })
        )
      );
      alert("Dados salvos com sucesso!");
      fetchEspeciais(); // Atualiza os dados após salvar
    } catch (error) {
      alert("Erro ao salvar os dados.");
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Leites Especiais</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
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
            {especiais.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    value={item.tipoLeite}
                    onChange={(e) =>
                      handleChange(item.id, "tipoLeite", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    value={item.gramas}
                    onChange={(e) =>
                      handleChange(item.id, "gramas", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.inicial}
                    onChange={(e) =>
                      handleChange(item.id, "inicial", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.jan}
                    onChange={(e) =>
                      handleChange(item.id, "jan", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.fev}
                    onChange={(e) =>
                      handleChange(item.id, "fev", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.mar}
                    onChange={(e) =>
                      handleChange(item.id, "mar", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.abr}
                    onChange={(e) =>
                      handleChange(item.id, "abr", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.mai}
                    onChange={(e) =>
                      handleChange(item.id, "mai", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.jun}
                    onChange={(e) =>
                      handleChange(item.id, "jun", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.jul}
                    onChange={(e) =>
                      handleChange(item.id, "jul", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.ago}
                    onChange={(e) =>
                      handleChange(item.id, "ago", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.set}
                    onChange={(e) =>
                      handleChange(item.id, "set", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.out}
                    onChange={(e) =>
                      handleChange(item.id, "out", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.nov}
                    onChange={(e) =>
                      handleChange(item.id, "nov", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.dez}
                    onChange={(e) =>
                      handleChange(item.id, "dez", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.total}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.ano}
                    onChange={(e) =>
                      handleChange(item.id, "ano", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-group">
        <button onClick={handleSave}>Salvar</button>
        <button>Importar</button>
        <button onClick={somarTodos}>Somar</button>
      </div>
    </div>
  );
};

export default Especiais;