### Architecture: [wiki](https://github.com/RippinPosse/limpid-subsidies/wiki/Architecture)

### Реализованная функциональность:
- Регистрация и авторизация пользователя
- Создание аккауна в сети блокчейн
- Возможность получения уведомлений на почту
- Создание заявки на субсидию

### Особенность проекта в следующем:
- Использование сети блокчейн для ведения процесса подачи завяления 
- Открытость и прозрачность
- Возможность наблюдать за публичными завяками других людей
- Возможность получать уведомления ою оюновлении своих и чужих заявок

### Основной стек технологий:
- JavaScript, Solidity
- Ethereum
- PostgreSQL
- Docker
- React

### Среда запуска
1. Требуется установленный docker
2. Требуется установленный docker-compose
3. Требуется заполненный файл переменных окружения `.env` в корне проекта:

```
# common
API_PORT=5000
CLIENT_PORT=3000
HOOKS_PORT=8000 

# blockchain credentials
ETH_URL=

# database credentials
DATABASE_URL=

POSTGRES_DB=
POSTGRES_PORT=5432
POSTGRES_USER=
POSTGRES_PASSWORD=

# security
TOKEN_KEY=

# hooks credentials
PUBLIC_VAPID_KEY=
PRIVATE_VAPID_KEY=

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
```

### Запуск
```console
docker-compose up --build
```

### Разработчик: Алексей Садкович https://t.me/ASadkovich
