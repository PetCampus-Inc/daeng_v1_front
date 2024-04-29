import { Upload } from "components/Admin/AttendCare/Upload/FileUpload";
import { StyledThumbList } from "components/Admin/AttendCare/Upload/styles";
import Thumbnail from "components/Admin/AttendCare/Upload/Thumbnail";
import { IFile } from "components/Admin/AttendCare/Upload/types";
import { Flex, Text } from "components/common";
import TextArea from "components/common/TextArea";
import { ChangeEvent, useState } from "react";
import { remCalc } from "utils/calculator";
import { getFilePreview } from "utils/thumb";

import { Box } from "../../common/Box";

const AttendCareGallery = () => {
  const [dataSet, setDataSet] = useState<IFile[]>([]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const fileArray = await Promise.all(files.map(getFilePreview));
      setDataSet((prev) => [...prev, ...fileArray]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const image = dataSet[index];
    URL.revokeObjectURL(image.thumbnail);
    setDataSet((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Box mb={remCalc(36)}>
        <Text as="p" typo="body2_16_R" color="black">
          사진 첨부
        </Text>
        <Flex justify="space-between">
          <Text typo="caption1_12_R" color="gray_2">
            한 번에 최대 nn장 까지 전송이 가능해요
          </Text>
          <Text typo="label2_14_R" color="gray_1">
            12장
          </Text>
        </Flex>

        <StyledThumbList>
          <Flex gap={10} align="center">
            <Upload onChange={handleUpload} accept={["image/*", "video/*"]} />
            {dataSet.map((data, index) => (
              <Box key={index} position="relative">
                <Thumbnail file={data} index={index} onRemove={handleDeleteImage} />
              </Box>
            ))}
          </Flex>
        </StyledThumbList>
      </Box>
      <Flex direction="column" gap={8}>
        <Text as="p" typo="body2_16_R" color="black">
          코멘트
        </Text>
        <TextArea rows={7} placeholder="코멘트를 입력해주세요" />
      </Flex>
    </>
  );
};

export default AttendCareGallery;
