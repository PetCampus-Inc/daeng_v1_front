import { Flex } from "components/common";
import { ImageComment } from "components/Home/ImageComment/ImageComment";
import { useGetMainAlbum } from "hooks/api/member/member";

export default function PhotoView({ dogId }: { dogId: number }) {
  const { data: imageList } = useGetMainAlbum({ dogId });

  return (
    <Flex direction="column" gap={24}>
      {imageList.map((images) => (
        <ImageComment images={images} />
      ))}
    </Flex>
  );
}
