import { Flex } from "components/common";
import { useCallback, useState } from "react";

import SaveButton from "./Button/SaveButton";
import { SelectedImageProvider } from "./context/SelectedImageProvider";
import AlbumSlide from "./Slide/AlbumSlide";

import type { ImageListType } from "types/member/main.types";

const AlbumView = ({ imageList }: { imageList: ImageListType[][] }) => {
  const [saveModes, setSaveModes] = useState<Record<number, boolean>>({});

  const toggleSaveMode = useCallback((albumId: number) => {
    setSaveModes((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [albumId]: !prev[albumId]
    }));
  }, []);

  const isSaveMode = Object.values(saveModes).some((mode) => mode);

  return (
    <SelectedImageProvider>
      <Flex direction="column" gap={32}>
        {imageList.map((images) => (
          <AlbumSlide
            key={images[0].imageId}
            images={images}
            saveMode={saveModes[images[0].imageId] || false}
            toggleSaveMode={() => toggleSaveMode(images[0].imageId)}
          />
        ))}
      </Flex>
      {isSaveMode && <SaveButton />}
    </SelectedImageProvider>
  );
};

export default AlbumView;
