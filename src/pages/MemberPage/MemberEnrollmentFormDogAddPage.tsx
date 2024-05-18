import PreventLeaveModal from "components/common/ButtonModal/PreventLeaveModal";
import Header from "components/common/Header";
import { useOverlay } from "hooks/common/useOverlay";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { schoolIdAtom } from "store/form";

import EnrollmentPage from "../SignUpPage/EnrollmentPage";

const MemberEnrollmentFormDogAddPage = () => {
  const navigate = useNavigate();
  const overlay = useOverlay();
  const MemberschoolId = useRecoilValue(schoolIdAtom); // member에서 유치원 검색시 추출
  const isMypage = useLocation()
    .pathname.split("/")
    .some((url) => url === "mypage");

  const openPreventLeavePopup = () =>
    overlay.open(({ isOpen, close }) => (
      <PreventLeaveModal isOpen={isOpen} close={close} action={() => navigate(-1)} />
    ));

  return (
    <>
      <Header type="text" text="가입신청서" handleClick={openPreventLeavePopup} />
      <EnrollmentPage isMemberAddDog={isMypage} schoolId={Number(MemberschoolId)} />
    </>
  );
};

export default MemberEnrollmentFormDogAddPage;
