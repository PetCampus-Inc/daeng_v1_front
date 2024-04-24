import PoopBox from "components/common/PoopBox";
import TextArea from "components/common/TextArea";

import * as S from "./styles";
import LastNoticeButton from "../LastNoticeButton";
import SaveOrSendButton from "../SaveOrSendButton";
import { NoticeItemContainer } from "../styles";

const WriteNotice = () => {
  return (
    <S.FlexContainer>
      <LastNoticeButton />
      <NoticeItemContainer>
        알림장
        <TextArea placeholder="오늘 하루 강아지와 관련된 내용을 작성해 주세요" />
      </NoticeItemContainer>
      <NoticeItemContainer>
        간식
        <TextArea placeholder="오늘 급여한 간식에 대해 적어 주세요" />
      </NoticeItemContainer>
      <NoticeItemContainer>
        배변 상태
        <PoopBox selected={"HARD"} />
        <TextArea placeholder="오늘 하루 강아지 배변 상태에 대해 작성해 주세요" />
      </NoticeItemContainer>
      <SaveOrSendButton save={() => console.log("save")} send={() => console.log("send")} />
    </S.FlexContainer>
  );
};

export default WriteNotice;
