import { Calendar } from "components/Agenda";
import GridView from "components/Album/GridView";
import { Layout } from "components/common";
import Header from "components/common/Header";
import DisconnectionNotice from "components/Home/DisconnectionNotice/DisconnectionNotice";
import { useDogDisconnected } from "hooks/member/useDogDisconnected";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

export default function DateAlbum() {
  const { dogId } = useParams<{ dogId: string }>();
  // 유치원 끊긴 강아지 여부
  const { isDisconnected } = useDogDisconnected();

  return (
    <>
      <Header type="text" text="날짜별 사진 앨범" />
      {isDisconnected && <DisconnectionNotice />}
      <Layout bgColor="BGray" isDisconnected={isDisconnected}>
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
