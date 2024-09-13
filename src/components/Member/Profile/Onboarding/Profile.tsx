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
      fileName: FILE_NAME.PROFILE_MEMBER,
      fileRef: myFileInputRef
    },
    {
      type: TYPE_NAME.DOG,
      isActive: isDogActive,
      setIsActive: setIsDogActive,
      fileName: FILE_NAME.PROFILE_DOG,
      fileRef: dogFileInputRef
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
          fileName={item.fileName}
          fileRef={item.fileRef}
          mode="create"
        />
      ))}
    </>
  );
};

export default Profile;
