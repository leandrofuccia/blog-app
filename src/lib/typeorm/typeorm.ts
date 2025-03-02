import { DataSource } from "typeorm";

import { env } from "@/env";
import { Usuario } from "@/entities/usuario.entity";
import { Postagem } from "@/entities/postagem.entity";
import { Credencial } from "@/entities/credencial.entity";

// Configuração do DataSource
export const appDataSource = new DataSource({
  type: env.NODE_ENV === "test" ? "sqlite" : "postgres",
  host: env.NODE_ENV !== "test" ? env.DATABASE_HOST : undefined,
  port: env.NODE_ENV !== "test" ? env.DATABASE_PORT : undefined,
  username: env.NODE_ENV !== "test" ? env.DATABASE_USER : undefined,
  password: env.NODE_ENV !== "test" ? env.DATABASE_PASSWORD : undefined,
  database: env.NODE_ENV === "test" ? ":memory:" : env.DATABASE_NAME,
  entities: [Usuario, Postagem, Credencial],
  logging: env.NODE_ENV === "development",
});

// Função para inicializar o banco de dados
export async function initializeDatabase(): Promise<void> {
  try {
    await appDataSource.initialize();
    if (env.NODE_ENV !== "test") {
      console.log("Database with TypeORM connected");
    }
  } catch (error) {
    console.error("Error connecting to database with TypeORM", error);
    throw error;
  }
}

// Função para fechar a conexão com o banco de dados
export async function closeDatabase(): Promise<void> {
  try {
    if (appDataSource.isInitialized) {
      await appDataSource.destroy();
      if (env.NODE_ENV !== "test") {
        console.log("Database with TypeORM disconnected");
      }
    }
  } catch (error) {
    console.error("Error disconnecting from the database", error);
  }
}
