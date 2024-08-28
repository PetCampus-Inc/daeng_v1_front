import AlertFilledIcon from "assets/svg/alert-filled-icon";
import PencilFilledIcon from "assets/svg/pencil-filled-icon";
import PoopBox from "components/common/PoopBox";

import * as S from "./styles";

import type { DogInfoAgendaData } from "types/admin/attendance.type";

interface DailyNoticeProps {
  data?: DogInfoAgendaData;
}

// FIXME: UI 수정사항 반영 필요
const DailyNotice = ({ data }: DailyNoticeProps) => {
  const statusText = (status?: string) => {
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
          {data?.status === "WRITING" ? (
            <PencilFilledIcon />
          ) : (
            <AlertFilledIcon colorScheme="darkgray" />
          )}
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
          <PoopBox selected={data.poop} />
        </div>
        <S.NoticeContent>{data.poopMemo ? data.poopMemo : "전달 사항이 없습니다."}</S.NoticeContent>
      </S.NoticeItemWrapper>
    </>
  );
};

export default DailyNotice;
