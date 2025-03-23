
import { Repository } from "typeorm";
import { appDataSource } from "./typeorm";
import { ICredencialRepository } from "@/repositories/credencial.repository.interface";
import { Credencial } from "@/entities/credencial.entity";
import { ICredencial } from "@/entities/models/credencial.interface";

export class CredencialRepository implements ICredencialRepository{
    
    private repository: Repository<Credencial>

    constructor(){
        this.repository = appDataSource.getRepository(Credencial)
    }

    create(credencial: ICredencial): Promise<ICredencial | undefined> {
       
        return this.repository.save(credencial)
    }

    findByUsername(username: string) : Promise<ICredencial>{
        return this.repository.findOne({          
                    where: { username },
        }) as Promise<ICredencial>;

    }
}