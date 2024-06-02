import AddCIcon from "assets/svg/add-c-icon";
import {
  IFile,
  StyledThumb,
  StyledThumbImg
} from "components/Admin/AttendCare/AttendCareGallery/upload";
import { Flex } from "components/common/Flex";
import { Text } from "components/common/Text";
import { ChangeEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getFilePreview } from "utils/thumb";

import ProfileActiveBox from "./ProfileActiveBox";
import * as S from "./styles";

const ProfileEdite = () => {
  const { register, setValue, watch } = useFormContext();
  const [myProfile, setMyProfile] = useState<IFile[]>([]);
  const [dogProfile, setDogProfile] = useState<IFile[]>([]);
  const [isMyActive, setMyIsActive] = useState(false);
  const [isDogActive, setDogIsActive] = useState(false);
  const myFileInputRef = useRef<HTMLInputElement | null>(null);
  const dogFileInputRef = useRef<HTMLInputElement | null>(null);

  const TYPE_MY = "MY";
  const TYPE_DOG = "DOG";

  const handleClick = (type: string) => {
    if (myFileInputRef.current || dogFileInputRef) {
      if (type === TYPE_MY) {
        isMyActive ? setMyIsActive(false) : myFileInputRef.current?.click();
      } else if (type === TYPE_DOG) {
        isDogActive ? setDogIsActive(false) : dogFileInputRef.current?.click();
      }
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const targetFile = e.currentTarget.files;
    if (targetFile) {
      if (targetFile.length > 1) {
        alert(`1개의 파일만 업로드할 수 있습니다.`);
        return;
      }

      const newFiles = Array.from(targetFile);
      const fileArray = await Promise.all(newFiles.map(getFilePreview));

      if (type === TYPE_MY) {
        setMyProfile([...fileArray]);
        setValue("myProfile", [...newFiles]);
        setMyIsActive(true);
      } else if (type === TYPE_DOG) {
        setDogProfile([...fileArray]);
        setValue("dogProfile", [...newFiles]);
        setDogIsActive(true);
      }
    }
  };

  return (
    <>
      <Flex align="center" direction="column" justify="center" gap="12" width="100%">
        <S.UploadProfileButton
          onClick={() => handleClick(TYPE_MY)}
          onBlur={() => setMyIsActive(true)}
        >
          {myProfile.length > 0 ? (
            <>
              <S.UploadImage src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              {!isMyActive && <ProfileActiveBox />}
            </>
          ) : (
            <AddCIcon />
          )}
        </S.UploadProfileButton>
        <S.StyledHiddenUpload
          {...register("myProfile")}
          type="file"
          ref={myFileInputRef}
          multiple
          accept={"image/*"}
          onChange={(e) => handleFileChange(e, TYPE_MY)}
        />
        <Text as="span" typo="body2_16_R" color="gray_2">
          내 프로필
        </Text>
      </Flex>

      <Flex align="center" direction="column" justify="center" gap="12" width="100%">
        <S.UploadProfileButton
          onClick={() => handleClick(TYPE_DOG)}
          onBlur={() => setDogIsActive(true)}
        >
          {dogProfile.length > 0 ? (
            <>
              <S.UploadImage src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              {!isDogActive && <ProfileActiveBox />}
            </>
          ) : (
            <AddCIcon />
          )}
        </S.UploadProfileButton>
        <S.StyledHiddenUpload
          {...register("dogProfile")}
          type="file"
          ref={dogFileInputRef}
          multiple
          accept={"image/*"}
          onChange={(e) => handleFileChange(e, TYPE_DOG)}
        />
        <Text as="span" typo="body2_16_R" color="gray_2">
          강아지 프로필
        </Text>
      </Flex>
    </>
  );
};

export default ProfileEdite;
