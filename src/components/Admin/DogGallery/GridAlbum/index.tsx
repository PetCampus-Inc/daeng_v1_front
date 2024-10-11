import { routes } from "constants/path";

import { Button, Flex, ProgressTemplate, Text } from "components/common";
import { BasicModal } from "components/common/Modal";
import { useGetDogImage } from "hooks/api/admin/dogs";
import { useOverlay } from "hooks/common/useOverlay";
import { useSaveMedia } from "hooks/common/useSaveMedia";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import showToast from "utils/showToast";

import * as S from "./styles";
import SinglePicture from "../SinglePicture";

import type { AdminDogImage } from "types/admin/admin.types";

interface GridAlbumProps {
  dogId: number;
  isEditing: boolean;
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

const GridAlbum = ({ dogId, isEditing }: GridAlbumProps) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const { data, hasNextPage, fetchNextPage, isLoading: isGetLoading } = useGetDogImage({ dogId });
  const { saveMedia, isLoading, total, currentIndex, progress } = useSaveMedia();
  const overlay = useOverlay();
  const navigate = useNavigate();

  /** 사진 데이터 맵핑 */
  const dateMappingImages: ImageData = useMemo(() => {
    const imageList = data?.pages.flatMap((page) => page.list) ?? [];

    return imageList.reduce((acc, cur) => {
      const { imageId, imageUrl, createdAt } = cur;
      if (!acc[createdAt]) acc[createdAt] = [];
      acc[createdAt].push({ imageId, imageUrl });
      return acc;
    }, {} as ImageData);
  }, [data]);

  /** 사진 선택 핸들러 */
  const handleSelect = (url: string) => {
    if (selectedImages.includes(url))
      setSelectedImages((prev) => prev.filter((item) => item !== url));
    else if (selectedImages.length < 20) setSelectedImages((prev) => [...prev, url]);
    else showToast("최대 20장까지 선택이 가능합니다", "gallery");
  };

  /** 사진 클릭 핸들러 */

  const handleClick = (
    selectedImageId: number,
    createdAt: string,
    imageList: Omit<AdminDogImage, "createdAt">[]
  ) => {
    if (selectedImageId === null) return;

    const url = `${routes.admin.attendance.galleryViewer.dynamic(dogId)}`;
    navigate(url, {
      state: { imageList, createdAt, selectedImageId }
    });
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

  /** 무한 스크롤 옵저버 */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isGetLoading) fetchNextPage();
    });

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) observer.observe(currentObserverRef);

    return () => {
      if (currentObserverRef) observer.unobserve(currentObserverRef);
    };
  }, [hasNextPage, isGetLoading, fetchNextPage]);

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
                const isSelected = selectedImages.includes(imageUrl);

                return (
                  <SinglePicture
                    key={imageId}
                    uri={imageUrl}
                    selected={isSelected}
                    isEditing={isEditing}
                    onSelect={handleSelect}
                    onClick={() => handleClick(imageId, date, imageList)}
                  />
                );
              })}
            </S.GridPictures>
          </S.GridAlbumSection>
        );
      })}

      <S.ButtonWrapper data-state-active={selectedImages.length > 0 && isEditing && !isLoading}>
        <Button width="full" onClick={handleSaveClick}>
          저장하기
        </Button>
      </S.ButtonWrapper>

      {/* 사진 저장 프로그래스 바 */}
      {isLoading && (
        <ProgressTemplate progress={progress} currentIdx={currentIndex} totalFiles={total} />
      )}

      {/* 무한 스크롤 옵저버 */}
      {hasNextPage && <div ref={observerRef} />}
    </S.GridAlbumContainer>
  );
};

export default GridAlbum;
