import { useEffect, useState } from 'react';
import { transacaoService } from '../services/transacaoService';
import { Transacao } from '../types';
import './TransacaoPage.css';

const TransacaoPage = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<'DESPESA' | 'RECEITA'>('DESPESA');
  const [pessoaId, setPessoaId] = useState('');

  useEffect(() => {
    const carregarTransacoes = async () => {
      try {
        const data = await transacaoService.listar();
        setTransacoes(data);
      } catch (error) {
        console.error('Erro ao carregar transações:', error);
      }
    };

    carregarTransacoes();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!descricao || !valor || !pessoaId) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      const novaTransacao = await transacaoService.criar({
        descricao,
        valor: Number(valor),
        tipo,
        pessoaId: Number(pessoaId)
      });

      setTransacoes([...transacoes, novaTransacao]);
      setDescricao('');
      setValor('');
      setTipo('DESPESA');
      setPessoaId('');
    } catch (error) {
      console.error('Erro ao cadastrar transação:', error);
      alert('Erro ao cadastrar transação.');
    }
  };

  return (
    <div className="transacao-container">
      <div className="transacao-section">
        <h2 className="transacao-titulo">Cadastrar Transação</h2>
        <form className="transacao-form" onSubmit={handleSubmit}>
          <div className="form-grupo">
            <label className="form-label" htmlFor="descricao">Descrição:</label>
            <input
              id="descricao"
              type="text"
              className="form-input"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição"
            />
          </div>

          <div className="form-grupo">
            <label className="form-label" htmlFor="valor">Valor:</label>
            <input
              id="valor"
              type="number"
              className="form-input"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Digite o valor"
            />
          </div>

          <div className="form-grupo">
            <label className="form-label" htmlFor="tipo">Tipo:</label>
            <select
              id="tipo"
              className="form-select"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as 'DESPESA' | 'RECEITA')}
            >
              <option value="DESPESA">Despesa</option>
              <option value="RECEITA">Receita</option>
            </select>
          </div>

          <div className="form-grupo">
            <label className="form-label" htmlFor="pessoaId">ID do usuário:</label>
            <input
              id="pessoaId"
              type="number"
              className="form-input"
              value={pessoaId}
              onChange={(e) => setPessoaId(e.target.value)}
              placeholder="Digite o ID do usuário"
            />
          </div>

          <button type="submit" className="botao-cadastrar">
            Cadastrar
          </button>
        </form>
      </div>

      <div className="transacao-section">
        <h3 className="transacao-titulo">Lista de Transações</h3>
        <ul className="lista-transacoes">
          {transacoes.map((transacao) => (
            <li key={transacao.id} className="transacao-item">
              <div className="transacao-info">
                <span>{transacao.descricao}</span>
                <span>R$ {transacao.valor}</span>
                <span className={`transacao-tipo tipo-${transacao.tipo.toLowerCase()}`}>
                  {transacao.tipo}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransacaoPage;
