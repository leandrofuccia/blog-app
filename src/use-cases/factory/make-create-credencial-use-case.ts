import { CredencialRepository } from "@/lib/typeorm/credencial.repository";
import { CreateCredencialUseCase } from "../create-credencial";


export function makeCreateCredencialUseCase() {
    const credencialRepository = new CredencialRepository();
    const createCredencialUseCase = new CreateCredencialUseCase(credencialRepository);

    return createCredencialUseCase;
}  