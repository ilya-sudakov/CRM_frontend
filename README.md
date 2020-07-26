# Система управления для малого предприятия - Фронтенд

# Инструкция по установке

- После копирования репозитория необходимо создать файл

        /.env

  и заполнить его следующим образом:

  > API_BASE_URL = http://localhost:port

  > ACCESS_TOKEN = accessToken

  > NODE_ENV = production

  > INN_TOKEN = INNToken

- Затем необходимо создать папку static/built, для этого выполните команду (Windows):

        npm run mkdir-built

- После этих действий в корне фронтэнд проекта / запустите команду:

        npm install

- После установки зависимостей, для запуска production версии, введите
  npm run prod
- Для запуска в режиме development, введите
  npm start
