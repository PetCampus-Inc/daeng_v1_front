import DownloadIcon from "assets/svg/download-icon";
import MultiplePhotoSaveIcon from "assets/svg/multiple-photo-save-icon";
import PhotoSaveIcon from "assets/svg/photo-save-icon";
import { Dropdown } from "components/common/Dropdown";
import { IconWrapper } from "components/Home/ImageCommentSidler/styles";
import { css } from "styled-components";

import type { ImageListType } from "components/common/Carousel/types";
import type { DownloadFileFunction, DownloadProps } from "hooks/common/useS3";

export interface SaveOptionProps {
  setTotalFiles: React.Dispatch<React.SetStateAction<number>>;
  currentImage: ImageListType;
  allImages: ImageListType[];
  downloadFile: DownloadFileFunction<void, Error, DownloadProps>;
}

const SaveOptionDropdown = ({
  setTotalFiles,
  downloadFile,
  currentImage,
  allImages
}: SaveOptionProps) => {
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

  return (
    <Dropdown customStyle={"width: fit-content"}>
      <Dropdown.Content>
        <Dropdown.Trigger>
          <DownloadIcon colorScheme="black" w={20} h={20} opacity={0.7} hasRect />
        </Dropdown.Trigger>
        <Dropdown.List customStyle={DropdownListStyle}>
          {saveOptions.map((opt, idx) => (
            <Dropdown.Option key={idx} onClick={opt.onClick}>
              {opt.icon}
              <span>{opt.label}</span>
            </Dropdown.Option>
          ))}
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
};

export default SaveOptionDropdown;

const DropdownListStyle = css`
  right: 0.625rem;
  top: 2.5rem;
`;
