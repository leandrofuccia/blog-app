import { Comentario } from "@/entities/comentario.entity"
import { IComentario, IComentarioRepository } from "@/repositories/comentario.repository.interface"
import { Repository } from "typeorm"
import { appDataSource } from "./typeorm"
import { IPostagem } from "@/entities/models/postagem.interface"

export class ComentarioRepository implements IComentarioRepository{
    
    private repository: Repository<Comentario>
   
    constructor(){
        this.repository = appDataSource.getRepository(Comentario)
    }

    async create(comentario: IComentario): Promise<IComentario> {
      return this.repository.save(comentario)
          
    }  
               
    /*async findComentarioByPostagemId(postagemId: number, page: number, limit: number): Promise<(IComentario & IPostagem)[]> {
        const offset = (page - 1) * limit;
        const queryBuilder = this.repository.createQueryBuilder("comentario")
            .leftJoinAndSelect("comentario.postagem", "postagem") 
            .where("comentario.postid = :postId", { postId: postagemId })
            .orderBy("comentario.datacriacao", "DESC")
            .skip(offset)
            .take(limit);
          
            const comentario = await queryBuilder.getMany();
               
            return comentario.map(comentario => {
              return {
                  ...comentario,
                  postagem: {
                      id: comentario.postid,
                      titulo: comentario.postagem.titulo,
                      conteudo: comentario.postagem.conteudo,
                      autor: comentario.postagem.usuarioid                  
                  }
                } as unknown as IComentario & IPostagem;
            });
        }*/

    async findComentarioByPostagemId(postagemId: number, page: number, limit: number): Promise<any[]> {
    const offset = (page - 1) * limit;

    const queryBuilder = this.repository
        .createQueryBuilder("comentario")
        .leftJoinAndSelect("comentario.postagem", "postagem")
        .leftJoin("comentario.curtidas", "curtida") // Join com a tabela de curtidas
        .loadRelationCountAndMap("comentario.curtidasCount", "comentario.curtidas") 
        .where("comentario.postid = :postId", { postId: postagemId })
        .groupBy("comentario.id")
        .addGroupBy("postagem.id") // Necessário porque usamos `Select` com campos da postagem
        .addGroupBy("postagem.titulo")
        .addGroupBy("postagem.conteudo")
        .addGroupBy("postagem.usuarioid")
        .orderBy("comentario.datacriacao", "DESC")
        .skip(offset)
        .take(limit)
        .select([
        "comentario.id",
        "comentario.conteudo",
        "comentario.nome_autor",
        "comentario.datacriacao",
        "comentario.usuarioid",
        "comentario.postid",
        "postagem.id",
        "postagem.titulo",
        "postagem.conteudo",
        "postagem.usuarioid",
        "COUNT(curtida.id) AS curtidasCount", // Agregado
        ]);
    
    const comentariosComCurtidas = await queryBuilder.getRawMany();
    // Reformatar os dados agregados
    comentariosComCurtidas.map(raw => ({
            id: raw.comentario_id,
            conteudo: raw.comentario_conteudo,
            nome_autor: raw.comentario_nome_autor,
            datacriacao: raw.comentario_datacriacao,
            usuarioid: raw.comentario_usuarioid,
            postid: raw.comentario_postid,
            curtidasCount: Number(raw.curtidasCount ?? 0), // <-- aqui a correção
            postagem: {
            id: raw.postagem_id,
            titulo: raw.postagem_titulo,
            conteudo: raw.postagem_conteudo,
            autor: raw.postagem_usuarioid
            }
        }));
        return comentariosComCurtidas;
    }
        


    async delete (id: number): Promise<void>{
        await this.repository.delete(id)
    } 
    
    async comentarioCount(id: number): Promise<number> {
        return await this.repository.count({
                where: {
                postid: id
            }
        });
    }
        
}