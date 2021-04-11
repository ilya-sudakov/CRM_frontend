# Система управления для малого предприятия - Фронтенд <a href="https://codeclimate.com/github/ilyasudakov/osfix_erp_frontend/maintainability"><img src="https://api.codeclimate.com/v1/badges/4caebb62502ad174f310/maintainability" /></a> <a href="https://codeclimate.com/github/ilyasudakov/osfix_erp_frontend/test_coverage"><img src="https://api.codeclimate.com/v1/badges/4caebb62502ad174f310/test_coverage" /></a>

## Общая документация

https://github.com/ilyasudakov/osfix_erp_frontend/wiki

## Storybook

https://ilyasudakov.github.io/osfix_erp_frontend/

# Инструкция по установке

- В корне проекта необходимо создать файл `.env` и заполнить его:

        API_BASE_URL = http://localhost:port
        NODE_ENV = production
        INN_TOKEN = INN_token

- Установите все зависимости и запустите проект:

        npm install
        npm start

# Основные команды

- Для запуска production версии с деплоем сгенерированных файлов к nginx:

        npm run webpack:prod

- Для запуска тестов:

        npm run test -- --silent

- Для просмотра test coverage:

        npm run test --  --silent --coverage --watchAll=false

- Для запуска dev Storybook:

        npm run storybook --no-dll

_При изменении stories файла/ов, Storybook автоматически билдится и выгружается в GHPages при Push'е коммита на GitHub с помощью GitHub Action_

# Библиотеки

### Фронтенд

- React 17
- Webpack 5
- Jest
- ESLint & Prettier
- SCSS, styled-components
- Storybook
- Axios
- Husky для pre-commit действий (linting&formatting)
- Github Actions

### Деплой на сервере

- NGINX
- Docker, docker-compose для LetsEncrypt [Еще не используется, но реализовано]
