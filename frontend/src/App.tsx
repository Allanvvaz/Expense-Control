import { useEffect, useState } from 'react'
import './App.css'
import { pessoaService } from './services/pessoaService'
import { Pessoa } from './types'

function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([])

  useEffect(() => {
    const carregarPessoas = async () => {
      try {
        const data = await pessoaService.listar()
        setPessoas(data)
      } catch (error) {
        console.error('Erro ao carregar pessoas:', error)
      }
    }

    carregarPessoas()
  }, [])

  return (
    <div>
      <h1>Lista de Pessoas</h1>
      <ul>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            {pessoa.nome} - {pessoa.idade} anos
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
