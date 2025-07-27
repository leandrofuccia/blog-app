import { CurtidaComentario } from "@/entities/curtidaComentario.entity"
import { ICurtidaComentario } from "@/entities/models/curtidaComentario.interface"
import { appDataSource } from "./typeorm"
import { ICurtidaComentarioRepository } from "@/repositories/curtidaComentario.repository.interface"
import { Repository } from "typeorm"

export class CurtidaComentarioRepository implements ICurtidaComentarioRepository{
    
    private repository: Repository<CurtidaComentario>
   
    constructor(){
        this.repository = appDataSource.getRepository(CurtidaComentario)
    }

    async create(curtidaComentario: ICurtidaComentario): Promise<ICurtidaComentario> {
      return this.repository.save(curtidaComentario)
    }  

    async delete (comentarioid: number, usuarioid: number): Promise<void>{
        await this.repository.delete({
            comentarioid: comentarioid,
            usuarioid: usuarioid,
        });
    } 


     async curtidaComentarioCount(comentarioid: number): Promise<number> {
        return await this.repository.count({
                where: {
                comentarioid: comentarioid
            }
        });
    }


    async curtidaComentarioStatus(comentarioid: number, usuarioid: number): Promise<boolean> {
        return  await this.repository.exists({
                where: {
                comentarioid: comentarioid,
                usuarioid: usuarioid 
            }
        });
    }

}
    
        
