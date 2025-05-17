
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

    /*create(credencial: ICredencial): Promise<ICredencial | undefined> {
       
        return this.repository.save(credencial)
    }
    */

    create(credencial: ICredencial): Promise<ICredencial | undefined> {
        return this.repository.save(credencial).catch((error: any) => {
            if (
            error.code === "23505" || // PostgreSQL
            error.message.includes('violates unique')  || 
            error.message?.includes("duplicate") // SQLite, outros
            ) {
                console.log("entrou no erro error.message", error.message, error.code )
            const duplicateError = new Error("DUPLICATE_USERNAME");
            duplicateError.name = "DuplicateUsernameError";
            throw duplicateError;
            }
             console.log('caiu no throw error.message ', error.message, error.code)
            throw error; // Repassa outros erros normalmente
        });
    }


    findByUsername(username: string) : Promise<ICredencial>{
        return this.repository.findOne({          
                    where: { username },
        }) as Promise<ICredencial>;

    }
}