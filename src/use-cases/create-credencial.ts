import { ICredencial } from "@/entities/models/credencial.interface";
import { ICredencialRepository } from "@/repositories/credencial.repository.interface";

export class CreateCredencialUseCase {
  constructor(private credencialRepository: ICredencialRepository) {}

  handler (credencial: ICredencial): Promise<ICredencial | undefined> {
    return this.credencialRepository.create(credencial)
  }
}



