import { ComentarioRepository } from "@/lib/typeorm/comentario.repository";
import { CreateComentarioCase } from "../create-comentario";


export function makeCreateComentarioUseCase() {
    const comentarioRepository = new ComentarioRepository();
    const createComentarioUseCase = new CreateComentarioCase(comentarioRepository);
    return createComentarioUseCase;

    
}  