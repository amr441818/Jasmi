import { useRef, useState } from 'react';
import uploadImg from '../../../public/assets/images/upload-img.png';
// import uploadUser from '../../../public/assets/images/upload-user.png';

type UploadImageProps = {
    user?: boolean;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    editImgUrl?: string | null;
    label?: string;
    multi?: boolean;
};

const Upload = (props: UploadImageProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files;
        if (files && files.length > 0) {
            const file = files[0];
            props.setFile(file);
            setFileType(file.type);
            setFileName(file.name);

            if (file.type.startsWith('image/')) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    setImageSrc(fileReader.result as string);
                };
                fileReader.readAsDataURL(file);
            } else {
                setImageSrc(null); // Clear image preview for non-image files
            }
        }
    };

    return (
        <div className="flex flex-col items-start gap-[4px]">
            {props.label && <label>{props.label}</label>}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*,.pdf"
                multiple={props.multi}
            />
            <div
                onClick={handleButtonClick}
                className="flex cursor-pointer w-[220px] h-[80px] rounded-[12px] border-[2px] border-[#0B1242] border-solid justify-center items-center overflow-hidden text-center px-2"
            >
                {fileType?.startsWith('image/') && imageSrc ? (
                    <img
                        src={imageSrc}
                        alt="Uploaded"
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : fileType === 'application/pdf' && fileName ? (
                    <span className="text-sm text-[#0B1242] truncate">{fileName}</span>
                ) : (
                    <img src={uploadImg} alt="Upload Icon" />
                )}
            </div>
        </div>
    );
};

export default Upload;
