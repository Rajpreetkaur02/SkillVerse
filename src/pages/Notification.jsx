import React, { useEffect, useState } from "react";
import "../assets/css/NotificationPage.css";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import { db } from "../firebase";
import mentorIcon from "../assets/images/mentoricon.jpg";
import projectIcon from "../assets/images/projecticon.jpg";
const NotificationCard = ({ data, idx }) => {
      const [openoption , setopenoption] = useState(false);
  return (
    <div
      className={`NotificationCardCont ${
        idx === 0 ? "NotificationCardContf" : ""
      }`}
    >
      <div>
        {data.subtype === "Mentor" && (
          <img src={mentorIcon} className="IconNotificationCard" alt="icon" />
        )}
        {data.subtype === "project" && (
          <img src={projectIcon} className="IconNotificationCard" alt="icon" />
        )}
      </div>
      <div>{data.text}</div>
      <div className="NotificationEditButton" onClick={()=>{setopenoption(!openoption)}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
      </div>
      {
            openoption === true && <div className="NotificationOption" onClick={()=>{setopenoption(!openoption)}}>
           <div>Mark as Read</div>
           <div>Delete</div>
           <div>Close</div>
          </div>
      }
    </div>
  );
};

const NotificationView = () => {
  const userId = localStorage.getItem("suprUserId");
  const [Notificationdata, setNotificationdata] = useState([]);
  useEffect(() => {
    let arr = [];
    const dataq = query(
      ref(db, "Notifications"),
      orderByChild("userId"),
      equalTo(userId)
    );
    get(dataq).then((snapshot) => {
      if (snapshot.val()) {
        const datakeys = Object.keys(snapshot.val());
        for (let i = 0; i < datakeys.length; i++) {
          const data = snapshot.val()[datakeys[i]];
          console.log(data);
          if (data.type.toUpperCase() === "NOTIFICATION") {
            arr.push(data);
          }
        }
        setNotificationdata(arr);
      }
    });
  }, []);
  return (
    <div className="NotificationPageHead">
      {Notificationdata.map((value, idx) => (
        <NotificationCard data={value} key={idx} idx={idx} />
      ))}
    </div>
  );
};

const Notification = () => {
  const [view, setview] = useState("Notification");
  return (
    <div className="NotificationContainer">
      <div className="NotificationHeaderClass">
        <div
          onClick={() => {
            setview("Notification");
          }}
          className={`NotificationHeader ${
            view === "Notification" ? "NotificationHeaderActive" : ""
          }`}
        >
          Notifications
        </div>
        <div
          onClick={() => {
            setview("Application");
          }}
          className={`NotificationHeader ${
            view === "Application" ? "NotificationHeaderActive" : ""
          }`}
        >
          Application Status
        </div>
        <div
          onClick={() => {
            setview("Meeting");
          }}
          className={`NotificationHeader ${
            view === "Meeting" ? "NotificationHeaderActive" : ""
          }`}
        >
          Meeting Status
        </div>
      </div>
      <hr className="NotificationHr"></hr>
      {view === "Notification" && <NotificationView />}
    </div>
  );
};

export default Notification;
