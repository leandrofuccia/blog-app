import { app } from './app';
import { initializeDatabase } from './lib/typeorm/typeorm'; 

async function startServer() {
  try {
    await initializeDatabase();
    console.log('Database initialized.');

    app.listen({ port: 3002, host: 'localhost' }, (err, address) => {
      if (err) {
        console.error('Error starting server:', err);
        process.exit(1);
      }
      console.log(`Server is running on ${address}`);
    });
  } catch (error) {
    console.error('Error initializing the database:', error);
    process.exit(1);
  }
}

startServer();
