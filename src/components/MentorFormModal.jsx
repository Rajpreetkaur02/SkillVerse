import { onValue, ref, set } from "firebase/database";
import { getStorage, ref as refst, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import Modal from "react-awesome-modal";
import Swal from "sweetalert2";
import { app, db } from "../firebase";
import { uid } from "uid";
const MentorFormModal = ({ openmodal, setopenmodal }) => {
  const storage = getStorage(app);
  const [headline, setheadline] = useState("");
  const [github, setgithub] = useState("");
  const [twiter, settwiter] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [hiddenName , sethiddenname] = useState(""); 
  const [openname , setopenname ] = useState(false);
  useEffect(() => {
    setheadline("");
    setimageurl("");
    setlinkedin("");
    settwiter("");
    setgithub("");
    sethiddenname("");
  }, [openmodal]);

  const wrtitetodb = async() => {
    const userId = localStorage.getItem("suprUserId");
    const unqiueId = uid(15);
    let arr = [];
    onValue(ref(db, `Users/${userId}`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataKeys = Object.keys(data);
        for (let i = 0; i < dataKeys.length; i++) {
          arr.push(data[dataKeys[i]]);
        }
      }
    });
    if(openname === true){
      set(ref(db, `Mentors/${unqiueId}`), {
        id: unqiueId,
        name: hiddenName,
        headline: headline,
        github: github,
        linkedin: linkedin,
        twiter: twiter,
      });
    }else{
      set(ref(db, `Mentors/${unqiueId}`), {
        id: unqiueId,
        name: arr[3],
        headline: headline,
        github: github,
        linkedin: linkedin,
        twiter: twiter,
      });
    }
    set(ref(db , `Notifications/${unqiueId}`) , {
      userId : userId ,
      id : unqiueId ,
      type : 'Notification',
      text : "Congratulations, Now You Are also a Mentor!!, help other developers to get started.",
      status : 'pending',
      subtype : 'Mentor',
      date : new Date().getDate(),
    })
    // upload code to push to firebase
    const imageRef = refst(storage, `images/Mentors/${unqiueId}/0`); // path where to store
    await uploadBytes(imageRef , imageurl).then((snapshot) => { // imageurl is the source of the snapshot
      // console.log(snapshot)
    });
    setopenmodal(!openmodal);
  };
  const handle_submit = () => {
    if (headline === "") {
      setopenmodal(!openmodal);
      Swal.fire({
        text: "Please fill the form",
        icon: "warning",
      });
      return;
    }
    wrtitetodb();
  };
  return (
    <Modal
      visible={openmodal}
      width="700"
      height="500"
      effect="fadeInUp"
      onClickAway={() => setopenmodal(false)}
    >
      <div className="MentorModalContainer">
        <div class="file-upload-wrapper">
          <button class="file-upload-button">Select Profile Image</button>
          <input
            onChange={(e) => {
              setimageurl(e.target.files[0]);
            }}
            type="file"
            class="file-upload-input"
          />
        </div>
        <div>
          {imageurl !== "" && (
            <div>
              <a
                className="MentorModalPreview"
                target="_blank"
                href={URL.createObjectURL(imageurl)}
              >
                Preview
              </a>{" "}
            </div>
          )}
        </div>
        <div className="HiddenNameInput">
        <div onClick={()=>{setopenname(!openname)}} className={`${openname === true ?  "SelectBoxMentorModalNot" : "SelectBoxMentorModal"}`}></div>
        <div>Select a Annonymous Name</div>
        </div>
        {
          openname === true && <div className="MentorModalInputCont">
          <input
            onChange={(e) => {
              sethiddenname(e.target.value);
            }}
            className="MentorModalInput"
            type="text"
            placeholder="Enter The Name you Want to show"
          />
        </div>
        }
        <div className="MentorModalInputCont">
          <input
            onChange={(e) => {
              setheadline(e.target.value);
            }}
            className="MentorModalInput"
            type="text"
            placeholder="headline of the Profile"
          />
        </div>
        <div className="MentorModalInputCont">
          <input
            onChange={(e) => {
              setgithub(e.target.value);
            }}
            className="MentorModalInput"
            type="text"
            placeholder="Github Profile Link"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#fff"
            className="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </div>
        <div className="MentorModalInputCont">
          <input
            onChange={(e) => {
              setlinkedin(e.target.value);
            }}
            className="MentorModalInput"
            type="text"
            placeholder="Linkedin Profile Link"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#fff"
            className="bi bi-linkedin"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
          </svg>
        </div>
        <div className="MentorModalInputCont">
          <input
            onChange={(e) => {
              settwiter(e.target.value);
            }}
            className="MentorModalInput"
            type="text"
            placeholder="Twitter Profile Link"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#fff"
            className="bi bi-twitter"
            viewBox="0 0 16 16"
          >
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
          </svg>
        </div>
        <div
          className="MentorModalcross"
          onClick={() => {
            setopenmodal(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="#fff"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
        <div className="MentorChat" onClick={handle_submit}>
          Submit
        </div>
      </div>
    </Modal>
  );
};

export default MentorFormModal;
