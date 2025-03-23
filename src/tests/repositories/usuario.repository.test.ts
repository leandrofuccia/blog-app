import { Credencial } from "@/entities/credencial.entity";
import { Perfil } from "@/entities/perfil.entity";
import { Usuario } from "@/entities/usuario.entity";
import { appDataSource } from "@/lib/typeorm/typeorm";
import { UsuarioRepository } from "@/lib/typeorm/usuario.repository";

let usuarioRepository: UsuarioRepository;

beforeAll(async () => {
  appDataSource.setOptions({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Credencial, Usuario, Perfil], 
    synchronize: false,
    logging: false,
  });

  await appDataSource.initialize();
  usuarioRepository = new UsuarioRepository();
});

beforeEach(async () => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.query('PRAGMA foreign_keys=OFF');
  await queryRunner.query('DROP TABLE IF EXISTS credencial');
  await queryRunner.query('DROP TABLE IF EXISTS usuario');
  await queryRunner.query('DROP TABLE IF EXISTS perfil');
  await queryRunner.query('PRAGMA foreign_keys=ON');
  await appDataSource.synchronize(true);
});

afterAll(async () => {
  await appDataSource.destroy();
});

describe('UsuarioRepository', () => {
  it('deve criar um usuário', async () => {

    const perfilRepository = appDataSource.getRepository(Perfil);
      const perfil = await perfilRepository.save({
      id: 2,
      perfil: "Professor",
    });

    const credencial = await appDataSource.getRepository(Credencial).save({
      username: 'testuser',
      password: 'securepassword',
    });

    const newUsuario = {
      nome: 'Test User',
      perfilid: perfil?.id,
      credencialId: credencial.id,
    };

    const savedUsuario = await usuarioRepository.create(newUsuario);
    
    expect(savedUsuario).toBeDefined();
    expect(savedUsuario).toHaveProperty('id');
    expect(savedUsuario?.nome).toBe(newUsuario.nome);
  });


  it('deve encontrar um usuário pelo ID', async () => {
  
    const perfilRepository = appDataSource.getRepository(Perfil);
      const perfil = await perfilRepository.save({
      id: 2,
      perfil: "Professor",
    });

    
    const credencial = await appDataSource.getRepository(Credencial).save({
      username: 'testuser',
      password: 'securepassword',
    });

    const newUsuario = {
      nome: 'Test User',
      perfilid: perfil?.id,
      credencialId: credencial.id,
    };

    const savedUsuario = await usuarioRepository.create(newUsuario);
    
    if (savedUsuario?.id === undefined) {
      throw new Error('ID do usuário é indefinido');
    }

    const foundUsuario = await usuarioRepository.findByUserId(savedUsuario.id);

    expect(foundUsuario).toBeDefined();
    expect(foundUsuario?.id).toBe(savedUsuario.id);
  });  
  

  it('deve encontrar usuário por credencial ID', async () => {
    
    const perfilRepository = appDataSource.getRepository(Perfil);
      const perfil = await perfilRepository.save({
      id: 2,
      perfil: "Professor",
    });
    
    const credencial = await appDataSource.getRepository(Credencial).save({
      username: 'testuser',
      password: 'securepassword',
    });

    const newUsuario = {
      nome: 'Test User',
      perfilid: perfil?.id,
      credencialId: credencial.id,
    };

    const savedUsuario = await usuarioRepository.create(newUsuario);
    if (!savedUsuario) throw new Error("Usuário não pôde ser salvo");
    
    const foundUsuario = await usuarioRepository.findUsuarioByCredencialId(savedUsuario.credencialId!);
    expect(foundUsuario).toHaveLength(1);
    expect(foundUsuario[0].credencialId).toBe(savedUsuario.credencialId);
  });

  it('deve encontrar um usuário pelo nome', async () => {
    
    const perfilRepository = appDataSource.getRepository(Perfil);
      const perfil = await perfilRepository.save({
      id: 2,
      perfil: "Professor",
    });
    
    const credencial = await appDataSource.getRepository(Credencial).save({
      username: 'testuser',
      password: 'securepassword',
    });
  
    const newUsuario = {
      nome: 'Test User',
      perfilid: perfil?.id,
      credencialId: credencial.id,
    };
  
    await usuarioRepository.create(newUsuario);
  
    const foundUsuario = await usuarioRepository.findByUsername(newUsuario.nome);
  
    expect(foundUsuario).toBeDefined();
    expect(foundUsuario?.nome).toBe(newUsuario.nome);
  });
  

  it('deve retornar null para usuário inexistente', async () => {
    const foundUsuario = await usuarioRepository.findByUserId(999);
    expect(foundUsuario).toBeNull();
  });

 
  it('deve retornar array vazio ao buscar usuário por credencial inexistente', async () => {
    const foundUsuarios = await usuarioRepository.findUsuarioByCredencialId(999);
    expect(foundUsuarios).toEqual([]);
  });


  it('deve verificar se NODE_ENV afeta a criação de datas', async () => {
    process.env.NODE_ENV = 'test';
  
    let perfilRepository = appDataSource.getRepository(Perfil);
      const perfilTest = await perfilRepository.save({
      id: 2,
      perfil: "Professor",
    });
    
    const credencialTest = await appDataSource.getRepository(Credencial).save({
      username: 'testuser',
      password: 'securepassword',
    });

    const usuarioTest = new Usuario('Test User', perfilTest?.id);
    usuarioTest.credencialId = credencialTest.id;
    await appDataSource.getRepository(Usuario).save(usuarioTest);
  
    expect(typeof usuarioTest.datacriacao).toBe('string');
    expect(typeof usuarioTest.ultimologin).toBe('string');
  
    process.env.NODE_ENV = 'production';

    perfilRepository = appDataSource.getRepository(Perfil);
    const perfilProd = await perfilRepository.save({
      id: 1,
      perfil: "Aluno",
    });
  
     const credencialProd = await appDataSource.getRepository(Credencial).save({
      username: 'produser',
      password: 'securepassword',
    });
    const usuarioProd = new Usuario('Prod User', perfilProd?.id);
    usuarioProd.credencialId = credencialProd.id;
    await appDataSource.getRepository(Usuario).save(usuarioProd);
  
    const usuarioProdReloaded = await appDataSource.getRepository(Usuario).findOneBy({ id: usuarioProd.id });

    const datacriacao = typeof usuarioProdReloaded?.datacriacao === 'string'
      ? new Date(usuarioProdReloaded.datacriacao)
      : usuarioProdReloaded?.datacriacao;
  
    const ultimologin = typeof usuarioProdReloaded?.ultimologin === 'string'
      ? new Date(usuarioProdReloaded.ultimologin)
      : usuarioProdReloaded?.ultimologin;
  
    expect(datacriacao).toBeInstanceOf(Date);
    expect(ultimologin).toBeInstanceOf(Date);
  });
  
});
