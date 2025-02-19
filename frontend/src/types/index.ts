export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  createdAt: string;
}

export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'DESPESA' | 'RECEITA';
  pessoaId: number;
}

export interface Totais {
  totaisPorPessoa: {
    pessoaId: number;
    nome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
  }[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoGeral: number;
} 