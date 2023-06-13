import React from 'react'
import Mentor from '../assets/images/Mentor.png'

const MentorSection = () => {
  return (
    <div>
        <div className='MentorSectionContainer'>
            <div className="MentorHeading">1 : 1 Mentorship</div>
            <div className='MentorContent'>
                <div className='Mentorleft'><img src={Mentor} className='MentorImg' alt=""/></div>
                <div className="Mentorright">
                    <div className='timeline'>
                        <div className="timelinecontainer leftcontainer">
                            <div className='timelinecircle'></div>
                            <div className="text-box">
                                <p>Find the specific mentor you're interested in</p>
                                <span className='leftcontainerarrow'></span>
                            </div>
                        </div>
                        <div className="timelinecontainer rightcontainer">
                            <div className='timelinecircle'></div>
                            <div className="text-box">
                                <p>Review the mentor's skills and area of expertise</p>
                                <span className='rightcontainerarrow'></span>
                            </div>
                        </div>
                        <div className="timelinecontainer leftcontainer">
                            <div className='timelinecircle'></div>
                            <div className="text-box">
                                <p>check the availability of the mentor and schedule a session.</p>
                                <span className='leftcontainerarrow'></span>
                            </div>
                        </div>
                        <div className="timelinecontainer rightcontainer">
                            <div className='timelinecircle'></div>
                            <div className="text-box">
                                <p>Get the session details in your mail.</p>
                                <span className='rightcontainerarrow'></span>
                            </div>
                        </div>
                        <div className="timelinecontainer leftcontainer">
                            <div className='timelinecircle'></div>
                            <div className="text-box">
                                <p>Voila! your session is scheduled, now make the most of it.</p>
                                <span className='leftcontainerarrow'></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default MentorSection