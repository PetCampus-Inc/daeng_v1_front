import MultiplePhotoSaveIcon from "assets/svg/multiple-photo-save-icon";
import PhotoSaveIcon from "assets/svg/photo-save-icon";

import SaveOptionDropdown from "./SaveOptionDropdown";
import { IconWrapper } from "./styles";

import type { DownloadFileFunction, DownloadProps } from "hooks/common/useS3";
import type { ImageListType } from "types/member/home.types";

interface SaveSectionProps {
  setTotalFiles: React.Dispatch<React.SetStateAction<number>>;
  currentImage: ImageListType;
  allImages: ImageListType[];
  downloadFile: DownloadFileFunction<void, Error, DownloadProps>;
}

const SaveSection = ({
  setTotalFiles,
  downloadFile,
  currentImage,
  allImages
}: SaveSectionProps) => {
  const saveOptions = [
    {
      label: "이 사진만 저장",
      icon: (
        <IconWrapper>
          <PhotoSaveIcon />
        </IconWrapper>
      ),
      onClick: () => {
        setTotalFiles(1);
        downloadFile({ urls: currentImage.imageUri });
      }
    },
    {
      label: "전체 저장",
      icon: (
        <IconWrapper>
          <MultiplePhotoSaveIcon />
        </IconWrapper>
      ),
      onClick: () => {
        setTotalFiles(allImages.length);
        downloadFile({ urls: allImages.map((image) => image.imageUri) });
      }
    }
  ];

  return <SaveOptionDropdown option={saveOptions} />;
};

export default SaveSection;
