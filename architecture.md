# Архитектура TrustClinic 
<<<<<<< HEAD
=======

>>>>>>> 86dba1f (Lab 8 solution by student 8)
## 1) Что это за система

TrustClinic — **сайт диагностики** на React + TypeScript.

- Серверной части в репозитории **нет**.
- Авторизация и «сохранение результатов» реализованы **локально** через `localStorage` / `sessionStorage`.
- Диагностика — набор фиксированных вопросов в чат‑формате и простое правило расчёта риска.

## 2) Структура репозитория

```
TrustClinic/
├── README.md
├── architecture.md
├── mvp.md
├── frontend/                    # Основное приложение (Vite + React)
│   ├── package.json
│   ├── vite.config.ts           # Алиас на shared-components/src + дедуп React
│   ├── tailwind.config.js
│   └── src/
│       ├── App.tsx
│       ├── routes.tsx           # React Router маршруты
│       ├── context/
│       │   └── AuthContext.tsx  # Локальная «авторизация» и хранилище результатов
│       ├── pages/
│       │   ├── HomePage.tsx
│       │   ├── AboutPage.tsx
│       │   ├── LoginPage.tsx
│       │   ├── RegisterPage.tsx
│       │   ├── DiagnosisPage.tsx
│       │   ├── ProfilePage.tsx
│       │   └── NotFoundPage.tsx
│       ├── components/
│       │   ├── Layout/
│       │   ├── DiagnosisChat/
│       │   └── ResultView/
│       └── styles/
│           └── globals.css
│
└── shared-components/           # Библиотека UI-компонентов (Rollup)
    ├── package.json
    ├── rollup.config.js
    └── src/
        ├── index.ts
        └── components/
            ├── Button/
            ├── Input/
            ├── ChatBubble/
            ├── ChatContainer/
            ├── OptionButtons/
            ├── StepIndicator/
            ├── TypingIndicator/
            ├── Loader/
            ├── Modal/
            └── Capsule/         # 3D-компонент (react-three-fiber + three)
```

## 3) Технологический стек 

### Frontend (`frontend/`)

- **React / React DOM:** `^19.2.3`
- **React Router DOM:** `^7.10.1`
- **Vite:** `^7.2.7`
- **TypeScript:** `^5.9.3`
- **Tailwind CSS:** `^4.1.18` (подключение через `@tailwindcss/vite`)
- **3D:** `@react-three/fiber ^9.4.2` + `three ^0.182.0`
- **Тесты:** Jest `^30.2.0` + Testing Library (`@testing-library/react`, `@testing-library/jest-dom`)

### Shared Components (`shared-components/`)

- Сборка: **Rollup** `^4.53.3` + `rollup-plugin-postcss`
- Peer dependencies: `react`, `react-dom`, `@react-three/fiber`, `three` (чтобы не тащить дубли в приложение)
- Тесты: Jest `^30.2.0` + Testing Library

## 4) Рантайм‑архитектура и границы модулей

### Роутинг

Роуты объявлены в `frontend/src/routes.tsx`:

- `/` → `HomePage`
- `/about` → `AboutPage`
- `/login` → `LoginPage`
- `/register` → `RegisterPage`
- `/diagnosis` → `DiagnosisPage` (чат диагностики)
- `/diagnosis/result` → `DiagnosisPage` (экран результата)
- `/profile` → `ProfilePage`
- `*` → `NotFoundPage`

Все страницы обёрнуты в общий `Layout` (шапка/навигация) через `<Route element={<Layout/>}>`.

### Контекст авторизации и данных

`AuthContext` (файл `frontend/src/context/AuthContext.tsx`) — единая точка:

- `user`, `token`, `isAuthenticated`, `loading`
- методы: `login`, `register`, `logout`
- методы для результатов: `saveResult`, `getResults`

Ключевой момент: **логин/регистрация — имитация** (mock), без HTTP-запросов.

### Интеграция `shared-components` в приложении

В `vite.config.ts` настроен алиас:

- `"shared-components" → ../shared-components/src`

и одновременно включён `dedupe` для React, чтобы избежать конфликтов версий при локальной разработке библиотеки.

## 5) Данные и хранение (реальные ключи)

### localStorage

- `authToken` — строка вида `mock-jwt-token-<timestamp>`
- `authUser` — JSON пользователя `{ id, email, name }`
- `diagnosisResults` — JSON массива результатов диагностики

### sessionStorage

- `lastResult` — JSON одного результата для экрана `/diagnosis/result`

> Экран результата читает **только** `sessionStorage.lastResult`.  
> История в профиле берётся из `localStorage.diagnosisResults` и при выборе «Подробнее» выбранный результат записывается в `sessionStorage.lastResult`.

## 6) Подсистема диагностики

### Сценарий

`DiagnosisChat`:

- хранит `step`, `messages`, `answers`
- показывает вопрос → пользователь выбирает вариант
- добавляет сообщение пользователя, имитирует «печать» (`TypingIndicator`) и через `700ms` задаёт следующий вопрос
- после последнего вопроса вызывает `finalizeDiagnosis()`:
  - считает риск
  - сохраняет результат в `localStorage` через `saveResult()`
  - сохраняет `lastResult` в `sessionStorage`
  - переходит на `/diagnosis/result`

### Вопросы

В коде ровно **10 вопросов**, варианты ответов заданы статически в массиве `questions`.

### Расчёт риска (как реализовано)

Функция `calculateRisk(answers)` использует простые правила:

- если **«затруднённое дыхание = Сильно»** *или* **«боль = Грудь»** → риск `85%`, рекомендация «немедленно обратитесь к врачу»
- иначе если **«температура = Выше 38»** → риск `55%`, рекомендация «консультация врача»
- иначе → риск `15%`, рекомендация «отдых и наблюдение»

## 7) Shared UI Components

Компоненты библиотеки (папка `shared-components/src/components`):

- `Button`, `Input`
- `ChatContainer`, `ChatBubble`
- `OptionButtons` (кнопки вариантов)
- `StepIndicator`
- `TypingIndicator`
- `Loader`
- `Modal`
- `Capsule` (3D, используется на главной странице)

Стили — через локальные `*.css` в каждой папке компонента (и сборка CSS через Rollup).

## 8) Сборка, линт, тесты

### Frontend

Команды (`frontend/package.json`):

- `npm run dev` — запуск Vite dev server
- `npm run build` — `tsc` + `vite build`
- `npm run lint` / `lint:fix`
- `npm run test` / `test:coverage`

Покрытие тестами: глобальный threshold **80%** (branches/functions/lines/statements).

### Shared-components

Команды (`shared-components/package.json`):

- `npm run build` — сборка Rollup в `dist/`
- `npm run lint` / `lint:fix`
- `npm run test` / `test:coverage`

Покрытие тестами: глобальный threshold **90%**.

---

