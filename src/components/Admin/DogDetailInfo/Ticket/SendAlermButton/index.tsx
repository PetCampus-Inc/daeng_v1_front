import SendAlarmIcon from "assets/svg/send-alarm";
import * as S from "./styles";

const SendAlermButton = () => {
  return (
    <S.SendButton
      onClick={() => {
        /* 알림 전송 post api 연동 */
      }}
    >
      <SendAlarmIcon />
      알림 전송
    </S.SendButton>
  );
};

export default SendAlermButton;
