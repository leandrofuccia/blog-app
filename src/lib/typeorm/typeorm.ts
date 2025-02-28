import { DataSource } from "typeorm";

import { env } from '@/env';

import { Usuario } from "@/entities/usuario.entity";
import { Postagem } from "@/entities/postagem.entity";
import { Credencial } from "@/entities/credencial.entity";

export const appDataSource = new DataSource({
    type: env.NODE_ENV === "test" ? "sqlite" : "postgres",
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.NODE_ENV === "test" ? ":memory:" : env.DATABASE_NAME,
    entities: [Usuario, Postagem, Credencial],
    logging: env.NODE_ENV === 'development',
})


appDataSource
.initialize()
.then(() => {
    console.log('Database with typeorm connected')
})
.catch((error) => {
    console.error('Error connecting to database with typeorm', error)
})