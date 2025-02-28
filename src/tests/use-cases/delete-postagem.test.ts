import { deletePostagemUseCase } from '@/use-cases/delete-postagem';
import { IPostagemRepository } from '@/repositories/postagem.repository.interface';

describe('deletePostagemUseCase', () => {
  let postagemRepository: IPostagemRepository;
  let deletePostagem: deletePostagemUseCase;

  beforeEach(() => {
    postagemRepository = {
      delete: jest.fn(),
    } as unknown as IPostagemRepository;

    deletePostagem = new deletePostagemUseCase(postagemRepository);
  });

  it('deve chamar o método delete do repositório de postagens com o ID correto', async () => {
    const id = 1;

    await deletePostagem.handler(id);

    expect(postagemRepository.delete).toHaveBeenCalledWith(id);
  });

  it('deve retornar undefined quando o método delete for bem-sucedido', async () => {
    const id = 1;

    (postagemRepository.delete as jest.Mock).mockResolvedValue(undefined);

    const result = await deletePostagem.handler(id);

    expect(result).toBeUndefined();
  });
});
