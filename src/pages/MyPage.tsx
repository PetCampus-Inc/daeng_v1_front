import { PATH } from "constants/path";

import NavBar from "components/common/NavBar";
import { Link } from "react-router-dom";

const MyPage = () => {
  return (
    <>
      <div>MyPage</div>
      <div>기획분들을 위해 페이지 이동용으로 임시로 만들어둔 버튼</div>

      <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        <Link to={PATH.ENROLLMENT} style={{ backgroundColor: "lightblue" }}>
          견주 가입신청서 작성 페이지
        </Link>
        <Link to={PATH.ADMIN_CREATE_FORM} style={{ backgroundColor: "lightblue" }}>
          원장 신규 가입신청서 등록 페이지
        </Link>
      </div>

      <NavBar type="admin" attendance={PATH.ADMIN_MY_PAGE} />
    </>
  );
};

export default MyPage;
