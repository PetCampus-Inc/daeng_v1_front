import { Image } from "components/common/Image";
import React from "react";

import * as Styled from "./styles";

import type { ImageList } from "types/member/main.types";

interface ImageGridProps {
  items: ImageList[];
  onImageClick: (images: ImageList[], index: number) => void;
}

/** 단일 이미지 */
const ImageItem = ({
  item,
  onClick,
  children
}: {
  item: ImageList;
  onClick: () => void;
  children?: React.ReactNode;
}) => (
  <Styled.ImageWrapper onClick={onClick}>
    <Image src={item.imageUri} ratio="1/1" />
    {children}
  </Styled.ImageWrapper>
);

/** 이미지 그리드 */
export function ImageGrid({ items, onImageClick }: ImageGridProps) {
  const remainingCount = items.length > 4 ? items.length - 3 : 0;

  return (
    <Styled.ImageList>
      {items.slice(0, 4).map((item, index) =>
        index === 3 && remainingCount > 0 ? (
          <ImageItem key={item.imageId} item={item} onClick={() => onImageClick(items, index)}>
            {/* 남은 사진 갯수 표시 */}
            <Styled.Dimmed>
              <Styled.CountWrapper>
                <Styled.Count>+{remainingCount}</Styled.Count>
              </Styled.CountWrapper>
            </Styled.Dimmed>
          </ImageItem>
        ) : (
          <ImageItem key={item.imageId} item={item} onClick={() => onImageClick(items, index)} />
        )
      )}
    </Styled.ImageList>
  );
}
