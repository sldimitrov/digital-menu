# 🍔 Digital Menu System – Developer & Agent README

## 📌 Overview

This project is a **Digital Menu Platform for restaurants**, built with:

* **Frontend:** React (Vite) + MUI + SCSS
* **Backend:** Django + Django REST Framework
* **State/Data:** (planned) TanStack Query + optional Zustand

The system is designed to be:

* Multi-tenant (multiple restaurants)
* Scalable into a SaaS product
* Extendable (orders, bookings, analytics)

---

## 🧠 Architecture

### High-Level

```
Client (QR Scan)
   ↓
React App (Menu UI)
   ↓
Django REST API
   ↓
PostgreSQL
```

---

## 📁 Project Structure

### Frontend (React)

```
src/
├── api/                # API calls (fetch wrappers)
├── components/         # Reusable UI components
├── features/           # Domain features (menu, categories, items)
├── hooks/              # Custom hooks
├── pages/              # Route-level pages
├── store/              # Zustand (if used)
├── styles/             # SCSS global styles
├── theme/              # MUI theme config
└── utils/              # Helpers
```

---

### Backend (Django)

```
backend/
├── apps/
│   ├── restaurants/
│   ├── menu/
│   └── users/
├── config/
├── api/
├── core/
└── manage.py
```

---

## 🧩 Core Domain Models

* Restaurant
* Category
* MenuItem
* ModifierGroup
* Modifier

All models must support **multi-tenant isolation** via `restaurant_id`.

---

## 🔌 API Design Rules (STRICT)

### 1. Aggregated Menu Endpoint

```
GET /api/menu/{restaurant_slug}
```

Returns full menu:

```json
{
  "restaurant": {},
  "categories": [
    {
      "id": 1,
      "name": "Burgers",
      "items": []
    }
  ]
}
```

### 2. No Over-fetching

* Do NOT create endpoints that require multiple client calls to render menu
* Prefer **nested/aggregated responses**

### 3. Naming Conventions

* snake_case (backend)
* camelCase (frontend)

---

## 🎨 Frontend Guidelines (STRICT)

### Component Rules

* Components must be:

  * Reusable
  * Stateless when possible
  * UI-focused (no heavy logic)

### Example:

* `MenuPage` → orchestrates data
* `CategoryTabs` → UI only
* `MenuItemCard` → UI only
* `ItemModal` → controlled component

---

### Styling

* Use **MUI for structure**
* Use **SCSS for overrides and custom styling**
* Avoid inline styles unless dynamic

---

## ⚡ State Management Strategy

### Current (MVP)

* Local state (React)

### Future

* **TanStack Query → server state**
* Zustand → client/global state (if needed)

---

## 🔁 Data Fetching Rules

* All API calls go through `/api/` layer
* No direct fetch inside components
* Use hooks:

```
useMenu(restaurantSlug)
```

---

## 🧪 Environment Setup

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
pip install -r requirements.txt
python manage.py runserver
```

---

## 🔐 Auth (Future Scope)

* Admin panel will use JWT auth
* Client menu is public (no auth)

---

## 📲 QR Routing Strategy

Each restaurant has:

```
/menu/{slug}
```

Example:

```
/menu/byroad
```

---

## 🧠 Agent Instructions (IMPORTANT)

### When generating code:

1. ALWAYS follow project structure
2. NEVER duplicate logic across components
3. ALWAYS reuse existing components/hooks if possible
4. DO NOT introduce new libraries without justification
5. KEEP components small and composable
6. API calls must go through centralized layer

---

### When modifying backend:

* Preserve response shape (backward compatibility)
* Avoid breaking frontend contracts
* Use serializers properly (DRF)

---

### When modifying frontend:

* Do NOT fetch inside UI components
* Do NOT mix business logic with presentation
* Prefer composition over large components

---

## 🚀 Future Extensions

* Ordering system
* Table management
* Booking system
* Analytics dashboard
* Multi-language support
* Theming (white-label SaaS)

---

## ⚠️ Anti-Patterns (DO NOT DO)

* ❌ Hardcoding menu data
* ❌ Tight coupling between UI and API
* ❌ Multiple API calls for same data
* ❌ Large monolithic components
* ❌ Ignoring multi-tenant structure

---

## 🧭 Product Direction

This is not just a digital menu.

This is:

> A foundation for a full restaurant operating system.

---

## 👨‍💻 Maintainer Notes

* Optimize for speed → ship MVP fast
* Refactor only when necessary
* Prioritize real-world usage over perfection

---
