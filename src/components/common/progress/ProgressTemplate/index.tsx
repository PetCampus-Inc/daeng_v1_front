import { Box, Progress, Text } from "components/common";
import { FloatingOverlay } from "components/common/FloatingOverlay";
import Portal from "components/common/Portal";

export interface ProgressTemplateProps {
  totalFiles: number;
  currentIdx: number;
  progress: number;
}

export const ProgressTemplate = ({ currentIdx, totalFiles, progress }: ProgressTemplateProps) => {
  return (
    <Portal>
      <FloatingOverlay type="dimmed" lockScroll />
      <Box
        position="fixed"
        width="65%"
        maxWidth="300px"
        margin="auto"
        top="45%"
        left={0}
        right={0}
        zIndex={10}
        textAlign="center"
      >
        <Text as="p" typo="body2_16_R" color="white">
          {currentIdx + 1}/{totalFiles}장의 사진 저장 중
        </Text>
        <Text as="p" typo="title2_20_B" color="white">
          {progress}%
        </Text>
        <Progress value={progress} />
      </Box>
    </Portal>
  );
};
