import React from 'react'

export default function Message (props) {
    var className;

    if(props.message.myMsg === true){
        var className =  <li className="chatLi myMsg">{props.message.msg}</li>
    }else{
        var className =  <li className="chatLi">{props.message.msg}</li>
    }
    return(
       className 
    )
}