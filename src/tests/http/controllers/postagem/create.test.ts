import { create } from '@/http/controllers/postagem/create';
import { FastifyInstance } from 'fastify';
import { makeCreatePostagemUseCase } from '@/use-cases/factory/make-create-postagem-use-case';

// Mock da função makeCreatePostagemUseCase
jest.mock('@/use-cases/factory/make-create-postagem-use-case', () => ({
  makeCreatePostagemUseCase: jest.fn(),
}));

describe('create controller', () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = {} as FastifyInstance;
  });

  it('deve criar uma nova postagem', async () => {
    const mockHandler = jest.fn().mockResolvedValue({ id: 1, titulo: 'Test', conteudo: 'Conteúdo de teste', usuarioid: 1 });
    (makeCreatePostagemUseCase as jest.Mock).mockReturnValue({ handler: mockHandler });
  
    const request = {
      body: { titulo: 'Test', conteudo: 'Conteúdo de teste', usuarioid: 1 },
    } as any;
  
    const reply = {
      code: jest.fn().mockReturnThis(), // Mockando code para retornar o próprio reply
      send: jest.fn(),
    } as any;
  
    await create(request, reply);
  
    expect(mockHandler).toHaveBeenCalledWith({ titulo: 'Test', conteudo: 'Conteúdo de teste', usuarioid: 1 });
    expect(reply.code).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({ id: 1, titulo: 'Test', conteudo: 'Conteúdo de teste', usuarioid: 1 });
   
  });
});