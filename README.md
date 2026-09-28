# Cinebridge - Microsserviço de Recomendação e Orquestração

O **Cinebridge** é o coração inteligente da plataforma de gestão audiovisual, desenvolvido para interpretar especificações técnicas de projetos e compor automaticamente equipes equilibradas através de algoritmos de recomendação avançados.

Este repositório contém o microsserviço completo, implementado com foco em padrões de projeto clássicos, tipagem estricta e resiliência de dados.

## 🚀 Tecnologias

- **Runtime**: Node.js 20+ (LTS)
- **Linguagem**: TypeScript (Strict Mode)
- **Framework HTTP**: Fastify
- **ORM**: Prisma
- **Banco de Dados**: MySQL
- **Testes**: Vitest

## 🏗️ Arquitetura e Padrões de Projeto

A arquitetura interna segue os princípios de Inversão de Dependência e Separação de Camadas, com a aplicação consciente de quatro padrões de projeto:

1.  **Strategy**: Encapsula os algoritmos de recomendação (`SimilaridadeCosseno`, `FiltragemColaborativa`, `RegrasOrcamento`), permitindo trocas dinâmicas de motor de recomendação.
2.  **Template Method**: Padroniza o esqueleto da orquestração de equipes em `OrquestradorEquipe`, garantindo que validações e pós-processamentos sejam consistentes.
3.  **Observer**: Gerencia eventos assíncronos e notificações (e-mail, auditoria, notificador interno) utilizando EventEmitter nativo.
4.  **Visitor**: Facilita operações transversais sobre as entidades de domínio, como validações de consistência (`ValidadorConsistencia`) e geração de relatórios de compatibilidade (`GeradorRelatorio`).

## 🛠️ Como Instalar e Rodar

### 1. Clonar o Repositório
```bash
git clone https://github.com/Tierzitto/TP2_AV01.git
cd TP2_AV01
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar o Ambiente e Banco de Dados
- Copie o arquivo `.env.example` para `.env`:
  ```bash
  cp .env.example .env
  ```
- Edite o arquivo `.env` ajustando as credenciais de conexão com o seu banco de dados MySQL (`DATABASE_URL`).
- Gere o Prisma Client:
  ```bash
  npm run prisma:generate
  ```
- Execute as migrações do Prisma para criar o esquema no banco de dados:
  ```bash
  npm run prisma:migrate
  ```

### 4. Executar o Projeto

- **Modo Desenvolvimento (com hot-reload via `tsx`)**:
  ```bash
  npm run dev
  ```

- **Compilação**:
  ```bash
  npm run build
  ```

- **Iniciar**:
  ```bash
  npm start
  ```

## 📦 Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor em modo de desenvolvimento com hot-reload |
| `npm run build` | Compila o código TypeScript |
| `npm start` | Inicia a aplicação |
| `npm test` | Executa os testes automatizados com Vitest |
| `npm run test:watch` | Executa os testes em modo watch |
| `npm run prisma:generate` | Gera o Prisma Client com base no schema |
| `npm run prisma:migrate` | Executa migrações do banco de dados em desenvolvimento |

## 📂 Estrutura do Repositório

```text
├── src/
│   ├── dominio/          # Regras de negócio, entidades e value objects
│   ├── http/             # Rotas e controladores Fastify
│   ├── padroes/          # Implementações dos Design Patterns (Strategy, Template Method, Observer, Visitor)
│   ├── repositorio/      # Camada de persistência (Prisma, Memória e Fallback)
│   └── servicos/         # Serviços de aplicação e orquestradores
├── tests/                # Testes automatizados (Vitest)
└── prisma/               # Schema e migrações do banco de dados
```

## 📖 Manual da API e Fluxos Principais

- **Recomendação**: `POST /projetos/:id/recomendar` inicia o fluxo de análise e sugestão de equipe equilibrada.
- **Tolerância a Falhas**: O sistema conta com `RepositorioProfissionaisFallback`, que assegura o funcionamento contínuo mesmo na indisponibilidade temporária do banco relacional principal.
- **Auditoria**: Eventos de recomendação e alteração de equipes disparam notificações assíncronas monitoradas por observadores.

## 🧪 Executando Testes

Para executar a suíte de testes automatizados:
```bash
npm test
```

Para acompanhar os testes interativamente:
```bash
npm run test:watch
```

---
Desenvolvido com excelência técnica para a orquestração e gestão de talentos na indústria audiovisual.
