import { create } from '@/http/controllers/credencial/create';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCreateCredencialUseCase } from '@/use-cases/factory/make-create-credencial-use-case';
import { hash } from 'bcryptjs';
import { z } from 'zod';

jest.mock('@/use-cases/factory/make-create-credencial-use-case');
jest.mock('bcryptjs');

describe('Create Credencial Controller', () => {
  let request: FastifyRequest;
  let reply: FastifyReply;

  beforeEach(() => {
    request = {
      body: {
        username: 'newuser',
        password: 'newpassword123',
      },
    } as FastifyRequest;

    reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    (makeCreateCredencialUseCase as jest.Mock).mockReturnValue({
      handler: jest.fn().mockResolvedValue({
        id: 'newuser-id',
        username: 'newuser',
      }),
    });

    (hash as jest.Mock).mockResolvedValue('hashedpassword');
  });

  it('deve criar uma nova credencial com sucesso e retornar o usuário criado', async () => {
    await create(request, reply);

    expect(hash).toHaveBeenCalledWith('newpassword123', 8);
    expect(makeCreateCredencialUseCase().handler).toHaveBeenCalledWith({
      username: 'newuser',
      password: 'hashedpassword',
    });
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({
      id: 'newuser-id',
      username: 'newuser',
    });
  });

  it('deve retornar erro de validação para dados de entrada inválidos', async () => {
    request.body = { username: 'newuser', password: '' }; 

    try {
      await create(request, reply);
    } catch (error) {
      expect(error).toBeInstanceOf(z.ZodError);
    }
  });
});
