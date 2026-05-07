# Sprint Creator 🚀

Sprint Creator é uma ferramenta avançada de gestão e simulação de sprints, projetada para ajudar times ágeis a planejar, medir e prever a conclusão de projetos com base em dados reais de produtividade e cenários hipotéticos.

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** com **TypeScript**
- **Vite** (Build tool)
- **Tailwind CSS** (Estilização)
- **Lucide React** (Ícones)
- **React Query** (Gerenciamento de estado de API)
- **Zustand** (Estado global persistente)
- **Recharts** (Visualização de dados)

### Backend
- **Node.js** com **Express**
- **Prisma ORM**
- **PostgreSQL** (Banco de dados)
- **Docker** (Ambiente de banco de dados)

## 🔄 Fluxo da Ferramenta

O Sprint Creator segue um fluxo lógico para garantir previsões precisas:

1.  **Criação do Projeto**: Definição do nome, empresa e unidade de medida (Horas ou Pontos).
2.  **Configuração da Equipe**: Cadastro de membros com suas respectivas alocações (%), carga horária diária e fator de produtividade (senioridade/eficiência).
3.  **Gestão de Backlog**: Cadastro de itens de escopo que precisam ser entregues.
4.  **Planejamento de Sprints**: Criação de sprints com datas definidas. A ferramenta calcula automaticamente a capacidade disponível do time para o período.
5.  **Execução e Histórico**: Ao finalizar sprints, a velocidade real (Velocity) é registrada.
6.  **Simulação de Cenários**: Criação de cenários (Otimista, Realista, Pessimista) alterando variáveis de capacidade ou escopo.
7.  **Previsão (Forecast)**: Visualização da data estimada de conclusão do projeto com níveis de confiança (Alta, Média, Baixa) baseados na estabilidade do histórico.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18+)
- Docker e Docker Compose

### 1. Configuração do Banco de Dados
```bash
docker-compose up -d db
```

### 2. Configuração do Backend
```bash
# Na raiz do projeto
npm install
npx prisma generate
npx prisma db push
npm run seed  # Alimenta o banco com dados de teste
npm run dev   # Inicia na porta 3006
```

### 3. Configuração do Frontend
```bash
cd frontend
npm install
npm run dev   # Inicia na porta 5173
```

## 📊 Estrutura de Pastas

- `/src`: Código fonte do Backend (Express, Prisma).
- `/frontend`: Aplicação React.
- `/prisma`: Esquema do banco de dados e sementes (seeds).

---
Desenvolvido para transformar dados em previsões acionáveis.
