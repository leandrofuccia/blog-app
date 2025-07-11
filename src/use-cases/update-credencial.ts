import { ICredencial, ICredencialRepository } from "@/repositories/credencial.repository.interface";


export class UpdateCredencialUseCase {
  constructor(private credencialRepository: ICredencialRepository){}
   
      async handler(id: number, userName: string, password: string){
        return this.credencialRepository.update(id, userName, password)
      }
         
}


