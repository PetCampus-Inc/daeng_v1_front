import { Flex } from "components/common";
import { useGetMainAlbum } from "hooks/api/member/member";
import { useCallback, useState } from "react";

import SaveButton from "./Button/SaveButton";
import { SelectedImageProvider } from "./hooks/SelectedImageProvider";
import AlbumSlide from "./Slide/AlbumSlide";

const AlbumView = ({ dogId }: { dogId: number }) => {
  const { data: imageList } = useGetMainAlbum({ dogId });

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
