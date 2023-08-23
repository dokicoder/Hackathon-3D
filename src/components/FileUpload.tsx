import { InputRounded } from '@mui/icons-material';
import { ChangeEvent, useState } from 'react';
import { IWoundState } from '../store';

const loadFileAsData = (file: File, afterLoading: (e: Event) => void) => {
    if (!file) return;

    let reader = new FileReader();
    // add function that happens after loading
    reader.onload = afterLoading;

    // actually read the text)
    reader.readAsDataURL(file);
};

const FileUploadMultiple = ({ woundPictures, setWoundPictures }: { woundPictures: string[], setWoundPictures: any }) => {

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

        // const newFiles = woundPictures ? Array.from(woundPictures) : [];
        if (e.target.files) {
            loadFileAsData(e.target.files[0], (eve) => { setWoundPictures([(eve.target as any).result]); })
            // for (const file of e.target.files) {
            //     loadFileAsData(file)
            //     newFiles?.push(file)
            // }
            // setWoundPictures(newFiles);
        }

    };


    return (
        <div>
            <input type="file" onChange={handleFileChange} multiple />

            <ul>
                {woundPictures.map((wound, i) => (
                    <img src={wound} key={'w' + i} width={'100px'} />
                ))}
            </ul>

        </div>
    );
}

export default FileUploadMultiple;