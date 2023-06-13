import React, { useEffect, useState } from "react";
import "../assets/css/mentor.css";
import MentorCard from "../components/MentorCard";
import MentorFormModal from "../components/MentorFormModal";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";
const Mentor = () => {
  const [openmodal, setopenmodal] = useState(false);
  const [mentordata , setmentordata] = useState([]);
  useEffect(()=>{
    onValue(ref(db , 'Mentors') , (snapshot)=>{
      const data = snapshot.val();
      if(data)
      {
        let arr = [];
        const datakeys = Object.keys(data);
        for(var i = 0;i<datakeys.length  ; i++)
        {
          arr.push(data[datakeys[i]]);
        }
        setmentordata(arr);
      }
    })
  },[]);
  return (
    <>
      <MentorFormModal openmodal={openmodal} setopenmodal={setopenmodal} />
      <div className="MentorContainer">
        <div className="MentorHead">
          Chat or Book 1 on 1 Session with our Mentors
          <div
            onClick={() => {
              setopenmodal(!openmodal);
            }}
            className="BecomeMentorButton"
          >
            Be A Mentor
          </div>
        </div>
        <div className="MentorGridCont">
          {
            mentordata.map((value, idx) => (
              <MentorCard data={value} key={idx}/>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Mentor;
