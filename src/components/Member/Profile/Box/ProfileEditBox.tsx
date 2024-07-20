import { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import showToast from "utils/showToast";
import { getFilePreview } from "utils/thumb";

import ProfileCreate from "../Edit/ProfileCreate";
import ProfileUpdate from "../Update/ProfileUpdate";

/**
 * create | edit
 * create : 프로필 신규 등록
 * edit : 프로필 편집
 */
type Mode = "create" | "edit";

interface ProfileEditProps {
  type: string;
  isActive?: boolean;
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
  fileRef: React.RefObject<HTMLInputElement>;
  fileName: string;
  mode: Mode;
}

const ProfileEditBox = ({
  type,
  isActive,
  setIsActive,
  fileRef,
  fileName,
  mode
}: ProfileEditProps) => {
  const { setValue } = useFormContext();
  const [profile, setProfile] = useState<IFile[]>([]);

  const handleClick = () => {
    if (fileRef && fileRef.current) {
      mode === "create" && isActive ? setIsActive && setIsActive(false) : fileRef.current.click();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
      if (mode === "create" && setIsActive) setIsActive(true);
    }
  };

  return (
    <>
      {mode === "create" && (
        <ProfileCreate
          isActive={isActive}
          setIsActive={setIsActive}
          profile={profile}
          fileInputRef={fileRef}
          handleFileChange={handleFileChange}
          handleClick={handleClick}
          registerText={fileName}
          type={type}
        />
      )}
      {mode === "edit" && (
        <ProfileUpdate
          profile={profile}
          fileInputRef={fileRef}
          handleFileChange={handleFileChange}
          handleClick={handleClick}
          registerText={fileName}
          type={type}
        />
      )}
    </>
  );
};

export default ProfileEditBox;
