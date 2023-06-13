import React, { useEffect, useState } from "react";
import "../assets/css/chatPage.css";
import chatimage from "../assets/images/chatimage.jpg";
import { useNavigate } from "react-router-dom";
import Profile from "../assets/images/man.png";
import {
  equalTo,
  get,
  onValue,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import { db } from "../firebase";
const ChatPage = () => {
  const userId = localStorage.getItem("suprUserId");
  const navigate = useNavigate();
  const [chats, setchats] = useState([]);
  const [users, setusers] = useState([]);
  const [usersdata , setusersdata] = useState([]);
  useEffect(() => {
    const dataq1 = query(
      ref(db, "Chats"),
      orderByChild("senderId"),
      equalTo(userId)
    );
    get(dataq1).then((snapshot) => {
      const data = snapshot.val();
      let temparr = [];
      if (data) {
        let arr = [];
        const datakeys = Object.keys(data);
        for (let i = 0; i < datakeys.length; i++) {
          arr.push(data[datakeys[i]]);
          temparr.push(data[datakeys[i]].recieverId);
        }
        setchats(arr);
      }
      // console.log(temparr)
      setusers(temparr);
    });
  }, []);
  useEffect(() => {
    if (users) {
      let arr = [];
      for (var i = 0; i < users.length; i++) {
        const dataq1 = query(
          ref(db, "Mentors"),
          orderByChild("id"),
          equalTo(users[i])
        );
        get(dataq1).then((snapshot) => {
          const data = snapshot.val();
          if (data) {
            const datakeys = Object.keys(data);
            for (let i = 0; i < datakeys.length; i++) {
              arr.push(data[datakeys[i]]);
              setusersdata(arr);
              // console.log(arr)/
            }
          }
        });
        // console.log(arr)
      }
      // console.log(arr);
    }
  }, [users]);
  return (
    <div className="ChatPageContainer">
      {chats.length === 0 && (
        <div className="ChatHeaderCont">
          <div className="ChatHeader">Welcome to the chat section..</div>
          <div className="ChatHeader2">Start Your Chats with mentor..</div>
          <img src={chatimage} className="ChatHeaderImage" alt="icon" />
          <div
            onClick={() => {
              navigate("/mentors");
            }}
            className="ChatHeaderButton"
          >
            Get's start Now
          </div>
        </div>
      )}
      {chats && chats.length !== 0 && (
        <div class="chat-container">
          {
            // console.log(usersdata)
          }
          <div className="chatListCont">
            {
              usersdata && usersdata.length !== 0 && usersdata.map((value , idx)=>(
                <div key={idx} className="ChatListDiv">
                  <img src={Profile} className="ChatListImg" alt="" />
                  <div className="ChatListText">{value?.name}</div>
                </div>
              ))
            }
          </div>
          <div className="chatcont">
            <div class="chat-header">
              <h2>Chat with Mentor's</h2>
            </div>
            <div class="chat-messages">
              <div class="message received">
                <div class="message-sender">John Doe</div>
                <div class="message-content">Hello there!</div>
                <div class="message-time">10:30 AM</div>
              </div>
              <div class="message sent">
                <div class="message-sender">You</div>
                <div class="message-content">Hi John! How can I help you?</div>
                <div class="message-time">10:35 AM</div>
              </div>
              {/* <!-- Add more messages here --> */}
            </div>
            <div class="chat-input">
              <input type="text" placeholder="Type your message..." />
              <button>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
