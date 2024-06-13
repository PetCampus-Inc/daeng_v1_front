import { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload";
import { ChangeEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import showToast from "utils/showToast";
import { getFilePreview } from "utils/thumb";

import ProfileEdite from "../Edite/ProfileEdite";

interface IProfileEditeProps {
  isOnlyProfile?: "MY" | "DOG";
  type: "MY" | "DOG";
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  fileRef: React.RefObject<HTMLInputElement>;
  fileName: string;
}

const ProfileEditeBox = ({
  isOnlyProfile,
  type,
  isActive,
  setIsActive,
  fileRef,
  fileName
}: IProfileEditeProps) => {
  const { setValue } = useFormContext();
  const [myProfile, setMyProfile] = useState<IFile[]>([]);
  const [dogProfile, setDogProfile] = useState<IFile[]>([]);
  const [isMyActive, setMyIsActive] = useState(false);
  const [isDogActive, setDogIsActive] = useState(false);
  const myFileInputRef = useRef<HTMLInputElement | null>(null);
  const dogFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileRef && fileRef.current) {
      isActive ? setIsActive(false) : fileRef.current?.click();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, type: string) => {
    if (!e.target.files) {
      showToast("업로드할 파일이 없습니다.", "ownerNav");
      return;
    }

    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const fileArray = await Promise.all(newFiles.map(getFilePreview));

      //TODO 중복파일 확인 필요
      setMyProfile([...fileArray]);
      setValue(fileName, [...newFiles]);
      setIsActive(true);
    }
  };

  return (
    <>
      <ProfileEdite
        isActive={isActive}
        setIsActive={setIsActive}
        profile={myProfile}
        fileInputRef={fileRef}
        handleFileChange={handleFileChange}
        handleClick={handleClick}
        registerText={fileName}
        type={type}
      />

      {/* <ProfileEdite
        isActive={isDogActive}
        setIsActive={setDogIsActive}
        profile={dogProfile}
        fileInputRef={dogFileInputRef}
        handleFileChange={handleFileChange}
        handleClick={handleClick}
        registerText="dogProfileUri"
        type={type}
      /> */}
    </>
  );
};

export default ProfileEditeBox;
