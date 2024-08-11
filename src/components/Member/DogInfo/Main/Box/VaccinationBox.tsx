import { ACCEPT_FILE_TYPE, PATHS } from "constants/s3File";

import VaccinationFileIcon from "assets/svg/vaccination-file-icon";
import { DragCarousel, Flex } from "components/common";
import { CarouselModal } from "components/Member/DogInfo/Main/CarouselModal";
import { useOverlay } from "hooks/common/useOverlay";
import { ChangeEvent, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { VaccinationUri } from "types/member/main.types";
import { formatDate } from "utils/formatter";

import * as S from "../../styles";
import useUploadVaccintion from "../hooks/useUploadVaccintion";
import { StyledHiddenUpload } from "../Vaccination/styles";

interface VaccinationProps {
  dogId: number;
  vaccinationUri: VaccinationUri[] | null;
}

const VaccinationBox = ({ dogId, vaccinationUri }: VaccinationProps) => {
  const overlay = useOverlay();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { register } = useFormContext();
  const { uploadFiles } = useUploadVaccintion(dogId);

  const MAX_FILE_COUNT = 30;

  const openCarouselPopup = (imgIdx: number) =>
    overlay.open(({ isOpen, close }) => (
      <CarouselModal
        vaccinationUri={vaccinationUri}
        imgIdx={imgIdx}
        isOpen={isOpen}
        close={close}
      />
    ));

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const vaccinationFileList = e.target.files;
    if (vaccinationFileList) {
      const newFiles = Array.from(vaccinationFileList);
      if (vaccinationUri && vaccinationUri.length + newFiles.length > MAX_FILE_COUNT) {
        alert(`최대 ${MAX_FILE_COUNT}개의 파일만 업로드할 수 있습니다.`);
        return;
      }

      uploadFilesToS3(vaccinationFileList);
    }
  };

  const formatCreatedTime = (time: number[]) => {
    const [year, day, month] = time.slice(0, 10);
    return formatDate(String(year), String(day), String(month), "dot");
  };

  const uploadFilesToS3 = (files: FileList) => {
    const params = {
      files: files,
      path: PATHS.VACCINATION,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      dogIdList: [dogId],
      comment: ""
    };

    uploadFiles(params);
  };

  console.log(vaccinationUri);

  return (
    <S.DogMoreInfoCard>
      <S.TopInfoBox>
        <Flex gap="4" align="center">
          <S.Icon size="24px">
            <VaccinationFileIcon />
          </S.Icon>
          <S.DogMoreInfo>예방접종 파일</S.DogMoreInfo>
        </Flex>
        <S.DogMoreInfoEditButton onClick={handleFileInputClick}>
          추가 업로드
        </S.DogMoreInfoEditButton>
      </S.TopInfoBox>

      <S.CarouselContainer>
        <S.DragCarouselWrapper>
          <DragCarousel gap={10}>
            {vaccinationUri?.map((file, idx) => (
              <S.CarouselCard
                key={file.imageId}
                role="button"
                onClick={() => openCarouselPopup(idx)}
              >
                <img src={file.imageUri} alt={`vaccination-${file.imageId}-${idx}`} />
                <S.CarouselText>{formatCreatedTime(file.createdTime)} 업로드</S.CarouselText>
              </S.CarouselCard>
            ))}
          </DragCarousel>
        </S.DragCarouselWrapper>
        <StyledHiddenUpload
          {...register("vaccinationUri")}
          type="file"
          ref={fileInputRef}
          multiple
          accept={ACCEPT_FILE_TYPE.IMAGE}
          onChange={handleFileChange}
        />
      </S.CarouselContainer>
    </S.DogMoreInfoCard>
  );
};

export default VaccinationBox;
