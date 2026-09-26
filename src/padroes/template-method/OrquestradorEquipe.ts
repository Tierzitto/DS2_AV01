import { Equipe } from "../../dominio/Equipe.js";
import { MembroEquipe } from "../../dominio/MembroEquipe.js";
import type { Papel } from "../../dominio/Papel.js";
import type { Projeto } from "../../dominio/Projeto.js";
import type { Profissional } from "../../dominio/Profissional.js";
import type { RecomendacaoStrategy } from "../estrategia/RecomendacaoStrategy.js";

export abstract class OrquestradorEquipe {
  orquestrar(projeto: Projeto, estrategia: RecomendacaoStrategy, profissionaisDisponiveis: Profissional[]): Equipe {
    if (!this.validarRestricoes(projeto)) {
      throw new Error(`Projeto ${projeto.id} nao atende as restricoes minimas para orquestracao de equipe.`);
    }
    const candidatos = this.normalizarDados(projeto, profissionaisDisponiveis);
    const recomendacoes = estrategia.recomendar(projeto, candidatos);
    const recomendacoesProcessadas = this.posProcessar(recomendacoes);

    const equipe = projeto.equipe ?? new Equipe();
    for (const papel of projeto.papeisObrigatorios()) {
      const rankeados = recomendacoesProcessadas.get(papel) ?? [];
      const escolhido = rankeados[0];
      if (escolhido) {
        equipe.adicionarMembro(new MembroEquipe(papel, escolhido));
      }
    }
    projeto.equipe = equipe;
    projeto.status = equipe.estaCompleta(projeto.papeisObrigatorios()) ? "EQUIPE_FORMADA" : "EM_RECOMENDACAO";
    return equipe;
  }

  protected abstract validarRestricoes(projeto: Projeto): boolean;
  protected abstract normalizarDados(projeto: Projeto, profissionais: Profissional[]): Profissional[];
  protected abstract posProcessar(recomendacoes: Map<Papel, Profissional[]>): Map<Papel, Profissional[]>;
}
