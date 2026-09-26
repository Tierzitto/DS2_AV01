import { Equipe } from "./Equipe.js";
import { MembroEquipe } from "./MembroEquipe.js";
import type { Papel } from "./Papel.js";
import type { Profissional } from "./Profissional.js";
import type { ElementoVisitavel } from "../padroes/visitante/ElementoVisitavel.js";
import type { VisitanteProjeto } from "../padroes/visitante/VisitanteProjeto.js";

export type TipoCaptacao = "DOCUMENTARIO" | "FICCAO" | "ANIMACAO";
export type StatusProjeto = "CRIADO" | "EM_RECOMENDACAO" | "EQUIPE_FORMADA" | "CANCELADO";

export interface PapelProjeto {
  papel: Papel;
  peso: number;
  obrigatorio: boolean;
}

export interface DadosProjeto {
  id: string;
  nome: string;
  genero: string;
  duracao: number;
  orcamento: number;
  prazo: Date;
  tipoCaptacao: TipoCaptacao;
  localizacao: string;
  papeisNecessarios: PapelProjeto[];
  estrategiaPreferida?: string;
}

export class Projeto implements ElementoVisitavel {
  id: string;
  nome: string;
  genero: string;
  duracao: number;
  orcamento: number;
  prazo: Date;
  tipoCaptacao: TipoCaptacao;
  localizacao: string;
  papeisNecessarios: PapelProjeto[];
  estrategiaPreferida?: string;
  status: StatusProjeto;
  equipe?: Equipe;

  constructor(dados: DadosProjeto) {
    this.id = dados.id;
    this.nome = dados.nome;
    this.genero = dados.genero;
    this.duracao = dados.duracao;
    this.orcamento = dados.orcamento;
    this.prazo = dados.prazo;
    this.tipoCaptacao = dados.tipoCaptacao;
    this.localizacao = dados.localizacao;
    this.papeisNecessarios = dados.papeisNecessarios;
    this.estrategiaPreferida = dados.estrategiaPreferida;
    this.status = "CRIADO";
  }

  papeisObrigatorios(): Papel[] {
    return this.papeisNecessarios.filter((item) => item.obrigatorio).map((item) => item.papel);
  }

  pesoDoPapel(papel: Papel): number {
    const item = this.papeisNecessarios.find((atual) => atual.papel === papel);
    return item ? item.peso : 0;
  }

  aceitarRecomendacao(papel: Papel, profissional: Profissional): void {
    if (!this.equipe) {
      this.equipe = new Equipe();
    }
    this.equipe.adicionarMembro(new MembroEquipe(papel, profissional));
    this.status = this.equipe.estaCompleta(this.papeisObrigatorios()) ? "EQUIPE_FORMADA" : "EM_RECOMENDACAO";
  }

  substituirMembro(papel: Papel, profissional: Profissional): void {
    this.aceitarRecomendacao(papel, profissional);
  }

  solicitarReavaliacao(): void {
    this.status = "EM_RECOMENDACAO";
  }

  aceitar<T>(visitante: VisitanteProjeto<T>): T {
    return visitante.visitarProjeto(this);
  }
}
