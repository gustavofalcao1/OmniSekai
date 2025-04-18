# 🌟 Planned Features – OmniSekai

## ✅ Implemented
- [x] Login com Firebase
- [x] Setup inicial com criação de personagem
- [x] Header com XP e avatar com moldura dinâmica
- [x] BottomNavbar flutuante com blur e ícones
- [x] Quests com leitura em tempo real via Firestore
- [x] Swipe lateral entre abas
- [x] Redirecionamento automático de `/start` se perfil já existir
- [x] Logout pela tela de configuração
- [x] Proteção contra rolagem e quebra de layout ao abrir teclado mobile
- [x] Modal para criar novas quests
- [x] Desativação do swipe lateral quando modal está ativa (controle via hook)

## 🔜 Em andamento
- [ ] Concluir quests e aplicar XP/stats e recompensas
- [ ] Tela Inventory com itens obtidos
- [ ] Validação visual e UX no processo de criação de missão

## 💡 Ideias Futuras

### Missões
- Geração automática de quests com base no perfil do jogador
- Criação de missões em grupo com convite e aceitação por outros usuários
- Classificação de tempo para quests: diária, semanal, repetitiva, atemporal
- Criação de quests por IA com base em prompts (a IA entende as regras e estrutura)
- Quests privadas e autogeradas por padrão

### Modal de Criação (Fase Inicial)
- Campos: título, descrição, XP, stats (por tipo e quantidade), item ou itens
- Seleção de item a partir de uma **coleção global de itens** (`/items/{itemId}`)
- Validação leve e edição direta de cada campo

### Recompensas e Conclusão
- Conclusão de missão deve aplicar:
  - XP
  - Stats
  - Itens (se houver)
- Aplicação de recompensa precisa ser **atômica e garantida**
  - Uso futuro de `runTransaction()` no Firestore

### Interface
- Efeitos visuais suaves entre rotas (opcional com framer-motion ou CSS-only)
- Sistema de temas visuais alternativos (dark neon, classic RPG, etc.)
- Feedback visual ao completar missão (ex: HUD flutuante ou efeito sonoro leve)

### Sistema
- IA sugerindo missões personalizadas com base no histórico e perfil
- Inventário visual com badges, itens e conquistas
- Sincronização entre dispositivos e backup automático no Firestore

### Context Menu
- Menu with long press or right click like a pinterest menu
- When activate on mission can archived, edit or delete

## 🔁 Sistema de Níveis e XP (em planejamento)
- XP do usuário é acumulativo (ex: 0 → 100 → 250 → 500)
- A progressão de XP por nível será definida em `/configs/leveling`
  - Exemplo:
    ```json
    {
      "xpRequirements": {
        "1": 0,
        "2": 100,
        "3": 250,
        "4": 500
      }
    }
    ```
- Ao atingir o valor de XP necessário para o próximo nível:
  - O nível (`user.level`) é incrementado
  - Recompensas são aplicadas (ex: stats extras, itens)
  - Recompensas também definidas na coleção:
    ```json
    {
      "levelRewards": {
        "2": {
          "stats": { "strength": 1 },
          "items": ["badge_level_2"]
        }
      }
    }
    ```
- Tudo controlado via Firestore, **sem necessidade de painel admin ou alteração de código**
- Possível integração com `useLevelConfig()` para leitura centralizada das configs
- O nível nunca deve ser reduzido, garantindo integridade do progresso
