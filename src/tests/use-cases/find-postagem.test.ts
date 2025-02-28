import { PostagemRepository } from "@/lib/typeorm/postagem.repository";
import { IPostagemRepository } from "@/repositories/postagem.repository.interface";
import { FindPostagemUseCase } from "@/use-cases/find-postagem";

jest.mock("@/lib/typeorm/postagem.repository");

describe("FindPostagemUseCase", () => {
    let postagemRepositoryMock: IPostagemRepository;
    let findPostagemUseCase: FindPostagemUseCase;

    beforeEach(() => {
        postagemRepositoryMock = new PostagemRepository();
        PostagemRepository.mockImplementation(() => postagemRepositoryMock);
        findPostagemUseCase = new FindPostagemUseCase(postagemRepositoryMock);
    });

    it("deve listar todas a postagens com a paginação correta", async () => {
        const postagens = [
            { id: 1, titulo: "Postagem 1", conteudo: "Conteúdo 1" },
            { id: 2, titulo: "Postagem 2", conteudo: "Conteúdo 2" }
        ];
        postagemRepositoryMock.findPostagem = jest.fn().mockResolvedValue(postagens);

        const result = await findPostagemUseCase.handler(1, 2);

        expect(postagemRepositoryMock.findPostagem).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual(postagens);
    });

    it("deve retornar um array vazio quando não encontrar nenhuma postagem", async () => {
        postagemRepositoryMock.findPostagem = jest.fn().mockResolvedValue([]);

        const result = await findPostagemUseCase.handler(1, 2);

        expect(postagemRepositoryMock.findPostagem).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual([]);
    });
});
