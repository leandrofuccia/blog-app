
import { Repository } from "typeorm";
import { appDataSource } from "./typeorm";
import { ICredencialRepository } from "@/repositories/credencial.repository.interface";
import { Credencial } from "@/entities/credencial.entity";
import { ICredencial } from "@/entities/models/credencial.interface";

export class CredencialRepository implements ICredencialRepository{
    static mockImplementation(arg0: () => any) {
        throw new Error("Method not implemented.");
    }

    private repository: Repository<Credencial>

    constructor(){
        this.repository = appDataSource.getRepository(Credencial)
    }

    create(credencial: ICredencial): Promise<ICredencial | undefined> {
        console.log('save credencial')
        return this.repository.save(credencial)
    }

    findByUsername(username: string) : Promise<ICredencial>{
        return this.repository.findOne({          
                    where: { username },
        }) as Promise<ICredencial>;

    }
}