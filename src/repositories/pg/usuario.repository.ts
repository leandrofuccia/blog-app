import { database } from "@/lib/pg/db";
import { IUsuarioRepository } from "../usuario.repository.interface";
import { IUsuario } from "@/entities/models/usuario.interface";

export class UsuarioRepository implements IUsuarioRepository {
    public async create({ nome, email, senha, perfilid }: IUsuario): Promise<IUsuario | undefined> {
        const result = await database.clientInstance?.query<IUsuario>(
            'INSERT INTO "usuario" (nome, email, senha, perfilid) VALUES($1, $2, $3, $4) RETURNING *',
            [nome, email, senha, perfilid]
        );
        return result?.rows[0];
    }
}
    
    

    