/*import { env } from '@/env'

import {app} from '@/app'

app.listen({
    host: '0.0.0.0',
    port: env.PORT
}).then(()=> {
    console.log('Server is running on http://localhost:3002');
})*/


import { app } from './app';

app.listen({ port: 3002 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});