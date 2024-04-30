import PoopBox from "components/common/PoopBox";
import TextArea from "components/common/TextArea";
import { useGetAgendaSaved, useTempSaveCareDog } from "hooks/api/admin/care";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import * as S from "./styles";
import LastNoticeButton from "../LastNoticeButton";
import SaveOrSendButton from "../SaveOrSendButton";
import { NoticeItemContainer } from "../styles";

const WriteNotice = () => {
  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false
  });

  const { adminId } = useRecoilValue(adminLoginInfoAtom);
  const dogId = useLocation().pathname.split("/").pop();

  const { mutateTempSaveCareDog } = useTempSaveCareDog();
  const { data } = useGetAgendaSaved(Number(dogId));

  const handleTempSave = () => {
    console.log("sss");
    mutateTempSaveCareDog({
      agendaId: 63,
      adminId: adminId,
      dogId: Number(dogId),
      agendaNote: methods.watch("agendaNote"),
      snack: methods.watch("snackInfo"),
      poop: "HARD",
      poopMemo: methods.watch("poopMemo")
    });
  };

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
        <PoopBox selected={"HARD"} />
        <TextArea
          {...methods.register("poopMemo")}
          placeholder="오늘 하루 강아지 배변 상태에 대해 작성해 주세요"
          defaultValue={data.poopMemo}
        />
      </NoticeItemContainer>
      <SaveOrSendButton save={() => handleTempSave()} send={() => console.log("send")} />
    </S.FlexContainer>
  );
};

export default WriteNotice;
