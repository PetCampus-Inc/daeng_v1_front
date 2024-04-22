import CloseIcon from "assets/svg/close-icon";
import {
  StyledThumbImg,
  StyledThumb,
  StyledDeleteButton,
  InnerShadow,
  StyledText
} from "components/Admin/AttendCare/Upload/styles";
import { Box } from "components/common";

import type { IFile } from "components/Admin/AttendCare/Upload/types";

interface TumbnailProps {
  file: IFile;
  index: number;
  onRemove?: (index: number) => void;
}

const Thumbnail = ({ file, index, onRemove }: TumbnailProps) => {
  return (
    <>
      <StyledThumb>
        <Box tag="button" width="100%" height="100%" onClick={() => console.log("이미지 클릭!")}>
          <InnerShadow />
          <StyledThumbImg src={file.thumbnail} alt={`preview-${index}`} />
          {file.duration && <StyledText>{file.duration}</StyledText>}
        </Box>
      </StyledThumb>
      {onRemove && (
        <StyledDeleteButton onClick={() => onRemove(index)} aria-label="이미지 삭제">
          <CloseIcon />
        </StyledDeleteButton>
      )}
    </>
  );
};

export default Thumbnail;
