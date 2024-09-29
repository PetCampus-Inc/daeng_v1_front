import { Button, Flex, ProgressTemplate, Text } from "components/common";
import { BasicModal } from "components/common/Modal";
import { useOverlay } from "hooks/common/useOverlay";
import { useSaveMedia } from "hooks/common/useSaveMedia";
import { useEffect, useMemo, useState } from "react";
import showToast from "utils/showToast";

import * as S from "./styles";
import SinglePicture from "../SinglePicture";

interface GridAlbumProps {
  isEditing: boolean;
  onSelect?: () => void;
}

interface ImageData {
  /** [날짜]: [사진 데이터]
   * @example
   * {
   *  "2024.05.9": [
   *    { imageId: 1, imageUrl: "https://picsum.photos/id/1/200/300.jpg" },
   *    { imageId: 2, imageUrl: "https://picsum.photos/id/2/200/300.jpg" },
   *  ]
   * }
   */
  [key: string]: { imageId: number; imageUrl: string }[];
}

const GridAlbum = ({ isEditing }: GridAlbumProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const hasSelected = selectedImages.length > 0;

  const { saveMedia, isLoading, total, currentIndex, progress } = useSaveMedia();
  const overlay = useOverlay();

  /** 사진 데이터 맵핑 */
  const dateMappingImages: ImageData = useMemo(() => {
    return dummyImages.reduce(
      (acc, cur) => {
        const { imageId, imageUrl, createdAt } = cur;
        if (!acc[createdAt]) acc[createdAt] = [];
        acc[createdAt].push({ imageId, imageUrl });
        return acc;
      },
      {} as Record<string, { imageId: number; imageUrl: string }[]>
    );
  }, []);

  /** 사진 선택 핸들러 */
  const handleSelect = (url: string) => {
    if (selectedImages.includes(url))
      setSelectedImages((prev) => prev.filter((item) => item !== url));
    else if (selectedImages.length < 20) setSelectedImages((prev) => [...prev, url]);
    else showToast("최대 20장까지 선택이 가능합니다", "gallery");
  };

  /** `저장하기` 버튼 클릭 핸들러 */
  const handleSaveClick = () => {
    overlay.open((options) => (
      <BasicModal
        {...options}
        title={`${selectedImages.length}장의 사진을 저장하고 싶으신가요?`}
        subtitle="사진은 갤러리에 저장됩니다"
        actionText="저장"
        actionFn={() => {
          options.close();
          saveMedia(selectedImages, {
            onSuccess: () => {
              showToast(`${selectedImages.length}장이 갤러리에 저장되었습니다`, "gallery");
              setSelectedImages([]);
            },
            onError: (msg) => showToast(`저장 중 오류가 발생했습니다. ${msg}`, "bottom")
          });
        }}
        closeText="닫기"
        closeFn={options.close}
      />
    ));
  };

  useEffect(() => {
    if (isEditing) setSelectedImages([]);
  }, [isEditing]);

  return (
    <S.GridAlbumContainer>
      {Object.entries(dateMappingImages).map(([date, imageList], index) => {
        return (
          <S.GridAlbumSection className="inner" key={index}>
            {/* 날짜 */}
            <Flex px={8} justify="space-between">
              <Text typo="label1_16_B">{date}</Text>
              <Text typo="caption1_12_R" color="gray_2">{`${imageList.length}장`}</Text>
            </Flex>

            {/* 사진 그리드 */}
            <S.GridPictures key={index}>
              {imageList.map(({ imageId, imageUrl }) => {
                const isVideo = imageUrl.endsWith(".mp4");
                const isSelected = selectedImages.includes(imageUrl);

                return (
                  <SinglePicture
                    key={imageId}
                    src={imageUrl}
                    selected={isSelected}
                    isVideo={isVideo}
                    isEditing={isEditing}
                    onSelect={handleSelect}
                  />
                );
              })}
            </S.GridPictures>
          </S.GridAlbumSection>
        );
      })}

      <S.ButtonWrapper data-state-active={hasSelected && isEditing && !isLoading}>
        <Button width="full" onClick={handleSaveClick}>
          저장하기
        </Button>
      </S.ButtonWrapper>

      {/* 사진 저장 프로그래스 바 */}
      {isLoading && (
        <ProgressTemplate progress={progress} currentIdx={currentIndex} totalFiles={total} />
      )}
    </S.GridAlbumContainer>
  );
};

// TODO: 무한스크롤 / windowing 적용

const dummyImages = [
  {
    imageId: 1,
    createdAt: "2024.03.31",
    imageUrl: "https://t6j88e.csb.app/ocean.mp4"
  },
  {
    imageId: 2,
    createdAt: "2024.03.31",
    imageUrl: "https://picsum.photos/id/2/200/300.jpg"
  },
  {
    imageId: 3,
    createdAt: "2024.04.01",
    imageUrl: "https://picsum.photos/id/3/200/300.jpg"
  },
  {
    imageId: 4,
    createdAt: "2024.04.01",
    imageUrl: "https://picsum.photos/id/4/200/300.jpg"
  },
  {
    imageId: 5,
    createdAt: "2024.04.01",
    imageUrl: "https://picsum.photos/id/5/200/300.jpg"
  },
  {
    imageId: 6,
    createdAt: "2024.04.02",
    imageUrl: "https://picsum.photos/id/6/200/300.jpg"
  },
  {
    imageId: 7,
    createdAt: "2024.04.02",
    imageUrl: "https://picsum.photos/id/7/200/300.jpg"
  },
  {
    imageId: 8,
    createdAt: "2024.04.05",
    imageUrl: "https://picsum.photos/id/8/200/300.jpg"
  },
  {
    imageId: 9,
    createdAt: "2024.04.05",
    imageUrl: "https://picsum.photos/id/9/200/300.jpg"
  },
  {
    imageId: 10,
    createdAt: "2024.04.05",
    imageUrl: "https://picsum.photos/id/10/200/300.jpg"
  },
  {
    imageId: 11,
    createdAt: "2024.04.10",
    imageUrl: "https://picsum.photos/id/11/200/300.jpg"
  }
];

export default GridAlbum;
