import React, { useState } from "react";
import "../assets/css/login.css";
// import { FaFacebookF, FaInstagram, FaTwitter, FaGoogle } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import Swal from "sweetalert2";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
function Login() {
  // const FaceBookBackground =
  //   "linear-gradient(to right, #0546a0 0%, #663fbg 100%)";
  // const InstagramBackground =
  //   "linear-gradient(to right, #a12ac4 0%, #ed586c 40%, #f0a853 100%)";
  // const TwitterBackground =
  //   "linear-gradient(to right, #56c1e1 0%, #35a9ce 50%)";
  // const GoogleBackground = "linear-gradient(to right, #56c1e1 0%, #35a9ce 50%)";
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const WritetoLocal = (email) => {
    const data = query(ref(db, "Users"), orderByChild("email"), equalTo(email));
    get(data).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        Toast.fire({
          title: "SignIn sucessfully (redirecting to home page)",
          icon: "success",
        });
        const keys = Object.keys(data);
        localStorage.setItem("suprUserId", data[keys[0]]?.id);
        setTimeout(() => {
          navigate("/");
        }, [3000]);
      } else {
        Toast.fire({
          title: "Try again, Something is went wrong",
          icon: "warning",
        });
      }
    });
  };
  const Login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user.email);
        WritetoLocal(user.email);
      })
      .catch((error) => {
        Toast.fire({
          title: "Wrong password / Email",
          icon: "error",
        });
      });
  };
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <div className="welcome">WELCOME BACK</div>
        <div className="inputContainer">
          <input
            onChange={(e) => {
              setemail(e.target.value);
            }}
            type="text"
            placeholder="Email"
            className="box"
          />
          <input
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            className="box"
          />
        </div>
        <div className="buttonContainer">
          <button onClick={Login} content="Login" className="btn1">
            Login
          </button>
        </div>
        {/* <div className="loginwith">
          <h5>Or Login With</h5>
        </div>
        <div className="horizontalRule">
          <hr />
        </div>
        <div className="iconsContainer">
          <icon color={FaceBookBackground} className="icn">
            <FaFacebookF />
          </icon>
          <icon color={InstagramBackground} className="icn">
            <FaInstagram />
          </icon>
          <icon color={TwitterBackground} className="icn">
            <FaTwitter />
          </icon>
          <icon color={GoogleBackground} className="icn">
            <FaGoogle />
          </icon>
         </div>

        <div className="forgotPassword">
          <h6>Forgot Password ?</h6>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
