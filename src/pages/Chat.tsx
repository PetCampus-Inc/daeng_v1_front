import NavBar from "components/common/NavBar";
import { PATH } from "constants/path";

const Chat = () => {
  return (
    <>
      <div>Chat</div>
      <NavBar type="admin" attendance={PATH.ADMIN_CHAT} />
    </>
  );
};

export default Chat;
