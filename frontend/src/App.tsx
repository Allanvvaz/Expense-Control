import { useEffect, useState } from 'react';
import './App.css';
import { pessoaService } from './services/pessoaService';
import { Pessoa } from './types';
import TransacaoPage from './components/TransacaoPage';

function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [paginaAtual, setPaginaAtual] = useState<'pessoas' | 'transacoes'>('pessoas');

  useEffect(() => {
    const carregarPessoas = async () => {
      try {
        const data = await pessoaService.listar();
        setPessoas(data);
      } catch (error) {
        console.error('Erro ao carregar pessoas:', error);
      }
    };

    carregarPessoas();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!nome || !idade) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const novaPessoa = await pessoaService.criar(nome, Number(idade));
      setPessoas([...pessoas, novaPessoa]);
      setNome('');
      setIdade('');
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error);
      alert('Erro ao cadastrar pessoa.');
    }
  };

  return (
    <div>
      {paginaAtual === 'pessoas' ? (
        <>
          <h1>Cadastrar Pessoas</h1>
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

          <h3>Pessoas cadastradas:</h3>
          <ul>
            {pessoas.map((pessoa) => (
              <li key={pessoa.id}>
                {pessoa.nome} - {pessoa.idade} anos
              </li>
            ))}
          </ul>

          <button onClick={() => setPaginaAtual('transacoes')}>Ir para Transações</button>
        </>
      ) : (
        <>
          <button onClick={() => setPaginaAtual('pessoas')}>Voltar</button>
          <TransacaoPage />
        </>
      )}
    </div>
  );
}

export default App;
