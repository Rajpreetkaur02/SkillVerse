import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { Navigate, useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import BG from "../assets/images/man.png";
import womanprofile from "../assets/images/woman.png";
import { equalTo, get, onValue, orderByChild, query, ref } from "firebase/database";
import { db } from "../firebase";
const Navbar = () => {
  // const [data, setdata] = useState("hello world");
  const userId = localStorage.getItem("suprUserId");
  const [user, setuser] = useState([]);
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const [chooseimage, setchooseimage] = useState(false);
  const [username, setusername] = useState("");
  const [opennotice, setopennotice] = useState("");
  const [noticedata, setnoticedata] = useState([]);
  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);
  useEffect(() => {
    // console.log("Successfully");
    onValue(ref(db, `Users/${userId}`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setusername(data.name);
        const dataKeys = Object.keys(data);
        let arr = [];
        for (let i = 0; i < dataKeys.length; i++) {
          arr.push(data[dataKeys[i]]);
        }
        if (arr[1] === "Male") {
          setchooseimage(true);
        }
        setuser(arr);
      }
    });
  }, [userId]);
  useEffect(() => {
    let arr = [];
    const dataq = query(ref(db, "Notifications"), orderByChild("userId"), equalTo(userId));
    get(dataq).then((snapshot) => {
      const data = snapshot.val();
      if(data){
      const datakey = Object.keys(data);
      for(let i = 0; i < datakey.length;i++)
      {
        arr.push(data[datakey[i]]);
      }
      if (data) {
        const datakey = Object.keys(data);
        for (let i = 0; i < datakey.length; i++) {
          arr.push(data[datakey[i]]);
        }
        setnoticedata(arr);
      }
      // console.log(arr)
      setnoticedata(arr);
    }
      // console.log("hello" , snapshot.val())
    })
  }, [userId]);
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  return (
    // <div className="navbar">
    //   <div className="navleft">
    //     <img src={logo} alt=""/>
    //   <ul>
    //     <div className="navbar-features">
    //       <li>1:1 session</li>
    //       <li>Resources</li>
    //       <li>Contribution</li>
    //       <li on onClick={() => {navigate('/projects')}}>Projects</li>
    //     </div>
    //   </ul>
    //   </div>
    //   <div className="navright">
    //     <button id="login"  onClick={() => {
    //           navigate('/Login')
    //         }} className="btn">Login</button>
    //     <button id="signup"  onClick={() => {
    //         navigate('/Signup')
    //       }} className="btn">Signup</button>
    //   </div>

    <>
      {/* {pathname.includes("login") || pathname.includes("Signup") || pathname.includes("profile") ? ( */}
      {pathname.includes("login") || pathname.includes("Signup") ? (
        <div style={{ display: "hidden" }}></div>
      ) : (
        <div className="navbar">
          <div className="navleft">
            <div onClick={() => {
              navigate("/");
            }} className="skillVerse">SkillVerse</div>
            <ul>
              <div className="navbar-features">
                <li
                  onClick={() => {
                    navigate("/Mentors");
                    setopennotice(false);
                  }}
                >
                  1:1 session
                </li>
                <li
                  onClick={() => {
                    navigate("/Resources");
                    setopennotice(false);
                  }}
                >
                  Resources
                </li>
                <li onClick={()=>{navigate("/chat");setopennotice(false);}}>Chats</li>
                <li
                  onClick={() => {
                    navigate("/projects");
                    setopennotice(false);
                  }}
                >
                  Projects
                </li>
              </div>
            </ul>
          </div>
          <div className="navright">
            {!userId && (
              <>
                <button
                  id="login"
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="btn"
                >
                  Login
                </button>
                <button
                  id="signup"
                  onClick={() => {
                    navigate("/Signup");
                  }}
                  className="btn"
                >
                  Signup
                </button>
              </>
            )}
            {userId && (
              <>
                <div className="NavbarProfileText">Hi!! {username}</div>
                {chooseimage === false ? (
                  <img
                    onClick={() => {
                      navigate(`/profile/${userId}`);
                      setopennotice(false);
                    }}
                    className="NavbarProfile"
                    src={womanprofile}
                    alt="profile"
                  />
                ) : (
                  <img
                    onClick={() => {
                      navigate(`/profile/${userId}`);
                      setopennotice(false);
                    }}
                    className="NavbarProfile"
                    src={BG}
                    alt="profile"
                  />
                )}
                <div className="NavbarNotification" onClick={() => { setopennotice(!opennotice) }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="#fff"
                    class="bi bi-bell-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                  </svg>
                  <div className="NotificationRed"></div>
                </div>
                {
                  opennotice === true &&
                  <div className="NotificationBody">
                    <div className="Notificationcont">Notification</div>
                    <hr></hr>
                    <div className="NotificationDiv">
                      {
                        noticedata.map((value, idx) => (
                          <div key={idx}>{value?.text}</div>
                        ))
                      }
                      {
                        noticedata.length === 0 && <div className="NotificationDiv">No notification right now!!!</div>
                      }
                    </div>
                    <div className="NotificationShow">
                      <div className="NotificationShowMore" onClick={() => { navigate('/Notifications'); setopennotice(false) }}>Show More....</div>
                    </div>
                  </div>
                }
                {/* <div onClick={handle_logout} className="NavbarLogoutButton">Logout</div> */}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
