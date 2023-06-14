import React from 'react'
import Modal from 'react-awesome-modal'
import "../assets/css/ResourceModalCSS.css"
import { getStorage, ref as refst, uploadBytes } from "firebase/storage";
import { useState } from 'react'
import { uid } from 'uid'
import { app, db} from '../firebase';
import { ref, set } from 'firebase/database';
import Swal from 'sweetalert2';

const LecturePageModal = ({openmodal,setopenmodal}) => {
  const options = ['React', 'JavaScript', 'C++', 'Java', 'Python'];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const unqiueId = uid(15);
  const storage = getStorage(app);
  const [pdfurl, setpdfurl] = useState('');
  const [desc, setdesc] = useState('');
  const [title, setTitle] = useState('');
  const [videoLink, setvideoLink] = useState('');

  const handleSubmit = () => {
    setopenmodal(!openmodal);
    set(ref(db , `VideoResources/${selectedOption}/${unqiueId}`) , {
      rescId : unqiueId ,
      title: title,
      desc: desc,
      subject: selectedOption,
      videoLink: videoLink,
      date : new Date().getDate(),
  }).then(
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Resource uploaded successfully!',
      showConfirmButton: false,
      timer: 1500
    })
  ).catch((error) => {
    Swal.fire({
      position: 'top-center',
      icon: 'failure',
      title: 'Some error has occured:(',
      showConfirmButton: false,
      timer: 1500
    })
  })

  }


  const handleUpload = async() => {
    const pdfRef = refst(storage, `pdfs/resources/${unqiueId}/0`); // path where to store
    await uploadBytes(pdfRef , pdfurl).then((snapshot) => { // imageurl is the source of the snapshot
      console.log('uploaded');
    });
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
        visible={openmodal}
        width="700"
        height="400"
        effect="fadeInUp"
        onClickAway={() => setopenmodal(false)}
    >
        <div className='ResourceModalContainer'>
          <div className="ResourceModalHeading">
            <h1>Add Video Lectures</h1>
          </div>
          <div className="ResourceName">
            <label >Video Title</label>
            <input type="text" placeholder='Enter the suitable title of the video...' onChange={(e) => {setTitle(e.target.value)}}/>
          </div>
          {/* <div className="ResourcePdf">
            <label >Resource Pdf</label>
            <input 
            onChange={(e) => {
              setpdfurl(e.target.files[0]);
            }}
            type="file" />
            <button onClick={handleUpload}>upload</button>
          </div> */}
          <div className="ResourceDesc">
            <label>Video Description</label>
            <textarea name="resdesc" placeholder="Enter brief description about the video..." onChange={(e) => {setdesc(e.target.value)}} required></textarea>
          </div>
          <div className="ResourceLinks">
            <label >Lecture's Youtube Link</label>
            <input type="text" placeholder='provide youtube link...' onChange={(e) => {setvideoLink(e.target.value)}}/>
          </div>
          <div>
      <label htmlFor="dropdown">Select Subject  </label>
      <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
        <option value="">-- Select --</option>
        {filteredOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
          <div className="ResourceSubmit">
            <input type="submit" onClick={handleSubmit}/>
          </div>
        </div>

    </Modal>
  )
}

export default LecturePageModal