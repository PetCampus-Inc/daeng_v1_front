import PoopHard from "assets/svg/poop-hard";
import PoopHealthy from "assets/svg/poop-healty";
import PoopNotBrown from "assets/svg/poop-not-brown";
import PoopNeedAttention from "assets/svg/poop-warning";
import PoopWatery from "assets/svg/poop-watery";
import { format, parseISO } from "date-fns";
import useGetDogInfoAgenda from "hooks/api/useGetDogInfoAgenda";
import { Suspense } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import * as S from "./styles";
import { DogDetailInfoText } from "../../DogInfo/styles";

const DailyNotice = () => {
  const [searchParams] = useSearchParams();
  const dogId = useLocation().pathname.split("/").pop();
  const date = searchParams.get("date") || format(new Date(), "yyyy-MM-dd");
  const formattedDate = format(parseISO(date), "M월 d일");
  const data = useGetDogInfoAgenda(Number(dogId), date);
  console.log(data);
  if (!data || data.status === "NOT_YET") {
    return <>dd</>;
  } else if (data.status === "WRITING") {
    return <div>로딩중</div>;
  }
  return (
    <Suspense>
      <S.NoticeContainer>
        <DogDetailInfoText className="big">{formattedDate} 알림장</DogDetailInfoText>
        <S.NoticeItemWrapper>
          알림장
          <S.NoticeContent>
            {data.agendaNote ? data.agendaNote : "전달 사항이 없습니다."}
          </S.NoticeContent>
        </S.NoticeItemWrapper>

        <S.NoticeItemWrapper>
          간식
          <S.NoticeContent>{data.snack ? data.snack : "전달 사항이 없습니다."}</S.NoticeContent>
        </S.NoticeItemWrapper>

        <S.NoticeItemWrapper>
          <div>
            배변 상태
            <S.PoopCardContainer>
              <S.PoopCard>
                <PoopHard poop={data.poop} />
                딱딱함
              </S.PoopCard>
              <S.PoopCard>
                <PoopHealthy poop={data.poop} />
                건강함
              </S.PoopCard>
              <S.PoopCard>
                <PoopWatery poop={data.poop} />
                묽은 변
              </S.PoopCard>
              <S.PoopCard>
                <PoopNotBrown poop={data.poop} />
                갈색이 아닌
              </S.PoopCard>
              <S.PoopCard>
                <PoopNeedAttention poop={data.poop} />
                주의필요
              </S.PoopCard>
            </S.PoopCardContainer>
          </div>

          <S.NoticeContent>
            {data.poopMemo ? data.poopMemo : "전달 사항이 없습니다."}
          </S.NoticeContent>
        </S.NoticeItemWrapper>
      </S.NoticeContainer>
    </Suspense>
  );
};

export default DailyNotice;
