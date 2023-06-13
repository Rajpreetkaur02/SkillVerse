import React, { useRef, useEffect, useState } from 'react'
import Modal from "react-awesome-modal";
import '../assets/css/ProjectPage.css'
import { AiOutlineClose } from 'react-icons/ai'
import emailjs from '@emailjs/browser'
import { onValue, ref, set, serverTimestamp } from 'firebase/database';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';

const ApplicationFormModal = ({ openmodal, setopenmodal, projid , ownerId }) => {
    const navigate = useNavigate();
    const [fromname, setfromname] = useState(null);
    const [fromEmail, setfromEmail] = useState(null);
    const [toEmail, settoEmail] = useState("");
    const [message, setmessage] = useState("");
    const [linkedinlink, setlinkedinlink] = useState("");
    const [githublink, setgithublink] = useState("");
    const [projname, setprojname] = useState("");
    const [projectid, setprojectid] = useState("");
    const [projdesc, setprojdesc] = useState("");

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

    const userId = localStorage.getItem("suprUserId");
    // console.log(userId);
    // console.log(ownerId)
    useEffect(() => {
        onValue(ref(db, `Users/${userId}`), (snapshot) => {
            const data = snapshot.val();
            console.log(data.name);
            setfromname(data.name);
            setfromEmail(data.email);
        });
    }, []);

    useEffect(() => {
        onValue(ref(db, `ProjectPosts/${projid}`), (snapshot) => {
            const data = snapshot.val();
            console.log("hello" + data.Email);
            settoEmail(data.Email);
            setprojname(data.projname);
            setprojectid(data.id);
            setprojdesc(data.projdesc);
        });
    }, []);

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        const unqiueId = uid(15);

        // var templateParams = {
        //     from_name: fromname,
        //     from_email: fromEmail,
        //     to_email: toEmail,
        //     projname: projname,
        //     message: message,
        //     linkedinlink: linkedinlink,
        //     githublink: githublink,
        // };

        // emailjs.send('service_54jfv0a', 'template_z8d4noh', templateParams, '5acFbYup17yeX42QV')
        //     .then((result) => {
        //         console.log(result.text);
        //         Toast.fire({
        //             title: "Application submitted successfully",
        //             icon: "success",
        //         });
        //     }, (error) => {
        //         console.log(error.text);
        //         Toast.fire({
        //             title: "An error has occured, Try again!",
        //             icon: "error",
        //         });
        //     });
        // e.target.reset();

        //in this database we have projects and the applicants in this project
        set(ref(db, `ProjectApplications/${unqiueId}`), {
            projname: projname,
            contributerName: fromname,
            projectId : projid,
            id : unqiueId,
            status : 'pending',
            // contributerEmail: fromEmail,
            ownerId : ownerId,
            applicantId : userId,
            timestamp: serverTimestamp(),
        })
        set(ref(db , `Notifications/${unqiueId}`) , {
            userId : userId ,
            id : unqiueId ,
            type : 'Notification',
            text : `You have Applied To the Project ${projname}, wait till your application is confirmed`,
            status : 'pending',
            subtype : 'project',
            date : new Date().getDate(),
        })
        //in this database we have users and the projects they have applied to
        set(ref(db, `MyApplications/${userId}/${projid}`), {
            contributerName: fromname,
            projname: projname,
            contributerEmail: fromEmail,
            projid: projectid,
            projdesc: projdesc,
            timestamp: serverTimestamp(),
        })
        navigate(`/profile/${userId}`);
    }
    return (
        <Modal
            visible={openmodal}
            width="700"
            height="530"
            effect="fadeInUp"
            onClickAway={() => setopenmodal(false)}
        >
            <div>
                <form className='appform_focus' ref={form} onSubmit={sendEmail}>
                    <div className="appcontainer">
                        <span id="cross" onClick={() => { setopenmodal(!openmodal); }}>
                            <AiOutlineClose style={{ color: '#fff', float: 'right' }} />
                        </span>
                        <span id='appspan1'>Apply to contribute in the project<br /></span>
                        <span id='appspan2'>Write an application message explaining how you will contributing to the project and how the problem will be solved including the approach.</span>
                        <div className="applicationContainer">
                            <span id='appsubheading'>Application Message</span>
                            <div className='appmsg appbox'>
                                <textarea name="message" placeholder="Enter Application message..." onChange={(e) => {setmessage(e.target.value)}} required></textarea>
                            </div>
                            <div className="appgithubLinkContainer">
                                <span id='appsubheading'>LinkedIn Profile Link</span>
                                <div className='appbox'>
                                    <input type="text" name="linkedinlink" placeholder="Enter your LinkedIn profile link" onChange={(e) => {setlinkedinlink(e.target.value)}} required />
                                </div>
                            </div>
                            <div className="appgithubLinkContainer">
                                <span id='appsubheading'>Github Profile Link</span>
                                <div className='appbox'>
                                    <input type="text" name="githublink" placeholder="Enter your github profile link" onChange={(e) => {setgithublink(e.target.value)}} required />
                                </div>
                            </div>
                            <input className='appbtn' type='submit' value='Send Application' />
                        </div>
                    </div>
                </form>
            </div>
        </Modal>

    )
}

export default ApplicationFormModal