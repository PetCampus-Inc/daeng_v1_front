// import { MediaViewModal } from "components/Admin/DogGallery/MediaViewModal";
import { Button, Flex, ProgressTemplate, Text } from "components/common";
import { BasicModal } from "components/common/Modal";
import { useOverlay } from "hooks/common/useOverlay";
import { useSaveMedia } from "hooks/common/useSaveMedia";
import { useEffect, useState } from "react";
import showToast from "utils/showToast";

import * as S from "./styles";
import SinglePicture from "../SinglePicture";

interface GridAlbumProps {
  isEditing: boolean;
  onSelect?: () => void;
}

const GridAlbum = ({ isEditing }: GridAlbumProps) => {
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const hasSelected = selectedUrls.length > 0;

  const { saveMedia, isLoading, total, currentIndex, progress } = useSaveMedia();
  const overlay = useOverlay();

  /** 사진 선택 핸들러 */
  const handleSelect = (url: string) => {
    if (selectedUrls.includes(url)) setSelectedUrls((prev) => prev.filter((item) => item !== url));
    else if (selectedUrls.length < 20) setSelectedUrls((prev) => [...prev, url]);
    else showToast("최대 20장까지 선택이 가능합니다", "gallery");
  };

  /** `저장하기` 버튼 클릭 핸들러 */
  const handleSaveClick = () => {
    overlay.open((options) => (
      <BasicModal
        {...options}
        title={`${selectedUrls.length}장의 사진을 저장하고 싶으신가요?`}
        subtitle="사진은 갤러리에 저장됩니다"
        actionText="저장"
        actionFn={() => {
          options.close();
          saveMedia(selectedUrls, {
            onSuccess: () => {
              showToast(`${selectedUrls.length}장이 갤러리에 저장되었습니다`, "gallery");
              setSelectedUrls([]);
            },
            onError: (msg) => showToast(`저장 중 오류가 발생했습니다. ${msg}`, "bottom")
          });
        }}
        closeText="닫기"
        closeFn={options.close}
      />
    ));
  };

  /** 이미지 클릭 핸들러 */
  const handleImageClick = (src: string) => {
    // overlay.open((options) => <MediaViewModal {...options} />);
  };

  useEffect(() => {
    if (isEditing) setSelectedUrls([]);
  }, [isEditing]);

  return (
    <S.GridAlbumContainer>
      {dummy.map((item, index) => {
        const date = Object.keys(item)[0];
        const mediaList = Object.values(item)[0];

        return (
          <S.GridAlbumSection className="inner" key={index}>
            {/* 날짜 */}
            <Flex px={8} justify="space-between">
              <Text typo="label1_16_B">{date}</Text>
              <Text typo="caption1_12_R" color="gray_2">{`${mediaList.length}장`}</Text>
            </Flex>

            {/* 그리드 */}
            <S.GridPictures key={index}>
              {mediaList.map(({ media, url }) => {
                const isVideo = media === "video";
                const isSelected = selectedUrls.includes(url);
                return (
                  <SinglePicture
                    key={url}
                    src={url}
                    selected={isSelected}
                    isVideo={isVideo}
                    isEditing={isEditing}
                    onClick={handleImageClick}
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

      {isLoading && (
        <ProgressTemplate progress={progress} currentIdx={currentIndex} totalFiles={total} />
      )}
    </S.GridAlbumContainer>
  );
};

// TODO: 무한스크롤 / windowing 적용

interface MediaItem {
  media: "image" | "video";
  url: string;
}

interface DateGroup {
  [date: string]: MediaItem[];
}

const dummy: DateGroup[] = [
  {
    "2024.03.31": [{ media: "image", url: "https://picsum.photos/id/1/200/300" }]
  },
  {
    "2024.04.01": [
      { media: "image", url: "https://picsum.photos/id/2/200/300.jpg" },
      { media: "image", url: "https://picsum.photos/id/3/200/300.jpg" },
      { media: "image", url: "https://picsum.photos/id/4/200/300.jpg" },
      { media: "video", url: "https://picsum.photos/id/5/200/300.jpg" }
    ]
  },
  {
    "2024.04.02": [
      { media: "image", url: "https://picsum.photos/id/6/200/300.jpg" },
      { media: "image", url: "https://picsum.photos/id/7/200/300.jpg" }
    ]
  },
  {
    "2024.04.03": [
      { media: "image", url: "https://picsum.photos/id/8/200/300.jpg" },
      { media: "image", url: "https://picsum.photos/id/9/200/300.jpg" },
      { media: "image", url: "https://picsum.photos/id/10/200/300.jpg" }
    ]
  },
  {
    "2024.04.04": [
      { media: "image", url: "https://picsum.photos/id/11/200/300.jpg" },
      { media: "image", url: "https://picsum.photos/id/12/200/300.jpg" },
      { media: "image", url: "https://picsum.photos/id/13/200/300.jpg" },
      { media: "image", url: "https://picsum.photos/id/14/200/300.jpg" }
    ]
  }
];

export default GridAlbum;
