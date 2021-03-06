import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone'
import axios from "axios";
import {ProgressBar} from 'react-bootstrap';
import AlertDialog from "./AlertDialog";
import DropboxChooser from 'react-dropbox-chooser';

function UploadArea() {
    const appKey = 'kbjkmghx65jo7z9';
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [alertStatusCode, setAlertStatusCode] = useState();
    const [alertStatus, setAlertStatus] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [responseErrors, setResponseErrors] = useState("");
    const [show, setShow] = useState(false);

    function handleSuccess(files) {
        console.log(files);
        handleOnDrop(files);
    }

    const handleOnDrop = (acceptedFiles) => {
        let data = new FormData();
        data.append('file', acceptedFiles[0]);
        console.log(acceptedFiles[0]);

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
            setShow(true);
            setAlertStatusCode(res.data.statusCode);
            setAlertStatus(res.data.status);
            setAlertMessage(res.data.message);
            setResponseErrors(res.data.errors.file);

        }).catch(e=> console.log(e))
    };

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        multiple: false,
        onDrop: handleOnDrop
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
                        <DropboxChooser
                            appKey={appKey}
                            success={files => handleSuccess(files)}
                            cancel={() => console.log('Operation canceled')}
                            multiselect={false}
                            extensions={['.jpeg', '.png', '.jpg', '.gif', '.svg']} >
                            <button className="dropbox-button">Dropbox</button>
                        </DropboxChooser>
                    </div>
                </div>
                {alertStatusCode <= 201 && uploadPercentage > 0 && <ProgressBar now={uploadPercentage} />}
            </div>
        </React.Fragment>
    );
}

export default UploadArea;

