import { signin } from '@/http/controllers/credencial/signin';
import { FastifyReply, FastifyRequest } from 'fastify';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeSigninUseCase } from '@/use-cases/factory/make-signin-use-case';
import { compare } from 'bcryptjs';

jest.mock('@/use-cases/factory/make-signin-use-case');
jest.mock('bcryptjs');

describe('Signin Controller', () => {
  let request: FastifyRequest;
  let reply: FastifyReply;

  beforeEach(() => {
    request = {
      body: {
        username: 'testuser',
        password: 'password123',
      },
    } as FastifyRequest;

    reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      jwtSign: jest.fn().mockResolvedValue('fake-jwt-token'),
    } as unknown as FastifyReply;

    (makeSigninUseCase as jest.Mock).mockReturnValue({
      handler: jest.fn().mockResolvedValue({
        username: 'testuser',
        password: 'hashedpassword',
      }),
    });

    (compare as jest.Mock).mockResolvedValue(true);
  });

  it('deve fazer login com sucesso e retornar um token', async () => {
    await signin(request, reply);

    expect(makeSigninUseCase().handler).toHaveBeenCalledWith('testuser');
    expect(compare).toHaveBeenCalledWith('password123', 'hashedpassword');
    expect(reply.jwtSign).toHaveBeenCalledWith({ username: 'testuser' });
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({ token: 'fake-jwt-token' });
  });

  it('deve retornar erro para credenciais inválidas', async () => {
    (compare as jest.Mock).mockResolvedValue(false);

    await expect(signin(request, reply)).rejects.toThrow(InvalidCredentialsError);
  });
});
