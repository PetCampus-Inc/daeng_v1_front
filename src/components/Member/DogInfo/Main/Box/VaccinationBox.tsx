import { ACCEPT_FILE_TYPE } from "constants/profile";

import VaccinationFileIcon from "assets/svg/vaccination-file-icon";
import { DragCarousel, Flex } from "components/common";
import { CarouselModal } from "components/common/Modal/CarouselModal";
import { useOverlay } from "hooks/common/useOverlay";
import { ChangeEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { formatDate } from "utils/formatter";
import { getFilePreview } from "utils/thumb";

import {
  IFile,
  StyledThumbList,
  Uploader
} from "../../../../Admin/AttendCare/AttendCareGallery/upload";
import * as S from "../../styles";
import useUploadVaccintion from "../hooks/useUploadVaccintion";
import { StyledHiddenUpload } from "../Vaccination/styles";
import { Thumbnail } from "../Vaccination/Thumbnail";

const VaccinationBox = ({ dogId }: { dogId: number }) => {
  const overlay = useOverlay();
  const [files, setFiles] = useState<IFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { register, setValue, watch } = useFormContext();
  const { uploadFiles } = useUploadVaccintion(dogId);

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

  const convertCreatedTime = (time: string) => {
    const [year, day, month] = time.slice(0, 10).split("-");
    return formatDate(year, day, month, "dot");
  };

  const handleUploadFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const vaccinationFilse = e.target.files;
    if (vaccinationFilse) {
      const newFiles = Array.from(vaccinationFilse);
      if (files.length + newFiles.length > MAX_FILE_COUNT) {
        alert(`최대 ${MAX_FILE_COUNT}개의 파일만 업로드할 수 있습니다.`);
        return;
      }
      const fileArray = await Promise.all(newFiles.map(getFilePreview));
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
      setValue("files", [...watch("files", files), ...newFiles]);
      uploadS3Files(vaccinationFilse);
    }
  };

  const uploadS3Files = (files: FileList) => {
    const params = {
      files: files,
      path: "vaccination",
      accept: ACCEPT_FILE_TYPE.IMAGE,
      dogIdList: [dogId],
      comment: ""
    };
    uploadFiles(params);

    console.log("업로드 files", params);
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
        <S.DogMoreInfoEditButton onClick={handleUploadFile}>추가 업로드</S.DogMoreInfoEditButton>
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
                <img src={file.imageUri} alt={`vaccination-${file.imageId}`} />
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
