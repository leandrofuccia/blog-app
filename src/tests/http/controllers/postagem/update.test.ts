import { update } from '@/http/controllers/postagem/update';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeUpdatePostagemUseCase } from '@/use-cases/factory/make-update-postagem-use-case';

jest.mock('@/use-cases/factory/make-update-postagem-use-case');

describe('Update Postagem Controller', () => {
  it('deve atualizar uma postagem e retornar 200', async () => {
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
    } as unknown as FastifyRequest;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    await update(request, reply);

    expect(mockHandler).toHaveBeenCalledWith(1, "Título Atualizado", "Conteúdo Atualizado");

    expect(reply.code).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({
      id: 1,
      titulo: 'Título Atualizado',
      conteudo: 'Conteúdo Atualizado',
      usuarioid: 1,
    });
  });
});