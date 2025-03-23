import { update } from '@/http/controllers/postagem/update';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeUpdatePostagemUseCase } from '@/use-cases/factory/make-update-postagem-use-case';
import { makeFindUsuarioByCredencialUseCase } from '@/use-cases/factory/make-find-usuario-by-credencial';
import { unauthorizedPerfilError } from '@/use-cases/errors/unauthorized-perfil-error';
import { InvalidUsuarioError } from '@/use-cases/errors/invalid-usuario-error';

jest.mock('@/use-cases/factory/make-update-postagem-use-case', () => ({
  makeUpdatePostagemUseCase: jest.fn(),
}));

jest.mock('@/use-cases/factory/make-find-usuario-by-credencial', () => ({
  makeFindUsuarioByCredencialUseCase: jest.fn(),
}));

describe('Update Postagem Controller', () => {
  it('deve atualizar uma postagem e retornar 200 quando o usuário tem permissão', async () => {
    const mockFindByCredencialId = jest.fn().mockResolvedValue([{ id: 1, perfilid: 2 }]);
    (makeFindUsuarioByCredencialUseCase as jest.Mock).mockReturnValue({ handler: mockFindByCredencialId });

    const mockUpdateHandler = jest.fn().mockResolvedValue({
      id: 1,
      titulo: 'Título Atualizado',
      conteudo: 'Conteúdo Atualizado',
      usuarioid: 1,
    });
    (makeUpdatePostagemUseCase as jest.Mock).mockReturnValue({ handler: mockUpdateHandler });

    const request = {
      params: { id: '1' },
      body: { titulo: 'Título Atualizado', conteudo: 'Conteúdo Atualizado' },
      user: { username: 'test_user', credencialId: 1 },
    } as unknown as FastifyRequest;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    await update(request, reply);

    expect(mockFindByCredencialId).toHaveBeenCalledWith(1);
    expect(mockUpdateHandler).toHaveBeenCalledWith(1, 'Título Atualizado', 'Conteúdo Atualizado');
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({
      id: 1,
      titulo: 'Título Atualizado',
      conteudo: 'Conteúdo Atualizado',
      usuarioid: 1,
    });
  });

  it('deve retornar erro quando o usuário não tem permissão para atualizar a postagem', async () => {
    const mockFindByCredencialId = jest.fn().mockResolvedValue([{ id: 1, perfilid: 1 }]);
    (makeFindUsuarioByCredencialUseCase as jest.Mock).mockReturnValue({ handler: mockFindByCredencialId });

    const request = {
      params: { id: '1' },
      body: { titulo: 'Título Atualizado', conteudo: 'Conteúdo Atualizado' },
      user: { username: 'test_user', credencialId: 1 },
    } as unknown as FastifyRequest;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    await expect(update(request, reply)).rejects.toThrow(unauthorizedPerfilError);

    expect(mockFindByCredencialId).toHaveBeenCalledWith(1);
    expect(reply.code).not.toHaveBeenCalled();
    expect(reply.send).not.toHaveBeenCalled();
  });

  it('deve retornar erro quando nenhum usuário é encontrado', async () => {
    const mockFindByCredencialId = jest.fn().mockResolvedValue([]);
    (makeFindUsuarioByCredencialUseCase as jest.Mock).mockReturnValue({ handler: mockFindByCredencialId });

    const request = {
      params: { id: '1' },
      body: { titulo: 'Título Atualizado', conteudo: 'Conteúdo Atualizado' },
      user: { username: 'test_user', credencialId: 1 },
    } as unknown as FastifyRequest;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    await expect(update(request, reply)).rejects.toThrow(InvalidUsuarioError);

    expect(mockFindByCredencialId).toHaveBeenCalledWith(1);
    expect(reply.code).not.toHaveBeenCalled();
    expect(reply.send).not.toHaveBeenCalled();
  });
});
