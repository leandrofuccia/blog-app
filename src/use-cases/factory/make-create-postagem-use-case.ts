import { PostagemRepository } from "@/repositories/pg/postagem.repository";
import { CreatePostagemCase } from "../create-postagem";


export function makeCreatePostagemUseCase() {
    const postagemRepository = new PostagemRepository();
    const createPostagemUseCase = new CreatePostagemCase(postagemRepository);
    return createPostagemUseCase;
}  