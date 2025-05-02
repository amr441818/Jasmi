import { useRef, useState } from 'react';
type UploadPdfProps = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  label?: string;
};

const UploadPdf = (props: UploadPdfProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleButtonClick = () => {
    // Programmatically click the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files && files.length > 0) {
      const file = files[0];
      props.setFile(file);
      setFileName(file.name);  // Set the file name instead of image
    }
  };

  return (
    <div className="flex flex-col items-start gap-[4px]">
      {props.label && <label htmlFor="">{props.label}</label>}
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".pdf" />
      <div
        onClick={handleButtonClick}
        className="flex cursor-pointer w-[220px] h-[80px] rounded-[12px] border-[2px] border-[#0B1242] border-solid justify-center items-center "
      >
        {fileName ? (
          <p className="text-[#0B1242]">{fileName}</p> // Display the file name when selected
        ) : (
          <p className="text-[#0B1242]">Upload PDF</p> // Default text
        )}
      </div>
    </div>
  );
};

export default UploadPdf;
