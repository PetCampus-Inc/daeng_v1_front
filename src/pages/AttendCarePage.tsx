import Header from "components/common/Header";
import { useNavigate } from "react-router-dom";
import { PATH } from "constants/path";

const AttendCarePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header
        type="text"
        text="오늘 관리할 강아지"
        size="1rem"
        handleClick={() => navigate(PATH.ADMIN_ATTENDANCE)}
      />
    </>
  );
};

export default AttendCarePage;
