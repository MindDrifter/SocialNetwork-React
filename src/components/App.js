import React, { useRef, useState } from "react";


import UserList from './UserList'
import Chat from './Chat'

import io from 'socket.io-client'


import '../styles/App.css';


function App() {
  const [clientUsers, setClientUsers] = useState()
  var socket = useRef(null);
 

  React.useEffect(()=>{
    socket.current = io()
    

    console.log('!')
  
      socket.current.on('getAllUsers', users=>{
        setClientUsers(users)
        
      })
      
    
  },[])
    
const [messages, setMessages]= useState([{
    msg:'123',
    myMsg:false
  }])

  function onSendMain(msg){
    setMessages(
      old => [...old, {
        msg:msg,
        myMsg:true
      }]
    )
    
    socket.current.emit('private message', {msg})
  }
  
 return (
    <div >
      <UserList users = {clientUsers}/>
      <Chat messages={messages} onSend = {onSendMain}/>
      <Chat/>
    </div>
  )
}

export default App;