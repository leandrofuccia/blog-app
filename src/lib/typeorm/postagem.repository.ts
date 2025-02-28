
import { Repository } from "typeorm";
import { appDataSource } from "./typeorm";

import { Postagem } from "@/entities/postagem.entity";
import { IPostagem } from "@/entities/models/postagem.interface";

import { IUsuario } from "@/entities/models/usuario.interface";
import { IPostagemRepository } from "@/repositories/postagem.repository.interface";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export class PostagemRepository implements IPostagemRepository{
    static mockImplementation(arg0: () => IPostagemRepository) {
        throw new Error("Method not implemented.");
    }

    private repository: Repository<Postagem>
   
    constructor(){
        this.repository = appDataSource.getRepository(Postagem)
    }

    async create(postagem: IPostagem): Promise<IPostagem> {
        console.log('Creating post:', postagem);
        return this.repository.save(postagem)
          
    }  
  
    async findPostagemByUsuarioId(usuarioId: number, page: number, limit: number): Promise<(IPostagem & IUsuario)[]> {
        const offset = (page - 1) * limit;
    
        const queryBuilder = this.repository.createQueryBuilder("postagem")
          .leftJoinAndSelect("postagem.usuario", "usuario") // Certifique-se de que o relacionamento está definido corretamente na entidade
          .where("postagem.usuarioid = :usuarioId", { usuarioId })
          .skip(offset)
          .take(limit);
    
        const postagem = await queryBuilder.getMany();
           
        return postagem.map(postagem => {
          return {
              ...postagem,
              usuario: {
                  id: postagem.usuario.id,
                  nome: postagem.usuario.nome,
                  perfilid: postagem.usuario.perfilid                  
              }
          } as unknown as IPostagem & IUsuario;
        });
      }


    async update (id: number, titulo: string, conteudo: string): Promise<IPostagem>{
        const postagem = await this.repository.findOne({ where: { id } });
        
        if (!postagem) throw new ResourceNotFoundError()
        
        postagem.titulo = titulo;
        postagem.conteudo = conteudo;
       
        return this.repository.save(postagem);
    }
  
    

    async delete (id: number): Promise<void>{
        await this.repository.delete(id)
    }
    


    async findPostagemById(id: number): Promise<IPostagem> {
        return this.repository.findOne({          
          where: { id },
        }) as Promise<IPostagem>;
      }
    

    
    async findPostagemBySearch(palavrasChave: string, page: number, limit: number): Promise<(IPostagem)[]> {
        const offset = (page - 1) * limit;
    
        const queryBuilder = this.repository.createQueryBuilder("postagem");
    
        /*if (palavrasChave) {
          queryBuilder.where("postagem.titulo ILIKE :palavrasChave OR postagem.conteudo ILIKE :palavrasChave", {
            palavrasChave: `%${palavrasChave}%`,
          });
        }*/

          if (palavrasChave) {
            queryBuilder.where(
                "LOWER(postagem.titulo) LIKE LOWER(:palavrasChave) OR LOWER(postagem.conteudo) LIKE LOWER(:palavrasChave)", 
                { palavrasChave: `%${palavrasChave.toLowerCase()}%` }
            );
        }  
    
        queryBuilder.skip(offset).take(limit);
    
        const postagens = await queryBuilder.getMany();
        return postagens;
      }



    async findPostagem(page: number, limit: number): Promise<(IPostagem)[]> {
        return this.repository.find({
            skip: (page - 1) * limit,
            take: limit,
        })
    }

    


}