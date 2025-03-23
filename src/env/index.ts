import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

const nodeEnvAux = process.env.NODE_ENV;

// Limpa todas as variáveis de ambiente previamente definidas para evitar conflitos
/*if (nodeEnvAux !== "test" ) {
  Object.keys(process.env).forEach((key) => { delete process.env[key]; });
}
*/
const envPath = path.resolve(process.cwd(), './.env');
dotenv.config({ path: envPath });

const testDefaults = {
  NODE_ENV: "test",
  PORT: 3002,
  DATABASE_USER: "test_user",
  DATABASE_HOST: "localhost",
  DATABASE_NAME: ":memory:", 
  DATABASE_PASSWORD: "",
  DATABASE_PORT: "",
  JWT_SECRET: "test_secret",
};


const environment =
  process.env.NODE_ENV === "test"
    ? { ...testDefaults, ...process.env } 
    : {
        ...process.env,
        DATABASE_HOST:
          process.env.NODE_ENV === "docker"
            ? "db" 
            : process.env.DATABASE_HOST,
      };

 
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().default(3002),
  DATABASE_USER: z.string().optional(),
  DATABASE_HOST: z.string().optional(),
  DATABASE_NAME: z.string(),
  DATABASE_PASSWORD: z.string().optional(),
  DATABASE_PORT: z.coerce.number().optional(),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(environment);

if (!_env.success) {
  console.error("Variáveis de ambiente inválidas:", _env.error.format());
  throw new Error("Variáveis de ambiente inválidas");
}

export const env = _env.data;