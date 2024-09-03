import { TYPE_NAME, FILE_NAME } from "constants/s3File";

import { useState } from "react";

import ProfileUploadBox from "../Box/ProfileUploadBox";

const Profile = () => {
  const [isMyActive, setIsMyActive] = useState(false);
  const [isDogActive, setIsDogActive] = useState(false);

  const profileUploadDatas = [
    {
      type: TYPE_NAME.MEMBER,
      isActive: isMyActive,
      setIsActive: setIsMyActive,
      fileName: FILE_NAME.PROFILE_MEMBER
    },
    {
      type: TYPE_NAME.DOG,
      isActive: isDogActive,
      setIsActive: setIsDogActive,
      fileName: FILE_NAME.PROFILE_DOG
    }
  ];

  return (
    <>
      {profileUploadDatas.map((item, idx) => (
        <ProfileUploadBox
          key={idx}
          type={item.type}
          isActive={item.isActive}
          setIsActive={item.setIsActive}
          fileName={item.fileName}
          mode="create"
        />
      ))}
    </>
  );
};

export default Profile;
