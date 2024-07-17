import { Flex, Text, Box } from "components/common";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import { remCalc } from "utils/calculator";
import { getFilePreview } from "utils/thumb";

import { StyledThumbList, Thumbnail, Uploader } from "./upload";

import type { IFile } from "./upload/types";

const UploadBox = () => {
  const { register, setValue, watch } = useFormContext();
  const [files, setFiles] = useState<IFile[]>([]);

  const MAX_FILE_COUNT = 20;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (files.length + newFiles.length > MAX_FILE_COUNT) {
        alert(`최대 ${MAX_FILE_COUNT}개의 파일만 업로드할 수 있습니다.`);
        return;
      }
      const fileArray = await Promise.all(newFiles.map(getFilePreview));
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
      setValue("files", [...watch("files", files), ...newFiles]);
    }
  };

  const handleFileRemove = (index: number) => {
    const updatedFiles = [...files];
    const removedFile = updatedFiles.splice(index, 1)[0];
    URL.revokeObjectURL(removedFile.thumbnail);
    removedFile.video && URL.revokeObjectURL(removedFile.video);
    setFiles(updatedFiles);

    const formFiles = [...watch("files")];
    formFiles.splice(index, 1);
    setValue("files", formFiles);
  };

  return (
    <>
      <Box mb={36}>
        <Text tag="p" typo="body2_16_R" color="black">
          사진 첨부
        </Text>
        <Flex justify="space-between">
          <Text tag="span" typo="caption1_12_R" color="gray_2">
            한 번에 최대 {MAX_FILE_COUNT}장 까지 전송이 가능해요
          </Text>
          <Text typo="label2_14_R" color="gray_1">
            {files.length}장
          </Text>
        </Flex>

        <StyledThumbList>
          <Flex gap={10} align="center">
            <Uploader
              {...register("files")}
              accept={["image/*", "video/*"]}
              onChange={handleFileChange}
              disabled={files.length >= MAX_FILE_COUNT}
            />
            {files.map((file, index) => (
              <Box key={index} position="relative">
                <Thumbnail file={file} index={index} onRemove={handleFileRemove} />
              </Box>
            ))}
          </Flex>
        </StyledThumbList>
      </Box>
    </>
  );
};

export default UploadBox;
