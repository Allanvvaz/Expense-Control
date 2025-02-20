import { useState } from 'react'
import './App.css'
import TransacaoPage from './components/TransacaoPage'
import CadastroPessoa from './components/CadastroPessoa'
import TotaisPage from './components/TotaisPage'

function App() {
  const [paginaAtual, setPaginaAtual] = useState<'pessoas' | 'transacoes' | 'totais'>('pessoas')

  return (
    <div className="container">
      <nav className="navegacao">
        <button onClick={() => setPaginaAtual('pessoas')} className={paginaAtual === 'pessoas' ? 'ativo' : ''}>
          Pessoas
        </button>
        <button onClick={() => setPaginaAtual('transacoes')} className={paginaAtual === 'transacoes' ? 'ativo' : ''}>
          Transações
        </button>
        <button onClick={() => setPaginaAtual('totais')} className={paginaAtual === 'totais' ? 'ativo' : ''}>
          Totais
        </button>
      </nav>

      {paginaAtual === 'pessoas' && <CadastroPessoa />}
      {paginaAtual === 'transacoes' && <TransacaoPage />}
      {paginaAtual === 'totais' && <TotaisPage />}
    </div>
  )
}

export default App
