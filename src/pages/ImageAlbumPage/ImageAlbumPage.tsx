import Header from "components/common/Header";
import useGetMainAlbum from "hooks/api/member/useGetMainAlbum";
import { useSearchParams } from "react-router-dom";
const ImageAlbumPage = () => {
  const [searchParams] = useSearchParams();
  const dogId = parseInt(searchParams.get("dogId") ?? "");
  const { data } = useGetMainAlbum({ dogId });

  return (
    <>
      <Header type="text" text="사진 앨범" />
    </>
  );
};

export default ImageAlbumPage;
