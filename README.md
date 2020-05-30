# CRM для малого предприятия - Фронтенд

# Инструкция по установке
- После копирования репозитория необходимо создать файл 

        /.env

    и заполнить его следующим образом:

    >API_BASE_URL = http://localhost:1337

    >ACCESS_TOKEN = accessToken

    >NODE_ENV = production

    >INN_TOKEN = INNToken

    >FIREBASE_MESSAGING_SENDER_ID = 
    
    >FIREBASE_MESSAGING_WEB_PUSH_CERTIFICATE = 
    
    >FIREBASE_PROJECT_ID = 
    
    >FIREBASE_API_KEY = 
    
    >FIREBASE_APP_ID = 
    
    >FIREBASE_MEASUREMENT_ID = 

- Затем необходимо создать папку static/built, для этого выполните команду (Windows):

        npm run mkdir-built

- После этих действий в корне фронтэнд проекта / запустите команду:

        npm install

- После установки зависимостей, для запуска production версии, введите 
        
        npm run prod 
        
- Для запуска в режиме development, введите
        
        npm start