import { Calendar } from "components/Agenda";
import GridView from "components/Album/GridView";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

export default function DateAlbum() {
  const { dogId } = useParams<{ dogId: string }>();

  return (
    <>
      <Header type="text" text="날짜별 사진 앨범" />
      <Layout bgColor="BGray">
        {/* 캘린더 */}
        <Suspense fallback={<div>캘린더 로딩중..</div>}>
          <Calendar dogId={Number(dogId)} />
        </Suspense>
        {/* 그리드 앨범 */}
        <Suspense fallback={<GridView.Skeleton />}>
          <GridView dogId={Number(dogId)} />
        </Suspense>
      </Layout>
    </>
  );
}
