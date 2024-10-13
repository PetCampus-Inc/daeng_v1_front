import { ProgressTemplate } from "components/common";
import { BottomButton } from "components/common/Button";
import { useSaveMedia } from "hooks/common/useSaveMedia";

import { useSelectedImages } from "../hooks/SelectedImageProvider";

const SaveButton = () => {
  const { imageMap, selectedImgIds } = useSelectedImages();
  const { saveMedia, isLoading, currentIndex: downloaded, progress } = useSaveMedia();

  const handleDownload = () => {
    const urls = Array.from(imageMap.values());
    saveMedia(urls);
  };

  return (
    <>
      {isLoading && (
        <ProgressTemplate
          progress={progress}
          currentIdx={downloaded}
          totalFiles={selectedImgIds.size}
        />
      )}
      <BottomButton onClick={handleDownload} disabled={selectedImgIds.size === 0}>
        저장
      </BottomButton>
    </>
  );
};

export default SaveButton;
