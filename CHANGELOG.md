# 📜 OmniSekai – Changelog

Detailed log of all significant features and technical changes implemented in the OmniSekai project.
Each entry includes the date, version, technical notes, decisions made, and links to planned features.

---

## [v0.1.8] – 2025-04-24

### 🚀 First Public Deployment
- Version `v0.1.8` marks the first stable deployment of OmniSekai.
- All features from `v0.0.7` are live: skills, quests, XP, inventory, modals, and real-time UI.
- Release does not include code changes — version bump and deploy only.

---

## [v0.0.7] – 2025-04-24

### 🧠 Skill System (v1)
- Created `/users/{uid}/skills` subcollection with support for active and passive modes.
- Skills have `level`, `points`, and optional `duration` and `cooldown`.
- `useSkills()` hook returns real-time skills for current user.
- `SkillModal` shows details including cooldown, active status and progression.
- Skills can be activated with timers reflected in UI.
- Skill points awarded via quests using `rewardSkills`, which also trigger level-up.
- Header displays currently active skills with icon and circular time badge.

### 🎯 Quest Enhancements
- `AddQuestModal` redesigned with modular sections and dynamic inputs.
- Integrated `ItemSelectModal` and `SkillSelectModal` for visual multi-selection.
- Item and skill names are clickable, opening their respective modal views.
- `completeQuest()` now applies skill points with `giveSkillPoints()`.

### 🎁 Inventory & Modal Updates
- `ItemSelectModal` now supports quantity input with + / - buttons.
- AddQuestModal supports scrollable layout and avoids BottomNavbar overlap.
- Improved responsiveness and UX for all modals.

### 📄 Documentation & Config
- Updated `README.md` to reflect all current systems (skills, item selection, rewards).
- Updated `FEATURES.md` to include all v0.0.7 completed work.

---

## [v0.0.6] – 2025-04-23

### 💜 Inventory System (v1)
- Created global collection `/items` with `ItemData` including stats, rarity, expiration.
- Implemented `useItems()` to fetch all item definitions.
- Users now have a subcollection `/users/{uid}/inventory` with quantity and acquisition date.
- `Inventory` screen with RPG-style layout, responsive blocks and infinite scroll.
- Visual grouping of items by quantity, with empty slots rendered dynamically.
- `ItemModal` displays item details in a classic RPG format.

### ✨ Quest UI & Modularization
- Created `QuestCard` component for mission display.
- Quests now support multiple item rewards (`rewardItem: [{ itemId, quantity }]`).
- Clicking an item name in a quest opens the item modal.
- Updated `completeQuest()` to apply item rewards using `giveItemToUser()`.

### 🌐 General Improvements
- Refactored `useInventory()` to reflect subcollection in real time.
- Updated `FEATURES.md` to reflect accurate status.
- Created `ItemCard` with interactive visual support and modal trigger.

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

