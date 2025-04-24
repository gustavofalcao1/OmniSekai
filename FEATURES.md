# 🌟 Planned Features – OmniSekai

## ✅ Implemented
- Login com Firebase
- Setup inicial com criação de personagem
- Header com XP e avatar com moldura dinâmica
- BottomNavbar flutuante com blur e ícones
- Swipe lateral entre abas
- Redirecionamento automático de `/start` se perfil já existir
- Logout pela tela de configuração
- Proteção contra rolagem e quebra de layout ao abrir teclado mobile
- Modal para criar novas quests
- Desativação do swipe lateral quando modal está ativa (controle via hook)
- Quests com leitura em tempo real via Firestore
- Concluir quests e aplicar XP/stats e recompensas
- Recompensas de missão aplicadas via transação Firestore (XP, stats, itens)
- Lógica de level up automático baseada em XP e configurações
- Sistema de níveis e XP com progresso automático, recompensas e configuração via Firestore
- Tela Inventory com itens obtidos
- Estrutura de coleção `/items` com definição global de itens
- Exibição de ícones via Lucide nos itens do inventário
- Suporte a exibição de inventário do usuário com dados vinculados a `/items/{itemId}`
- Subcoleção `/users/{uid}/inventory` com quantidade e data de aquisição
- ItemModal com visual estilo RPG
- Modal de Criação com campos dinâmicos
- Modularização com QuestCard
- Suporte a múltiplas recompensas de item (`rewardItem: [{ itemId, quantity }]`)
- Clique no nome do item da quest abre modal de visualização
- Global loading screen component implemented and applied across all loading states
- Standardized floating action button alignment across screen sizes (mobile and desktop)
- ItemSelectModal com visual de inventário, seleção múltipla e controle de quantidade
- SkillSelectModal com seleção múltipla e visual com níveis e tipos
- Modal de criação de missão agora suporta seleção visual de itens e skills com modais dedicadas
- Modal de criação com rolagem vertical e compatibilidade com BottomNavbar

## 💜 Em andamento

### Skills
- [x] Header exibe skills ativas com ícone e contorno circular representando tempo restante
- [x] Visual dinâmico na tela de skills com barra de progresso (ativo) e opacidade (cooldown)
- [x] Visualização no Header com timer circular em skills ativas
- [x] Skill ativa com botão e estado animado (ativo, cooldown, pronto)
- [x] Sistema de habilidades com pontos acumuláveis, nível, modo passivo ou ativo
- [x] Criação manual de habilidades pelo usuário (ex: "Rust", "Meditação")
- [x] Habilidades ativas com duração, cooldown e controle de tempo real
- [x] Habilidades passivas exibidas como conhecimento permanente
- [x] Modal de criação de habilidade com tipo, descrição e controle de tempo
- [x] Header exibe skills ativas com ícone circular e tempo restante
- [x] SkillModal com descrição, status (active, cooldown, ready), tempo restante
- [ ] Tela de skills com visual de estado (verde ativo, escurecido em cooldown)

### Inventory
- [ ] Agrupar itens com +1 que têm o mesmo id e exibir ícone de quantidade visível no inventário

### UX & Criação de Quests
- [ ] Validação visual e UX no processo de criação de missão

### Geral
- [ ] Padronizar uso de `useMemo` para otimizar re-renderizações

## 🐞 Bugs

### Config

-

### Bottom Nav Bar
- [x] Loading sem dados do usuário impede renderização de itens

## 💡 Ideias Futuras

### Inventory
- Exibir stats resumidos do item no card (ao estilo tooltip ou pequeno overlay)
- Marcar item como "equipado", "consumível", "decoração", etc.
- Sistema de categorias de item para filtro (ex: equipamento, utilitário, raro)
- Ações interativas no modal: equipar, usar, descartar, comparar

### Missões
- Geração automática de quests com base no perfil do jogador
- Criação de missões em grupo com convite e aceitação por outros usuários
- Classificação de tempo para quests: diária, semanal, repetitiva, atemporal
- Criação de quests por IA com base em prompts (a IA entende as regras e estrutura)
- Quests privadas e autogeradas por padrão

### Interface
- Efeitos visuais suaves entre rotas (opcional com framer-motion ou CSS-only)
- Sistema de temas visuais alternativos (dark neon, classic RPG, etc.)
- Feedback visual ao completar missão (ex: HUD flutuante ou efeito sonoro leve)

### System
- IA sugerindo missões personalizadas com base no histórico e perfil
- Inventário visual com badges, itens e conquistas
- Sincronização entre dispositivos e backup automático no Firestore

### Context Menu
- Menu com long press ou right click estilo Pinterest
- Quando ativado em uma missão: arquivar, editar ou excluir

