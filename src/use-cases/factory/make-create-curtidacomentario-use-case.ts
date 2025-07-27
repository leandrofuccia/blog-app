import { CurtidaComentarioRepository } from "@/lib/typeorm/curtidacomentario.repository";
import { CreateCurtidaComentarioCase } from "../create-curtidacomentario";


export function makeCreateCurtidaComentarioUseCase() {
    const curtidaComentarioRepository = new CurtidaComentarioRepository();
    const createCurtidaComentarioUseCase = new CreateCurtidaComentarioCase(curtidaComentarioRepository);
    return createCurtidaComentarioUseCase;

    
}  