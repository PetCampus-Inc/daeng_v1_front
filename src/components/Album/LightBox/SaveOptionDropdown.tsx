import DownloadIcon from "assets/svg/download-icon";
import MultiplePhotoSaveIcon from "assets/svg/multiple-photo-save-icon";
import PhotoSaveIcon from "assets/svg/photo-save-icon";
import { Dropdown } from "components/common/Dropdown";
import { IconButton, IconWrapper } from "components/Home/ImageComment/styles";
import { css } from "styled-components";

import type { ImageListType } from "./CommentCarouselLightBox";
import type { DownloadFileFunction, DownloadProps } from "hooks/common/useS3";

interface SaveSectionProps {
  setTotalFiles: React.Dispatch<React.SetStateAction<number>>;
  currentImage: ImageListType;
  allImages: ImageListType[];
  downloadFile: DownloadFileFunction<void, Error, DownloadProps>;
}

export function SaveButton({
  setTotalFiles,
  downloadFile,
  currentImage,
  allImages
}: SaveSectionProps) {
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
    <Dropdown customStyle={"width: max-content"}>
      <Dropdown.Content>
        <Dropdown.Trigger>
          <DownloadButton>
            <DownloadIcon />
          </DownloadButton>
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
}

const DownloadButton = ({
  isOpen,
  children,
  ...props
}: {
  isOpen?: boolean;
  children: React.ReactNode;
}) => (
  <IconButton type="button" data-state={isOpen ? "active" : "inactive"} {...props}>
    {children}
  </IconButton>
);

const DropdownListStyle = css`
  right: 1rem;
  top: 3.2rem;
`;
