import React from 'react';
import './App.css';  
import Column from './components/Column/Column';

 
function App() {
  /*
  const socket = new WebSocket('ws://localhost:8000/');


  // Connection opened
  socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
  });

  // Listen for messages
  socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
  });
  <Column title="Todo" />
        
  */
  return (
    <div className="App">
      <div className="grid-container">
         <Column title="Todo"/>
         <Column title="In work"/>
         <Column title="Done"/>
        <div></div>
      </div>
    </div>
  );
}

export default App;
