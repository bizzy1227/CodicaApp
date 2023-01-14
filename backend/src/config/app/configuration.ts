import { registerAs } from '@nestjs/config';

export const TOKEN = 'app';

export const configuration = registerAs(TOKEN, () => ({
  port: process.env.APP_PORT,
  apiKey: process.env.APP_API_KEY,
}));
