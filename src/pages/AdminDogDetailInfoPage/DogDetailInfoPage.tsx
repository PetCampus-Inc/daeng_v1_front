import { routes } from "constants/path";

import GalleryIcon from "assets/svg/gallery-icon";
import { Notice } from "components/Admin/DogDetailInfo";
import { Box, Layout } from "components/common";
import Header from "components/common/Header";
import { Tabs } from "components/common/Tabs";
import { useDogInfoData } from "hooks/api/admin/dogs";
import { useState } from "react";
import { Suspense } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { AttendanceRecord } from "./AttendanceRecord";
import { DogInfo } from "./DogInfo";
import { Ticket } from "./Ticket";

export default function DogInfoPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { dogId } = useParams<{ dogId: string }>();

  const { showBadge: showNoticeBadge } = useDogInfoData(Number(dogId));
  const showTicketBadge = JSON.parse(searchParams.get("ticket_status") as string);

  const [currentTab, setCurrentTab] = useState(searchParams.get("tab") || "info");

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    setSearchParams((prev) => {
      prev.set("tab", value);
      return prev;
    });
  };

  return (
    <>
      <Header
        type="text"
        text={`${searchParams.get("dog_name")}의 상세 정보`}
        handleClick={() => navigate(routes.admin.attendance.root)}
        rightElement={
          <GalleryIcon
            handleTouch={() => {
              navigate(routes.admin.attendance.gallery.dynamic(dogId));
            }}
          />
        }
      />
      <Layout pt={32} bgColor="primaryColor">
        <Tabs.Root value={currentTab} onValueChange={handleTabChange}>
          <Tabs.List>
            <Tabs.Trigger value="info">강아지 정보</Tabs.Trigger>
            <Tabs.Trigger value="record">등원 기록</Tabs.Trigger>
            <Tabs.Trigger value="ticket">이용권 {showTicketBadge && <Badge />}</Tabs.Trigger>
            <Tabs.Trigger value="notice">유의사항 {showNoticeBadge && <Badge />}</Tabs.Trigger>
          </Tabs.List>
          <Box flex={1} mt={8} borderRadius="20px 20px 0 0" bgColor="white">
            <Suspense fallback={<div>Loading...</div>}>
              <Tabs.Content value="info">
                <DogInfo dogId={Number(dogId)} />
              </Tabs.Content>
              <Tabs.Content value="record">
                <Suspense fallback={<AttendanceRecord.Skeleton />}>
                  <AttendanceRecord dogId={Number(dogId)} />
                </Suspense>
              </Tabs.Content>
              <Tabs.Content value="ticket">
                <Ticket dogId={Number(dogId)} />
              </Tabs.Content>
              <Tabs.Content value="notice">
                <Notice dogId={Number(dogId)} />
              </Tabs.Content>
            </Suspense>
          </Box>
        </Tabs.Root>
      </Layout>
    </>
  );
}

const Badge = styled.div`
  position: absolute;
  top: -2px;
  right: -6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow_1};
`;
