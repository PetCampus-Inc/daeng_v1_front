import XCircleIcon from "assets/svg/x-circle-icon";
import {
  StyledThumbImg,
  StyledThumb,
  StyledDeleteButton,
  InnerShadow,
  StyledText
} from "components/Admin/AttendCare/Upload/styles";
import { Box } from "components/common";
import useOverlay from "hooks/common/useOverlay/useOverlay";

import PreviewPopup from "./PreviewPopup";

import type { IFile } from "components/Admin/AttendCare/Upload/types";

interface TumbnailProps {
  data: IFile;
  index: number;
  onRemove?: (index: number) => void;
}

const Thumbnail = ({ data, index, onRemove }: TumbnailProps) => {
  const overlay = useOverlay();
  const openPopup = () =>
    overlay.open(({ isOpen, close }) => <PreviewPopup isOpen={isOpen} close={close} data={data} />);

  return (
    <>
      <StyledThumb>
        <Box tag="button" width="100%" height="100%" onClick={openPopup}>
          <InnerShadow />
          <StyledThumbImg src={data.thumbnail} alt={`preview-${index}`} />
          {data.duration && <StyledText>{data.duration}</StyledText>}
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

export default Thumbnail;
