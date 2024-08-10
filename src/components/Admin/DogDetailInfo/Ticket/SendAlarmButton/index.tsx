import SendAlarmIcon from "assets/svg/send-alarm";
import { XSmallButton } from "components/common/Button/Templates";

const SendAlarmButton = () => {
  return (
    <XSmallButton
      typo="caption1_12_B"
      colorScheme="yellow_3"
      leftAddon={<SendAlarmIcon />}
      onClick={() => {
        /* 알림 전송 post api 연동 */
      }}
    >
      알림 전송
    </XSmallButton>
  );
};

export default SendAlarmButton;
