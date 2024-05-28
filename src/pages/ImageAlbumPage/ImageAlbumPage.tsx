import Header from "components/common/Header";
import { useGetAlbum } from "hooks/api/member/main";
import { useSearchParams } from "react-router-dom";
const ImageAlbumPage = () => {
  const [searchParams] = useSearchParams();
  const dogId = parseInt(searchParams.get("dogId") ?? "");
  const { data } = useGetAlbum({ dogId });

  return (
    <>
      <Header type="text" text="사진 앨범" />
    </>
  );
};

export default ImageAlbumPage;
