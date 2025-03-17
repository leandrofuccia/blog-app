import { create } from '@/http/controllers/postagem/create';
import { FastifyInstance } from 'fastify';
import { makeCreatePostagemUseCase } from '@/use-cases/factory/make-create-postagem-use-case';
import { makeFindUsuarioByIdUseCase } from '@/use-cases/factory/make-find-usuario-by-Id';
import { unauthorizedPerfilError } from '@/use-cases/errors/unauthorized-perfil-error';

// Mock das funções
jest.mock('@/use-cases/factory/make-create-postagem-use-case', () => ({
  makeCreatePostagemUseCase: jest.fn(),
}));

jest.mock('@/use-cases/factory/make-find-usuario-by-Id', () => ({
  makeFindUsuarioByIdUseCase: jest.fn(),
}));

describe('create controller', () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = {} as FastifyInstance;
  });

  it('deve criar uma nova postagem quando o usuário tem perfil correto', async () => {
    // Mock da função makeFindUsuarioByIdUseCase
    const mockFindByUserId = jest.fn().mockResolvedValue({ id: 1, perfilid: 2 });
    (makeFindUsuarioByIdUseCase as jest.Mock).mockReturnValue({ handler: mockFindByUserId });

    // Mock da função makeCreatePostagemUseCase
    const mockHandler = jest.fn().mockResolvedValue({ id: 1, titulo: 'Test', conteudo: 'Conteúdo de teste', usuarioid: 1 });
    (makeCreatePostagemUseCase as jest.Mock).mockReturnValue({ handler: mockHandler });

    const request = {
      body: { titulo: 'Test', conteudo: 'Conteúdo de teste', usuarioid: 1 },
      user: { username: 'test_user', usuarioId: 1 },
    } as any;

    const reply = {
      code: jest.fn().mockReturnThis(), // Mockando code para retornar o próprio reply
      send: jest.fn(),
    } as any;

    await create(request, reply);

    expect(mockFindByUserId).toHaveBeenCalledWith(1);
    expect(mockHandler).toHaveBeenCalledWith({ titulo: 'Test', conteudo: 'Conteúdo de teste', usuarioid: 1 });
    expect(reply.code).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({ id: 1, titulo: 'Test', conteudo: 'Conteúdo de teste', usuarioid: 1 });
  });

  it('deve retornar erro quando o usuário não tem perfil permitido', async () => {
    const mockFindByUserId = jest.fn().mockResolvedValue({ id: 1, perfilid: 1 }); // Usuário com perfil errado
    (makeFindUsuarioByIdUseCase as jest.Mock).mockReturnValue({ handler: mockFindByUserId });

    const request = {
      body: { titulo: 'Test', conteudo: 'Conteúdo de teste', usuarioid: 1 },
      user: { username: 'test_user', usuarioId: 1 },
    } as any;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await expect(create(request, reply)).rejects.toThrow(unauthorizedPerfilError);

    expect(mockFindByUserId).toHaveBeenCalledWith(1);
    expect(reply.code).not.toHaveBeenCalled();
    expect(reply.send).not.toHaveBeenCalled();
  });
});
