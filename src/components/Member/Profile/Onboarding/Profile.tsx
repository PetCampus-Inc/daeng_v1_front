import { FILE_URI_NAME, PROFILE_NAME } from "constants/profile";

import { useRef, useState } from "react";

import ProfileUploadBox from "../Box/ProfileUploadBox";

const Profile = () => {
  const [isMyActive, setMyIsActive] = useState(false);
  const [isDogActive, setDogIsActive] = useState(false);
  const myFileInputRef = useRef<HTMLInputElement>(null);
  const dogFileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <ProfileUploadBox
        type={PROFILE_NAME.MEMBER}
        isActive={isMyActive}
        setIsActive={setMyIsActive}
        fileRef={myFileInputRef}
        fileName={FILE_URI_NAME.MEMBER}
        mode="create"
      />
      <ProfileUploadBox
        type={PROFILE_NAME.DOG}
        isActive={isDogActive}
        setIsActive={setDogIsActive}
        fileRef={dogFileInputRef}
        fileName={FILE_URI_NAME.DOG}
        mode="create"
      />
    </>
  );
};

export default Profile;
