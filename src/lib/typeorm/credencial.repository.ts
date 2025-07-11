
import { Repository } from "typeorm";
import { appDataSource } from "./typeorm";
import { ICredencialRepository } from "@/repositories/credencial.repository.interface";
import { Credencial } from "@/entities/credencial.entity";
import { ICredencial } from "@/entities/models/credencial.interface";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

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

    async update (id: number, userName: string, password: string): Promise<ICredencial>{
        const credencial = await this.repository.findOne({ where: { id } });
        if (!credencial) throw new ResourceNotFoundError()
        credencial.username = userName;
        credencial.password = password;
        return this.repository.save(credencial);
        
    }

    async delete (id: number): Promise<void>{
        await this.repository.delete(id)
    }
    
}