import React from 'react'
import { useState } from 'react'
import { fileSize } from "filesize";
import { storage } from '../Config/configration';
import { ref, uploadBytes } from "firebase/storage";

export default function Storage() {

    const [file, setFile] = useState({});

    const handleFile = (e) => {
        console.log("e =>", e)
        const file = e.target.files[0];
        // if (!file) {
        //     alert("please select your file");
        //     return;
        // }
        const extFile = file.name.split('.').pop();
        console.log("extention  ", extFile);
        const randomId = Math.random().toString(36).slice(2);
        console.log("id ", randomId)



        const imagesRef = ref(storage, `image/${randomId}.${extFile}`);
        uploadBytes(imagesRef, file).then((snapshot) => {

            console.log('Uploaded a blob or file!');
        });
        setFile(file);
    }
    return (
        <>

            <div className="container">
                <div className="row mt-5">
                    <div className="col text-center h1">Upload file on fireBase</div>
                </div>
                <div className="row mt-5">
                    <div className="col">
                        <input type="file" className='form-control' accept='image/*' onChange={handleFile} />
                        {file.name && <p className='mb-0' > name : {file.name} </p>}
                    </div>
                </div>
            </div>

        </>
    )
}
