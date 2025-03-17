import { update } from '@/http/controllers/postagem/update';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeUpdatePostagemUseCase } from '@/use-cases/factory/make-update-postagem-use-case';
import { makeFindUsuarioByIdUseCase } from '@/use-cases/factory/make-find-usuario-by-Id';
import { unauthorizedPerfilError } from '@/use-cases/errors/unauthorized-perfil-error';

// Mock das funções
jest.mock('@/use-cases/factory/make-update-postagem-use-case', () => ({
  makeUpdatePostagemUseCase: jest.fn(),
}));

jest.mock('@/use-cases/factory/make-find-usuario-by-Id', () => ({
  makeFindUsuarioByIdUseCase: jest.fn(),
}));

describe('Update Postagem Controller', () => {
  it('deve atualizar uma postagem e retornar 200 quando o usuário tem permissão', async () => {
    // Mock de makeFindUsuarioByIdUseCase para retornar um usuário com perfil permitido (perfilid: 2)
    const mockFindByUserId = jest.fn().mockResolvedValue({ id: 1, perfilid: 2 });
    (makeFindUsuarioByIdUseCase as jest.Mock).mockReturnValue({ handler: mockFindByUserId });

    // Mock de makeUpdatePostagemUseCase
    const mockHandler = jest.fn().mockResolvedValue({
      id: 1,
      titulo: 'Título Atualizado',
      conteudo: 'Conteúdo Atualizado',
      usuarioid: 1,
    });

    (makeUpdatePostagemUseCase as jest.Mock).mockReturnValue({ handler: mockHandler });

    const request = {
      params: { id: '1' },
      body: { titulo: 'Título Atualizado', conteudo: 'Conteúdo Atualizado' },
      user: { username: 'test_user', usuarioId: 1 },
    } as unknown as FastifyRequest;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    await update(request, reply);

    expect(mockFindByUserId).toHaveBeenCalledWith(1);
    expect(mockHandler).toHaveBeenCalledWith(1, "Título Atualizado", "Conteúdo Atualizado");

    expect(reply.code).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({
      id: 1,
      titulo: 'Título Atualizado',
      conteudo: 'Conteúdo Atualizado',
      usuarioid: 1,
    });
  });

  it('deve retornar erro quando o usuário não tem permissão para atualizar a postagem', async () => {
    const mockFindByUserId = jest.fn().mockResolvedValue({ id: 1, perfilid: 1 }); // Usuário sem permissão
    (makeFindUsuarioByIdUseCase as jest.Mock).mockReturnValue({ handler: mockFindByUserId });

    const request = {
      params: { id: '1' },
      body: { titulo: 'Título Atualizado', conteudo: 'Conteúdo Atualizado' },
      user: { username: 'test_user', usuarioId: 1 },
    } as unknown as FastifyRequest;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    await expect(update(request, reply)).rejects.toThrow(unauthorizedPerfilError);

    expect(mockFindByUserId).toHaveBeenCalledWith(1);
    expect(reply.code).not.toHaveBeenCalled();
    expect(reply.send).not.toHaveBeenCalled();
  });
});
