import { ProgressTemplate } from "components/common";
import { BottomButton } from "components/common/Button";
import { useFileDownload } from "hooks/common/useS3";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { activeGroupIdState, canSaveSelector, selectedImagesState } from "store/images";

export function SaveButton() {
  const activeGroupId = useRecoilValue(activeGroupIdState);
  const selectedImages = useRecoilValue(selectedImagesState);
  const canSave = useRecoilValue(canSaveSelector);
  const resetSelectedImages = useResetRecoilState(selectedImagesState);
  const resetActiveGroupId = useResetRecoilState(activeGroupIdState);

  const { isLoading, progress, downloaded, downloadFile } = useFileDownload();

  const handleSaveClick = () => {
    const urls = Array.from(selectedImages.values());
    downloadFile(
      { urls },
      {
        onSuccess: () => {
          resetSelectedImages();
          resetActiveGroupId();
        }
      }
    );
  };

  if (activeGroupId === null) return null;

  return (
    <>
      <BottomButton position="fixed" onClick={handleSaveClick} disabled={!canSave}>
        저장
      </BottomButton>
      {isLoading && (
        <ProgressTemplate
          progress={progress}
          currentIdx={downloaded}
          totalFiles={selectedImages.size}
        />
      )}
    </>
  );
}
