import BoneIcon from "assets/svg/bone-icon";
import NoNoteDog from "assets/svg/no-note-dog";
import PoopStatusIcon from "assets/svg/poop-status-icon";
import PoopBox from "components/common/PoopBox";
import { useGetAgendaSaved } from "hooks/api/admin/care";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

import * as S from "./styles";
import NoCompletedNotice from "../NoCompletedNotice";

interface CompletedNoticeProps {
  dogId: number;
}
const CompletedNotice = ({ dogId }: CompletedNoticeProps) => {
  const date =
    useLocation().search.split("=")[1]?.replace(/-/g, ".") ?? moment().format("YYYY.MM.DD");
  // TODO: 하드코딩 -> dogId로 교체 필요. 어떻게 받아올지는 앞쪽 페이지 로직을 몰라 일단 props로 처리
  // TODO: 날짜에 따른 agenda를 보여줘야 하는데 api에서 dogId만 받도록 되어있음. api 확인 필요.
  const { data } = useGetAgendaSaved(dogId);

  if (!data || !(data.agendaNote && data.snack && data.poopMemo && data.poop))
    return <NoCompletedNotice />;

  return (
    <S.CompleteNoteContainer>
      <S.NoteSpring />
      <S.NoteOuterContainer>
        <S.NoteText className="title main">{date}</S.NoteText>
        <S.NoteInnerContainer>
          {data.agendaNote && <S.NoteText className="content">{data.agendaNote}</S.NoteText>}
          {data.snack && (
            <S.NoteContentFlexBox>
              <S.NoteText className="title content">
                <BoneIcon />
                간식
              </S.NoteText>
              <S.NoteText className="content">{data.snack}</S.NoteText>
            </S.NoteContentFlexBox>
          )}

          {(data.poopMemo || data.poop) && (
            <S.NoteContentFlexBox>
              <S.NoteText className="title content">
                <PoopStatusIcon />
                배변 상태
              </S.NoteText>
              {data.poopMemo && <S.NoteText className="content">{data.poopMemo}.</S.NoteText>}
              <PoopBox selected={data.poop} />
            </S.NoteContentFlexBox>
          )}
        </S.NoteInnerContainer>
      </S.NoteOuterContainer>
    </S.CompleteNoteContainer>
  );
};

export default CompletedNotice;
