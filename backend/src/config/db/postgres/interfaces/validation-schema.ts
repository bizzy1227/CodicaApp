import { PostgresHost, PostgresPort } from '../types';

export interface ValidationSchema {
  POSTGRES_HOST: PostgresHost;
  POSTGRES_PORT: PostgresPort;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
}