import { Box, Text, Progress, type ProgressTemplateProps } from "components/common";

import { Dimmed } from "./styles";

export function ProgressScreen({ currentIdx, totalFiles, progress }: ProgressTemplateProps) {
  return (
    <>
      <Dimmed />
      <Box
        position="absolute"
        width="70%"
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
    </>
  );
}
