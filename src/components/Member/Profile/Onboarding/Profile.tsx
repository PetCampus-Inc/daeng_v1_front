import { FILE_URI_NAME, PROFILE_NAME } from "constants/profile";

import { useRef, useState } from "react";

import ProfileUploadBox from "../Box/ProfileUploadBox";

const Profile = () => {
  const [isMyActive, setIsMyActive] = useState(false);
  const [isDogActive, setIsDogActive] = useState(false);
  const myFileInputRef = useRef<HTMLInputElement>(null);
  const dogFileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <ProfileUploadBox
        type={PROFILE_NAME.MEMBER}
        isActive={isMyActive}
        setIsActive={setIsMyActive}
        fileRef={myFileInputRef}
        fileName={FILE_URI_NAME.MEMBER}
        mode="create"
      />
      <ProfileUploadBox
        type={PROFILE_NAME.DOG}
        isActive={isDogActive}
        setIsActive={setIsDogActive}
        fileRef={dogFileInputRef}
        fileName={FILE_URI_NAME.DOG}
        mode="create"
      />
    </>
  );
};

export default Profile;
