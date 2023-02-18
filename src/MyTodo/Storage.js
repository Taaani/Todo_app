import React from 'react'
import { useState } from 'react'
import filesize from "filesize";
import { storage } from '../Config/configration';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Storage() {

    const [file, setFile] = useState({});
    const [isProssess, setIsProssessing] = useState(false);
    const [isPrograss, setIsPrograss] = useState(0);



    const handleFile = (e) => {
        console.log("e =>", e)
        const file = e.target.files[0];

        setFile(file);
    }

    const handleSubmit = () => {

        if (!file.size) {
            alert("please select your file");
            return;
        }

        // file extention..

        const extFile = file.name.split('.').pop();
        console.log("extention  ", extFile);
        // make redom id.......
        const randomId = Math.random().toString(36).slice(2);
        console.log("id ", randomId)




        //   upload images.........
        const imagesRef = ref(storage, `image/${randomId}.${extFile}`);


        // progress bar code.....
        const uploadTask = uploadBytesResumable(imagesRef, file);

        setIsProssessing(true)
        uploadTask.on('state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setIsPrograss(progress)
                if (progress === 100) {
                    setTimeout(() => {
                        setIsProssessing(false)
                    }, 2000)
                }

            })






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
                        {file.name && <p className='mb-0' > name : {file.name} | size : {filesize(file.size)} </p>}
                    </div>
                </div>

                {
                    isProssess
                        ? <div className="row mt-2">
                            <div className="col">

                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style={{ width: `${isPrograss}%` }} aria-valuenow={isProssess} aria-valuemin="0" aria-valuemax="100">{`${isPrograss}%`}</div>
                                </div>
                            </div>
                        </div>
                        : ""
                }

                <div className="row mt-5">
                    <div className="col text-end ">
                        <button className='btn btn-success' onClick={handleSubmit} disabled={isProssess ? true : false}>

                            {
                                !isProssess
                                    ? "upload file"
                                    : <div class="spinner-border text-danger" role="status">

                                    </div>
                            }
                        </button>
                    </div>

                </div>

            </div>

        </>
    )
}
