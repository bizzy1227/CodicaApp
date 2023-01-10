import { registerAs } from '@nestjs/config';

export const TOKEN = 'postgres';

export const configuration = registerAs(TOKEN, () => ({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
}));