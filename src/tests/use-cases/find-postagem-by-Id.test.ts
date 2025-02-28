import { FindPostagemByIdUseCase } from "@/use-cases/find-postagem-by-Id";
import { PostagemRepository } from "@/lib/typeorm/postagem.repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { IPostagemRepository } from "@/repositories/postagem.repository.interface";

jest.mock("@/lib/typeorm/postagem.repository");

describe("FindPostagemByIdUseCase", () => {
    let postagemRepositoryMock: IPostagemRepository;
    let findPostagemByIdUseCase: FindPostagemByIdUseCase;

    beforeEach(() => {
        postagemRepositoryMock = new PostagemRepository();
        PostagemRepository.mockImplementation(() => postagemRepositoryMock);
        findPostagemByIdUseCase = new FindPostagemByIdUseCase(postagemRepositoryMock);
    });

    it("deve retornar uma postagem quando ela existir", async () => {
        const postagem = { id: 1, title: "Test Postagem", content: "Test Content" };
        postagemRepositoryMock.findPostagemById = jest.fn().mockResolvedValue(postagem);

        const result = await findPostagemByIdUseCase.handler(1);

        expect(result).toEqual(postagem);
    });

    it("deve gerar um erro quando a postagem não existe", async () => {
        postagemRepositoryMock.findPostagemById = jest.fn().mockResolvedValue(null);

        await expect(findPostagemByIdUseCase.handler(1)).rejects.toThrow(ResourceNotFoundError);
    });
});
