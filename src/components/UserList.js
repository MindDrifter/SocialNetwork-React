import React, { useEffect, useState } from 'react'

import '../styles/UserList.css'


function userList(props){


  var itemsToRender;
  if (props.users) {
    itemsToRender = props.users.users.map(item => {
      return <li className="listLi" id={item.userID} onClick = {selectUser} >{item.userID}</li>
    });
  }

  function selectUser(e) {
    // if (e.target.className !== 'listLi userListSelected'){
    //   e.target.className+= ' userListSelected'
    // }

    // console.log(e.target.className);
    // console.log(e);
}
 function c(e) {
   console.log(e.target.querySelectorAll('li'));
    if (e.target.className === 'listLi'){
      // e.target.className+= ' userListSelected'
    }
 }
 
  return(
    <div className="userList">
      <ul className="listUl" onClick={c}>
        {itemsToRender}
      </ul>
    </div>
  )
}

export default userList