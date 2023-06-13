import React, { useState } from "react";
import "../assets/css/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { uid } from "uid";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";
import Swal from "sweetalert2";
const Signup = () => {
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [Gender , setgender] = useState("");
  const handle_submit = () => {
    if (email === "" || email === "" || password === "" || Gender === "") {
      Toast.fire({
        title: "Please complete the form",
        icon: "error",
      });
      return;
    }
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const uniqueId = uid(16);
          localStorage.setItem("suprUserId", uniqueId);
          const user = userCredential.user;
          set(ref(db, `Users/${uniqueId}`), {
            id: uniqueId,
            name: name,
            email: email,
            type: "student",
            gender : Gender,
          });
          Toast.fire({
            title: "SignIn sucessfully (redirecting to home page)",
            icon: "success",
          });
          setTimeout(() => {
            navigate('/');
          }, 3000);

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Toast.fire({
            title: "error occurred",
            icon: "error",
          });
          console.log(error);
          // ..
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signupContainer">
      <div className="signupBox">
        <div className="welcome">WELCOME</div>
        <div className="inputContainer">
          <input
            type="text"
            onChange={(e) => {
              setname(e.target.value);
            }}
            placeholder="Name"
            className="box"
          />
          {/* <input type="text" placeholder="Last Name" className="box"/> */}
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
          <select className="box" onChange={(e)=>{setgender(e.target.value)}} defaultChecked>
            <option>Select Your Gender</option>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
            <option value={"NA"}>Not disclosed</option>
          </select>
        </div>
        <div className="buttonContainerSignup">
          <button onClick={handle_submit} content="Login" className="btn2">
            Signup
          </button>
        </div>
        <div className="alreadyAccount">
          <p>
            Already have a account?{" "}
            <Link to={"/login"} className="loggedin">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
