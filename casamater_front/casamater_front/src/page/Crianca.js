import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Crianca.css';

function Crianca() {
  const [id, setId] = useState(null);
  const [atendido, setAtendido] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [criancas, setCriancas] = useState([]);

  useEffect(() => {
    fetchCriancas();
  }, []);

  const fetchCriancas = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/crianca');
      setCriancas(response.data);
    } catch (error) {
      alert('Erro ao buscar crianças');
    }
  };

  const formatarData = (data) => {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  const handleSalvar = async () => {
    const crianca = {
      atendido,
      nascimento: formatarData(nascimento),
      logradouro,
      numero: parseInt(numero),
      bairro,
    };

    console.log('Enviando para o backend:', crianca);

    try {
      if (id === null) {
        await axios.post('http://localhost:8081/api/crianca', crianca);
        alert('Criança salva com sucesso!');
      } else {
        await axios.put(`http://localhost:8081/api/crianca/${id}`, crianca);
        alert('Criança atualizada com sucesso!');
      }
      limparCampos();
      fetchCriancas();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar criança!');
    }
  };

  const handleEditar = (crianca) => {
    setId(crianca.id);
    setAtendido(crianca.atendido);
    setNascimento(formatarDataParaInput(crianca.nascimento));
    setLogradouro(crianca.logradouro);
    setNumero(crianca.numero.toString());
    setBairro(crianca.bairro);
  };

  const formatarDataParaInput = (data) => {
    const partes = data.split('/');
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  };

  const handleExcluir = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/crianca/${id}`);
      alert('Criança excluída com sucesso!');
      fetchCriancas();
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir criança!');
    }
  };

  const handleImportar = async () => {
    try {
      await axios.post('http://localhost:8081/api/crianca/importar');
      alert('Importação realizada com sucesso!');
      fetchCriancas();
    } catch (error) {
      console.error(error);
      alert('Erro ao importar!');
    }
  };

  const limparCampos = () => {
    setId(null);
    setAtendido('');
    setNascimento('');
    setLogradouro('');
    setNumero('');
    setBairro('');
  };

  return (
    <div className="crianca-container">
      <h2>Cadastro de Crianças</h2>

      <div className="form-wrapper">
        <div className="form-grid">
          <input
            type="text"
            placeholder="Atendido"
            value={atendido}
            onChange={(e) => setAtendido(e.target.value)}
          />
          <input
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
          />
          <input
            type="text"
            placeholder="Logradouro"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />
          <input
            type="number"
            placeholder="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </div>

        <div className="buttons">
          <button onClick={handleSalvar}>Salvar</button>
          <button onClick={handleImportar}>Importar</button>
        </div>
      </div>

      <table className="tabela-criancas">
        <thead>
          <tr>
            <th>Atendido</th>
            <th>Nascimento</th>
            <th>Logradouro</th>
            <th>Número</th>
            <th>Bairro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {criancas.map((c) => (
            <tr key={c.id}>
              <td>{c.atendido}</td>
              <td>{c.nascimento}</td>
              <td>{c.logradouro}</td>
              <td>{c.numero}</td>
              <td>{c.bairro}</td>
              <td>
                <button onClick={() => handleEditar(c)}>Editar</button>{' '}
                <button onClick={() => handleExcluir(c.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Crianca;
