import GalleryIcon from "assets/svg/gallery-icon";
import AttendanceRecord from "components/Admin/DogDetailInfo/AttendanceRecord";
import DogInfo from "components/Admin/DogDetailInfo/DogInfo";
import Notice from "components/Admin/DogDetailInfo/Notice";
import { ContentWrapper } from "components/Admin/DogDetailInfo/styles";
import Ticket from "components/Admin/DogDetailInfo/Ticket";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { Tabs } from "components/common/Tabs";
import { useDogInfoData } from "hooks/api/admin/dogs";
import { Suspense } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const DogInfoPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { dogId } = useParams<{ dogId: string }>();

  const { showBadge } = useDogInfoData(Number(dogId));

  return (
    <>
      <Header
        type="text"
        text={`${searchParams.get("dog_name")}의 상세 정보`}
        rightElement={
          <GalleryIcon
            handleTouch={() => {
              navigate("gallery");
            }}
          />
        }
      />
      <Layout pt={32} bgColor="primaryColor">
        <Tabs.Root defaultValue="info">
          <Tabs.List>
            <Tabs.Trigger value="info">강아지 정보</Tabs.Trigger>
            <Tabs.Trigger value="record">등원 기록</Tabs.Trigger>
            <Tabs.Trigger value="ticket">이용권</Tabs.Trigger>
            <Tabs.Trigger value="notice">
              유의사항 {showBadge && <div>확인 필요!!</div>}
            </Tabs.Trigger>
          </Tabs.List>
          <ContentWrapper>
            <Suspense fallback={<div>Loading...</div>}>
              <Tabs.Content value="info">
                <DogInfo dogId={Number(dogId)} />
              </Tabs.Content>
              <Tabs.Content value="record">
                <AttendanceRecord dogId={Number(dogId)} />
              </Tabs.Content>
              <Tabs.Content value="ticket">
                <Ticket dogId={Number(dogId)} />
              </Tabs.Content>
              <Tabs.Content value="notice">
                <Notice dogId={Number(dogId)} />
              </Tabs.Content>
            </Suspense>
          </ContentWrapper>
        </Tabs.Root>
      </Layout>
    </>
  );
};

export default DogInfoPage;
