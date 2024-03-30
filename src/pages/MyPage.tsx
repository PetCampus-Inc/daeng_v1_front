import { PATH } from "constants/path";

import NavBar from "components/common/NavBar";
import { Link } from "react-router-dom";

const MyPage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          position: "absolute",
          top: "50px"
        }}
      >
        <Link to={PATH.PRINCIPAL_MY_PAGE} style={{ backgroundColor: "lightblue" }}>
          원장 마이페이지
        </Link>
        <Link to={PATH.TEACHER_MY_PAGE} style={{ backgroundColor: "lightblue" }}>
          선생님 마이페이지
        </Link>
        <Link to={PATH.OWNER_MY_PAGE} style={{ backgroundColor: "lightblue" }}>
          견주 마이페이지
        </Link>
      </div>
      <NavBar type="admin" />
    </>
  );
};

export default MyPage;
