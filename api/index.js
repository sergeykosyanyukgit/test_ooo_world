import { createClient } from 'redis';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('Новый клиент подключился!');

  ws.on('message', (message) => {
    console.log(`Получено сообщение: ${message}`);
    ws.send('Сообщение получено!');
  });

  ws.on('close', () => {
    console.log('Клиент отключился');
  });
});


const client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

await client.set('key', 'value');
const value = await client.get('key');
console.log(value)
await client.disconnect();