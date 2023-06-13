import React from 'react'
import projectPic from '../assets/images/projectHelpPic.jpg'
const ProjectSection = () =>{
    return(
        <div className='ProjectSectionContainer'>
            <div className="MentorHeading">Project Assistance</div>
            <div className="projectContainer">
                <img src={projectPic} alt="" />
                <div className="textandhead2">
                    <h2>Are you struggling with your projects?</h2>
                    <div className="text">
                        <p> Our experienced team is here to assist you every step of the way. We provide comprehensive resources and personalized support to help you excel in your projects. Whether you need guidance with project planning, implementation, or troubleshooting, we've got you covered. Our experts are available to answer your questions, provide valuable insights, and help you overcome challenges. Don't let your projects become overwhelming. Let us empower you to achieve success.</p>
                        <button className='projectHelpButton'> Get help Now</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ProjectSection