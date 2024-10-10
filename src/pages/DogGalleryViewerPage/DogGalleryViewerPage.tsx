import GalleryViewer from "components/Admin/DogGallery/GalleryViewer";
import { Layout, Text } from "components/common";
import Header from "components/common/Header";
import { ProgressScreen } from "components/Home/ImageComment/ProgressScreen";
import { useSaveMedia } from "hooks/common/useSaveMedia";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import showToast from "utils/showToast";

interface MediaItem {
  imageId: number;
  imageUrl: string;
  isVideo: boolean;
}

interface ImageItem {
  imageId: number;
  imageUrl: string;
}

const DogGalleryViewerPage = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null); // 선택된 미디어 객체 상태
  const { saveMedia, isLoading, total, currentIndex, progress } = useSaveMedia();
  const location = useLocation();
  const { imageList, createdAt, imageId } = location.state || {};

  // imageList를 MediaItem[] 형태로 변환하여 상태에 저장
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);

  useEffect(() => {
    const convertedMediaList = imageList.map((image: ImageItem) => ({
      ...image,
      isVideo: image.imageUrl.endsWith(".mp4") // isVideo 속성을 imageUrl을 통해 판별
    }));
    setMediaList(convertedMediaList);

    const selected = convertedMediaList.find((media: MediaItem) => {
      return Number(media.imageId) === Number(imageId);
    });

    setSelectedMedia(selected ?? null);
  }, [imageList, imageId]);

  const savePhotoOrVideo = () => {
    saveMedia([selectedMedia?.imageUrl ?? ""], {
      onSuccess: () => {
        showToast("사진이 저장되었습니다.", "gallery");
      },
      onError: (msg) => showToast(`저장 중 오류가 발생했습니다. ${msg}`, "bottom")
    });
  };

  return selectedMedia ? (
    <>
      {isLoading ?? (
        <ProgressScreen currentIdx={currentIndex} totalFiles={total} progress={progress} />
      )}
      <Header
        type="text"
        text={createdAt}
        rightElement={<HeaderButton onClick={savePhotoOrVideo}>저장</HeaderButton>}
      />
      <Layout>
        <GalleryViewer
          mediaItems={mediaList}
          selectedMedia={selectedMedia}
          onChangeSelected={(item: MediaItem) => {
            setSelectedMedia(item);
          }}
        />
      </Layout>
    </>
  ) : (
    <Text>선택된 미디어가 없습니다.</Text>
  );
};

export default DogGalleryViewerPage;

const HeaderButton = styled.button`
  ${({ theme }) => theme.typo.label2_14_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;
