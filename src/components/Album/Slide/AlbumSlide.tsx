import { DragCarousel, Flex, Text } from "components/common";
import { useState } from "react";
import { Img } from "styles/StyleModule";
import { getTimeAgo } from "utils/date";

import CommentBox from "./CommentBox";
import SaveButton from "./SaveButton";
import { SlideWrapper } from "./styles";

import type { AlbumDataType } from "types/member/main.types";

const AlbumSlide = ({ imageList }: { imageList: AlbumDataType[][] }) => {
  const [isSaveMode, setSaveMode] = useState<boolean>(false);

  const handleSaveMode = () => {
    setSaveMode(!isSaveMode);
  };

  return (
    <>
      {imageList.map((list) => (
        <Flex direction="column" gap={16}>
          <Flex direction="column" gap={4}>
            <Flex justify="space-between">
              <Text typo="body2_16_R" color="darkBlack">
                {getTimeAgo(list[0].createdTime)}
              </Text>
              <SaveButton isSaveMode={isSaveMode} handleSaveMode={handleSaveMode} />
            </Flex>
            <DragCarousel gap={12}>
              {list.map((item) => (
                <SlideWrapper>
                  <Img src={item.imageUri} alt={`${item.imageId} + 번째 강아지 사진`} />
                </SlideWrapper>
              ))}
            </DragCarousel>
          </Flex>
          <CommentBox commentList={list} />
        </Flex>
      ))}
    </>
  );
};

export default AlbumSlide;
