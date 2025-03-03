import { CreatePostagemCase } from "../create-postagem";
import { PostagemRepository } from "@/lib/typeorm/postagem.repository";


export function makeCreatePostagemUseCase() {
    const postagemRepository = new PostagemRepository();
    const createPostagemUseCase = new CreatePostagemCase(postagemRepository);
    return createPostagemUseCase;

    
}  