import { GALLERY_VIEW, type GalleryViewType } from "constants/option";
import type { Dispatch } from "react";

import FourViewIcon from "assets/svg/four-view-icon";
import OneViewIcon from "assets/svg/one-view-icon";
import { Flex } from "components/common";

import { Button } from "./styles";

interface ViewTabsProps {
  mode: GalleryViewType;
  setMode: Dispatch<React.SetStateAction<GalleryViewType>>;
}

const ViewTabs = ({ mode, setMode }: ViewTabsProps) => {
  const getIsActive = (view: GalleryViewType) => {
    return view === mode ? "active" : "";
  };

  return (
    <Flex justify="flex-end" gap={4} marginBlock={20}>
      <Button
        className={getIsActive(GALLERY_VIEW.PHOTO)}
        onClick={() => setMode(GALLERY_VIEW.PHOTO)}
      >
        <OneViewIcon />
      </Button>
      <Button
        className={getIsActive(GALLERY_VIEW.ALBUM)}
        onClick={() => setMode(GALLERY_VIEW.ALBUM)}
      >
        <FourViewIcon />
      </Button>
    </Flex>
  );
};

export default ViewTabs;
