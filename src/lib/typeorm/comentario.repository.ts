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
               
    async findComentarioByPostagemId(postagemId: number, page: number, limit: number): Promise<(IComentario & IPostagem)[]> {
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