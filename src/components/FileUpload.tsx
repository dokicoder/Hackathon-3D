import { useState } from 'react';
import { flushSync } from 'react-dom';
import AddIcon from '@mui/icons-material/Add';

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

  const handleThumbnailClick = (wound: string | undefined) => {
    // @ts-ignore -
    document.startViewTransition(() => {
      flushSync(() => {
        setSelectedImage(wound);
      });
    });
  };

  return (
    <>
      {selectedImage && (
        <div
          onClick={() => handleThumbnailClick(undefined)}
          className="image-overlay"
        >
          <img src={selectedImage} className="wound-image" />
        </div>
      )}
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
            onClick={() => handleThumbnailClick(wound)}
            key={idx}
          >
            {!selectedImage && (
              <img src={wound} key={'w' + idx} className="wound-image" />
            )}
          </div>
        ))}
        <div className="wound-picture add">
          <AddIcon fontSize="inherit"></AddIcon>
        </div>
      </div>
    </>
  );
};

export default FileUploadMultiple;
