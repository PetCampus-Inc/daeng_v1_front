import BoneIcon from "assets/svg/bone-icon";
import PoopStatusIcon from "assets/svg/poop-status-icon";
import PoopBox from "components/common/PoopBox";
import TextArea from "components/common/TextArea";
import { useGetAgendaSaved, useSendAgenda, useTempSaveCareDog } from "hooks/api/admin/care";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { IPoop } from "types/admin.attendance.type";
import { addZero } from "utils/date";

import * as S from "./styles";
import LastNoticeButton from "../LastNoticeButton";
import SaveOrSendButton from "../SaveOrSendButton";
import { NoticeItemContainer } from "../styles";

const WriteNotice = () => {
  const { adminId } = useAdminInfo();
  const dogId = useLocation().pathname.split("/").pop();

  const { mutateTempSaveCareDog } = useTempSaveCareDog();
  const { mutateSendAgenda, isComplete } = useSendAgenda();
  const { data } = useGetAgendaSaved(Number(dogId));
  const [poopStatus, setPoopStatus] = useState(data.poop);

  const methods = useForm({
    mode: "onChange"
  });

  const agendaData = () => {
    const agendaNote = methods.getValues("agendaNote");
    const snack = methods.getValues("snackInfo");
    const poopMemo = methods.getValues("poopMemo");

    return {
      agendaId: data.agendaId,
      adminId: adminId,
      dogId: Number(dogId),
      agendaNote,
      snack,
      poop: poopStatus,
      poopMemo
    };
  };

  const handleTempSave = debounce(() => {
    mutateTempSaveCareDog(agendaData());
  }, 1000);

  const handleSend = debounce(() => {
    try {
      mutateSendAgenda(agendaData());
    } catch (e) {
      throw new Error("알림장 전송 중 오류가 발생했습니다.");
    }
  }, 1000);

  if (data?.status === "COMPLETE" || isComplete) {
    return (
      <S.CompleteNoteContainer>
        <S.NoteSpring />
        <S.NoteInnerContainer>
          <S.NoteTitleWrapper>
            <S.NoteText className="title main">전송된 알림장</S.NoteText>
            <S.NoteText className="date">{`${data.dateTime[0]}.${addZero(data.dateTime[1])}.${addZero(data.dateTime[2])}`}</S.NoteText>
          </S.NoteTitleWrapper>

          <S.NoteText className="content">
            {data.agendaNote ?? "알림장 내용이 없습니다."}
          </S.NoteText>
          <S.NoteContentFlexBox>
            <S.NoteText className="title content">
              <BoneIcon />
              간식
            </S.NoteText>
            <S.NoteText className="content">
              {data.snack ?? "간식 관련 내용이 없습니다."}
            </S.NoteText>
          </S.NoteContentFlexBox>

          <S.NoteContentFlexBox>
            <S.NoteText className="title content">
              <PoopStatusIcon />
              배변 상태
            </S.NoteText>
            <S.NoteText className="content">
              {data.poopMemo ?? "배변 상태 관련 내용이 없습니다."}.
            </S.NoteText>
            <PoopBox selected={poopStatus} />
          </S.NoteContentFlexBox>
        </S.NoteInnerContainer>
      </S.CompleteNoteContainer>
    );
  }

  return (
    <S.FlexContainer>
      <LastNoticeButton />
      <NoticeItemContainer>
        알림장
        <TextArea
          {...methods.register("agendaNote")}
          placeholder="오늘 하루 강아지와 관련된 내용을 작성해 주세요"
          defaultValue={data.agendaNote}
        />
      </NoticeItemContainer>
      <NoticeItemContainer>
        간식
        <TextArea
          {...methods.register("snackInfo")}
          placeholder="오늘 급여한 간식에 대해 적어 주세요"
          defaultValue={data.snack}
        />
      </NoticeItemContainer>
      <NoticeItemContainer>
        배변 상태
        <PoopBox
          selected={poopStatus}
          setPoopStatus={setPoopStatus as Dispatch<SetStateAction<IPoop>>}
        />
        <TextArea
          {...methods.register("poopMemo")}
          placeholder="오늘 하루 강아지 배변 상태에 대해 작성해 주세요"
          defaultValue={data.poopMemo}
        />
      </NoticeItemContainer>
      <SaveOrSendButton save={handleTempSave} send={handleSend} />
    </S.FlexContainer>
  );
};

export default WriteNotice;
