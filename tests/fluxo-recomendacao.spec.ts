import { describe, it, expect, beforeEach } from 'vitest';
import { Projeto } from '../src/dominio/Projeto.js';
import { Profissional } from '../src/dominio/Profissional.js';
import { Papel } from '../src/dominio/Papel.js';
import { OrquestradorPadrao } from '../src/padroes/template-method/OrquestradorPadrao.js';
import { SimilaridadeCosseno } from '../src/padroes/estrategia/SimilaridadeCosseno.js';

describe('Orquestrador de Equipe (Integration)', () => {
  let orquestrador: OrquestradorPadrao;
  let projeto: Projeto;
  let profissionais: Profissional[];

  beforeEach(() => {
    orquestrador = new OrquestradorPadrao();
    
    projeto = new Projeto({
      id: 'p1',
      nome: 'Filme de Teste',
      genero: 'Drama',
      duracao: 120,
      orcamento: 100000,
      prazo: new Date(Date.now() + 1000000),
      tipoCaptacao: 'FICCAO',
      localizacao: 'Sao Paulo',
      papeisNecessarios: [
        { papel: Papel.DIRETOR, peso: 1.0, obrigatorio: true }
      ]
    });

    profissionais = [
      new Profissional({
        id: 'prof1',
        nome: 'Diretor Experiente',
        email: 'diretor@teste.com',
        localizacao: 'Sao Paulo',
        precoMedio: 50000,
        especialidades: [Papel.DIRETOR],
        competencias: [{ nome: 'direcao', nivel: 10 }]
      })
    ];
  });

  it('deve compor uma equipe com sucesso quando houver profissionais qualificados', () => {
    const estrategia = new SimilaridadeCosseno();
    const equipe = orquestrador.orquestrar(projeto, estrategia, profissionais);

    expect(equipe.membros.length).toBe(1);
    expect(equipe.membros[0].papel).toBe(Papel.DIRETOR);
    expect(projeto.status).toBe('EQUIPE_FORMADA');
  });

  it('deve lancar erro se o projeto nao tiver orcamento', () => {
    projeto.orcamento = 0;
    const estrategia = new SimilaridadeCosseno();
    
    expect(() => orquestrador.orquestrar(projeto, estrategia, profissionais)).toThrow();
  });
});
