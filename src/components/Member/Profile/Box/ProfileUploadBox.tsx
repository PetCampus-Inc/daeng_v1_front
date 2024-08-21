import { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import showToast from "utils/showToast";
import { getFilePreview } from "utils/thumb";

import ProfileCreate from "../Edit/ProfileCreate";
import ProfileEdit from "../Edit/ProfileEdit";

/**
 * create | edit
 * create : 프로필 신규 등록
 * edit : 프로필 편집
 */
type Mode = "create" | "edit";

interface ProfileUploadProps {
  type: string;
  isActive?: boolean;
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
  fileRef: React.RefObject<HTMLInputElement>;
  fileName: string;
  mode: Mode;
}

const ProfileUploadBox = ({
  type,
  isActive,
  setIsActive,
  fileRef,
  fileName,
  mode
}: ProfileUploadProps) => {
  const { setValue } = useFormContext();
  const [profile, setProfile] = useState<IFile[]>([]);

  const handleClick = () => {
    if (fileRef && fileRef.current) {
      mode === "create" && isActive ? setIsActive && setIsActive(false) : fileRef.current.click();
    }
  };

  const updateFilePreview = async (FileList: FileList) => {
    const newFiles = Array.from(FileList);
    const fileArray = await Promise.all(newFiles.map(getFilePreview));

    setProfile([...fileArray]);
    setValue(fileName, [...newFiles]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const FileList = e.target.files;

    if (!FileList) {
      showToast("업로드할 파일이 없습니다.", "ownerNav");
      return;
    }

    // 파일 변경 없을 경우
    if (FileList.length <= 0) {
      if (!isActive && setIsActive) setIsActive(true);
      return;
    }

    if (FileList) {
      updateFilePreview(FileList);
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
        <ProfileEdit
          profile={profile}
          handleFileChange={handleFileChange}
          registerText={fileName}
          type={type}
        />
      )}
    </>
  );
};

export default ProfileUploadBox;
