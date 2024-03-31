import AlertSmallIcon from "assets/svg/alert-small-icon";
import PencilCircleIcon from "assets/svg/pencil-circle-icon";
import PoopHard from "assets/svg/poop-hard";
import PoopHealthy from "assets/svg/poop-healthy";
import PoopNotBrown from "assets/svg/poop-not-brown";
import PoopNeedAttention from "assets/svg/poop-warning";
import PoopWatery from "assets/svg/poop-watery";
import { IDogInfoAgenda } from "types/admin.attendance.type";

import * as S from "./styles";

interface IDailyNoticeProps {
  data: IDogInfoAgenda | undefined;
}

const DailyNotice = ({ data }: IDailyNoticeProps) => {
  const statusText = (status: string | undefined) => {
    switch (status) {
      case "NOT_YET":
        return "알림장을 아직 작성하지 않았어요";
      case "WRITING":
        return "알림장을 작성중이에요";
      default:
        return "해당 날짜에 등원하지 않았어요";
    }
  };

  if (!data || data.status === "NOT_YET" || data.status === "WRITING") {
    return (
      <S.NoNoticeContainer>
        <S.TextIconContainer>
          {data?.status === "WRITING" ? <PencilCircleIcon /> : <AlertSmallIcon color="darkgray" />}
          <span>{statusText(data?.status)}</span>
        </S.TextIconContainer>
      </S.NoNoticeContainer>
    );
  }

  return (
    <>
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

        <S.NoticeContent>{data.poopMemo ? data.poopMemo : "전달 사항이 없습니다."}</S.NoticeContent>
      </S.NoticeItemWrapper>
    </>
  );
};

export default DailyNotice;
