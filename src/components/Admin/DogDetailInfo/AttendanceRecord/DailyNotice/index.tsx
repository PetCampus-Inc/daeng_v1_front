import PoopBox from "components/common/PoopBox";
import { format } from "date-fns";
import useGetDogInfoAgenda from "hooks/api/useGetDogInfoAgenda";
import { useLocation, useSearchParams } from "react-router-dom";

import * as S from "./styles";
import StatusCard from "../StatusCard";

const DailyNotice = () => {
  const [searchParams] = useSearchParams();
  const dogId = useLocation().pathname.split("/").pop();
  const date = searchParams.get("date") || format(new Date(), "yyyy-MM-dd");
  const { data } = useGetDogInfoAgenda(Number(dogId), date);

  if (!data || data.status === "NOT_YET" || data.status === "WRITING") {
    return StatusCard(data?.status);
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
