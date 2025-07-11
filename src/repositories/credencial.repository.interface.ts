import { ICredencial } from "@/entities/models/credencial.interface"

export interface ICredencialRepository{
    create (credencial: ICredencial): Promise<ICredencial | undefined>
    findByUsername(username: string) : Promise<ICredencial>
    update (id: number, userName: string, password: string): Promise<ICredencial>
    delete (id: number): Promise<void>
}

export { ICredencial }
