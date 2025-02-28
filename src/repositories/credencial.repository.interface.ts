import { ICredencial } from "@/entities/models/credencial.interface"

export interface ICredencialRepository{
    create (credencial: ICredencial): Promise<ICredencial | undefined>
    findByUsername(username: string) : Promise<ICredencial>
}

export { ICredencial }
