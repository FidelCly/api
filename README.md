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
- `npm run lint` (`npm run lint -- --fix` to lint automatically)
- `npm run format`
- `npm run migrate <migration_destination>`
  - `<migration_destination>` should be `./src/migrations/<your_migration_name>` (see [Typeorm - Generating migrations](https://typeorm.io/migrations#generating-migrations))
- `npm run db:push`

### Introduce code changes

Before pushing your changes, you should: 

- Lint and format your code:
```
docker-compose run --rm web npm run format
docker-compose run --rm web npm run lint -- --fix
```

- Check that the tests still pass:
```
docker-compose run --rm web npm test
```

- IF the entities have been updated, generate a migration and apply it:
```
docker-compose run --rm web npm run migrate ./src/migrations/<your_migration>
docker-compose run --rm web npm run db:push
```
