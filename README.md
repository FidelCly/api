# api

## Run locally

```
docker-compose up
```

### Execute a command inside the container

```
docker-compose run --rm web <your-command>
```

### Available commands

- `npm start`
- `npm run build`
- `npm run test`
- `npm run typeorm`
- `npm run migrate <migration_destination>`
  - `<migration_destination>` should be `./src/migrations/ <your_migration_name>` (see [Typeorm - Generating migrations](https://typeorm.io/migrations#generating-migrations))
- `npm run db:push`
