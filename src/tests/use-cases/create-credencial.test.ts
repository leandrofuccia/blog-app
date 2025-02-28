import { ICredencial } from "@/entities/models/credencial.interface";
import { ICredencialRepository } from "@/repositories/credencial.repository.interface";
import { CreateCredencialUseCase } from "@/use-cases/create-credencial";


describe('criação credencial Use-Case', () => {
  let credencialRepository: jest.Mocked<ICredencialRepository>;
  let createCredencialUseCase: CreateCredencialUseCase;

  beforeEach(() => {
    credencialRepository = {
        create: jest.fn(),
    } as unknown as jest.Mocked<ICredencialRepository>;

    createCredencialUseCase = new CreateCredencialUseCase(credencialRepository);
  });

  it('deve criar uma nova credencial com sucesso', async () => {
    const inputData: ICredencial = {
        id: 1,
        username: 'teste@teste.com.br',
        password: '1234',
    };

    credencialRepository.create.mockResolvedValue(inputData);

    const credencial = await createCredencialUseCase.handler(inputData);

    expect(credencialRepository.create).toHaveBeenCalledWith(inputData);
    expect(credencial).toEqual(inputData);
  });

  it('deve lançar um erro caso falhe ao criar a credencial', async () => {
    credencialRepository.create.mockRejectedValue(new Error('Erro ao criar credencial'));

    await expect(
        createCredencialUseCase.handler({
            id: 1,
            username: 'teste@teste.com.br',
            password: '1234',
        })
    ).rejects.toThrow('Erro ao criar credencial');
  });
});