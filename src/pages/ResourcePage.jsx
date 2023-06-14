import React, { useState } from 'react'
import '../assets/css/resourcePageCSS.css'
import ReactPic from '../assets/images/react_img.png'
import searchPic from '../assets/images/searchimg.png'
import htmlcssjsPic from '../assets/images/html-css-js.png'
import nodePic from '../assets/images/nodejs_img.png'
import socketioPic from '../assets/images/Socketio_img.png'
import expressPic from '../assets/images/express_img.png'
import cPlusPlusPic from '../assets/images/C++logoPic.png'
import javaLogoPic from '../assets/images/JavaPic.png'
import { Navigate, useNavigate } from 'react-router'
import { GrAdd } from 'react-icons/gr'
import MentorFormModal from '../components/MentorFormModal'
import LecturePageModal from '../components/LecturePageModal'
import NotesPageModal from '../components/NotesPageModal'
import ArticlePageModal from '../components/ArticlePageModal'

const ResourcePage = () => {
  const [openmodal, setopenmodal] = useState(false);
  const [openLecturemodal, setopenLecturemodal] = useState('');
  const [openNotesmodal, setopenNotesmodal] = useState('');
  const [openArticlemodal, setopenArticlemodal] = useState('');

  const navigate = useNavigate();
  return (
    
    <>
    <LecturePageModal openmodal={openLecturemodal} setopenmodal={setopenLecturemodal} />
    <NotesPageModal openmodal={openNotesmodal} setopenmodal={setopenNotesmodal} />
    <ArticlePageModal openmodal={openArticlemodal} setopenmodal={setopenArticlemodal} />

      <div className='ResourcePageContainer'>

        {/* <div className="searchandaddcolumn">
        <div className="search_bar">
          <input type="search" placeholder='Search Courses' />
          <button ><img src={searchPic} alt="" /></button>
        </div>
        <div className="ResourceAdd">
          <button onClick={() =>{
            setopenmodal(!openmodal);
          }} > <GrAdd/> Add Resources</button>
        </div> 
      </div> */}
        <div className="AddResources">
          <h2>Contribute</h2>
          <div className="ResourceCardContainer">
            <div className="addLectures" onClick={() => { setopenLecturemodal(!openLecturemodal); }}>
              <h3>Add Video Lectures</h3>
              <p class="small">Share your most trusted resource with us!</p>
            </div>
            <div className="addNotes" onClick={() => { setopenNotesmodal(!openNotesmodal); }}>
              <h3>Add Notes</h3>
              <p class="small">Got some amazing notes! Share with the community</p>
            </div>
            <div className="addLinks" onClick={() => { setopenArticlemodal(!openArticlemodal); }}>
              <h3>Add Articles</h3>
              <p class="small">Share your favorite articles that helped you in your journey with us with us!</p>
            </div>
          </div>
        </div>
        <h2 id='resourceHeading'>Resources</h2>
        <div className="ResourcePageAllCards">

          <div className="ResourcePageCard">
            <img src={ReactPic} alt="" className='Resourcecardimg' />
            <div className="ResourcePageContent">
              <h1 className='ResourcePageTitle'>Learn React</h1>
              <p className='ResourcePageDescription'>Discover the magic of React: Turning complex UI challenges into elegant solutions.</p> 
              <div className='buttondiv'>
                <button onClick={() => { navigate(`/ResourceDesc/${'react'}`) }} className='ResourcePagebutton'>See Resources</button>
              </div>
            </div>
          </div>
          <div className="ResourcePageCard">
            <img src={nodePic} alt="" className='Resourcecardimg' />
            <div className="ResourcePageContent">
              <h1 className='ResourcePageTitle'>Learn NodeJS</h1>
              <p className='ResourcePageDescription'>Node.js enables you to build scalable network applications using JavaScript on the server-side.</p>
              <div className='buttondiv'>
                <button className='ResourcePagebutton'>See Resources</button>
              </div>
            </div>
          </div>
          <div className="ResourcePageCard">
            <img src={cPlusPlusPic} alt="" className='Resourcecardimg' />
            <div className="ResourcePageContent">
              <h1 className='ResourcePageTitle'>Learn C++</h1>
              <p className='ResourcePageDescription'>C++ is a language that makes it easy to shoot yourself in the foot; but when you do, it gives you a bigger gun.</p>
              <div className='buttondiv'>
                <button className='ResourcePagebutton'>See Resources</button>
              </div>
            </div>
          </div>
          <div className="ResourcePageCard">
            <img src={javaLogoPic} alt="" className='Resourcecardimg' />
            <div className="ResourcePageContent">
              <h1 className='ResourcePageTitle'>Learn React</h1>
              <p className='ResourcePageDescription'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ullam esse ut deserunt atque ipsum nemo, natus eligendi numquam aliquam?</p>
              <div className='buttondiv'>
                <button className='ResourcePagebutton'>See Resources</button>
              </div>
            </div>
          </div>
          <div className="ResourcePageCard">
            <img src={ReactPic} alt="" className='Resourcecardimg' />
            <div className="ResourcePageContent">
              <h1 className='ResourcePageTitle'>Learn React</h1>
              <p className='ResourcePageDescription'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ullam esse ut deserunt atque ipsum nemo, natus eligendi numquam aliquam?</p>
              <div className='buttondiv'>
                <button className='ResourcePagebutton'>See Resources</button>
              </div>
            </div>
          </div>
          <div className="ResourcePageCard">
            <img src={ReactPic} alt="" className='Resourcecardimg' />
            <div className="ResourcePageContent">
              <h1 className='ResourcePageTitle'>Learn React</h1>
              <p className='ResourcePageDescription'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ullam esse ut deserunt atque ipsum nemo, natus eligendi numquam aliquam?</p>
              <div className='buttondiv'>
                <button className='ResourcePagebutton'>See Resources</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResourcePage
