import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

const nodeEnvAux = process.env.NODE_ENV;

// Limpa todas as variáveis de ambiente previamente definidas para evitar conflitos
if (nodeEnvAux !== "test" ) {
  Object.keys(process.env).forEach((key) => { delete process.env[key]; });
}

// Carrega as variáveis do arquivo .env com o caminho absoluto
const envPath = path.resolve(process.cwd(), './.env');
dotenv.config({ path: envPath });

console.log("Variáveis de ambiente carregadas:", process.env);

// Define valores padrão para ambiente de teste
const testDefaults = {
  NODE_ENV: "test",
  PORT: 3002,
  DATABASE_USER: "test_user",
  DATABASE_HOST: "localhost",
  DATABASE_NAME: ":memory:", // Banco em memória para testes
  DATABASE_PASSWORD: "",
  DATABASE_PORT: "",
  JWT_SECRET: "test_secret",
};


// Determina o ambiente final com base no NODE_ENV
const environment =
  process.env.NODE_ENV === "test"
    ? { ...testDefaults, ...process.env } // Mescla defaults de teste com as variáveis carregadas
    : {
        ...process.env,
        DATABASE_HOST:
          process.env.NODE_ENV === "docker"
            ? "db" // Host especial para Docker
            : process.env.DATABASE_HOST,
      };

// Define o esquema de validação para as variáveis de ambiente
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

// Valida e aplica os valores das variáveis de ambiente
const _env = envSchema.safeParse(environment);

if (!_env.success) {
  console.error("Variáveis de ambiente inválidas:", _env.error.format());
  throw new Error("Variáveis de ambiente inválidas");
}

// Log das variáveis finais para depuração
console.log("Variáveis de ambiente validadas:", _env.data);

// Exporta as variáveis para uso na aplicação
export const env = _env.data;



/*import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

let env: any; // Declara a variável no escopo global

(async () => {
  const nodeEnvAux = process.env.NODE_ENV;

  // Limpa todas as variáveis de ambiente previamente definidas para evitar conflitos
  if (nodeEnvAux !== "test") {
    Object.keys(process.env).forEach((key) => {
      delete process.env[key];
    });
  }

  // Carrega as variáveis do arquivo .env com o caminho absoluto
  const envPath = path.resolve(process.cwd(), "./.env");
  dotenv.config({ path: envPath });

  // Define valores padrão para ambiente de teste
  const testDefaults = {
    NODE_ENV: "test",
    PORT: 3002,
    DATABASE_USER: "test_user",
    DATABASE_HOST: "localhost",
    DATABASE_NAME: ":memory:", // Banco em memória para testes
    DATABASE_PASSWORD: "",
    DATABASE_PORT: "",
    JWT_SECRET: "test_secret",
  };

  // Determina o ambiente final com base no NODE_ENV
  const environment =
    process.env.NODE_ENV === "test"
      ? { ...testDefaults, ...process.env } // Mescla defaults de teste com as variáveis carregadas
      : {
          ...process.env,
          DATABASE_HOST:
            process.env.NODE_ENV === "docker"
              ? "db" // Host especial para Docker
              : process.env.DATABASE_HOST,
        };

  // Define o esquema de validação para as variáveis de ambiente
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

  // Valida e aplica os valores das variáveis de ambiente
  const _env = envSchema.safeParse(environment);

  if (!_env.success) {
    console.error("Variáveis de ambiente inválidas:", _env.error.format());
    throw new Error("Variáveis de ambiente inválidas");
  }

  // Log das variáveis finais para depuração
  console.log("Variáveis de ambiente validadas:", _env.data);

  // Atribui o valor validado ao escopo global
  env = _env.data;
})();

export { env }; // Agora a variável é exportada corretamente
*/
