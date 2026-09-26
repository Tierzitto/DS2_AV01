import type { Papel } from "../dominio/Papel.js";
import type { Projeto } from "../dominio/Projeto.js";
import type { Profissional } from "../dominio/Profissional.js";
import type { RecomendacaoStrategy } from "../padroes/estrategia/RecomendacaoStrategy.js";
import type { Observador } from "../padroes/observador/Observador.js";
import type { EventoRecomendacao } from "../dominio/EventoRecomendacao.js";

export class SistemaRecomendacao {
  private observadores: Observador[] = [];
  private estrategiaAtual: RecomendacaoStrategy;

  constructor(estrategiaInicial: RecomendacaoStrategy) {
    this.estrategiaAtual = estrategiaInicial;
  }

  definirEstrategia(estrategia: RecomendacaoStrategy): void {
    this.estrategiaAtual = estrategia;
  }

  adicionarObservador(observador: Observador): void {
    this.observadores.push(observador);
  }

  removerObservador(observador: Observador): void {
    this.observadores = this.observadores.filter((atual) => atual !== observador);
  }

  executarRecomendacao(projeto: Projeto, profissionais: Profissional[]): Map<Papel, Profissional[]> {
    const recomendacoes = this.estrategiaAtual.recomendar(projeto, profissionais);
    this.notificarObservadores({
      tipo: "RECOMENDACAO_GERADA",
      dados: { projetoId: projeto.id, estrategia: this.estrategiaAtual.nome },
      origem: "SistemaRecomendacao",
      timestamp: new Date(),
    });
    return recomendacoes;
  }

  notificarObservadores(evento: EventoRecomendacao): void {
    for (const observador of this.observadores) {
      observador.atualizar(evento);
    }
  }
}
