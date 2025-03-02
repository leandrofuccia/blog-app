import 'dotenv/config';
import { z } from 'zod';

// Definir valores padrão para ambiente de teste
const testDefaults = {
  NODE_ENV: 'test',
  PORT: 3002,
  DATABASE_USER: 'test_user',
  DATABASE_HOST: 'localhost',
  DATABASE_NAME: 'test_db',
  DATABASE_PASSWORD: 'test_password',
  DATABASE_PORT: 5432,
  JWT_SECRET: 'test_secret',
};

// Aplicar os valores padrão apenas para o ambiente de teste
const environment = process.env.NODE_ENV === 'test' 
  ? { ...testDefaults, ...process.env } 
  : process.env;

// Definir esquema de validação das variáveis de ambiente
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3002),
  DATABASE_USER: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
});

// Validar as variáveis de ambiente
const _env = envSchema.safeParse(environment);

if (!_env.success) {
  console.error('Invalid environment variables', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
