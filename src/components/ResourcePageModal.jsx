import React from 'react'
import Modal from 'react-awesome-modal'
import "../assets/css/ResourceModalCSS.css"
import { getStorage, ref as refst, uploadBytes } from "firebase/storage";
import { useState } from 'react'
import { uid } from 'uid'
import { app } from '../firebase';

const ResourcePageModal = ({openmodal,setopenmodal}) => {
  const unqiueId = uid(15);
  const storage = getStorage(app);
  const [pdfurl, setpdfurl] = useState('');
  const handleUpload = async() => {
    const pdfRef = refst(storage, `pdfs/resources/${unqiueId}/0`); // path where to store
    await uploadBytes(pdfRef , pdfurl).then((snapshot) => { // imageurl is the source of the snapshot
      console.log('uploaded');
    });
  }
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
            <h1>Add Resources</h1>
          </div>
          <div className="ResourceName">
            <label >Resource Name</label>
            <input type="text" />
          </div>
          <div className="ResourcePdf">
            <label >Resource Pdf</label>
            <input 
            onChange={(e) => {
              setpdfurl(e.target.files[0]);
            }}
            type="file" />
            <button onClick={handleUpload}>upload</button>
          </div>
          <div className="ResourceLinks">
            <label >Lectures Link</label>
            <input type="text"/>
          </div>
          <div className="ResourceOfficialDocs">
            <label >Official Doc</label>
            <input type="text" />
          </div>
          <div className="ResourceSubmit">
            <input type="submit"/>
          </div>
        </div>

    </Modal>
  )
}

export default ResourcePageModal