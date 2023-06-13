import React from 'react'
import "../assets/css/chatPage.css";
import Man from "../assets/images/man.png"
// import MoreIcn from '..assets/images/searchimg.png'
import Attach from "../assets/images/clip.png"
import Image from "../assets/images/image-gallery.png"
import Messages from "../components/Messages"

const ChatPage = () => {
  return (
    <div className="mainChatContainer">
      <div className='chatContainer'>
      <div className='chatInfo'>
        <span>Mentor</span>
         {/* <div className='chatImage'>
          <img src={Man} alt=""/> 
           <img src={MoreIcn} alt=""/>
        </div>  */}
        </div> 
        <Messages/>

        <div className='input'>
          <input type='text' placeholder='Type something...'/>
          <div className='send'>
            <img src ={Attach} alt="" className='chatImg'/>
            <input type="file" style= {{display:"none"}} id= "file"/>
            <label htmlFor="file">
              <img src={Image} alt="" className='chatImg'/>
            </label>
            <button className='chatBtn'>Send</button>
          </div>
        </div>     
      </div>
    </div>
  )
}

export default ChatPage