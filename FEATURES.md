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

## 💜 Em andamento

### Inventory
- [x] Tela Inventory com itens obtidos
- [x] Estrutura de coleção `/items` com definição global de itens
- [x] Exibição de ícones via Lucide nos itens do inventário
- [x] Suporte a exibição de inventário do usuário com dados vinculados a `/items/{itemId}`
- [x] Subcoleção `/users/{uid}/inventory` com quantidade e data de aquisição
- [x] ItemModal com visual estilo RPG
- [ ] Agrupar itens com +1 que tem o mesmo id, e colocar um icone de quantidade visivel no inventario

### UX & Criação de Quests
- [x] Modal de Criação com campos dinâmicos
- [ ] Validação visual e UX no processo de criação de missão
- [x] Modularização com QuestCard
- [x] Suporte a múltiplas recompensas de item (`rewardItem: [{ itemId, quantity }]`)
- [x] Clique no nome do item da quest abre modal de visualização

### Geral
- [ ] Padronizar uso de `useMemo` para otimizar re-renderizações

## 🐞 Bugs

### Config
- [ ] Error on handle logout
    ```
        page.tsx:14 Skipping auto-scroll behavior due to `position: sticky` or `position: fixed` on element:
        await in fetchServerResponse		
        handleLogout	@ page.tsx:14
    ```

### Bottom Nav Bar
- [ ] Loading sem dados do usuário impede renderização de itens

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

