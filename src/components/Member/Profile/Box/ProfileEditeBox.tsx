import { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import showToast from "utils/showToast";
import { getFilePreview } from "utils/thumb";

import ProfileEdite from "../Edite/ProfileEdite";

interface IProfileEditeProps {
  type: "MY" | "DOG";
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  fileRef: React.RefObject<HTMLInputElement>;
  fileName: string;
}

const ProfileEditeBox = ({
  type,
  isActive,
  setIsActive,
  fileRef,
  fileName
}: IProfileEditeProps) => {
  const { setValue } = useFormContext();
  const [profile, setProfile] = useState<IFile[]>([]);

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

      //TODO 중복파일인 경우 확인 필요
      setProfile([...fileArray]);
      setValue(fileName, [...newFiles]);
      setIsActive(true);
    }
  };

  return (
    <>
      <ProfileEdite
        isActive={isActive}
        setIsActive={setIsActive}
        profile={profile}
        fileInputRef={fileRef}
        handleFileChange={handleFileChange}
        handleClick={handleClick}
        registerText={fileName}
        type={type}
      />
    </>
  );
};

export default ProfileEditeBox;
