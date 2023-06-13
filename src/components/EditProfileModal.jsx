import React from 'react'
import { useState } from 'react';
import Modal from "react-awesome-modal";
import { db } from '../firebase';
import { set, ref, update } from 'firebase/database';
import { AiOutlineClose} from 'react-icons/ai';

const EditProfileModal = ({ openmodal, setopenmodal, MyUserId }) => {
    const [about, setabout] = useState("");
    const [githublink, setgithublink] = useState("");
    const [linkedIn, setlinkedinlink] = useState("");
    const [technologyInput, setTechnologyInput] = useState('');
    const [technologies, setTechnologies] = useState([]);

    const addTechnology = () => {
        const trimmedInput = technologyInput.trim();
        if (trimmedInput !== '') {
            setTechnologies([...technologies, trimmedInput]);
            setTechnologyInput('');
        }
    };

    const handleSubmit = () => {
        try {
            update(ref(db, `Users/${MyUserId}`), {
                about: about,
                githublink: githublink,
                linkedIn: linkedIn,
                technologies: technologies,
            });
        } catch (error) {

        }
    }

    const removeTechnology = (index) => {
        const updatedTechnologies = [...technologies];
        updatedTechnologies.splice(index, 1);
        setTechnologies(updatedTechnologies);
    };

    return (
        <Modal
            visible={openmodal}
            width="700"
            height="530"
            effect="fadeInUp"
            onClickAway={() => setopenmodal(false)}
        >
            <div>
                <div className="editprofilecontainer">
                <span id="cross" onClick={() => { setopenmodal(!openmodal); }}>
                            <AiOutlineClose style={{color: "#fff", float: 'right' }} />
                        </span>
                    <h2>Edit Profile</h2>
                    <div className="aboutContainer">
                        <span id='editsubheading'>About</span>
                        <div className='aboutinput'>
                            <textarea name="message" placeholder="Write a brief summary about yourself." onChange={(e) => { setabout(e.target.value) }} required></textarea>
                        </div>
                        <div className="profileTechnologiesContainer">
                            <span id='editsubheading'>Technologies Used</span>
                            <div className='profiletechnologiesdesc'>
                                {/* traverse the array and display the content */}
                                {technologies.map((technology, index) => (
                                    <div className='technologiesdesclist' key={index}>
                                        <span>{technology}<AiOutlineClose onClick={() => removeTechnology(index)} /></span>
                                    </div>
                                ))}
                                <br/>
                                <input
                                    type="text"
                                    value={technologyInput}
                                    onChange={(e) => setTechnologyInput(e.target.value)}
                                    placeholder="Enter technology"
                                    className='edittechnologiesInput'
                                />
                                <button onClick={addTechnology}>Add more</button>
                            </div>
                        </div>
                        <div className="editLinkedinLinkContainer">
                            <span id='editsubheading'>LinkedIn Profile Link</span>
                            <div className='editlinkbox'>
                                <input type="text" name="linkedinlink" placeholder="Enter your LinkedIn profile link" onChange={(e) => { setlinkedinlink(e.target.value) }} required/>
                            </div>
                        </div>
                        <div className="editgithubLinkContainer">
                            <span id='editsubheading'>Github Profile Link</span>
                            <div className='editlinkbox'>
                                <input type="text" name="githublink" placeholder="Enter your github profile link" onChange={(e) => { setgithublink(e.target.value) }} required />
                            </div>
                        </div>
                        <button className='Editbtn' onClick={handleSubmit}>Update my profile</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EditProfileModal