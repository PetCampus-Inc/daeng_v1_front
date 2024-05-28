import XCircleIcon from "assets/svg/x-circle-icon";
import {
  StyledThumbImg,
  StyledThumb,
  StyledDeleteButton,
  InnerShadow,
  StyledText
} from "components/Admin/AttendCare/AttendCareGallery/upload/styles";
import { Box } from "components/common";
import CarouselModal from "components/common/Modal/CarouselModal";
import { useOverlay } from "hooks/common/useOverlay";

import * as S from "../../styles";

import type { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload/types";

interface TumbnailProps {
  file: IFile;
  index: number;
  onRemove?: (index: number) => void;
  openPopup: (thumbnail: string, date: string) => void;
}

export const Thumbnail = ({ file, index, onRemove, openPopup }: TumbnailProps) => {
  const overlay = useOverlay();

  return (
    <>
      <S.CarouselCard role="button" onClick={() => openPopup(file.thumbnail, "2023.12.12")}>
        <StyledThumbImg src={file.thumbnail} alt={`preview-${index}`} />
        {file.duration && <StyledText>{file.duration}</StyledText>}
        <S.CarouselText>2023.12.12 업로드</S.CarouselText>
      </S.CarouselCard>
      {onRemove && (
        <StyledDeleteButton onClick={() => onRemove(index)} aria-label="이미지 삭제">
          <XCircleIcon />
        </StyledDeleteButton>
      )}
    </>
  );
};
