# OmniSekai

**OmniSekai** is a modern, mobile-first, gamified personal development app inspired by RPG interfaces and Isekai aesthetics.

Users become characters in their own journey: every action in life becomes a quest, every habit a skill, every achievement a stat boost.

## 🌐 Tech Stack

- **Next.js (App Router)** — frontend framework
- **Tailwind CSS** — utility-first styling with custom tokens
- **Firebase** — authentication, Firestore and future backend logic

## ✨ Main Features

- 🔐 Firebase Authentication
- 🧙‍♂️ Character Creation (Setup at first login)
- 🧠 Profile System with XP, Level and Stats
- 🎯 Quest System (daily, weekly, one-time, repeatable)
- ⚔️ Skill and Stat Integration (per quest rewards)
- 🎒 Inventory (planned)
- 🧩 Theming System (dark mode as default)
- 📱 Gesture navigation (swipe between tabs)
- 💬 Modal-based UI with blur/glassmorphism style

## 📁 Project Structure

```
src/
├── app/            # App Router structure (Next.js 13+)
│   ├── (auth)/     # Login and auth-related routes
│   ├── (home)/     # Main app views (status, quests, etc)
│   └── (setup)/    # First-time setup (character creation)
├── components/     # Shared UI components (Header, Navbar, Modals...)
├── hooks/          # Reusable custom hooks (auth, user, quests...)
├── lib/            # Firebase initialization and helpers
├── styles/         # Global Tailwind styles and tokens
├── types/          # Centralized TypeScript types
└── config/         # App configuration or constants
```

## 🧪 Development

```bash
yarn install
yarn dev
```

## 🚀 Deployment

This project is built and tested for **Vercel**, with zero-config deploy support.

---

## 🧭 Philosophy

OmniSekai is being built as a tool for:

- Personal self-improvement
- Interface design exploration
- Aesthetic experimentation (inspired by Genshin / Tower of Fantasy / Apple Vision UI)
- Long-term extensibility as a modular platform

> This project is in active development. Expect rapid iterations, visual polish, and evolving functionality.

---

Created with ❤️ by Gustavo Falcão

