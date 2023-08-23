import { useState } from 'react';

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
  const handleFileChange = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer?.files) {
      loadFileAsData(e.dataTransfer?.files[0], (eve) => {
        setWoundPictures([...woundPictures, (eve.target as any).result]);
      });
    }
  };

  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <>
      <div></div>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleFileChange(e)}
        className="file-upload"
      >
        {woundPictures.map((wound, idx) => (
          <div
            className="wound-picture"
            onClick={() => setSelectedImage(wound)}
            key={idx}
          >
            <img src={wound} key={'w' + idx} width={'100px'} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FileUploadMultiple;
