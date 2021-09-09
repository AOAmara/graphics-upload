import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import axios from "axios";

function UploadArea() {
    const onDrop = useCallback(acceptedFiles => {
        let data = new FormData();
        data.append('file', acceptedFiles[0]);
        axios.post('http://127.0.0.1:8000/api/upload-file', data).then(res => {
            console.log(res);
        })
    }, []);

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return (
        <div className="uploadAreaBox">
            <div className="dragNDropArea" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Upload your graphic file here</p>
                <p>Upload from Dropbox using the Api goes here...!</p>
            </div>
        </div>
    );
}

export default UploadArea;

