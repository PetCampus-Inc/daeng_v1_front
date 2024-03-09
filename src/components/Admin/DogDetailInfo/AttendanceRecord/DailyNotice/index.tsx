import PoopHard from "assets/svg/poop-hard";
import PoopHealthy from "assets/svg/poop-healty";
import PoopNeedAttention from "assets/svg/poop-need-attention";
import PoopNotBrown from "assets/svg/poop-not-brown";
import PoopWatery from "assets/svg/poop-watery";
import { format, parseISO } from "date-fns";
import useGetAttendanceHistory from "hooks/api/useGetAttendanceHistory";
import { useSearchParams } from "react-router-dom";

import * as S from "./styles";
import { DogDetailInfoText } from "../../DogInfo/styles";

const DailyNotice = () => {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") || format(new Date(), "yyyy-MM-dd");
  const formattedDate = format(parseISO(date), "M월 d일");
  const data = useGetAttendanceHistory(2, date); //FIXME: 나영이꺼 머지되면 queryString에서 가져오기

  return (
    <>
      <S.NoticeContainer>
        <DogDetailInfoText className="big">{formattedDate} 알림장</DogDetailInfoText>
        <S.NoticeItemWrapper>
          알림장
          <S.NoticeContent>
            오늘 뽀뽀야호는 시츄 친구와 노즈워크를 하며 간식을 여러개 찾아냈습니다. 내일은 구의천
            산책이 예정되어 있으니 보라색 입마개를 지참해서 보내주세요 :)
          </S.NoticeContent>
        </S.NoticeItemWrapper>

        <S.NoticeItemWrapper>
          간식
          <S.NoticeContent>
            오늘 저희가 직접 준비한 유기농 간식을 주었더니 너무 좋아하더라고요
          </S.NoticeContent>
        </S.NoticeItemWrapper>

        <S.NoticeItemWrapper>
          <div>
            배변 상태
            <S.PoopCardContainer>
              <S.PoopCard>
                <PoopHard />
                딱딱함
              </S.PoopCard>
              <S.PoopCard>
                <PoopHealthy />
                건강함
              </S.PoopCard>
              <S.PoopCard>
                <PoopWatery />
                묽은 변
              </S.PoopCard>
              <S.PoopCard>
                <PoopNotBrown />
                갈색이 아닌
              </S.PoopCard>
              <S.PoopCard>
                <PoopNeedAttention />
                주의필요
              </S.PoopCard>
            </S.PoopCardContainer>
          </div>

          <S.NoticeContent>오늘은 오전에 2번, 오후에 1번 배변을 했습니다.</S.NoticeContent>
        </S.NoticeItemWrapper>
      </S.NoticeContainer>
    </>
  );
};

export default DailyNotice;
