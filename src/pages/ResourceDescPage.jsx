import React, { useState, useEffect } from 'react'
import '../assets/css/ResourceDescPageCSS.css'
import ReactPic from '../assets/images/react_img.png'
import { GrAdd } from 'react-icons/gr'
import LecturePageModal from '../components/LecturePageModal'
import ReactPlayer from 'react-player'
import { MdArrowUpward } from 'react-icons/md'
import { BsEye } from 'react-icons/bs'
import { onValue, ref } from 'firebase/database'
import { db } from '../firebase'
import { app } from '../firebase'
import { getStorage } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

const ResourceDescPage = () => {
  const navigate = useNavigate();
  const storage = getStorage(app);
  const [selectedItem, setselectedItem] = useState('resourceLecture');
  const [Resources, setResources] = useState([]);
  const [PDFResources, setPDFResources] = useState([]);
  const [ArticleResources, setArticleResources] = useState([]);
  const [PDFurl, setPDFurl] = useState('');


  const handleClick = (resourceItem) => {
    setselectedItem(resourceItem);
  };

  const handleView = (rescId) => {
    // storage.ref(`/pdfs/React/${rescId}`).put(rescId)
    // .on("state_changed", alert("sucess"), alert, () => {
    //   storage.ref("pdfs/React").child(rescId).getDownloadURL()
    //   .then((url) => {
    //     setPDFurl(url);
    //   }) 
    // })
    // console.log(PDFurl);
  }

  useEffect(() => {
    onValue(ref(db, `VideoResources/React`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataKeys = Object.keys(data);
        let arr = [];
        for (let i = 0; i < dataKeys.length; i++) {
          arr.push(data[dataKeys[i]]);
        }
        arr.sort((a, b) => b.timestamp - a.timestamp);
        setResources(arr);
        console.log(arr);
      }
    });
    onValue(ref(db, `PDFResources/React`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataKeys = Object.keys(data);
        let arr = [];
        for (let i = 0; i < dataKeys.length; i++) {
          arr.push(data[dataKeys[i]]);
        }
        arr.sort((a, b) => b.timestamp - a.timestamp);
        setPDFResources(arr);
        console.log(arr);
      }
    });
    onValue(ref(db, `ArticleResources/React`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataKeys = Object.keys(data);
        let arr = [];
        for (let i = 0; i < dataKeys.length; i++) {
          arr.push(data[dataKeys[i]]);
        }
        arr.sort((a, b) => b.timestamp - a.timestamp);
        setArticleResources(arr);
        console.log(arr);
      }
    });
  }, [])


  return (
    <div>
      <div className='ResourcePageDesc_Conatiner'>
        <h1>React Resources</h1>
        <span>Discover the magic of React: Turning complex UI challenges into elegant solutions.</span>
        <div className='RescDesc'>
          <div className='ResSideMenu'>
            <ul className="ResDescBar">
              <li className={selectedItem === 'resourceLecture' ? 'active' : ''} onClick={() => handleClick('resourceLecture')}
              >
                Video Lectures
              </li>
              <li className={selectedItem === 'resourcePDF' ? 'active' : ''} onClick={() => handleClick('resourcePDF')}
              >
                Notes
              </li>
              <li className={selectedItem === 'resourceDocs' ? 'active' : ''} onClick={() => handleClick('resourceDocs')}>
                Articles
              </li>
            </ul>
          </div>
          <div className="ResourceOutContainer">
            {selectedItem === 'resourceLecture' && <div className="content-item">
              <div className="LecturesBlock">
                <span className='lecture-icon'></span>
                {Resources.map((item) => (
                  <div className="lecturecard">
                    <ReactPlayer
                      url={item.videoLink}
                      width={'300px'}
                      height={'230px'}
                    />
                    <div className="lecturecardtext">
                      <div className='videoName'>{item.title}</div>
                      <div className='videoDesc'>{item.desc}</div>
                      <div className='videoBottom'>
                        <div className='videobottomicons'>
                          <div className="upvotes"><span id='upvotesNum'>24</span><MdArrowUpward /></div>
                          <div className="views"><span id='viewNum'>24</span><BsEye /></div>
                        </div>
                        <button className='upvotebtn'>upvote</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>}
            {selectedItem === 'resourcePDF' && <div className="content-item">
              <div className="NotesCardContainer">
                {PDFResources.map((item) => (
                  <div className="NotesCard">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <button onClick={handleView(item.rescId)}>view</button>
                  </div>
                ))}
              </div>

            </div>}
            {selectedItem === 'resourceDocs' && <div className="content-item">
              <div className="NotesCardContainer">
                {ArticleResources.map((item) => (
                  <div className="NotesCard">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    {/* <button>view</button> */}
                    <a href={item.artcleLink} >
                      <button id='articleviewbtn'>view</button>
                    </a>
                  </div>
                ))}
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourceDescPage