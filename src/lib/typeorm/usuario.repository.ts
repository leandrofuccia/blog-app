import { IUsuario } from "@/entities/models/usuario.interface";
import { Usuario } from "@/entities/usuario.entity";
import { IUsuarioRepository } from "@/repositories/usuario.repository.interface";
import { Repository } from "typeorm";
import { appDataSource } from "./typeorm";

export class UsuarioRepository implements IUsuarioRepository{

    private repository: Repository<Usuario>

    constructor(){
        this.repository = appDataSource.getRepository(Usuario)
    }

    create(usuario: IUsuario): Promise<IUsuario | undefined> {
        return this.repository.save(usuario)
    }


}