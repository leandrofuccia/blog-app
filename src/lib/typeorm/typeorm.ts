import { DataSource } from "typeorm";
import { env } from "@/env";
import { Usuario } from "@/entities/usuario.entity";
import { Postagem } from "@/entities/postagem.entity";
import { Credencial } from "@/entities/credencial.entity";
import path from "path";
import dotenv from "dotenv";
import { Perfil } from "@/entities/perfil.entity";

// Determina o caminho do arquivo .env com base no NODE_ENV
const envFilePath = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
const envPath = path.resolve(process.cwd(), envFilePath);
dotenv.config({ path: envPath });

// Determina o host do banco dependendo do ambiente
const databaseHost =
  env.NODE_ENV === "test"
    ? "localhost" // Define 'localhost' no ambiente de teste
    : env.DATABASE_HOST || (process.env.DOCKER_ENV ? "db" : "localhost");

   
// Configuração do DataSource
export const appDataSource = new DataSource({
  type: env.NODE_ENV === "test" ? "sqlite" : "postgres",
  host: databaseHost,
  port: env.NODE_ENV === "test" ? undefined : Number(env.DATABASE_PORT) || 5432,
  username: env.NODE_ENV === "test" ? undefined : env.DATABASE_USER || "blogdb",
  password: env.NODE_ENV === "test" ? undefined : env.DATABASE_PASSWORD || "sua_senha_segura",
  database: env.NODE_ENV === "test" ? ":memory:" : env.DATABASE_NAME || "blogdb",
  entities: [Perfil, Usuario, Postagem, Credencial],
  logging: env.NODE_ENV === "development",
  synchronize: env.NODE_ENV !== "production",
  migrations: env.NODE_ENV === "production"
  ? ["build/migrations/*.js"]   
  : env.NODE_ENV !== "test"
  ? ["src/migrations/*.ts"]       
  : [],       
});

// Função para inicializar o banco de dados
export async function initializeDatabase(): Promise<void> {
  try {
    console.log("Database Config:", {
      host: databaseHost,
      port: env.DATABASE_PORT,
      username: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
    });

    console.log("Conectando ao banco...");

    await appDataSource.initialize();
    if (env.NODE_ENV !== "test") {
      console.log("Database conectado com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
}

// Função para fechar a conexão com o banco de dados
export async function closeDatabase(): Promise<void> {
  try {
    if (appDataSource.isInitialized) {
      await appDataSource.destroy();
      if (env.NODE_ENV !== "test") {
        console.log("Database desconectado com sucesso.");
      }
    }
  } catch (error) {
    console.error("Erro ao desconectar do banco de dados:", error);
  }
}
