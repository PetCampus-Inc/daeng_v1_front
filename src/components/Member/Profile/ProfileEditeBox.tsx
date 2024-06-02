import {
  IFile,
  StyledThumb,
  StyledThumbImg
} from "components/Admin/AttendCare/AttendCareGallery/upload";
import { ChangeEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getFilePreview } from "utils/thumb";

import ProfileEdite from "./ProfileEdite";

const ProfileEditeBox = () => {
  const { register, setValue, watch } = useFormContext();
  const [myProfile, setMyProfile] = useState<IFile[]>([]);
  const [dogProfile, setDogProfile] = useState<IFile[]>([]);
  const [isMyActive, setMyIsActive] = useState(false);
  const [isDogActive, setDogIsActive] = useState(false);
  const myFileInputRef = useRef<HTMLInputElement | null>(null);
  const dogFileInputRef = useRef<HTMLInputElement | null>(null);

  const TYPE_MY = "MY";
  const TYPE_DOG = "DOG";

  const handleClick = (type: string) => {
    if (myFileInputRef.current || dogFileInputRef) {
      if (type === TYPE_MY) {
        isMyActive ? setMyIsActive(false) : myFileInputRef.current?.click();
      } else if (type === TYPE_DOG) {
        isDogActive ? setDogIsActive(false) : dogFileInputRef.current?.click();
      }
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const targetFile = e.currentTarget.files;
    if (targetFile) {
      if (targetFile.length > 1) {
        alert(`1개의 파일만 업로드할 수 있습니다.`);
        return;
      }

      const newFiles = Array.from(targetFile);
      const fileArray = await Promise.all(newFiles.map(getFilePreview));

      if (type === TYPE_MY) {
        setMyProfile([...fileArray]);
        setValue("myProfile", [...newFiles]);
        setMyIsActive(true);
      } else if (type === TYPE_DOG) {
        setDogProfile([...fileArray]);
        setValue("dogProfile", [...newFiles]);
        setDogIsActive(true);
      }
    }
  };

  return (
    <>
      <ProfileEdite
        isActive={isMyActive}
        setIsActive={setMyIsActive}
        profile={myProfile}
        fileInputRef={myFileInputRef}
        handleFileChange={handleFileChange}
        handleClick={handleClick}
        registerText="myProfile"
        type={TYPE_MY}
      />

      <ProfileEdite
        isActive={isDogActive}
        setIsActive={setDogIsActive}
        profile={dogProfile}
        fileInputRef={dogFileInputRef}
        handleFileChange={handleFileChange}
        handleClick={handleClick}
        registerText="dogProfile"
        type={TYPE_DOG}
      />
    </>
  );
};

export default ProfileEditeBox;
