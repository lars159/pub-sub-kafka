
import WebSocketExpress, { Router } from 'websocket-express';
import { readMsgAll, writeMsg } from './kafka';

const app = new WebSocketExpress();
const router = new Router();

const PORT = 8000;
const HOST = '0.0.0.0';

// Sample tasks data (replace with your Kafka integration)
const tasks = [
  {
    id: '1',
    title: 'First Task',
    description: 'This is the first task',
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Second Task',
    description: 'This is a task in progress',
    status: 'in-work',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Store all active WebSocket connections
const clients = new Set();

// Broadcast message to all connected clients
const broadcast = (message: string) => {
  clients.forEach((client: any) => {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(message);
    }
  });
};

// Middleware for logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  return next();
});

// WebSocket route for real-time updates
router.ws('/ws', async (req, res) => {
  try {
    const ws = await res.accept();
    console.log('WebSocket connection established');
     
    clients.add(ws);
 
    ws.send(JSON.stringify(tasks));
 
    ws.on('message', async (message) => {
      try {
        const newTask = JSON.parse(message.toString()); // Convert Buffer to string
        console.log('Received new task:', newTask);
         
        tasks.push(newTask);
         
        await writeMsg(newTask.id, newTask.title, newTask.description);
         
        broadcast(JSON.stringify(tasks));
      } catch (error) {
        console.error('Error processing incoming message:', error);
      }
    });

    // Set up Kafka consumer
    readMsgAll((msg) => {
      try {
        const parsedMsg = JSON.parse(msg);
        
        if (!tasks.find(t => t.id === parsedMsg.id)) {
          tasks.push(parsedMsg);
          broadcast(JSON.stringify(tasks));
        }
      } catch (error) {
        console.error('Error processing Kafka message:', error);
      }
    });
 
    ws.on('close', () => {
      console.log('WebSocket connection closed');
      clients.delete(ws); // Remove from clients set
    });

  } catch (error) {
    console.error('WebSocket error:', error);
  }
});

 
// Add router middleware
app.use(router);

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});