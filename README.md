# OmniSekai

**OmniSekai** is a modern, mobile-first, gamified personal development app inspired by RPG interfaces and Isekai aesthetics.

Users become characters in their own journey: every action in life becomes a quest, every habit a skill, every achievement a stat boost.

## 🌐 Tech Stack

- **Next.js (App Router)** — frontend framework
- **Tailwind CSS** — utility-first styling with custom tokens
- **Firebase** — authentication, Firestore and backend logic

## ✨ Main Features

- 🔐 Firebase Authentication
- 🧙‍♂️ Character Creation (Setup at first login)
- 🧠 Profile System with XP, Level, and Stats
- 🎯 Quest System (daily, weekly, repeatable, timeless)
- ⚔️ Stat bonuses based on quest difficulty
- 🎒 Inventory system (items, quantity, acquisition date)
- 📦 Global item collection `/items`
- 💎 Item modal with stats, rarity, expiration, and visual presentation
- 🧩 Theming System (dark mode by default)
- 📱 Gesture navigation (swipe between tabs)
- 💬 Modal-based UI with blur/glassmorphism styling

## 📁 Project Structure

```txt
src/
├── app/            # App Router structure (Next.js)
│   ├── (auth)/     # Login and auth-related routes
│   ├── (home)/     # Main app views (status, quests, inventory, etc)
│   └── (setup)/    # First-time setup (character creation)
├── components/     # Shared UI components (Header, Navbar, Modals...)
├── hooks/          # Reusable custom hooks (auth, user, quests...)
├── lib/            # Firebase init and feature logic (leveling, quests...)
├── styles/         # Tailwind CSS styling and tokens
├── types/          # Centralized TypeScript type definitions
└── config/         # System-wide config and dynamic rules
```

## 🧪 Development

```bash
yarn install
yarn dev
```

## 🚀 Deployment

OmniSekai is deployed and tested for **Vercel**, with zero-config deploy support.

## 🧭 Philosophy

OmniSekai is being built as a tool for:

- Personal self-improvement
- Interface design experimentation
- Aesthetic exploration (inspired by Genshin Impact, Tower of Fantasy, Apple Vision UI)
- Long-term extensibility as a modular gamified platform

> This project is in active development. Expect rapid iterations, visual polish, and evolving functionality.

---

Created with ❤️ by Gustavo Falcão

