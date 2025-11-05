
import { KafkaClient as Client, Producer, Consumer } from 'kafka-node';
import { promisify } from 'util';

const kafkaHost = 'kafka-service.default.svc.cluster.local:9092';
let client: Client;
let producer: Producer;

async function initKafka(retryDelay = 5000) {
  while (true) {
    try {
      client = new Client({ kafkaHost });
      producer = new Producer(client);
      // Wait for producer to be ready
      await new Promise((resolve, reject) => {
        producer.on('ready', () => resolve(undefined));
        producer.on('error', reject);
      });
      console.log('Kafka connected');
      break;
    } catch (err) {
      console.error('Kafka connection failed, retrying in', retryDelay / 1000, 'seconds:', err);
      await new Promise(res => setTimeout(res, retryDelay));
    }
  }
}

// Initialize Kafka connection on startup
initKafka();

 


async function createTopic(name: string) {
  try {
    const cT = promisify(client.createTopics).bind(client);
    console.log("default");
    return await cT([{ topic: name, partitions: 1, replicationFactor: 1 }]);
  } catch (err) {
    console.error('Error creating topic:', err);
    throw err;
  }
}


export async function writeMsg(id: string, title: string, story: string) {
  try {
    var payloads = [
      { topic: 'default', messages: JSON.stringify({ id, title, story }) }
    ];
    const pT = promisify(producer.send).bind(producer);
    return await pT(payloads);
  } catch (err) {
    console.error('Error sending message:', err);
    throw err;
  }
}


export function readMsgAll(cb: (msg: string) => any) {
  try {
    const consumer = new Consumer(
      client,
      [{ topic: 'default', partition: 0, offset: 0 }],
      { fromOffset: true }
    );
    console.log("readmsg");
    consumer.on('message', function (message) {
      console.log("m");
      cb(message.value.toString());
    });
    consumer.on('error', function (err) {
      console.error('Consumer error:', err);
    });
  } catch (err) {
    console.error('Error initializing consumer:', err);
    throw err;
  }
}

 

