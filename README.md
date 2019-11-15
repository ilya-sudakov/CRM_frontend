# Osfix - Фронтэнд

# Инструкция по установке
- После копирования репозитория необходимо создать файл 

        osfix-frontend/.env

    и заполнить его следующим образом:

    >API_BASE_URL = http://localhost:8080

    >ACCESS_TOKEN = accessToken

    >NODE_ENV = production

- Затем необходимо создать папку static/built, для этого выполните команду:

        npm run mkdir-built

- После этих действий в корне фронтэнд проекта osfix-frontend/ запустите команду:

        npm install

- После установки зависимостей, для запуска production версии, введите 
        
        npm run prod 
        
- Для запуска в режиме development, введите
        
        npm start