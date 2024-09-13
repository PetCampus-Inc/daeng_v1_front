import { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload";
import { ChangeEvent, useCallback, useState } from "react";
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
  fileName: string;
  mode: Mode;
}

const ProfileUploadBox = ({ type, isActive, setIsActive, fileName, mode }: ProfileUploadProps) => {
  const { setValue } = useFormContext();
  const [profile, setProfile] = useState<IFile[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) {
      showToast("업로드할 파일이 없습니다.", "ownerNav");
      return;
    }

    // 파일 변경 없을 경우
    if (fileList.length <= 0) {
      setIsActive?.(true);
      return;
    }

    if (fileList) {
      updateFilePreview(fileList);
      if (mode === "create" && setIsActive) setIsActive(true);
    }
  };

  const updateFilePreview = async (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    const fileArray = await Promise.all(newFiles.map(getFilePreview));

    setProfile([...fileArray]);
    setValue(fileName, [...newFiles]);
  };

  return (
    <>
      {mode === "create" && (
        <ProfileCreate
          isActive={isActive}
          setIsActive={setIsActive}
          profile={profile}
          handleFileChange={handleFileChange}
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
