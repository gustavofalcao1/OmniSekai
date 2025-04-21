# 🌟 Planned Features – OmniSekai

## ✅ Implemented
- [x] Login com Firebase
- [x] Setup inicial com criação de personagem
- [x] Header com XP e avatar com moldura dinâmica
- [x] BottomNavbar flutuante com blur e ícones
- [x] Swipe lateral entre abas
- [x] Redirecionamento automático de `/start` se perfil já existir
- [x] Logout pela tela de configuração
- [x] Proteção contra rolagem e quebra de layout ao abrir teclado mobile
- [x] Modal para criar novas quests
- [x] Desativação do swipe lateral quando modal está ativa (controle via hook)
- [x] Quests com leitura em tempo real via Firestore
- [x] Concluir quests e aplicar XP/stats e recompensas
- [x] Recompensas de missão aplicadas via transação Firestore (XP, stats, itens)
- [x] Lógica de level up automático baseada em XP e configurações
- [x] Sistema de níveis e XP com progresso automático, recompensas e configuração via Firestore

## 🔜 Em andamento

### Inventory
- [ ] Tela Inventory com itens obtidos
- [ ] Estrutura de coleção `/items` com definição global de itens
- [ ] Exibição de ícones via Lucide nos itens do inventário
- [ ] Suporte a exibição de inventário do usuário com dados vinculados a `/items/{itemId}`

### UX & Criação de Quests
- [ ] Validação visual e UX no processo de criação de missão
- [ ] Modal de Criação (campos dinâmicos e inteligentes)

## 💡 Ideias Futuras

### Inventory
- Visualização detalhada ao estilo RPG clássico
  - Cada item do inventário é vinculado a um item global da coleção `/items`
  - Itens possuem: nome, descrição, ícone (Lucide), imagem opcional, stats aplicados e validade
  - Quando o nome de um item aparecer em uma missão (ou em qualquer lugar), ele será clicável como um link
  - Ao clicar, abre-se uma modal detalhada com as informações completas do item
  - Pode ser expandido para incluir raridade, categoria, tipo de uso, etc.

### Missões
- Geração automática de quests com base no perfil do jogador
- Criação de missões em grupo com convite e aceitação por outros usuários
- Classificação de tempo para quests: diária, semanal, repetitiva, atemporal
- Criação de quests por IA com base em prompts (a IA entende as regras e estrutura)
- Quests privadas e autogeradas por padrão

### Modal de Criação (Fase Expandida)
- Campos: título, descrição, XP, stats (por tipo e quantidade), item ou itens
- Seleção de item a partir de uma **coleção global de itens** (`/items/{itemId}`)
- Validação leve e edição direta de cada campo

### Interface
- Efeitos visuais suaves entre rotas (opcional com framer-motion ou CSS-only)
- Sistema de temas visuais alternativos (dark neon, classic RPG, etc.)
- Feedback visual ao completar missão (ex: HUD flutuante ou efeito sonoro leve)

### System
- IA sugerindo missões personalizadas com base no histórico e perfil
- Inventário visual com badges, itens e conquistas
- Sincronização entre dispositivos e backup automático no Firestore

### Context Menu
- Menu with long press or right click like a pinterest menu
- When activate on mission can archived, edit or delete
