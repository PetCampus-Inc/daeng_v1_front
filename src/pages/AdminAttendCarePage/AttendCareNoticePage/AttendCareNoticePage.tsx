import DogInfoBox from "components/Admin/AttendCareNotice/DogInfoBox";
import { Box, Layout } from "components/common";
import Header from "components/common/Header";
import { Tabs } from "components/common/Tabs";
import { useGetCachedCareDog } from "hooks/api/admin/care";
import { Suspense } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import { AgendaView } from "./AgendaView";
import { PhotoAlbumView } from "./PhotoAlbumView";

const AttendCareNoticePage = () => {
  const { dogId } = useParams();
  const { data } = useGetCachedCareDog(Number(dogId));

  const { state } = useLocation();

  return (
    <Layout type="page">
      <Tabs.Root variant="toggle" defaultValue={state?.tab === "album" ? "album" : "agenda"}>
        <StickyHeader>
          <Gradient>
            <Header type="text" text={`${data.dogName} 상세페이지`} transparent />
            <DogInfoBox dogName={data.dogName} profileUri={data.profileUri} />
          </Gradient>
          <Box bgColor="white" px={16}>
            <Tabs.List>
              <Tabs.Trigger value="agenda">알림장</Tabs.Trigger>
              <Tabs.Trigger value="album">사진 앨범</Tabs.Trigger>
            </Tabs.List>
          </Box>
        </StickyHeader>

        <Box bgColor="white" px={16} pb={16}>
          <Tabs.Content value="agenda">
            <Suspense fallback={<AgendaView.Skeleton />}>
              <AgendaView dogId={Number(dogId)} />
            </Suspense>
          </Tabs.Content>
          <Tabs.Content value="album">
            <Suspense>
              <PhotoAlbumView dogId={Number(dogId)} />
            </Suspense>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Layout>
  );
};

export default AttendCareNoticePage;

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 3;
  scroll-snap-align: start;
`;
const Gradient = styled.div`
  background: linear-gradient(0deg, rgba(255, 255, 255) 0%, rgba(255, 240, 200) 100%);
  background-size: cover;

  &::-webkit-scrollbar {
    display: none;
  }
`;
