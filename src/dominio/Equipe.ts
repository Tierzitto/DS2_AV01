import type { Papel } from "./Papel.js";
import type { MembroEquipe } from "./MembroEquipe.js";

export type StatusEquipe = "SUGERIDA" | "EM_NEGOCIACAO" | "FORMADA";

export class Equipe {
  id?: string;
  dataFormacao: Date;
  status: StatusEquipe;
  membros: MembroEquipe[];

  constructor() {
    this.dataFormacao = new Date();
    this.status = "SUGERIDA";
    this.membros = [];
  }

  adicionarMembro(membro: MembroEquipe): void {
    this.membros = this.membros.filter((atual) => atual.papel !== membro.papel);
    this.membros.push(membro);
  }

  obterMembroPorPapel(papel: Papel): MembroEquipe | undefined {
    return this.membros.find((membro) => membro.papel === papel);
  }

  estaCompleta(papeisObrigatorios: Papel[]): boolean {
    return papeisObrigatorios.every((papel) => this.obterMembroPorPapel(papel) !== undefined);
  }
}
