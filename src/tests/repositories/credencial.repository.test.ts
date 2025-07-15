import { Comentario } from "@/entities/comentario.entity";
import { Credencial } from "@/entities/credencial.entity";
import { Perfil } from "@/entities/perfil.entity";
import { Usuario } from "@/entities/usuario.entity";
import { CredencialRepository } from "@/lib/typeorm/credencial.repository";
import { appDataSource } from "@/lib/typeorm/typeorm";

let credencialRepository: CredencialRepository;

beforeAll(async () => {
  appDataSource.setOptions({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Credencial, Usuario, Perfil, Comentario], 
    synchronize: false,
    logging: false,
  });

  await appDataSource.initialize();
  credencialRepository = new CredencialRepository();
});

beforeEach(async () => {
  const queryRunner = appDataSource.createQueryRunner();
  
  await queryRunner.query('PRAGMA foreign_keys=OFF');
  await queryRunner.query('DROP TABLE IF EXISTS credencial');
  await queryRunner.query('DROP TABLE IF EXISTS usuario');
  await queryRunner.query('DROP TABLE IF EXISTS Perfil');
  await queryRunner.query('PRAGMA foreign_keys=ON');
  await appDataSource.synchronize(true);
});

afterAll(async () => {
  await appDataSource.destroy();
});

describe('CredencialRepository', () => {
  it('deve criar uma credencial', async () => {
    const newCredencial = {
      username: 'teste@teste.com.br',
      password: '1234',
      
    };

    const savedCredencial = await credencialRepository.create(newCredencial);
    expect(savedCredencial).toHaveProperty('id');
    expect(savedCredencial?.username).toBe(newCredencial.username);
  });


  it('deve buscar credencial pelo nome', async () => {
    let newCredencial= {
      username: "teste@gmail.com.br",
      password: "1234",
      
    };

    let savedCredencial = await credencialRepository.create(newCredencial);
    if (savedCredencial?.id === undefined) {
      throw new Error('ID da credencial é indefinido');
    }

    newCredencial ={
        username: "fulano@hotmail.com.br",
        password: "1234",
    };

    savedCredencial = await credencialRepository.create(newCredencial);
    if (savedCredencial?.id === undefined) {
      throw new Error('ID da credencial é indefinido');
    }
    
    const foundCredencial = await credencialRepository.findByUsername("teste@gmail.com.br");
    
    expect(foundCredencial.username).toBe("teste@gmail.com.br");
  });

 });
