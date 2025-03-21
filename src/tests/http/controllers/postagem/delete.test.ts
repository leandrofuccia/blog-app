import { deletePostagem } from '@/http/controllers/postagem/delete';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeDeletePostagemUseCase } from '@/use-cases/factory/make-delete-postagem-use-case';
import { makeFindUsuarioByCredencialUseCase } from '@/use-cases/factory/make-find-usuario-by-credencial';
import { unauthorizedPerfilError } from '@/use-cases/errors/unauthorized-perfil-error';
import { InvalidUsuarioError } from '@/use-cases/errors/invalid-usuario-error';

// Mock das funções
jest.mock('@/use-cases/factory/make-delete-postagem-use-case', () => ({
  makeDeletePostagemUseCase: jest.fn(),
}));

jest.mock('@/use-cases/factory/make-find-usuario-by-credencial', () => ({
  makeFindUsuarioByCredencialUseCase: jest.fn(),
}));

describe('Delete Postagem Controller', () => {
  it('deve excluir uma postagem e retornar 204 quando o usuário tem perfil permitido', async () => {
    // Mock da função makeFindUsuarioByCredencialUseCase para retornar um usuário com perfil permitido
    const mockFindByCredencialId = jest.fn().mockResolvedValue([{ id: 1, perfilid: 2 }]);
    (makeFindUsuarioByCredencialUseCase as jest.Mock).mockReturnValue({ handler: mockFindByCredencialId });

    // Mock da função makeDeletePostagemUseCase
    const mockHandler = jest.fn().mockResolvedValue(null);
    (makeDeletePostagemUseCase as jest.Mock).mockReturnValue({ handler: mockHandler });

    const request = {
      params: { id: '1' },
      user: { username: 'test_user', credencialId: 1 },
    } as unknown as FastifyRequest;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    await deletePostagem(request, reply);

    expect(mockFindByCredencialId).toHaveBeenCalledWith(1);
    expect(mockHandler).toHaveBeenCalledWith(1);
    expect(reply.code).toHaveBeenCalledWith(204);
    expect(reply.send).toHaveBeenCalled();
  });

  it('deve retornar erro quando o usuário não tem permissão para excluir a postagem', async () => {
    const mockFindByCredencialId = jest.fn().mockResolvedValue([{ id: 1, perfilid: 1 }]); // Usuário sem permissão
    (makeFindUsuarioByCredencialUseCase as jest.Mock).mockReturnValue({ handler: mockFindByCredencialId });

    const request = {
      params: { id: '1' },
      user: { username: 'test_user', credencialId: 1 },
    } as unknown as FastifyRequest;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    await expect(deletePostagem(request, reply)).rejects.toThrow(unauthorizedPerfilError);

    expect(mockFindByCredencialId).toHaveBeenCalledWith(1);
    expect(reply.code).not.toHaveBeenCalled();
    expect(reply.send).not.toHaveBeenCalled();
  });

  it('deve retornar erro quando nenhum usuário é encontrado', async () => {
    const mockFindByCredencialId = jest.fn().mockResolvedValue([]); // Nenhum usuário encontrado
    (makeFindUsuarioByCredencialUseCase as jest.Mock).mockReturnValue({ handler: mockFindByCredencialId });

    const request = {
      params: { id: '1' },
      user: { username: 'test_user', credencialId: 1 },
    } as unknown as FastifyRequest;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    await expect(deletePostagem(request, reply)).rejects.toThrow(InvalidUsuarioError);

    expect(mockFindByCredencialId).toHaveBeenCalledWith(1);
    expect(reply.code).not.toHaveBeenCalled();
    expect(reply.send).not.toHaveBeenCalled();
  });
});
