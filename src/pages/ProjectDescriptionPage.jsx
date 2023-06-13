import React, { useState, useEffect } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import '../assets/css/ProjectPage.css'
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import ApplicationFormModal from '../components/ApplicationFormModal';

const ProjectDescriptionPage = () => {
    const [openmodal, setopenmodal] = useState(false);
    const [Data, setData] = useState([]);
    const [Technologies, setTechnologies] = useState([]);
    const [createdAt, setcreatedAt] = useState("");

    // used to access the paramenters associated with the id
    const { id } = useParams();

    useEffect(() => {
        onValue(ref(db, `ProjectPosts/${id}`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataKeys = Object.keys(data);
                let arr = [];
                for (let i = 0; i < dataKeys.length; i++) {
                    arr.push(data[dataKeys[i]]);
                }
                console.log(data.technologies);
                setData(data);
                setTechnologies(data.technologies);
            }
        });
    }, []);

    useEffect(() => {
        onValue(ref(db, `Contributors/${id}`), (snapshot) => {
            console.log("project id: ", id);
            const data = snapshot.val();
            console.log(data);
        });
    }, []);

    return (
        <div>
            <ApplicationFormModal openmodal={openmodal} setopenmodal={setopenmodal} projid={id} />
            <div className="projecthero">
                <div className="projectheading">
                    <div className="header">
                        <span id='projspan1'>{Data.projname}<br /></span>
                        <span id='projspan2'>{Data.createdAt}<br /></span>
                    </div>
                    <div className='headerright'>
                        <button className='addbtn' onClick={() => { setopenmodal(!openmodal); }}><AiOutlinePlus />Contribute</button>
                    </div>
                </div>
                <div className="projectTechnologiesContainer">
                    <span id='projsubheading'>Technologies Used</span>
                    <div className='technologiesdesc'>
                        {Technologies.map((tech) => (
                            <span>{tech}</span>
                        ))}
                    </div>
                </div>
                <div className="projectDescContainer">
                    <span id='projsubheading'>Project Description</span>
                    <div className='descbox'>
                        <p>{Data.projdesc}</p>
                    </div>
                </div>
                <div className="probstmtcontainer">
                    <span id='projsubheading'>Help Description</span>
                    <div className='descbox'>
                        <p>{Data.projproblem}</p>
                    </div>
                </div>
                <div className="githubLinkContainer">
                    <span id='projsubheading'>Github Project Link</span>
                    <div className='linkbox'>
                        <p>{Data.link}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDescriptionPage