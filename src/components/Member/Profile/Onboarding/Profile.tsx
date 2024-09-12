import { TYPE_NAME, FILE_NAME } from "constants/s3File";

import { useRef, useState } from "react";

import ProfileUploadBox from "../Box/ProfileUploadBox";

const Profile = () => {
  const [isMyActive, setIsMyActive] = useState(false);
  const [isDogActive, setIsDogActive] = useState(false);
  const myFileInputRef = useRef<HTMLInputElement>(null);
  const dogFileInputRef = useRef<HTMLInputElement>(null);

  const profileDatas = [
    {
      type: TYPE_NAME.MEMBER,
      isActive: isMyActive,
      setIsActive: setIsMyActive,
      fileRef: myFileInputRef,
      fileName: FILE_NAME.PROFILE_MEMBER
    },
    {
      type: TYPE_NAME.DOG,
      isActive: isDogActive,
      setIsActive: setIsDogActive,
      fileRef: dogFileInputRef,
      fileName: FILE_NAME.PROFILE_DOG
    }
  ];

  return (
    <>
      {profileDatas.map((item) => (
        <ProfileUploadBox
          key={item.type}
          type={item.type}
          isActive={item.isActive}
          setIsActive={item.setIsActive}
          fileRef={item.fileRef}
          fileName={item.fileName}
          mode="create"
        />
      ))}
    </>
  );
};

export default Profile;
