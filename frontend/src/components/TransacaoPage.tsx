import { useEffect, useState } from 'react';
import { transacaoService } from '../services/transacaoService';
import { Transacao } from '../types';

const TransacaoPage = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<'DESPESA' | 'RECEITA'>('DESPESA');
  const [pessoaId,setpessoaId] = useState('')

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
    if (!descricao || !valor) {
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
    } catch (error) {
      console.error('Erro ao cadastrar transação:', error);
      alert('Erro ao cadastrar transação.');
    }
  };

  return (
    <div>
      <h2>Gerenciar Transações</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Descrição:
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </label>
        <br />
        <label>
          Valor:
          <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
        </label>
        <br />
        <label>
          Tipo:
          <select value={tipo} onChange={(e) => setTipo(e.target.value as 'DESPESA' | 'RECEITA')}>
            <option value="DESPESA">Despesa</option>
            <option value="RECEITA">Receita</option>
          </select>
        </label>
        <br />
        <br />
        <label>
          ID do usuário:
          <input type="number" value={pessoaId} onChange={(e) => setpessoaId(e.target.value)} />
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>

      <h3>Lista de Transações</h3>
      <ul>
        {transacoes.map((transacao) => (
          <li key={transacao.id}>
            {transacao.descricao} - R${transacao.valor} ({transacao.tipo})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransacaoPage;
