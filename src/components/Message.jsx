import React from 'react'
import IG from "../assets/images/man.png"
import IE from "../assets/images/card1.jpg"

const Message = () => {
  return (
    <div className='message owner'>
       <div className='messageInfo'>
        <img className='messageImage' src={IG} alt=''/>
        <span>Just now</span>
      </div>
      <div className='messageContent'>
        <p className='messageP'>Hello</p>
        <img className='imageBlock' src={IE} alt=''/>
      </div> 
    </div>
  )
}

export default Message
