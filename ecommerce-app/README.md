# Lion E-Commerce

## Commands

`yarn prisma:migrate:create`

- Create migrations
- It will run a CLI questionnaire, name your migrations accordingly, a timestamp will be automatically added in.

`yarn prisma:migrate:run`

- Run migrations
- This command will run all migrations, and figure out what is needed

`yarn prisma:migrate:drop`

- Drop DB and reset
- This command will drop the current DB and will run the migrations again

`yarn prisma:migrate:push`

- Push schema
- This command will push the current schema modifications without creating a migration. (This isn't recommended on prod)

`yarn prisma:check`

- CI Check
- This command will check for errors in your .prisma files, used for CI

`yarn prisma:format`

- Format
- This command will check for errors and fix them
