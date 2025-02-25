import { database } from "@/lib/pg/db";
import { IUsuarioRepository } from "../usuario.repository.interface";
import { IUsuario } from "@/entities/models/usuario.interface";

export class UsuarioRepository implements IUsuarioRepository {
    findByUsername(nome: string): Promise<IUsuario> {
        throw new Error("Method not implemented.");
    }
    
    public async create({ nome, perfilid, credencialId }: IUsuario): Promise<IUsuario | undefined> {
        const result = await database.clientInstance?.query<IUsuario>(
            'INSERT INTO "usuario" (nome, email, senha, perfilid, credencialId) VALUES($1, $2, $3, $4) RETURNING *',
            [nome, perfilid]
        );
        return result?.rows[0];
    }
}
    
    

    