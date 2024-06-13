import { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload";
import { ChangeEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import showToast from "utils/showToast";
import { getFilePreview } from "utils/thumb";

import ProfileEdite from "../Edite/ProfileEdite";

interface IProfileEditeProps {
  isOnlyProfile?: "MY" | "DOG";
}

const ProfileEditeBox = ({ isOnlyProfile }: IProfileEditeProps) => {
  const { setValue } = useFormContext();
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
    if (!e.target.files) {
      showToast("업로드할 파일이 없습니다.", "ownerNav");
      return;
    }

    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const fileArray = await Promise.all(newFiles.map(getFilePreview));

      //TODO 중복파일 확인 필요
      if (type === TYPE_MY) {
        setMyProfile([...fileArray]);
        setValue("memberProfileUri", [...newFiles]);
        setMyIsActive(true);
      } else if (type === TYPE_DOG) {
        setDogProfile([...fileArray]);
        setValue("dogProfileUri", [...newFiles]);
        setDogIsActive(true);
      }
    }
  };

  return (
    <>
      {isOnlyProfile !== "DOG" && (
        <ProfileEdite
          isActive={isMyActive}
          setIsActive={setMyIsActive}
          profile={myProfile}
          fileInputRef={myFileInputRef}
          handleFileChange={handleFileChange}
          handleClick={handleClick}
          registerText="memberProfileUri"
          type={TYPE_MY}
        />
      )}
      <ProfileEdite
        isActive={isDogActive}
        setIsActive={setDogIsActive}
        profile={dogProfile}
        fileInputRef={dogFileInputRef}
        handleFileChange={handleFileChange}
        handleClick={handleClick}
        registerText="dogProfileUri"
        type={TYPE_DOG}
      />
    </>
  );
};

export default ProfileEditeBox;
