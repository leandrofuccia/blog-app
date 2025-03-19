import { CredencialRepository } from "@/lib/typeorm/credencial.repository";
import { CreateCredencialUseCase } from "@/use-cases/create-credencial";
import { makeCreateCredencialUseCase } from "@/use-cases/factory/make-create-credencial-use-case";


jest.mock('@/lib/typeorm/credencial.repository');

describe('Factory: makeCreateCredencialUseCase', () => {
  it('deve criar uma instância de CreateCredencialCase com CredencialRepository', () => {
    const createCredencialUseCase = makeCreateCredencialUseCase();

    expect(createCredencialUseCase).toBeInstanceOf(CreateCredencialUseCase);
    expect(CredencialRepository).toHaveBeenCalledTimes(1);
  });
});
