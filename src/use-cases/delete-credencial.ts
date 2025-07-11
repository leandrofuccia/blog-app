import { ICredencialRepository } from "@/repositories/credencial.repository.interface";



export class deleteCredencialUseCase {
  constructor(private credencialRepository: ICredencialRepository){}
            
      async handler(id: number): Promise<void> {
        
          return this.credencialRepository.delete(id)
      }
}


