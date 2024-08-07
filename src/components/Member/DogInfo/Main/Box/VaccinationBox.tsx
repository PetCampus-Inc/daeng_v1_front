import { ACCEPT_FILE_TYPE, PROFILE_PATHS } from "constants/profile";

import VaccinationFileIcon from "assets/svg/vaccination-file-icon";
import { Box, DragCarousel, Flex } from "components/common";
import { CarouselModal } from "components/common/Modal/CarouselModal";
import { useGetMemberDogDetailInfo, usePostMembeVaccination } from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import { useS3Upload } from "hooks/common/useS3";
import { ChangeEvent, useRef, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IDogVaccination } from "types/member/main.types";
import { formatDate } from "utils/formatter";
import { getFilePreview } from "utils/thumb";

import {
  IFile,
  StyledThumbList,
  Uploader
} from "../../../../Admin/AttendCare/AttendCareGallery/upload";
import * as S from "../../styles";
import { StyledHiddenUpload } from "../Vaccination/styles";
import { Thumbnail } from "../Vaccination/Thumbnail";

const VaccinationBox = ({ dogId }: { dogId: number }) => {
  const overlay = useOverlay();
  const navigate = useNavigate();
  const { register, setValue, watch, getValues } = useFormContext();
  const [files, setFiles] = useState<IFile[]>([]);
  const { data } = useGetMemberDogDetailInfo(dogId);
  const mutatePostVaccination = usePostMembeVaccination(dogId);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadToS3 } = useS3Upload();

  const MAX_FILE_COUNT = 20;

  const openCarouselPopup = (imgIdx: number) =>
    overlay.open(({ isOpen, close }) => (
      <CarouselModal
        vaccinationUri={vaccinationUri}
        imgIdx={imgIdx}
        isOpen={isOpen}
        close={close}
      />
    ));

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (files.length + newFiles.length > MAX_FILE_COUNT) {
        alert(`최대 ${MAX_FILE_COUNT}개의 파일만 업로드할 수 있습니다.`);
        return;
      }
      const fileArray = await Promise.all(newFiles.map(getFilePreview));
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
      setValue("files", [...watch("files", files), ...newFiles]);
      uploadS3Files(newFiles);
    }
  };

  const uploadFile = () => {
    fileInputRef.current?.click();
  };

  const convertCreatedTime = (time: string) => {
    const [year, day, month] = time.slice(0, 10).split("-");
    return formatDate(year, day, month, "dot");
  };

  const uploadS3Files = (files: File[]) => {
    const filesParams = {
      name: "vaccination",
      files: files,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PROFILE_PATHS.DOG
    };
    console.log("업로드 files", filesParams);
  };

  return (
    <S.DogMoreInfoCard>
      <S.TopInfoBox>
        <Flex gap="4" align="center">
          <S.Icon size="24px">
            <VaccinationFileIcon />
          </S.Icon>
          <S.DogMoreInfo>예방접종 파일</S.DogMoreInfo>
        </Flex>
        <S.DogMoreInfoEditButton onClick={uploadFile}>추가 업로드</S.DogMoreInfoEditButton>
      </S.TopInfoBox>

      <S.CarouselContainer>
        <S.DragCarouselWrapper>
          <DragCarousel gap={10}>
            {/* {files.map((file, index) => (
              <Thumbnail key={index} file={file} index={index} openPopup={openCarouselPopup} />
            ))} */}
            {vaccinationUri.map((file, idx) => (
              <S.CarouselCard
                key={file.imageId}
                role="button"
                onClick={() => openCarouselPopup(idx)}
              >
                <img src={file.imageUri} alt="dog_img" />
                <S.CarouselText>{convertCreatedTime(file.createdTime)} 업로드</S.CarouselText>
              </S.CarouselCard>
            ))}
          </DragCarousel>
        </S.DragCarouselWrapper>
        <StyledHiddenUpload
          {...register("vaccinationFiles")}
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={vaccinationUri ? vaccinationUri.length >= MAX_FILE_COUNT : false}
        />
      </S.CarouselContainer>
    </S.DogMoreInfoCard>
  );
};

export default VaccinationBox;

const vaccinationUri = [
  {
    imageId: 1,
    imageUri:
      "https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&amp;w=2864&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageType: "IMAGE",
    comment: "",
    createdTime: "2024-07-25T07:24:49.701Z"
  },
  {
    imageId: 2,
    imageUri:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageType: "IMAGE",
    comment: "",
    createdTime: "2024-07-25T07:24:49.701Z"
  }
];
