
import { FindPostagemByIdUseCase } from "@/use-cases/find-postagem-by-Id";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { findPostagemById } from "@/http/controllers/postagem/find-postagem-By-Id";
import { FastifyRequest, FastifyReply } from "fastify";

jest.mock("@/use-cases/find-postagem-by-Id");

describe("Find Postagem By Id Controller", () => {
  let mockHandler: jest.Mock;
  let request: FastifyRequest<{ Params: { id: string } }>;
  let reply: FastifyReply;

  beforeEach(() => {
    mockHandler = jest.fn();
    (FindPostagemByIdUseCase as jest.Mock).mockImplementation(() => ({
      handler: mockHandler,
    }));

    request = {
      params: { id: "999" },  
      query: {},
    } as unknown as FastifyRequest<{ Params: { id: string } }>;

    reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;
  });

  it("deve retornar 404 se a postagem não for encontrada", async () => {
    mockHandler.mockRejectedValueOnce(new ResourceNotFoundError());

    await expect(findPostagemById(request, reply)).rejects.toThrow(ResourceNotFoundError);
  });

  it("deve retornar 200 e a postagem quando encontrada", async () => {
    const postagem = { id: 1, titulo: "Postagem Exemplo", conteudo: "Conteúdo da postagem" };

    mockHandler.mockResolvedValueOnce(postagem);

    await findPostagemById(request, reply);

    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(postagem);
  });
});
