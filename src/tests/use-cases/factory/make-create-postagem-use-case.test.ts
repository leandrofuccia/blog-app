import { makeCreatePostagemUseCase } from '@/use-cases/factory/make-create-postagem-use-case';
import { CreatePostagemCase } from '@/use-cases/create-postagem';
import { PostagemRepository } from '@/lib/typeorm/postagem.repository';

jest.mock('@/lib/typeorm/postagem.repository');

describe('Factory: makeCreatePostagemUseCase', () => {
  it('deve criar uma instância de CreatePostagemCase com PostagemRepository', () => {
    const createPostagemUseCase = makeCreatePostagemUseCase();

    expect(createPostagemUseCase).toBeInstanceOf(CreatePostagemCase);
    expect(PostagemRepository).toHaveBeenCalledTimes(1);
  });
});
