
'use strict'; 
// Simple usage:
import WebSocketExpress, { Router } from 'websocket-express';
import {readMsgAll, writeMsg,readMsg } from './kafka';
const app = new WebSocketExpress();
const router = new Router();

 
const PORT = 8000;
 
const HOST = 'localhost';

app.use(function (req, res, next) {
    console.log('middleware'); 
    return next();
  });

router.ws('/', async (req, res) => {
    
    const ws = await res.accept();
    console.log("redy")
     
    readMsgAll((msg) => {
        ws.send(msg);
    });
}); 


app.get('/', (req, res) => {
    console.log("redy")
     
    
 
}); 

app.post('/board', (req, res) => {
    
});

app.post('/story', async (req, res) => {
    console.log("story");
    await writeMsg("id" , "title" , "story") ;
     res.send( )
});

app.post('/comment', (req, res) => {
   
});

app.get('/boards', (req, res) => {
    res.send()
});

app.use(router);
   
  
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);