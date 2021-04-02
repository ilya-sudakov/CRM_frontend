# Система управления для малого предприятия - Фронтенд <a href="https://codeclimate.com/github/ilyasudakov/osfix_erp_frontend/maintainability"><img src="https://api.codeclimate.com/v1/badges/4caebb62502ad174f310/maintainability" /></a> <a href="https://codeclimate.com/github/ilyasudakov/osfix_erp_frontend/test_coverage"><img src="https://api.codeclimate.com/v1/badges/4caebb62502ad174f310/test_coverage" /></a>

# Инструкция по установке

- После копирования репозитория необходимо создать файл

        /.env

  и заполнить его следующим образом:

        API_BASE_URL = http://localhost:port
        ACCESS_TOKEN = accessToken
        NODE_ENV = production
        INN_TOKEN = INNToken

- После этих действий в корне фронтэнд проекта / запустите команду:

        npm install

- После установки зависимостей, для запуска production версии, введите:

         npm run prod

- Для запуска в режиме development, введите:

        npm start

- Для запуска тестов, введите:

        npm run test -- --silent

- Для просмотра test coverage:

        npm run test --  --silent --coverage --watchAll=false

- Для запуска Storybook:

        npm run storybook --no-dll

- GH Pages Storybook: https://ilyasudakov.github.io/osfix_erp_frontend/
