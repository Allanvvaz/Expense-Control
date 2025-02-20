import { useState, useEffect } from 'react'
import { pessoaService } from '../services/pessoaService'
import { Pessoa } from '../types'
import './CadastroPessoa.css'

const CadastroPessoa = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([])
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!nome || !idade) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    try {
      const novaPessoa = await pessoaService.criar(nome, Number(idade))
      setPessoas([...pessoas, novaPessoa])
      setNome('')
      setIdade('')
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error)
      alert('Erro ao cadastrar pessoa.')
    }
  }
  const handleDelete = async (id: number) => {
    try {
      await pessoaService.deletar({id})
      setPessoas(pessoas.filter((pessoa) => pessoa.id !== id))
    } catch (error) {
      console.error('Erro ao deletar pessoa:', error)
      alert('Erro ao deletar pessoa.')
    }
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-section">
        <h1 className="cadastro-titulo">Cadastrar Pessoas</h1>
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="form-grupo">
            <label className="form-label" htmlFor="nome">
              Nome:
            </label>
            <input
              id="nome"
              type="text"
              className="form-input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome"
            />
          </div>
          <div className="form-grupo">
            <label className="form-label" htmlFor="idade">
              Idade:
            </label>
            <input
              id="idade"
              type="number"
              className="form-input"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              placeholder="Digite a idade"
            />
          </div>
          <button type="submit" className="botao-cadastrar">
            Cadastrar
          </button>
        </form>
      </div>

      <div className="cadastro-section">
        <h2 className="lista-titulo">Pessoas Cadastradas</h2>
        <ul className="lista">
          {pessoas.map((pessoa) => (
            <li key={pessoa.id} className="lista-item">
              <span className="pessoa-id">ID: {pessoa.id}</span> - {pessoa.nome}{' '}
              - {pessoa.idade} anos
              <button className="botao-deletar" onClick={() => handleDelete(pessoa.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CadastroPessoa
