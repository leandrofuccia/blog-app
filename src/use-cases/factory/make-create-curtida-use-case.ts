import { CurtidaRepository } from "@/lib/typeorm/curtida.repository";
import { CreateCurtidaCase } from "../create-curtida";


export function makeCreateCurtidaUseCase() {
    const curtidaRepository = new CurtidaRepository();
    const createCurtidaUseCase = new CreateCurtidaCase(curtidaRepository);
    return createCurtidaUseCase;

    
}  