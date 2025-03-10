import { app } from './app';
import { initializeDatabase } from './lib/typeorm/typeorm';
import { env } from './env'; // Certifique-se de importar o env corretamente

async function startServer() {
  try {
    // Inicializa o banco de dados
    await initializeDatabase();
    console.log('Database initialized.');

    // Define porta e host a partir do arquivo .env
    const port = env.PORT || 3002;
    const host = "0.0.0.0"; // Use "0.0.0.0" para aceitar conexões externas

    // Inicia o servidor
    app.listen({ port, host }, (err, address) => {
      if (err) {
        console.error('Error starting server:', err);
        process.exit(1);
      }
      console.log(`Server is running on ${address}`);
    });
  } catch (error) {
    console.error('Error initializing the server:', error);
    process.exit(1);
  }
}

// Inicia o servidor
startServer();
