import AlertSmallIcon from "assets/svg/alert-small-icon";
import PencilCircleIcon from "assets/svg/pencil-circle-icon";
import PoopBox from "components/common/PoopBox";
import { format } from "date-fns";
import useGetDogInfoAgenda from "hooks/api/useGetDogInfoAgenda";
import { useLocation, useSearchParams } from "react-router-dom";

import * as S from "./styles";

const DailyNotice = () => {
  const [searchParams] = useSearchParams();
  const dogId = useLocation().pathname.split("/").pop();
  const date = searchParams.get("date") || format(new Date(), "yyyy-MM-dd");
  const { data } = useGetDogInfoAgenda(Number(dogId), date);

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
          <PoopBox selected={data.poop} />
        </div>

        <S.NoticeContent>{data.poopMemo ? data.poopMemo : "전달 사항이 없습니다."}</S.NoticeContent>
      </S.NoticeItemWrapper>
    </>
  );
};

export default DailyNotice;
