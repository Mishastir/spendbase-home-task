# Block streaming service

## Before the start

### Packages

According to `.nvmrc` project works with node 22.4,
but any 18+ node should work fine

run `npm install`

### Environment

1. Create `.env` file as copy of `.env.example`
2. Set empty env variables with values

## Startup

### One (two) command startup

To start project via docker-compose use next command

```bash
docker-compose -f ./docker-compose.dev.yaml -p spendbase-home-task up -d
```

```bash
npx prisma migrate dev
```

### Separated startup
### Database

To start database use docker-compose

```bash
docker-compose -f ./docker-compose.dev.yaml -p spendbase-home-task up spendbase_home_task_psql -d
```

Apply prisma migrations

```bash
npx prisma migrate dev 
```

### Server

#### Docker

To start server via Docker use next commands (change exposed ports if needed)

```bash
docker build -t spendbase-home-task .
```

```bash
docker run -p 127.0.0.1:6010:6010 --env-file ./.env --env DATABASE_URL=postgresql://user:pass@host.docker.internal:5410/postgres spendbase-home-task
```

#### Dev mode

To start server in dev mode use next command

```bash
npm run start:dev
```

## Swagger

Swagger for project is [here](http://localhost:6010/docs)
