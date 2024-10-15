import DogCircleIcon from "assets/svg/dog-circle-icon";
import { Calendar, DailyAgenda } from "components/Admin/DogDetailInfo/AttendanceRecord";
import { Box } from "components/common";
import { format, parseISO } from "date-fns";
import { useGetCachedDogDetail } from "hooks/api/admin/dogs";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

export function AttendanceRecord({ dogId }: { dogId: number }) {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") || format(new Date(), "yyyy-MM-dd");
  const today = format(parseISO(date), "M월 d일");

  const { data } = useGetCachedDogDetail(dogId);

  return (
    <>
      <TopContainer>
        <ProfileImgWrapper>
          <Image
            src={
              data.profileUri ??
              process.env.REACT_APP_CLIENT_BASE_URL + "images/placeholder-image.png"
            }
          />
        </ProfileImgWrapper>
      </TopContainer>
      <Suspense fallback={<div>캘린더 로딩중...</div>}>
        <Calendar dogId={dogId} />
      </Suspense>
      <AgendaContainer>
        <Box pb={18} typo={"title2_20_B"} color={"gray_1"} borderBottom={1} borderColor={"gray_5"}>
          {today} 알림장
        </Box>
        <Suspense fallback={<div>알림장 로딩중...</div>}>
          <DailyAgenda dogId={dogId} date={date} />
        </Suspense>
      </AgendaContainer>
    </>
  );
}

AttendanceRecord.Skeleton = () => <div>등원기록 스켈레톤...</div>;

const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7vh;
  min-height: 59px;
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.yellow_3};
`;

const ProfileImgWrapper = styled.div`
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
  transform: translateY(3vh);
  z-index: 2;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AgendaContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px 16px 48px 16px;

  gap: 32px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px -8px 15px rgba(0, 0, 0, 0.04);
  z-index: 2;
`;
