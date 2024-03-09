import { PATH } from "constants/path";

import NavBar from "components/common/NavBar";

const Chat = () => {
  return (
    <>
      <div>Chat</div>
      <NavBar type="admin" attendance={PATH.ADMIN_CHAT} />
    </>
  );
};

export default Chat;
