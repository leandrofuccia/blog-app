import { PostagemRepository } from "@/lib/typeorm/postagem.repository";
import { Postagem } from '@/entities/postagem.entity';
import { Usuario } from '@/entities/usuario.entity';
import { Credencial } from '@/entities/credencial.entity';
import { appDataSource } from '@/lib/typeorm/typeorm';
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { Perfil } from "@/entities/perfil.entity";

let postagemRepository: PostagemRepository;

beforeAll(async () => {
  appDataSource.setOptions({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Postagem, Usuario, Credencial, Perfil], 
    synchronize: false,
    logging: false,
  });

  await appDataSource.initialize();
  postagemRepository = new PostagemRepository();
});

beforeEach(async () => {
  const queryRunner = appDataSource.createQueryRunner();
  
  await queryRunner.query('PRAGMA foreign_keys=OFF');
  await queryRunner.query('DROP TABLE IF EXISTS postagem');
  await queryRunner.query('DROP TABLE IF EXISTS usuario');
  await queryRunner.query('DROP TABLE IF EXISTS credencial');
  await queryRunner.query('DROP TABLE IF EXISTS perfil');
  await queryRunner.query('PRAGMA foreign_keys=ON');

  await appDataSource.synchronize(true);

  const perfilRepository = appDataSource.getRepository(Perfil);
  const perfil = await perfilRepository.save({
    id: 1,
    perfil: "Aluno",
  });

  
  const credencialRepository = appDataSource.getRepository(Credencial);
  const credencial = await credencialRepository.save({
    username: 'teste',
    password: 'senha',
  });

  const usuarioRepository = appDataSource.getRepository(Usuario);
  await usuarioRepository.save({
    nome: 'Usuário Teste',
    perfilid: perfil?.id,
    credencialId: credencial.id, 
  });

  await queryRunner.release();
});

afterAll(async () => {
  await appDataSource.destroy();
});

describe('PostagemRepository', () => {
  it('deve criar uma postagem', async () => {
    const newPost = {
      titulo: 'Título de Teste',
      conteudo: 'Conteúdo de Teste',
      usuarioid: 1, 
    };

    const savedPost = await postagemRepository.create(newPost);
    expect(savedPost).toHaveProperty('id');
    expect(savedPost.titulo).toBe(newPost.titulo);
  });

 
  it('deve encontrar a postagem pelo ID', async () => {
    const newPost = {
      titulo: 'Título de Teste',
      conteudo: 'Conteúdo de Teste',
      usuarioid: 1, 
    };

    const savedPost = await postagemRepository.create(newPost);
    
    if (savedPost.id === undefined) {
      throw new Error('ID da postagem é indefinido');
    }

    const foundPost = await postagemRepository.findPostagemById(savedPost.id);

    expect(foundPost).toBeDefined();
    expect(foundPost?.id).toBe(savedPost.id);
  });


  it('deve encontrar postagens pelo usuário ID', async () => {
    const newPost = {
      titulo: 'Título de Teste',
      conteudo: 'Conteúdo de Teste',
      usuarioid: 1,
    };

    await postagemRepository.create(newPost);
    
    const posts = await postagemRepository.findPostagemByUsuarioId(1, 1, 10);
    
    expect(posts).toHaveLength(1);
    expect(posts[0].titulo).toBe(newPost.titulo);
  });


  it('deve atualizar uma postagem', async () => {
    const newPost = {
      titulo: 'Título de Teste',
      conteudo: 'Conteúdo de Teste',
      usuarioid: 1,
    };

    const savedPost = await postagemRepository.create(newPost);
    
    const updatedPost = await postagemRepository.update(savedPost.id as number, 'Novo Título', 'Novo Conteúdo');
    
    expect(updatedPost.titulo).toBe('Novo Título');
    expect(updatedPost.conteudo).toBe('Novo Conteúdo');
  });


  it("deve lançar um erro ao tentar atualizar uma postagem inexistente", async () => {
    jest.spyOn(postagemRepository["repository"], "findOne").mockResolvedValue(null);
  
    await expect(postagemRepository.update(999, "Novo Título", "Novo Conteúdo"))
      .rejects
      .toThrow(ResourceNotFoundError);
  });

  it("deve retornar null quando a postagem não for encontrada", async () => {
    jest.spyOn(postagemRepository["repository"], "findOne").mockResolvedValue(null);
  
    const postagem = await postagemRepository.findPostagemById(999);
    
    expect(postagem).toBeNull();
  });

 
  it("deve excluir uma postagem", async () => {
    const newPost = await postagemRepository.create({
      titulo: "Título para Deletar",
      conteudo: "Conteúdo para Deletar",
      usuarioid: 1,
    });

    const savedPost = await postagemRepository.create(newPost);
    await postagemRepository.delete(savedPost.id!);   
    const postExcluido = await postagemRepository.findPostagemById(savedPost.id!);
    expect(postExcluido).toBeNull();
  });


  it('deve buscar postagens pelo título', async () => {
    let newPost = await postagemRepository.create({
      titulo: "Primeira Postagem",
      conteudo: "Conteúdo único",
      usuarioid: 1,
    });

    let savedPost = await postagemRepository.create(newPost);
    if (savedPost.id === undefined) {
      throw new Error('ID da postagem é indefinido');
    }

    newPost = await postagemRepository.create({
      titulo: "Segunda Postagem",
      conteudo: "Outro conteúdo",
      usuarioid: 1,
    });
    savedPost = await postagemRepository.create(newPost);
    if (savedPost.id === undefined) {
      throw new Error('ID da postagem é indefinido');
    }
    
    const foundPost = await postagemRepository.findPostagemBySearch("Primeira", 1, 10);

    expect(foundPost.length).toBe(1);
    expect(foundPost[0].titulo).toBe("Primeira Postagem");
  });



  it('deve buscar postagens pelo conteudo', async () => {
    let newPost = await postagemRepository.create({
      titulo: "Primeira Postagem",
      conteudo: "Conteúdo único",
      usuarioid: 1,
    });

    let savedPost = await postagemRepository.create(newPost);
    if (savedPost.id === undefined) {
      throw new Error('ID da postagem é indefinido');
    }

    newPost = await postagemRepository.create({
      titulo: "Segunda Postagem",
      conteudo: "Outro conteúdo",
      usuarioid: 1,
    });

    savedPost = await postagemRepository.create(newPost);
    if (savedPost.id === undefined) {
      throw new Error('ID da postagem é indefinido');
    }
    
    const foundPost = await postagemRepository.findPostagemBySearch("único", 1, 10);

    expect(foundPost.length).toBe(1);
    expect(foundPost[0].conteudo).toBe("Conteúdo único");
  });


  it('deve listar todas a postagens com a paginação correta', async () => {
    let newPost1 = postagemRepository.create({ titulo: "Postagem 1", conteudo: "Conteúdo 1", usuarioid: 1 });
    let newPost2 = postagemRepository.create({ titulo: "Postagem 2", conteudo: "Conteúdo 2", usuarioid: 1 });
    
    postagemRepository.create(await newPost1);
    postagemRepository.create(await newPost2);
    
    const foundPost = await postagemRepository.findPostagem(1, 2);
     
    expect(foundPost.length).toBe(2);
  });


  it('deve retornar uma array vazio quando não encontrar nenhuma postagem', async () => {        
    const foundPost = await postagemRepository.findPostagem(1, 2);
    expect(foundPost).toEqual([]);
  });


  it("deve retornar todas as postagens quando palavrasChave for vazia", async () => {
    jest.spyOn(postagemRepository["repository"], "createQueryBuilder").mockReturnValue({
      where: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([{ id: 1, titulo: "Título", conteudo: "Conteúdo" }]),
    } as any);
  
    const postagens = await postagemRepository.findPostagemBySearch("", 1, 10);
  
    expect(postagens).toHaveLength(1);
  });

});
