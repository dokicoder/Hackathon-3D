import { InputRounded } from '@mui/icons-material';
import { ChangeEvent, useState } from 'react';
import { IWoundState } from '../store';

const FileUploadMultiple = ({ woundPictures, setWoundPictures }: { woundPictures: File[], setWoundPictures: any }) => {

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFiles = woundPictures ? Array.from(woundPictures) : [];
        if (e.target.files) {
            for (const file of e.target.files) {
                newFiles?.push(file)
            }
            setWoundPictures(newFiles);
        }

    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} multiple />
            <InputRounded />

            <ul>
                {woundPictures.map((file, i) => (
                    <li key={i}>
                        {file.name} - {file.type}
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default FileUploadMultiple;