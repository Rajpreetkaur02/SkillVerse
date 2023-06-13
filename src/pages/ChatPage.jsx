import React, { useEffect, useRef, useState } from "react";
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
  update,
} from "firebase/database";
import { db } from "../firebase";

const ChatContent = ({ senderId, recieverId, issender }) => {
  const [onsubmit, setonsubmit] = useState(false);
  const userId = localStorage.getItem("suprUserId");
  // console.log("hello " , senderId  , recieverId  , issender);
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const day = date.getDate();
  const now = `${year}-${month > 9 ? month : `0${month}`}-${
    day > 9 ? day : `0${day}`
  }-${date.getTime()}`;
  const hour = date.getHours();
  const minute = date.getMinutes();
  // console.log(dateOnly);
  const chatContainerRef = useRef(null);
  const uuid = now;
  const [chatdata, setchatdata] = useState([]);
  const [text, settext] = useState("");
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [onsubmit]);
  useEffect(() => {
    if (issender === true) {
      onValue(ref(db, `Chats/${senderId + "-" + recieverId}`), (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          // console.log(data);
          if (data?.messages) {
            let arr = [];
            const datakeys = Object.keys(data?.messages);
            for (let i = 0; i < datakeys.length; i++) {
              arr.push(data?.messages[datakeys[i]]);
            }
            setchatdata(arr);
          }
        }
      });
    } else {
      onValue(ref(db, `Chats/${recieverId + "-" + senderId}`), (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          // console.log(data);
          if (data?.messages) {
            let arr = [];
            const datakeys = Object.keys(data?.messages);
            for (let i = 0; i < datakeys.length; i++) {
              arr.push(data?.messages[datakeys[i]]);
            }
            setchatdata(arr);
          }
        }
      });
    }
  }, [onsubmit]);
  const handle_send = () => {
    settext("");
    if (issender === true) {
      let temp = chatdata;
      temp.push({
        TimeId: now,
        Time: `${hour}:${minute}`,
        senderId: senderId,
        text: text,
      });
      update(ref(db, `Chats/${senderId + "-" + recieverId}`), {
        messages: temp,
      });
    } else {
      let temp = chatdata;
      temp.push({
        TimeId: now,
        Time: `${hour}:${minute}`,
        senderId: userId,
        text: text,
      });
      update(ref(db, `Chats/${recieverId + "-" + senderId}`), {
        messages: temp,
      });
    }
    setonsubmit(!onsubmit);
  };
  return (
    <div className="chatcont">
      <div>
        <div class="chat-header">
          <h2>Chat with Mentor's</h2>
        </div>
        <div ref={chatContainerRef} class="chat-messages">
          {chatdata &&
            chatdata.length !== 0 &&
            chatdata.map((value, index) => (
              <div key={index}>
                {value?.senderId === userId ? (
                  <div class="message-sent">
                    <div class="message-sender">You</div>
                    <div className="message-div">
                    <div class="message-content">
                      {value?.text}
                    </div>
                    <div class="message-time">{value?.Time}</div>
                    </div>
                    
                  </div>
                ) : (
                  <div class="message-received">
                    <div class="message-sender">John Doe</div>
                    <div className="message-div">
                    <div class="message-content">{value?.text}</div>
                    <div class="message-time">{value?.Time}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <div class="chat-input">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            settext(e.target.value);
          }}
          placeholder="Type your message..."
        />
        <button
          onClick={() => {
            handle_send();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
const ChatPage = () => {
  const userId = localStorage.getItem("suprUserId");
  const [issender, setissender] = useState(false);
  const [curruser, setcurruser] = useState("");
  const navigate = useNavigate();
  const [chats, setchats] = useState([]);
  const [users, setusers] = useState([]);
  const [usersdata, setusersdata] = useState([]);
  const [chats2, setchats2] = useState([]);
  const [users2, setusers2] = useState([]);
  const [usersdata2, setusersdata2] = useState([]);
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
          ref(db, "Users"),
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
  useEffect(() => {
    const dataq1 = query(
      ref(db, "Chats"),
      orderByChild("recieverId"),
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
          temparr.push(data[datakeys[i]].senderId);
        }
        setchats2(arr);
      }
      // console.log(temparr)
      setusers2(temparr);
    });
  }, []);
  useEffect(() => {
    // console.log(users2 , "Djd")
    if (users2 && users2?.length > 0) {
      let arr = [];
      for (var i = 0; i < users2.length; i++) {
        const dataq1 = query(
          ref(db, "Users"),
          orderByChild("id"),
          equalTo(users2[i])
        );
        get(dataq1).then((snapshot) => {
          const data = snapshot.val();
          // console.log(data);
          if (data) {
            const datakeys = Object.keys(data);
            for (let i = 0; i < datakeys.length; i++) {
              arr.push(data[datakeys[i]]);
              setusersdata2(arr);
              // console.log(arr)
            }
          }
        });
        // console.log(arr)
      }
      // console.log(arr);
    }
  }, [users2]);
  return (
    <div className="ChatPageContainer">
      {
        // console.log(users2)
      }
      {chats?.length === 0 && chats2?.length === 0 && (
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
            {usersdata &&
              usersdata.length !== 0 &&
              usersdata.map((value, idx) => (
                <div
                  key={idx}
                  className="ChatListDiv"
                  onClick={() => {
                    setcurruser(value?.id);
                    setissender(true);
                  }}
                >
                  <img src={Profile} className="ChatListImg" alt="" />
                  <div className="ChatListText">{value?.name}</div>
                </div>
              ))}
          </div>
          {curruser && (
            <ChatContent
              senderId={userId}
              recieverId={curruser}
              issender={issender}
            />
          )}
        </div>
      )}
      {chats2 && chats2.length !== 0 && (
        <div class="chat-container">
          {
            // console.log(usersdata2)
          }
          <div className="chatListCont">
            {usersdata2 &&
              usersdata2.length !== 0 &&
              usersdata2.map((value, idx) => (
                <div
                  key={idx}
                  className="ChatListDiv"
                  onClick={() => {
                    setcurruser(value?.id);
                    setissender(false);
                  }}
                >
                  <img src={Profile} className="ChatListImg" alt="" />
                  <div className="ChatListText">{value?.name}</div>
                </div>
              ))}
          </div>
          {curruser && (
            <ChatContent
              senderId={userId}
              recieverId={curruser}
              issender={issender}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatPage;
