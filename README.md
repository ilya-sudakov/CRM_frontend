# Система управления для малого предприятия - Фронтенд [![codecov](https://codecov.io/gh/ilyasudakov/osfix_erp_frontend/branch/master/graph/badge.svg?token=V42H3BD550)](https://codecov.io/gh/ilyasudakov/osfix_erp_frontend) <a href="https://codeclimate.com/github/ilyasudakov/osfix_erp_frontend/maintainability"><img src="https://api.codeclimate.com/v1/badges/4caebb62502ad174f310/maintainability" /></a>
# Инструкция по установке

- После копирования репозитория необходимо создать файл

        /.env

  и заполнить его следующим образом:

        API_BASE_URL = http://localhost:port
        ACCESS_TOKEN = accessToken
        NODE_ENV = production
        INN_TOKEN = INNToken


- Затем необходимо создать папку static/built, для этого выполните команду (Windows):

        npm run mkdir-built

- Для остальных платформ - необходимо вручную создать папку:

        /src/main/resources/static/build

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

