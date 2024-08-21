import { ProgressTemplate } from "components/common";
import { BottomButton } from "components/common/Button";
import { useFileDownload } from "hooks/common/useS3";

import { useSelectedImages } from "../context/SelectedImageProvider";

const SaveButton = () => {
  const { imageMap, selectedImgIds } = useSelectedImages();
  const { isLoading, progress, downloaded, downloadFile } = useFileDownload();

  const handleDownload = () => {
    const urls = Array.from(imageMap.values());
    downloadFile({ urls });
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
