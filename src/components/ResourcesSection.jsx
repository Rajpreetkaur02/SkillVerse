import React from 'react'
import resources from '../assets/images/resources.jpg'
import { Navigate, useNavigate } from 'react-router'

const ResourcesSection = () => {
  const navigate =useNavigate();
  return (
    <div>
        <div className='ResourcesContainer'>
        <div className="MentorHeading">Resources</div>
        <div className='resourescontent'>
            <div className='shape1'></div>
            <div className='shape2'></div>
            <div className='resourcesbox'>
                
                <div className='resourcestext'>
                    <span>Empowering Minds, Igniting Potential: Discover a World of Free Resources at Your Fingertips!</span>
                    <p>Free video lectures, roadmaps, notes and much more to empower your learning and enhance your projects.</p>
                    <button className="resourceButton" onClick={()=>{navigate('/Resources')}}>find more!</button>
                </div>
                <img src={resources} className='resourceimg'/>
                
            </div>
        </div>
        </div>
    </div>
  )
}

export default ResourcesSection