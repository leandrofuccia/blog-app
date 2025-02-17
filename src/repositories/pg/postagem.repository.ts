import { database } from "@/lib/pg/db";
import { IPostagemRepository } from "../postagem.repository.interface";
import { IPostagem } from "@/entities/models/postagem.interface";
import { IUsuario } from "@/entities/models/usuario.interface";

export class PostagemRepository implements IPostagemRepository {
    
    public async findPostagemByUsuarioId(
        usuarioId: number, 
        page: number, 
        limit: number,
     ): Promise<(IPostagem & IUsuario)[]> {
        
        const offset = (page - 1 ) * limit

        const query = `
            SELECT postagem.*, usuario.*
            FROM postagem
            JOIN usuario on postagem.usuarioid = usuario.id
            WHERE usuario.id = $1
            LIMIT $2 OFFSET $3

        `        
        const result = await database.clientInstance?.query<IPostagem & IUsuario>(
            query, [
            usuarioId,
            limit,
            offset,
        ])

        return result?.rows || []
    }
    
    
    
    public async create({ titulo, conteudo, usuarioid }: IPostagem): Promise<IPostagem | undefined> {
        const result = await database.clientInstance?.query<IPostagem>(
            'INSERT INTO "postagem" (titulo, conteudo, usuarioid) VALUES($1, $2, $3) RETURNING *',
            [titulo, conteudo, usuarioid]
        );
        return result?.rows[0];
    }

    public async update (
        id: number, 
        titulo: string, 
        conteudo: string,
     ): Promise<IPostagem | undefined > {

        const result = await database.clientInstance?.query<IPostagem>(
            'UPDATE public.postagem SET titulo = $1, conteudo = $2, dataatualizacao = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
            [titulo, conteudo, id]
        );
        
        return result?.rows[0];
    }


    public async delete(
        id: number
    ): Promise<IPostagem | undefined> {
    
        const result = await database.clientInstance?.query<IPostagem>(
            'DELETE FROM postagem WHERE id = $1 RETURNING *',
            [id]
        );
    
        return result?.rows[0];
    } 
    
    
    public async findPostagemById(
        id: number, 
        page: number, 
        limit: number,
     ): Promise<(IPostagem)[]> {
        
        const offset = (page - 1 ) * limit

        const query = `
            SELECT *
            FROM postagem
            WHERE id = $1
            LIMIT $2 OFFSET $3

        `        
        const result = await database.clientInstance?.query<IPostagem>(
            query, [
            id,
            limit,
            offset,
        ])

        return result?.rows || []
    }


    
    public async findPostagemBySearch(
        palavrasChave: string, 
        page: number, 
        limit: number,
     ): Promise<(IPostagem)[]> {

        const offset = (page - 1 ) * limit

        const query = `
            SELECT *
            FROM postagem
            WHERE conteudo ILIKE $1
            OR titulo ILIKE $1; `        

        const result = await database.clientInstance?.query<IPostagem>(
            query, [`%${palavrasChave}%`])

        return result?.rows || []
    }


    public async findPostagem(
        page: number, 
        limit: number,
     ): Promise<(IPostagem)[]> {
        
        const offset = (page - 1 ) * limit

        const query = `
            SELECT *
            FROM postagem
            LIMIT $1 OFFSET $2

        `        
        const result = await database.clientInstance?.query<IPostagem>(
            query, [
            limit,
            offset,
        ])

        return result?.rows || []
    }

    

}    



