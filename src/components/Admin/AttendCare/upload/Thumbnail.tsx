import XCircleIcon from "assets/svg/x-circle-icon";
import { Box } from "components/common";

import { InnerShadow, StyledDeleteButton, StyledText, StyledThumb, StyledThumbImg } from "./styles";

import type { IFile } from "./types";

interface TumbnailProps {
  file: IFile;
  index: number;
  onRemove?: (index: number) => void;
}

const Thumbnail = ({ file, index, onRemove }: TumbnailProps) => {
  return (
    <>
      <StyledThumb>
        <Box as="button" width="100%" height="100%" onClick={() => console.log("이미지 클릭!")}>
          <InnerShadow />
          <StyledThumbImg src={file.thumbnail} alt={`preview-${index}`} />
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

export default Thumbnail;
