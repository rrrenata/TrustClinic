# Архитектура проекта TrustClinic

## Структура проекта

Проект состоит из двух модулей:

```
Clinic/
├── frontend/                    # Основное приложение
│   ├── src/
│   │   ├── components/          # Компоненты приложения
│   │   │   ├── DiagnosisChat/   # Чат диагностики
│   │   │   ├── Layout/          # Общий layout
│   │   │   └── ResultView/      # Отображение результата
│   │   ├── context/             # React контексты
│   │   │   └── AuthContext.tsx  # Контекст авторизации
│   │   ├── pages/               # Страницы приложения
│   │   │   ├── HomePage.tsx
│   │   │   ├── DiagnosisPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── services/            # Сервисы для работы с API
│   │   ├── styles/              # Глобальные стили
│   │   ├── App.tsx
│   │   ├── routes.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── eslint.config.js
│
├── shared-components/           # Библиотека общих компонентов
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── ChatBubble/
│   │   │   ├── ChatContainer/
│   │   │   ├── OptionButtons/
│   │   │   ├── StepIndicator/
│   │   │   ├── TypingIndicator/
│   │   │   ├── Loader/
│   │   │   └── Modal/
│   │   ├── styles/
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── rollup.config.js
│   └── eslint.config.js
│
├── architecture.md
├── mvp.md
└── README.md
```

## Используемые библиотеки

### Frontend (основное приложение)

| Библиотека | Версия | Назначение |
|------------|--------|------------|
| react | ^18.3.1 | UI библиотека |
| react-dom | ^18.3.1 | DOM рендеринг React |
| react-router-dom | ^6.28.0 | Маршрутизация |
| typescript | ^5.6.3 | Типизация |
| vite | ^5.4.11 | Сборщик |
| tailwindcss | ^3.4.15 | CSS фреймворк |
| eslint | ^9.14.0 | Линтер |
| jest | ^29.7.0 | Тестирование |
| @testing-library/react | ^16.0.1 | Тестирование React |

### Shared Components (библиотека компонентов)

| Библиотека | Версия | Назначение |
|------------|--------|------------|
| react | ^18.3.1 | Peer dependency |
| typescript | ^5.6.3 | Типизация |
| rollup | ^4.27.3 | Сборка библиотеки |
| eslint | ^9.14.0 | Линтер |
| jest | ^29.7.0 | Тестирование |
| @testing-library/react | ^16.0.1 | Тестирование React |

## Компоненты

### Shared Components

| Компонент | Назначение |
|-----------|------------|
| Button | Универсальная кнопка с вариантами стилей |
| Input | Поле ввода текста |
| ChatBubble | Сообщение в чате (от пользователя/бота) |
| ChatContainer | Контейнер для списка сообщений |
| OptionButtons | Кнопки выбора ответа |
| StepIndicator | Индикатор прогресса опроса |
| TypingIndicator | Анимация набора текста |
| Loader | Индикатор загрузки |
| Modal | Модальное окно |
| Capsule | Анимированная 3D-капсула для главной страницы |

### Frontend Components

| Компонент | Назначение |
|-----------|------------|
| Layout | Общий layout с навигацией |
| DiagnosisChat | Чат-интерфейс диагностики |
| ResultView | Отображение результата диагностики |

## Структура роутинга

| Путь | Страница | Описание |
|------|----------|----------|
| `/` | HomePage | Главная страница с описанием сервиса |
| `/login` | LoginPage | Страница входа |
| `/register` | RegisterPage | Страница регистрации |
| `/diagnosis` | DiagnosisPage | Страница с чатом диагностики |
| `/diagnosis/result` | DiagnosisPage | Результат диагностики |
| `/profile` | ProfilePage | Личный кабинет пользователя |
| `/about` | AboutPage | Информация о клинике |
| `*` | NotFound | Страница 404 |

## Авторизация

Используется JWT-токен, хранящийся в localStorage. AuthContext предоставляет:
- `user` — данные пользователя
- `isAuthenticated` — статус авторизации
- `login()` — функция входа
- `logout()` — функция выхода
- `saveProtectedData()` — отправка защищённых запросов
