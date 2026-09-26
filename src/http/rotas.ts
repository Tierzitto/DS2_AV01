import { FastifyInstance } from "fastify";
import { SistemaRecomendacao } from "../servicos/SistemaRecomendacao.js";
import { SimilaridadeCosseno } from "../padroes/estrategia/SimilaridadeCosseno.js";
import { FiltragemColaborativa } from "../padroes/estrategia/FiltragemColaborativa.js";
import { RegrasOrcamento } from "../padroes/estrategia/RegrasOrcamento.js";
import { OrquestradorPadrao } from "../padroes/template-method/OrquestradorPadrao.js";
import { RepositorioProfissionaisPrisma } from "../repositorio/RepositorioProfissionaisPrisma.js";
import { PrismaClient } from "@prisma/client";
import { Projeto } from "../dominio/Projeto.js";

export async function rotasRecomendacao(app: FastifyInstance) {
  const prisma = new PrismaClient();
  const repoProfissionais = new RepositorioProfissionaisPrisma(prisma);
  const orquestrador = new OrquestradorPadrao();
  
  const estrategias = {
    SIMILARIDADE_COSSENO: new SimilaridadeCosseno(),
    FILTRAGEM_COLABORATIVA: new FiltragemColaborativa(),
    REGRAS_ORCAMENTO: new RegrasOrcamento(),
  };

  app.post("/projetos/:id/recomendar", async (request, reply) => {
    const { id } = request.params as { id: string };
    
    // Simplificacao: Em um cenário real, buscaríamos o projeto no banco
    // Aqui estamos apenas orquestrando com dados simulados ou vindos do banco para demonstrar o fluxo
    
    const profissionais = await repoProfissionais.listarTodos();
    // Logica de orquestracao e resposta...
    return { message: "Fluxo de recomendacao iniciado para o projeto " + id };
  });
}
