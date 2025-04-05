import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Entrega.css';

function Entrega() {
  const [id, setId] = useState(null);
  const [responsavel, setResponsavel] = useState('');
  const [crianca, setCrianca] = useState('');
  const [contato, setContato] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [tipo, setTipo] = useState('');
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    fetchEntregas();
  }, []);

  const fetchEntregas = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/entrega');
      setEntregas(response.data);
    } catch (error) {
      alert('Erro ao buscar entregas');
    }
  };

  const formatarData = (data) => {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  const formatarDataParaInput = (data) => {
    const partes = data.split('/');
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  };

  const handleSalvar = async () => {
    const novaEntrega = {
      responsavel,
      crianca,
      contato,
      nascimento: formatarData(nascimento),
      tipo
    };

    try {
      if (id === null) {
        await axios.post('http://localhost:8081/api/entrega', novaEntrega);
        alert('Entrega salva com sucesso!');
      } else {
        await axios.put(`http://localhost:8081/api/entrega/${id}`, novaEntrega);
        alert('Entrega atualizada com sucesso!');
      }
      limparCampos();
      fetchEntregas();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar entrega!');
    }
  };

  const handleEditar = (entrega) => {
    setId(entrega.id);
    setResponsavel(entrega.responsavel);
    setCrianca(entrega.crianca);
    setContato(entrega.contato);
    setNascimento(formatarDataParaInput(entrega.nascimento));
    setTipo(entrega.tipo);
  };

  const handleExcluir = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/entrega/${id}`);
      alert('Entrega excluída com sucesso!');
      fetchEntregas();
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir entrega!');
    }
  };

  const handleImportar = async () => {
    try {
      await axios.post('http://localhost:8081/api/entrega/importar');
      alert('Importação realizada com sucesso!');
      fetchEntregas();
    } catch (error) {
      console.error(error);
      alert('Erro ao importar!');
    }
  };

  const limparCampos = () => {
    setId(null);
    setResponsavel('');
    setCrianca('');
    setContato('');
    setNascimento('');
    setTipo('');
  };

  return (
    <div className="entrega-container">
      <h2>Cadastro de Entregas</h2>

      <div className="form-wrapper">
        <div className="form-grid">
          <input
            type="text"
            placeholder="Responsável"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
          />
          <input
            type="text"
            placeholder="Criança"
            value={crianca}
            onChange={(e) => setCrianca(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
          />
          <input
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </div>

        <div className="buttons">
          <button onClick={handleSalvar}>Salvar</button>
          <button onClick={handleImportar}>Importar</button>
        </div>
      </div>

      <table className="tabela-entregas">
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
          {entregas.map((e) => (
            <tr key={e.id}>
              <td>{e.responsavel}</td>
              <td>{e.crianca}</td>
              <td>{e.contato}</td>
              <td>{e.nascimento}</td>
              <td>{e.tipo}</td>
              <td>
                <button onClick={() => handleEditar(e)}>Editar</button>{' '}
                <button onClick={() => handleExcluir(e.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Entrega;
