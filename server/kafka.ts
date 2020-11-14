import { KafkaClient as Client, Producer, Consumer } from 'kafka-node';
import { promisify } from 'util'

const kafkaHost = 'localhost:9092';
const client = new Client({ kafkaHost });

const producer = new Producer(client);

 

async function createTopic(name: string) {
  const cT = promisify(client.createTopics).bind(client);
  console.log("default")
  return cT([{ topic: name, partitions: 1, replicationFactor: 1 }])

}

export async function writeMsg(id: string, title: string, story: string) {
  var payloads = [
    { topic: 'default', messages: JSON.stringify({ id, title, story }) }
  ];
  const pT = promisify(producer.send).bind(producer);
  return pT(payloads);

}

export  function readMsgAll(cb: (msg: string) => any) {
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
 
}

export function readMsg(cb: (msg: string) => any) {
  console.log("readmsg");
  /*consumer.on('message', function (message) {
    console.log("m");
    cb(message.value.toString());
  });
  */

}

