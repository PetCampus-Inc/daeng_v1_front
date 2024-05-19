import AlertSmallIcon from "assets/svg/alert-small-icon";
import PencilCircleIcon from "assets/svg/pencil-circle-icon";

import * as S from "./styles";

const StatusCard = (status: string | undefined) => {
  const statusText = (status: string | undefined) => {
    switch (status) {
      case "NOT_YET":
        return "알림장을 아직 작성하지 않았어요";
      case "WRITING":
        return "알림장을 작성중이에요";
      case "ERROR":
        return "불러오는 도중 오류가 발생했어요";
      default:
        return "해당 날짜에 등원하지 않았어요";
    }
  };

  return (
    <S.NoNoticeContainer>
      <S.TextIconContainer>
        {status === "WRITING" ? <PencilCircleIcon /> : <AlertSmallIcon color="darkgray" />}
        <span>{statusText(status)}</span>
      </S.TextIconContainer>
    </S.NoNoticeContainer>
  );
};

export default StatusCard;
