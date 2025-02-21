import { useEffect, useState } from 'react';
import { transacaoService } from '../services/transacaoService';
import { Totais } from '../types';
import './TotaisPage.css';

const TotaisPage = () => {
  const [totais, setTotais] = useState<Totais | null>(null);

  useEffect(() => {
    // efeito para carregar os totais ao montar o componente
    const carregarTotais = async () => {
      try {
        const data = await transacaoService.consultarTotais();
        setTotais(data);
      } catch (error) {
        console.error('Erro ao carregar totais:', error);
      }
    };

    carregarTotais();
  }, []);

  if (!totais) return <div>Carregando...</div>;

  return (
    <div className="totais-container">
      <h2 className="totais-titulo">Totais por Usuário</h2>
      <div className="tabela-container">
        <table className="tabela-totais">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Total Receitas</th>
              <th>Total Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {/* mapeia a lista de totais por pessoa e exibe cada uma como uma linha da tabela */}
            {totais.totaisPorPessoa.map((pessoa) => (
              <tr key={pessoa.pessoaId}>
                <td>{pessoa.pessoaId}</td>
                <td>{pessoa.nome}</td>
                <td className="valor positivo">
                  R$ {pessoa.totalReceitas.toFixed(2)}
                </td>
                <td className="valor negativo">
                  R$ {pessoa.totalDespesas.toFixed(2)}
                </td>
                <td
                  className={`valor ${pessoa.saldo >= 0 ? 'positivo' : 'negativo'}`}
                >
                  R$ {pessoa.saldo.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {/* Linha do rodapé mostrando os totais gerais de receitas, despesas e saldo */}
            <tr className="totais-gerais">
              <td colSpan={2}>TOTAIS GERAIS</td>
              <td className="valor positivo">
                R$ {totais.totalGeralReceitas.toFixed(2)}
              </td>
              <td className="valor negativo">
                R$ {totais.totalGeralDespesas.toFixed(2)}
              </td>
              <td
                className={`valor ${totais.saldoGeral >= 0 ? 'positivo' : 'negativo'}`}
              >
                R$ {totais.saldoGeral.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TotaisPage;
