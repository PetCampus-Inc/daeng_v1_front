import { PATH } from "constants/path";

import FlexPhotosWithTime from "components/Admin/AttendCareNotice/FlexPhotosWithTime";
import NavBar from "components/common/NavBar";

const Chat = () => {
  return (
    <>
      <div>Chat</div>
      <NavBar type="admin" attendance={PATH.ADMIN_CHAT} />
      <FlexPhotosWithTime />
    </>
  );
};

export default Chat;
