import { Box, Flex, Progress, Text } from "components/common";
import Portal from "components/common/Portal";
import { BackDrop } from "styles/StyleModule";

interface ProgressTemplateProps {
  totalFiles: number;
  currentIdx: number;
  progress: number;
}

export const ProgressTemplate = ({ currentIdx, totalFiles, progress }: ProgressTemplateProps) => {
  return (
    <Portal>
      <BackDrop />
      <Box
        position="fixed"
        width="65%"
        maxWidth="300px"
        margin="auto"
        top="40%"
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
