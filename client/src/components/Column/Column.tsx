import React from 'react';
 
import './Column.css';  
import Post from '../Post/Post';

function Column(prop : any) { 
  return (
    <div>
      <div>
       <div>{prop.title}</div>
       <div> 
         <Post title="title" text="text"/>
       </div>
      </div>
    </div>
  );
}

export default Column;
