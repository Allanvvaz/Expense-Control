import { useState } from 'react';
import { pessoaService } from '../services/pessoaService';

const CadastroPessoa = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!nome || !idade) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const novaPessoa = await pessoaService.criar(nome, Number(idade));
      alert(`Usuário ${novaPessoa.nome} cadastrado com sucesso!`);
      setNome('');
      setIdade('');
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error);
      alert('Erro ao cadastrar pessoa.');
    }
  };

  return (
    <div>
      <h2>Cadastrar Pessoa</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <br />
        <label>
          Idade:
          <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} />
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroPessoa;
