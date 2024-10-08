import DownloadIcon from "assets/svg/download-icon";
import MultiplePhotoSaveIcon from "assets/svg/multiple-photo-save-icon";
import PhotoSaveIcon from "assets/svg/photo-save-icon";
import { Dropdown } from "components/common";
import { css } from "styled-components";

import { IconButton, IconWrapper } from "./styles";

import type { ImageList } from "types/member/main.types";

interface SaveSectionProps {
  setTotalFiles: React.Dispatch<React.SetStateAction<number>>;
  currentImage: ImageList;
  allImages: ImageList[];
  onDownload: (uri: string | string[]) => void;
}

export function SaveButton({
  setTotalFiles,
  onDownload,
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
        onDownload(currentImage.imageUri);
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
        onDownload(allImages.map((image) => image.imageUri));
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
