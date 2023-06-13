import React, { useState, useEffect } from 'react'
import '../assets/css/ProjectPage.css'
import { uid } from "uid";
import { ref, set, serverTimestamp, onValue } from "firebase/database";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineClose } from 'react-icons/ai';

const CreatePostPage = () => {

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
    const navigate = useNavigate();
    const [technologyInput, setTechnologyInput] = useState('');
    const [technologies, setTechnologies] = useState([]);
    const [projname, setprojname] = useState("");
    const [projdesc, setprojdesc] = useState("");
    const [projproblem, setprojproblem] = useState("");
    const [link, setlink] = useState("");
    const [Email, setEmail] = useState("");
    const [username, setusername] = useState("");
    const [gender, setgender] = useState("");

    const userId = localStorage.getItem("suprUserId");

    //NOTE: trim() method is used to remove whitespaces from the text
    //The ... is known as the spread operator in JavaScript. In the context of [...technologies, trimmedInput], it is used to create a new array by spreading the elements of the existing technologies array and then adding the trimmedInput value at the end.
    //For example, let's say the initial technologies array is ['HTML', 'CSS'], and trimmedInput is 'JavaScript'. The expression [...technologies, trimmedInput] will create a new array ['HTML', 'CSS', 'JavaScript'], combining the existing technologies with the new technology.

    const addTechnology = () => {
        const trimmedInput = technologyInput.trim();
        if (trimmedInput !== '') {
            setTechnologies([...technologies, trimmedInput]);
            setTechnologyInput('');
        }
    };

    useEffect(() => {
        onValue(ref(db, `Users/${userId}`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataKeys = Object.keys(data);
                let arr = [];
                for (let i = 0; i < dataKeys.length; i++) {
                    arr.push(data[dataKeys[i]]);
                }
                if (arr[1] === "Male") {
                    setgender("Male");
                } else {
                    setgender("Female");
                }
                setusername(data.name);
            }
        });
    }, [userId]);

    const handle_submit = () => {
        const timestamp = serverTimestamp();
        const date = new Date();

        console.log(date.toLocaleDateString());

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        console.log(year);

        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        console.log(formattedDate);

        try {
            const uniqueId = uid(16);
            set(ref(db, `ProjectPosts/${uniqueId}`), {
                id: uniqueId,
                userID: userId,
                projname: projname,
                technologies: technologies,
                projdesc: projdesc,
                projproblem: projproblem,
                link: link,
                Email: Email,
                username: username,
                gender: gender,
                timestamp: serverTimestamp(),
                createdAt: formattedDate,
            })
            set(ref(db, `myProjects/${userId}/${uniqueId}`), {
                projid: uniqueId,
                projname: projname,
                projdesc: projdesc,
            })
            set(ref(db , `Notifications/${uniqueId}`) , {
                userId : userId ,
                id : uniqueId ,
                type : 'Notification',
                text : `You have Sucessfully created a project wiht name ${projname}.`,
                status : 'pending',
                subtype : 'project',
                date : new Date().getDate(),
            })
            navigate('/projects');
        } catch (error) {
            console.log(error);
        }
    }

    const handle_emptyformsubmit = () => {
        Toast.fire({
            title: "Fill all details",
            icon: "error",
        });
    }

    useEffect(() => {
        onValue(ref(db, `Users/${userId}`), (snapshot) => {
            const data = snapshot.val();
            setEmail(data.email);
        });
    }, []);

    const removeTechnology = (index) => {
        const updatedTechnologies = [...technologies];
        updatedTechnologies.splice(index, 1);
        setTechnologies(updatedTechnologies);
    };

    return (
        <div>
            <div className="projecthero">
                <div className="projectheading">
                    <div className="header">
                        <span id='projspan1'>Hello, take help from your fellow developers<br /></span>
                        <span id='projspan2'>Work with top community members to bring your ideas to life.</span>
                    </div>
                </div>
                <div className="probstmtcontainer">
                    <span id='projsubheading'>Project Name</span>
                    <div className='postbox'>
                        <textarea name="message" placeholder="Enter Project Name" onChange={(e) => { setprojname(e.target.value) }}></textarea>
                    </div>
                </div>
                <div className="projectTechnologiesContainer">
                    <span id='projsubheading'>Technologies Used</span>
                    <div className='technologiesdesc'>
                        {/* traverse the array and display the content */}
                        {technologies.map((technology, index) => (
                            <div className='technologiesdescspan' key={index}>
                                <span>{technology}<AiOutlineClose onClick={() => removeTechnology(index)} /></span>
                                {/* <button onClick={() => removeTechnology(index)}>Delete</button> */}
                            </div>
                        ))}
                        <input
                            type="text"
                            value={technologyInput}
                            onChange={(e) => setTechnologyInput(e.target.value)}
                            placeholder="Enter technology"
                            className='technologiesInput'
                        />
                        <button onClick={addTechnology}>Add more</button>
                    </div>
                </div>
                <div className="projectDescContainer">
                    <span id='projsubheading'>Project Description</span>
                    <div className='postbox'>
                        <textarea name="message" placeholder="Give brief description of the project..." onChange={(e) => { setprojdesc(e.target.value) }}></textarea>
                    </div>
                </div>
                <div className="probstmtcontainer">
                    <span id='projsubheading'>Describe the issue</span>
                    <div className='postbox'>
                        <textarea name="message" placeholder="Provide a brief explanation or description of the specific problem or part of your project you need assistance with..." onChange={(e) => { setprojproblem(e.target.value) }}></textarea>
                    </div>
                </div>
                <div className="githubLinkContainer postlink">
                    <span id='projsubheading'>Github Project Link</span>
                    <div className='postlinkbox'>
                        <textarea name="message" placeholder="Enter Github link of the project..." onChange={(e) => { setlink(e.target.value) }}></textarea>
                    </div>
                </div>
                {projname && projdesc && projproblem && link && (
                    <div><button className='publishbtn' onClick={handle_submit}>publish</button></div>
                )}
                {!projname && !projdesc && !projproblem && !link && (
                    <div>
                        <button className='publishbtn' onClick={handle_emptyformsubmit}>publish</button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default CreatePostPage