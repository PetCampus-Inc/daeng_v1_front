import XCircleIcon from "assets/svg/x-circle-icon";
import {
  Img,
  StyledThumb,
  StyledDeleteButton,
  InnerShadow,
  StyledText
} from "components/Admin/AttendCare/AttendCareGallery/upload/styles";
import { Box } from "components/common";
import { useOverlay } from "hooks/common/useOverlay";

import PreviewPopup from "./PreviewPopup";

import type { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload/types";

interface TumbnailProps {
  file: IFile;
  index: number;
  onRemove?: (index: number) => void;
}

export const Thumbnail = ({ file, index, onRemove }: TumbnailProps) => {
  const overlay = useOverlay();
  const openPopup = () =>
    overlay.open(({ isOpen, close }) => <PreviewPopup isOpen={isOpen} close={close} data={file} />);

  return (
    <>
      <StyledThumb>
        <Box as="button" width="100%" height="100%" onClick={openPopup}>
          <InnerShadow />
          <Img src={file.thumbnail} alt={`preview-${index}`} />
          {file.duration && <StyledText>{file.duration}</StyledText>}
        </Box>
      </StyledThumb>
      {onRemove && (
        <StyledDeleteButton onClick={() => onRemove(index)} aria-label="이미지 삭제">
          <XCircleIcon />
        </StyledDeleteButton>
      )}
    </>
  );
};
