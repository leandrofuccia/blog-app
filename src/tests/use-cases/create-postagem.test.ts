
import { CreatePostagemCase } from '@/use-cases/create-postagem';
import { IPostagemRepository } from '@/repositories/postagem.repository.interface';
import { IPostagem } from '@/entities/models/postagem.interface';

describe('Create Postagem Use-Case', () => {
  let postagemRepository: jest.Mocked<IPostagemRepository>;
  let createPostagemUseCase: CreatePostagemCase;

  beforeEach(() => {
    postagemRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByUsuario: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findPostagemByUsuarioId: jest.fn(),
      findPostagemById: jest.fn(),
      findPostagemBySearch: jest.fn(),
      findPostagem: jest.fn(),
    } as jest.Mocked<IPostagemRepository>;

    createPostagemUseCase = new CreatePostagemCase(postagemRepository);
  });

  it('deve criar uma nova postagem com sucesso', async () => {
    const inputData: IPostagem = {
      id: 1,
      titulo: 'Título Teste',
      conteudo: 'Conteúdo de teste',
      usuarioid: 1,
    };

    postagemRepository.create.mockResolvedValue(inputData);

    const postagem = await createPostagemUseCase.handler(inputData);

    expect(postagemRepository.create).toHaveBeenCalledWith(inputData);
    expect(postagem).toEqual(inputData);
  });

  it('deve lançar um erro caso falhe ao criar a postagem', async () => {
    postagemRepository.create.mockRejectedValue(new Error('Erro ao criar postagem'));

    await expect(
      createPostagemUseCase.handler({
        titulo: 'Título Teste',
        conteudo: 'Conteúdo de teste',
        usuarioid: 1,
      })
    ).rejects.toThrow('Erro ao criar postagem');
  });
});