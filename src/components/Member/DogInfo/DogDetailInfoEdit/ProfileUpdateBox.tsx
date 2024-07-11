import { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload";
import ProfileUpdate from "components/Member/Profile/Update/ProfileUpdate";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import showToast from "utils/showToast";
import { getFilePreview } from "utils/thumb";

interface IProfileEditeProps {
  type: string;
  fileRef: React.RefObject<HTMLInputElement>;
  fileName: string;
}

const ProfileUpdateBox = ({ type, fileRef, fileName }: IProfileEditeProps) => {
  const { setValue } = useFormContext();
  const [profile, setProfile] = useState<IFile[]>([]);

  const handleClick = () => {
    if (fileRef && fileRef.current) {
      fileRef.current.click();
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
    }
  };

  return (
    <>
      <ProfileUpdate
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

export default ProfileUpdateBox;
