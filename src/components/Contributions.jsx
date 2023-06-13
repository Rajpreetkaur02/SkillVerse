import React from 'react';
import BG from "../assets/images/kuchbhi.jpg";
import skill1 from "../assets/images/Skilllll.jpeg"
const Contributions = () => {
    return (
        <div>
            <div className="title">
                <div className="skillLearning">
                <div className="MentorHeading">Community Contribution</div>
                    <div className="skillContainer">
                        <div className="textandhead2">
                            <h2>"Unlock Your Potential with Skill Videos: Master Specific Skills at Your Own Pace"</h2>
                            <div className="text">
                                <p>In this section, you'll find an extensive collection of skill videos designed to help you acquire and refine specific skills]. Whether you're a beginner looking to build a strong foundation or an experienced practitioner aiming to enhance your expertise, our skill videos provide a flexible and comprehensive learning experience.
                                </p>
                                <button className='skillButton'> Explore more!</button>
                            </div>
                        </div>
                        <img className='skill_1' src={skill1} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contributions;