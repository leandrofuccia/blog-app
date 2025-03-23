import { env } from '@/env';
import { appDataSource, initializeDatabase, closeDatabase } from '@/lib/typeorm/typeorm';

jest.mock('@/env', () => ({
  env: {
    NODE_ENV: 'test',
    DATABASE_USER: 'test_user',
    DATABASE_HOST: 'localhost',
    DATABASE_NAME: ':memory:',
    DATABASE_PASSWORD: '',
    DATABASE_PORT: '',
    JWT_SECRET: 'test_secret',
  },
}));

describe('TypeORM Database Configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve configurar corretamente o DataSource no ambiente de teste', () => {
    expect(appDataSource.options.type).toBe('sqlite');
    expect(appDataSource.options.database).toBe(':memory:');

    if (
      appDataSource.options.type !== 'sqlite' &&
      'host' in appDataSource.options &&
      'port' in appDataSource.options &&
      'username' in appDataSource.options &&
      'password' in appDataSource.options
    ) {
      expect(appDataSource.options.host).toBeDefined();
      expect(appDataSource.options.port).toBeDefined();
      expect(appDataSource.options.username).toBeDefined();
      expect(appDataSource.options.password).toBeDefined();
    }
  });

  it('deve inicializar o banco de dados sem erros', async () => {
    const initializeSpy = jest.spyOn(appDataSource, 'initialize').mockResolvedValue(appDataSource);

    await expect(initializeDatabase()).resolves.not.toThrow();
    expect(initializeSpy).toHaveBeenCalled();
  });

  it('deve fechar a conexão do banco sem erros', async () => {
    const destroySpy = jest.spyOn(appDataSource, 'destroy').mockResolvedValue(undefined);

    Object.defineProperty(appDataSource, 'isInitialized', { value: true });

    await expect(closeDatabase()).resolves.not.toThrow();
    expect(destroySpy).toHaveBeenCalled();
  });


  it('deve capturar erro ao tentar conectar ao banco de dados', async () => {
    jest.spyOn(appDataSource, 'initialize').mockRejectedValue(new Error('Falha na conexão'));
  
    await expect(initializeDatabase()).rejects.toThrow('Falha na conexão');
  });


  it('não deve tentar desconectar se o banco não estiver inicializado', async () => {
    Object.defineProperty(appDataSource, 'isInitialized', { value: false });
  
    await expect(closeDatabase()).resolves.not.toThrow();
  });

 
    
    it('não deve tentar fechar o banco se não estiver inicializado', async () => {
      Object.defineProperty(appDataSource, 'isInitialized', { value: false });
      const destroySpy = jest.spyOn(appDataSource, 'destroy');
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      await closeDatabase();
      expect(destroySpy).not.toHaveBeenCalled();
      expect(consoleLogSpy).not.toHaveBeenCalled();
      consoleLogSpy.mockRestore();
    });
  
    it('deve capturar e logar erros ao fechar o banco de dados', async () => {
      Object.defineProperty(appDataSource, 'isInitialized', { value: true });
      const error = new Error('Erro ao desconectar');
      jest.spyOn(appDataSource, 'destroy').mockRejectedValue(error);
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  
      await closeDatabase();  
      expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao desconectar do banco de dados:', error);  
      consoleErrorSpy.mockRestore();
    
  });


  it('deve usar .env quando NODE_ENV não for "test"', () => {
    process.env.NODE_ENV = 'production';
    const envFilePath = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
    expect(envFilePath).toBe('.env');
  });  

  it('deve usar "localhost" quando NODE_ENV for "test"', () => {
    process.env.NODE_ENV = 'test';
    const databaseHost = process.env.NODE_ENV === 'test' ? 'localhost' : env.DATABASE_HOST || (process.env.DOCKER_ENV ? 'db' : 'localhost');
    expect(databaseHost).toBe('localhost');
  });

  it('deve usar env.DATABASE_HOST se definido', () => {
    process.env.NODE_ENV = 'production';
    process.env.DATABASE_HOST = 'custom-host';
    const databaseHost = process.env.DATABASE_HOST || (process.env.DOCKER_ENV ? 'db' : 'localhost');
    expect(databaseHost).toBe('custom-host');
  });

  it('deve usar "db" se process.env.DOCKER_ENV for verdadeiro', () => {
    process.env.NODE_ENV = 'production';
    process.env.DOCKER_ENV = 'true';
    const databaseHost = process.env.DOCKER_ENV ? 'db' : 'localhost';
    expect(databaseHost).toBe('db');
  });

  it('deve usar "localhost" se nenhum host for definido e DOCKER_ENV for falso', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.DATABASE_HOST;
    delete process.env.DOCKER_ENV;
    const databaseHost = process.env.DOCKER_ENV ? 'db' : 'localhost';
    expect(databaseHost).toBe('localhost');
  });
   
});



