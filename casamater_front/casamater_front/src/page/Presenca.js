import React, { useState, useEffect } from 'react';
import '../css/Presenca.css';

function Presenca() {
  const [presencas, setPresencas] = useState([]);
  const [form, setForm] = useState({
    id: null,
    mae: '',
    documento: '',
    crianca: '',
    nis: '',
    nascimento: '',
    entrada: '',
    reuniao01: '',
    reuniao02: '',
    reuniao03: ''
  });

  useEffect(() => {
    buscarPresencas();
  }, []);

  const buscarPresencas = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/presenca');
      const data = await response.json();
      setPresencas(data);
    } catch (error) {
      alert('Erro ao buscar presenças.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const metodo = form.id ? 'PUT' : 'POST';
    const url = form.id
      ? `http://localhost:8081/api/presenca/${form.id}`
      : 'http://localhost:8081/api/presenca';

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        alert('Presença salva com sucesso!');
        buscarPresencas();
        setForm({
          id: null,
          mae: '',
          documento: '',
          crianca: '',
          nis: '',
          nascimento: '',
          entrada: '',
          reuniao01: '',
          reuniao02: '',
          reuniao03: ''
        });
      } else {
        alert('Erro ao salvar presença.');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja apagar esta presença?')) {
      await fetch(`http://localhost:8081/api/presenca/${id}`, {
        method: 'DELETE'
      });
      buscarPresencas();
    }
  };

  const handleImport = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/presenca/importar', {
        method: 'POST'
      });
      if (response.ok) {
        alert('Importação concluída!');
        buscarPresencas();
      } else {
        alert('Erro na importação.');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="presenca-container">
      <h2>Lista de Presença</h2>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          {/* Primeira linha do formulário */}
          <div className="form-grid">
            <input name="mae" placeholder="Mãe" value={form.mae} onChange={handleChange} required />
            <input name="documento" placeholder="Documento" value={form.documento} onChange={handleChange} required />
            <input name="crianca" placeholder="Criança" value={form.crianca} onChange={handleChange} required />
            <input name="nis" placeholder="NIS" value={form.nis} onChange={handleChange} required />
          </div>

          {/* Segunda linha do formulário */}
          <div className="form-grid">
            <input 
              name="nascimento" 
              type="text" 
              placeholder="Nascimento (dd/MM/yyyy)" 
              value={form.nascimento} 
              onChange={handleChange} 
              required 
            />
            <input 
              name="entrada" 
              type="text" 
              placeholder="Entrada (dd/MM/yyyy)" 
              value={form.entrada} 
              onChange={handleChange} 
              required 
            />
            <input 
              name="reuniao01" 
              placeholder="R1" 
              maxLength={1} 
              value={form.reuniao01} 
              onChange={handleChange} 
              className="reuniao-input" 
            />
            <input 
              name="reuniao02" 
              placeholder="R2" 
              maxLength={1} 
              value={form.reuniao02} 
              onChange={handleChange} 
              className="reuniao-input" 
            />
            <input 
              name="reuniao03" 
              placeholder="R3" 
              maxLength={1} 
              value={form.reuniao03} 
              onChange={handleChange} 
              className="reuniao-input" 
            />
          </div>

          <div className="buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={handleImport}>Importar</button>
          </div>
        </form>
      </div>

      <table className="tabela-criancas tabela-presenca">
        <thead>
          <tr>
            <th>Mãe</th>
            <th>Documento</th>
            <th>Criança</th>
            <th>NIS</th>
            <th>Nascimento</th>
            <th>Entrada</th>
            <th>R1</th>
            <th>R2</th>
            <th>R3</th>
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
                <button onClick={() => setForm(p)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Presenca;