import AddCIcon from "assets/svg/add-c-icon";
import {
  IFile,
  StyledThumb,
  StyledThumbImg
} from "components/Admin/AttendCare/AttendCareGallery/upload";
import { Box } from "components/common/Box";
import { Flex } from "components/common/Flex";
import { Text } from "components/common/Text";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getFilePreview } from "utils/thumb";

import * as S from "./styles";

const ProfileEdite = () => {
  const { register, setValue, watch } = useFormContext();
  const [myProfile, setMyProfile] = useState<IFile[]>([]);
  const [dogProfile, setDogProfile] = useState<IFile[]>([]);
  const [isMyEdite, setMyIsEdite] = useState(false);
  const [isDogEdite, setDogIsEdite] = useState(false);
  const myFileInputRef = useRef<HTMLInputElement | null>(null);
  const dogFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = (type: "MY" | "DOG") => {
    if (myFileInputRef.current || dogFileInputRef) {
      if (type === "MY") {
        myFileInputRef.current?.click();
      } else if (type === "DOG") {
        dogFileInputRef.current?.click();
      }
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, type: "MY" | "DOG") => {
    const targetFile = e.currentTarget.files;
    if (targetFile) {
      if (targetFile.length > 1) {
        alert(`1개의 파일만 업로드할 수 있습니다.`);
        return;
      }

      const newFiles = Array.from(targetFile);
      const fileArray = await Promise.all(newFiles.map(getFilePreview));

      if (type === "MY") {
        console.log("와타시");
        setMyProfile([...fileArray]);
        setValue("myProfile", [...newFiles]);
        setMyIsEdite(true);
      } else if (type === "DOG") {
        console.log("강아지");
        setDogProfile([...fileArray]);
        setValue("dogProfile", [...newFiles]);
        setDogIsEdite(true);
      }
    }
  };

  return (
    <>
      <Flex align="center" direction="column" justify="center" gap="12" width="100%">
        <S.UploadProfileButton
          as="button"
          onClick={() => handleClick("MY")}
          align="center"
          justify="center"
        >
          {myProfile.length > 0 ? (
            <S.UploadImage src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
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
          onChange={(e) => handleFileChange(e, "MY")}
        />
        <Text as="span" typo="body2_16_R" color="gray_2">
          내 프로필
        </Text>
      </Flex>

      <Flex align="center" direction="column" justify="center" gap="12" width="100%">
        <S.UploadProfileButton
          as="button"
          onClick={() => handleClick("DOG")}
          align="center"
          justify="center"
        >
          {dogProfile.length > 0 ? (
            <S.UploadImage src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
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
          onChange={(e) => handleFileChange(e, "DOG")}
        />
        <Text as="span" typo="body2_16_R" color="gray_2">
          강아지 프로필
        </Text>
      </Flex>
    </>
  );
};

export default ProfileEdite;
