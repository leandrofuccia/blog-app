import { signin } from '@/http/controllers/credencial/signin';
import { FastifyReply, FastifyRequest } from 'fastify';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeSigninUseCase } from '@/use-cases/factory/make-signin-use-case';
import { makeFindUsuarioByCredencialUseCase } from '@/use-cases/factory/make-find-usuario-by-credencial';
import { compare } from 'bcryptjs';

// Mock das funções
jest.mock('@/use-cases/factory/make-signin-use-case', () => ({
  makeSigninUseCase: jest.fn(),
}));

jest.mock('@/use-cases/factory/make-find-usuario-by-credencial', () => ({
  makeFindUsuarioByCredencialUseCase: jest.fn(),
}));

jest.mock('bcryptjs');

describe('Signin Controller', () => {
  let request: FastifyRequest;
  let reply: FastifyReply;
  let mockSigninUseCase: jest.Mock;
  let mockFindUsuarioByCredencialUseCase: jest.Mock;

  beforeEach(() => {
    // Mock do caso de uso de login
    mockSigninUseCase = jest.fn().mockResolvedValue({
      id: 1,
      username: 'testuser',
      password: 'hashedpassword',
    });

    // Mock do caso de uso de busca pelo credencial
    mockFindUsuarioByCredencialUseCase = jest.fn().mockResolvedValue([{ id: 1 }]);

    (makeSigninUseCase as jest.Mock).mockReturnValue({ handler: mockSigninUseCase });
    (makeFindUsuarioByCredencialUseCase as jest.Mock).mockReturnValue({
      handler: mockFindUsuarioByCredencialUseCase,
    });

    // Mock da comparação de senha
    (compare as jest.Mock).mockResolvedValue(true);

    request = {
      body: {
        username: 'testuser',
        password: 'password123',
      },
    } as unknown as FastifyRequest;

    reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      jwtSign: jest.fn().mockResolvedValue('fake-jwt-token'),
    } as unknown as FastifyReply;
  });

  it('deve fazer login com sucesso e retornar um token', async () => {
    await signin(request, reply);

    expect(mockSigninUseCase).toHaveBeenCalledWith('testuser');
    expect(compare).toHaveBeenCalledWith('password123', 'hashedpassword');
    expect(reply.jwtSign).toHaveBeenCalledWith({ username: 'testuser', credencialId: 1 });
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({ token: 'fake-jwt-token' });
  });

  it('deve retornar erro para credenciais inválidas quando a senha não for correspondente', async () => {
    (compare as jest.Mock).mockResolvedValue(false); // Senha não confere

    await expect(signin(request, reply)).rejects.toThrow(InvalidCredentialsError);

    expect(mockSigninUseCase).toHaveBeenCalledWith('testuser');
    expect(compare).toHaveBeenCalledWith('password123', 'hashedpassword');
    expect(reply.jwtSign).not.toHaveBeenCalled();
    expect(reply.status).not.toHaveBeenCalled();
    expect(reply.send).not.toHaveBeenCalled();
  });
 

  
});
