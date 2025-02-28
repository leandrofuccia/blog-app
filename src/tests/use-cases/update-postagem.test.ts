import { UpdatePostagemUseCase } from '@/use-cases/update-postagem';
import { IPostagemRepository } from '@/repositories/postagem.repository.interface';

describe('UpdatePostagemUseCase', () => {
  let postagemRepository: IPostagemRepository;
  let updatePostagemUseCase: UpdatePostagemUseCase;

  beforeEach(() => {
    postagemRepository = {
      update: jest.fn(),
    } as unknown as IPostagemRepository;

    updatePostagemUseCase = new UpdatePostagemUseCase(postagemRepository);
  });

  it('deve chamar o método update do repositório de postagens com os parâmetros corretos', async () => {
    const id = 1;
    const titulo = 'Novo Título';
    const conteudo = 'Novo Conteúdo';

    await updatePostagemUseCase.handler(id, titulo, conteudo);

    expect(postagemRepository.update).toHaveBeenCalledWith(id, titulo, conteudo);
  });

  it('deve retornar o resultado do método update do repositório de postagens', async () => {
    const id = 1;
    const titulo = 'Novo Título';
    const conteudo = 'Novo Conteúdo';
    const updatedPostagem = { id, titulo, conteudo };

    (postagemRepository.update as jest.Mock).mockResolvedValue(updatedPostagem);

    const result = await updatePostagemUseCase.handler(id, titulo, conteudo);

    expect(result).toEqual(updatedPostagem);
  });
});
