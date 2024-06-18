import SendAlarmIcon from "assets/svg/send-alarm";
import { SimpleButton } from "components/common/Button";

const SendAlarmButton = () => {
  return (
    <SimpleButton
      type="button"
      leftAddon={<SendAlarmIcon />}
      onClick={() => {
        /* 알림 전송 post api 연동 */
      }}
    >
      알림 전송
    </SimpleButton>
  );
};

export default SendAlarmButton;
