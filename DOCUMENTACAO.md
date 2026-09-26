# Cinebridge - Documentação do Microsserviço de Recomendação

## Visão Geral
Este microsserviço é responsável pela orquestração de equipes e recomendação de profissionais para projetos audiovisuais. Ele utiliza algoritmos inteligentes para compor equipes equilibradas baseadas em competências, avaliações e restrições orçamentárias.

## Padrões de Projeto Aplicados
1. **Strategy**: Encapsula algoritmos de recomendação (Similaridade de Cosseno, Filtragem Colaborativa, Regras de Orçamento).
2. **Template Method**: Define o esqueleto da orquestração de equipes, permitindo variações na validação e pós-processamento.
3. **Observer**: Gerencia notificações (E-mail, Interno) e auditoria de forma desacoplada.
4. **Visitor**: Facilita operações transversais como validação de consistência e geração de relatórios sem poluir as classes de domínio.

## Arquitetura
- **Linguagem**: TypeScript (Node.js)
- **Framework HTTP**: Fastify
- **ORM**: Prisma (MySQL)
- **Comunicação**: EventEmitter (preparado para expansão para mensageria externa)

## Requisitos Atendidos
- Baixa latência (< 2s para recomendações).
- Tolerância a falhas via padrão Fallback nos repositórios.
- Logs estruturados para auditoria.
- API escalável para múltiplos produtores.
