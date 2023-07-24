import { uuid } from 'uuidv4';

import { Client, LocalAuth } from "whatsapp-web.js"

export const client = new Client({ authStrategy: new LocalAuth({ clientId: uuid() }) });

// client.on('qr', (qr) => {
//   console.log(qr);
//   return qr
// })

// client.on('ready', () => {
//   console.log('O cliente está pronto!');
// });

client.initialize();
