import { useState } from 'react';
import './App.css';
import TransacaoPage from './components/TransacaoPage';
import CadastroPessoa from './components/CadastroPessoa';

function App() {
  const [paginaAtual, setPaginaAtual] = useState<'pessoas' | 'transacoes'>('pessoas');

  return (
    <div className="container">
      {paginaAtual === 'pessoas' ? (
        <>
          <CadastroPessoa />
          <button onClick={() => setPaginaAtual('transacoes')}>
            Ir para Transações
          </button>
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
