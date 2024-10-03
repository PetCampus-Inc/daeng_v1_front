import { GALLERY_VIEW, type GalleryViewType } from "constants/option";

import AlbumHeader from "components/Album/AlbumHeader";
import AlbumView from "components/Album/AlbumView";
import PhotoView from "components/Album/PhotoView";
import ViewTabs from "components/Album/ViewTabs";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { Suspense, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function PhotoAlbum() {
  const [mode, setMode] = useState<GalleryViewType>(GALLERY_VIEW.PHOTO);

  const { dogId } = useParams<{ dogId: string }>();
  const { state } = useLocation();

  const { dogName } = state;

  return (
    <>
      <Header type="text" text="사진 앨범" />
      <Layout px={16} pb={36} pt={42} bgColor="white">
        <Suspense fallback={<PhotoAlbum.Skeleton />}>
          <AlbumHeader dogId={Number(dogId)} dogName={dogName} />
          <ViewTabs mode={mode} setMode={setMode} />
          {mode === GALLERY_VIEW.PHOTO && <PhotoView dogId={Number(dogId)} />}
          {mode === GALLERY_VIEW.ALBUM && <AlbumView dogId={Number(dogId)} />}
        </Suspense>
      </Layout>
    </>
  );
}

PhotoAlbum.Skeleton = () => {
  return <div>로딩중...</div>;
};
