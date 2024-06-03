import { GALLERY_VIEW, type GalleryViewType } from "constants/option";

import AlbumHeader from "components/Album/AlbumHeader";
import AlbumView from "components/Album/AlbumView";
import PhotoView from "components/Album/PhotoView";
import ViewTabs from "components/Album/ViewTabs";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { useGetMainAlbum } from "hooks/api/member/member";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const ImageAlbumPage = () => {
  const [searchParams] = useSearchParams();
  const dogId = parseInt(searchParams.get("dogId") ?? "");
  const dogName = searchParams.get("dogName");
  const { data: imageList } = useGetMainAlbum({ dogId });

  const [mode, setMode] = useState<GalleryViewType>(GALLERY_VIEW.PHOTO);

  return (
    <>
      <Header type="text" text="사진 앨범" />
      <Layout type="page" pt={42} bg="white">
        <AlbumHeader dogId={dogId} dogName={dogName} />
        <ViewTabs mode={mode} setMode={setMode} />
        {mode === GALLERY_VIEW.PHOTO && <PhotoView imageList={imageList} />}
        {mode === GALLERY_VIEW.ALBUM && <AlbumView imageList={imageList} />}
      </Layout>
    </>
  );
};

export default ImageAlbumPage;
