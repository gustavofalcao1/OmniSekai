# 📜 OmniSekai – Changelog

Detailed log of all significant features and technical changes implemented in the OmniSekai project.
Each entry includes the date, version, technical notes, decisions made, and links to planned features.

---

## [v0.0.5] – 2025-04-20

### 🧩 Leveling System (XP & Rewards)
- Implemented `useSystemConfig` to fetch centralized config from `configs/system`.
- XP is now cumulative and governed by `xpRequirements` in config.
- Rewards automatically granted via `levelRewards` when level is increased.
- Created `applyLevelUpIfNeeded(profile, config, userId)` and passively called from `useUser`.
- Level up is now global and not tied to quest completion.

### ✅ Quest Completion Flow
- `completeQuest()` applies XP, stats, and items based on mission difficulty.
- XP and stat bonuses follow rules in `difficultyMultipliers`.
- Quests now have a `status` field; completed ones are marked as `complete` instead of being deleted.

### 🎨 UI Improvements
- XP progress bar in header uses dynamic data from config.
- Reorganized `FEATURES.md` with thematic categories for clarity.

---

## [v0.0.4] – 2025-04-19

### ✨ Core User Setup
- User creation flow `/start` with basic fields: name, level, XP, stats.
- Field validation on `useUser` with support for identifying missing data (`__missing`).
- Automatic redirect to `/start` if user data is incomplete.

### 🧠 Quest System (Initial Implementation)
- `AddQuestModal` to create quests with all properties (title, description, XP, stats, item).
- `useQuests()` hook built with live data from Firestore.
- Visual icons from `lucide-react` added dynamically by stat or quest type.

### 🛠 Infrastructure & Styling
- Firebase (Auth & Firestore) fully configured.
- TailwindCSS global setup with dark theme by default.
- BottomNavbar built with floating blur, Lucide icons, and responsive layout.

---

## [v0.0.3] – 2025-04-17

### 🌐 Navigation & Layout Foundation
- Basic route layout for `(home)`, `(auth)`, and `(setup)`.
- Added swipe gesture support between tabs with `useSwipeNavigation`.
- Disabled gesture when modal is open via dynamic state control.
- Global mobile-first structure aligned with app shell model.

---

## [v0.0.2] – 2025-04-15

### 🔐 Auth & Session Management
- Created `useAuth` for protected route logic and current user management.
- Implemented Firebase Auth email/password login.
- Redirect on login and logout behavior finalized.

---

## [v0.0.1] – 2025-04-14

### 🧪 Project Initialization
- Initialized Next.js project with App Router and TailwindCSS.
- Basic page structure created for `/login` and `/`.
- Deployed first working build to Vercel.
- Project vision, structure, and long-term planning drafted.
