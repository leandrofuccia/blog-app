import { deletePostagem } from '@/http/controllers/postagem/delete';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeDeletePostagemUseCase } from '@/use-cases/factory/make-delete-postagem-use-case';

jest.mock('@/use-cases/factory/make-delete-postagem-use-case');

describe('Delete Postagem Controller', () => {
  it('deve excluir uma postagem e retornar 204', async () => {
    const mockHandler = jest.fn().mockResolvedValue(null);

    (makeDeletePostagemUseCase as jest.Mock).mockReturnValue({ handler: mockHandler });

    const request = {
      params: { id: '1' },
    } as unknown as FastifyRequest;

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    await deletePostagem(request, reply);

    expect(mockHandler).toHaveBeenCalledWith(1);
    expect(reply.code).toHaveBeenCalledWith(204);
    expect(reply.send).toHaveBeenCalled();
    
  });
});