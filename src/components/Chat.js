import React, { useLayoutEffect, useState } from 'react'

import '../styles/Chat.css'

import Message from './Message'

export default function Chat (props) {
    const [inputValue, setInputValue] = useState('')

   
    function handlerSubmit(e) {
      e.preventDefault();
      setInputValue('')
    } 

    function getInputValue (i) {
    setInputValue(i.target.value)
     console.log(inputValue);
    }

    var itemsToRender;
  if (props.messages) {
    itemsToRender = props.messages.map(item => {
      return <Message message = {item}/>
    });
  }

	return(
    <div className="containerChat">
      <div className="userChat">
        <ul className="chatUl">
          {itemsToRender}
        </ul> 
        <div className="form">
          <form onSubmit={handlerSubmit} >
            <input type="text" onChange ={getInputValue} value ={inputValue}></input>
            <input type="submit" onClick ={()=>props.onSend(inputValue)}></input>
          </form>
        </div>
      </div>
    </div>
	)
}

