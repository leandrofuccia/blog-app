import { PostagemRepository } from "@/lib/typeorm/postagem.repository";
import { IPostagemRepository } from "@/repositories/postagem.repository.interface";
import { FindPostagemBySearchUseCase } from "@/use-cases/find-postagem-by-search";

jest.mock("@/lib/typeorm/postagem.repository");

describe("FindPostagemUseCase", () => {
    let postagemRepositoryMock: IPostagemRepository;
    let findPostagemSearchUseCase: FindPostagemBySearchUseCase;

    beforeEach(() => {
        postagemRepositoryMock = new PostagemRepository();
        PostagemRepository.mockImplementation(() => postagemRepositoryMock);
        findPostagemSearchUseCase = new FindPostagemBySearchUseCase(postagemRepositoryMock);
    });

    it("deve buscar postagens pelo título", async () => {
        const postagens = [
            { id: 1, titulo: "Primeira Postagem", conteudo: "Conteúdo único", usuarioId: 1 },
            { id: 2, titulo: "Segunda Postagem", conteudo: "Outro Conteúdo", usuarioId: 1 }
        ];
        postagemRepositoryMock.findPostagemBySearch = jest.fn().mockImplementation((searchTerm: string) => {
            return Promise.resolve(postagens.filter(postagem => postagem.titulo.includes(searchTerm)));
        });

        const result = await findPostagemSearchUseCase.handler("Primeira", 1, 2);

        expect(result.length).toBe(1);
        expect(result[0].titulo).toBe("Primeira Postagem");
    });

    it("deve buscar postagens pelo conteudo", async () => {
        const postagens = [
            { id: 1, titulo: "Primeira Postagem", conteudo: "Conteúdo único" , usuarioId: 1},
            { id: 2, titulo: "Segunda Postagem", conteudo: "Outro Conteúdo" , usuarioId: 1}
        ];
        postagemRepositoryMock.findPostagemBySearch = jest.fn().mockImplementation((searchTerm: string) => {
            return Promise.resolve(postagens.filter(postagem => postagem.conteudo.includes(searchTerm)));
        });

        const result = await findPostagemSearchUseCase.handler("único", 1, 2);

        expect(result.length).toBe(1);
        expect(result[0].conteudo).toBe("Conteúdo único");
    });
});
