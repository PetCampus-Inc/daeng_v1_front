import PoopBox from "components/common/PoopBox";
import TextArea from "components/common/TextArea";
import { useGetAgendaSaved, useSendAgenda, useTempSaveCareDog } from "hooks/api/admin/care";
import { debounce } from "lodash";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

import * as S from "./styles";
import LastNoticeButton from "../LastNoticeButton";
import SaveOrSendButton from "../SaveOrSendButton";
import { NoticeItemContainer } from "../styles";

const WriteNotice = () => {
  const { adminId } = useRecoilValue(adminLoginInfoAtom);
  const dogId = useLocation().pathname.split("/").pop();

  const { data } = useGetAgendaSaved(Number(dogId));
  const { mutateTempSaveCareDog } = useTempSaveCareDog();
  const { mutateSendAgenda } = useSendAgenda();

  const methods = useForm({
    mode: "onChange"
  });

  const agendaData = () => {
    const agendaNote = methods.getValues("agendaNote");
    const snack = methods.getValues("snackInfo");
    const poopMemo = methods.getValues("poopMemo");

    return {
      agendaId: 6,
      adminId: adminId,
      dogId: Number(dogId),
      agendaNote,
      snack,
      poop: "HARD",
      poopMemo
    };
  };

  const handleTempSave = debounce(() => {
    mutateTempSaveCareDog(agendaData());
  }, 1000);

  const handleSend = debounce(() => {
    mutateSendAgenda(agendaData());
  }, 1000);

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
      <SaveOrSendButton save={handleTempSave} send={handleSend} />
    </S.FlexContainer>
  );
};

export default WriteNotice;
