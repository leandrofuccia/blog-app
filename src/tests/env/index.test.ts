jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('Env Configuration', () => {
  beforeEach(() => {
    jest.resetModules(); 
    process.env = { ...process.env, 
      NODE_ENV: 'test',
      PORT: '3002',
      DATABASE_USER: 'test_user',
      DATABASE_HOST: 'localhost',
      DATABASE_NAME: ':memory:',
      DATABASE_PASSWORD: '',
      DATABASE_PORT: '',
      JWT_SECRET: 'test_secret',
    };
  });

  it('deve carregar corretamente as variáveis de ambiente no modo de teste', async () => {
    const { env } = await import('@/env'); 

    expect(env.NODE_ENV).toBe('test');
    expect(env.PORT).toBe(3002);
    expect(env.DATABASE_USER).toBe('test_user');
    expect(env.DATABASE_HOST).toBe('localhost');
    expect(env.DATABASE_NAME).toBe(':memory:');
    expect(env.JWT_SECRET).toBe('test_secret');
  });


  it('deve lançar um erro quando as variáveis de ambiente forem inválidas', async () => {
    process.env = { NODE_ENV: 'invalid_env' }; 
    await expect(import('@/env')).rejects.toThrow('Variáveis de ambiente inválidas');
  });


  it('deve chamar dotenv.config com o caminho correto', async () => {
    const dotenvSpy = jest.spyOn(require('dotenv'), 'config');  
    await import('@/env');  
    expect(dotenvSpy).toHaveBeenCalledWith({ path: expect.stringContaining('.env') });  
    dotenvSpy.mockRestore();
  });
    
});
