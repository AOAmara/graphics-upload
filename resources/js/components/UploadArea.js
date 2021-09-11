import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone'
import axios from "axios";
import {ProgressBar} from 'react-bootstrap';
import AlertDialog from "./AlertDialog";

function UploadArea() {
    const fileMaxSize = 200;
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [alertStatusCode, setAlertStatusCode] = useState();
    const [alertStatus, setAlertStatus] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [response, setResponse] = useState("");
    const [responseErrors, setResponseErrors] = useState("");
    const [show, setShow] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        let data = new FormData();
        data.append('file', acceptedFiles[0]);

        const options = {
            onUploadProgress: (progressEvent) => {
                const {loaded, total} = progressEvent;
                let percent = Math.floor( (loaded * 100) / total );
                if(percent < 100) {
                    setUploadPercentage(percent);
                }
            }
        };
        axios.post('http://127.0.0.1:8000/api/upload-file', data, options).then(res => {
            setUploadPercentage(100);
            setTimeout(() => {
                setUploadPercentage(0)
            }, 1000);

            console.log(res.data);
            setResponse(res.data);
            setShow(true);
            setAlertStatusCode(res.data.statusCode);
            setAlertStatus(res.data.status);
            setAlertMessage(res.data.message);
            setResponseErrors(res.data.errors.file);

        })
    }, []);

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        multiple: false,
        maxSize: {fileMaxSize},
        onDrop
    });

    return (
        <React.Fragment>
            <AlertDialog alertStatusCode={alertStatusCode}
                         alertStatus={alertStatus}
                         alertMessage={alertMessage}
                         alertMessageDetails={responseErrors}
                         shown={show}/>
            <div className="uploadAreaBox">
                <div className="dragNDropArea" {...getRootProps()} >
                    <input {...getInputProps()}/>
                    <p>Upload your graphic file here</p>
                    <div className="dropbox">
                        <p>or upload from</p>
                        <button>Dropbox</button>
                    </div>
                </div>
                {alertStatusCode <= 201 && uploadPercentage > 0 && <ProgressBar now={uploadPercentage} />}
            </div>
        </React.Fragment>
    );
}

export default UploadArea;

