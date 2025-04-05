import { useState, useEffect, SetStateAction } from 'react';

function Crianca() {
  const [criancas, setCriancas] = useState([]);
  const [form, setForm] = useState({ id: null, atendido: '', nascimento: '', logradouro: '', numero: '', bairro: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCriancas();
  }, []);

  const fetchCriancas = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/crianca');
      const data = await response.json();
      setCriancas(data);
    } catch (err) {
      console.error('Erro ao buscar crianças:', err);
      setError('Erro ao buscar crianças.');
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    let { name, value } = e.target;

    // Converter data para o formato esperado pelo input date (yyyy-MM-dd)
    if (name === 'nascimento') {
      const parts = value.split('/');
      if (parts.length === 3) {
        value = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');

    // Converter data para o formato dd/MM/yyyy antes de enviar para o backend
    let formattedData = { ...form };
    if (form.nascimento) {
      const parts = form.nascimento.split('-');
      if (parts.length === 3) {
        formattedData.nascimento = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }

    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `http://localhost:8081/api/crianca/${form.id}` : 'http://localhost:8081/api/crianca';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Erro ao salvar criança.');
      }

      fetchCriancas();
      setForm({ id: null, atendido: '', nascimento: '', logradouro: '', numero: '', bairro: '' });
    } catch (err) {
      console.error('Erro ao salvar criança:', err);
      setError(err?.message || 'Erro desconhecido ao salvar criança.');
    }
  };

  const handleEdit = (crianca: SetStateAction<{ id: null; atendido: string; nascimento: string; logradouro: string; numero: string; bairro: string; }>) => {
    // Converter data para o formato correto do input date (yyyy-MM-dd)
    const parts = crianca.nascimento.split('/');
    const formattedDate = parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : crianca.nascimento;

    setForm({ ...crianca, nascimento: formattedDate });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/crianca/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}), // Adicionando um corpo vazio
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Erro ao apagar criança.');
      }
  
      setCriancas((prev) => prev.filter((crianca) => crianca.id !== id));
    } catch (err) {
      console.error('Erro ao apagar criança:', err);
      setError(newFunction(err));
    }

    function newFunction(err: unknown): SetStateAction<string> {
      return err?.message || 'Erro ao apagar criança.';
    }
  };
  
  

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cadastro de Criança</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="atendido" placeholder="atendido" value={form.atendido} onChange={handleChange} required />
        <input type="date" name="nascimento" value={form.nascimento} onChange={handleChange} required />
        <input name="logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} required />
        <input name="numero" type="number" placeholder="Número" value={form.numero} onChange={handleChange} required />
        <input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} required />
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => fetch('http://localhost:8081/api/crianca/importar', { method: 'POST' })}>
          Importar
        </button>
      </form>

      <h2>Crianças Cadastradas</h2>
      <ul>
        {criancas.map((c) => (
          <li key={c.id}>
            {c.atendido} - {c.nascimento} - {c.logradouro}, {c.numero} - {c.bairro}
            <button onClick={() => handleEdit(c)}>Editar</button>
            <button onClick={() => handleDelete(c.id)}>Apagar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Crianca;
