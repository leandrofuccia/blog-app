import { Curtida } from "@/entities/curtida.entity";
import { Repository } from "typeorm";
import { appDataSource } from "./typeorm";
import { ICurtida, ICurtidaRepository } from "@/repositories/curtida.repository.interface";


export class CurtidaRepository implements ICurtidaRepository{
    
    private repository: Repository<Curtida>
   
    constructor(){
        this.repository = appDataSource.getRepository(Curtida)
    }

    async create(curtida: ICurtida): Promise<ICurtida> {
      return this.repository.save(curtida)
    }  

    async delete (postid: number, usuarioid: number): Promise<void>{
        await this.repository.delete({
            postid: postid,
            usuarioid: usuarioid,
        });
    } 

    async curtidaCount(id: number): Promise<number> {
        return await this.repository.count({
                where: {
                postid: id
            }
        });
    }


    async curtidaStatus(postagemid: number, usuarioid: number): Promise<boolean> {
        return  await this.repository.exists({
                where: {
                postid: postagemid,
                usuarioid: usuarioid 
            }
        });
    }
}
    
        
