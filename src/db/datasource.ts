// ...existing code from previous location will be moved here...
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({

  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
   entities: [
    __dirname + '/db/entity/*.ts', // make sure Profile.entity.ts is here
    __dirname + '/db/entity/*.js', // after build
  ],
  migrations: ['src/db/migration/*.ts'],
});





// generate migration command
// npx typeorm migration:generate src/api/db/migration/<MigrationName>

// run migration command
// npx typeorm migration:run
