import { IUsuario } from "@/entities/models/usuario.interface";
import { Usuario } from "@/entities/usuario.entity";
import { IUsuarioRepository } from "@/repositories/usuario.repository.interface";
import { Repository } from "typeorm";
import { appDataSource } from "./typeorm";
import { ICredencial } from "@/entities/models/credencial.interface";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export class UsuarioRepository implements IUsuarioRepository{

    private repository: Repository<Usuario>

    constructor(){
        this.repository = appDataSource.getRepository(Usuario)
    }

    create(usuario: IUsuario): Promise<IUsuario | undefined> {
        return this.repository.save(usuario)
    }

    findByUsername(nome: string) : Promise<IUsuario>{
        return this.repository.findOne({          
                  where: { nome },
        }) as Promise<IUsuario>;

    }

    async findUsuarioByCredencialId(
        credencialId: number                    
    ): Promise<(IUsuario & ICredencial)[]> {
                             
        const queryBuilder = this.repository.createQueryBuilder("usuario")
            .leftJoinAndSelect("usuario.credencial", "credencial") 
            .where("usuario.credencialid = :credencialId", { credencialId });
                          
        const usuarios = await queryBuilder.getMany();
                   
        return usuarios.map(usuario => {
            return {
                ...usuario,
                credencial: {
                    id: usuario.credencial?.id,
                    username: usuario.credencial?.username,
                    password: usuario.credencial?.password,
                }
            } as unknown as IUsuario & ICredencial;
        });
    }

    findByUserId(id: number) : Promise<IUsuario>{
        return this.repository.findOne({          
                  where: { id },
        }) as Promise<IUsuario>;

    }

    async findUsuario(page: number, limit: number): Promise<IUsuario[]> {
        return await this.repository.find({
        });
    }
    
    
    async update (id: number, nome: string, perfilId: number): Promise<IUsuario>{
            const usuario = await this.repository.findOne({ where: { id } });
            if (!usuario) throw new ResourceNotFoundError()
            usuario.nome = nome;
            usuario.perfilid = perfilId;
            return this.repository.save(usuario);
            
    }

     async delete (id: number): Promise<void>{
        await this.repository.delete(id)
    }
}