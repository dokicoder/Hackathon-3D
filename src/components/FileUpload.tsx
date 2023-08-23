import { ChangeEvent } from 'react';

const loadFileAsData = (file: File, afterLoading: (e: Event) => void) => {
  if (!file) return;

  let reader = new FileReader();
  // add function that happens after loading
  reader.onload = afterLoading;

  // actually read the text)
  reader.readAsDataURL(file);
};

const FileUploadMultiple = ({
  woundPictures,
  setWoundPictures,
}: {
  woundPictures: string[];
  setWoundPictures: (woundPictures: string[]) => void;
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      loadFileAsData(e.target.files[0], (eve) => {
        setWoundPictures([...woundPictures, (eve.target as any).result]);
      });
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} multiple />
      {woundPictures.map((wound, idx) => (
        <div className="wound-picture" key={idx}>
          <img src={wound} key={'w' + idx} width={'100px'} />
        </div>
      ))}
    </div>
  );
};

export default FileUploadMultiple;
