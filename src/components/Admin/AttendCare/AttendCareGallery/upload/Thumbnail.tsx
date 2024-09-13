import XCircleIcon from "assets/svg/x-circle-icon";
import { Box } from "components/common";
import { useOverlay } from "hooks/common/useOverlay";

import PreviewPopup from "./PreviewPopup";
import { StyledThumb, StyledText, Img, InnerShadow, StyledDeleteButton } from "./styles";

import type { IFile } from "./types";

interface ThumbnailProps {
  file: IFile;
  index: number;
  onRemove?: (index: number) => void;
}

export const Thumbnail = ({ file, index, onRemove }: ThumbnailProps) => {
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
