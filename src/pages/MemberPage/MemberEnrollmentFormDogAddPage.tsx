import Header from "components/common/Header";
import { PreventLeaveModal } from "components/common/Modal";
import { useOverlay } from "hooks/common/useOverlay";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { schoolIdAtom } from "store/form";
import { memberEnrollmentDogDetailAtom } from "store/member";

import EnrollmentPage from "../EnrollmentPage/NewEnrollmentPage";

const MemberEnrollmentFormDogAddPage = () => {
  const navigate = useNavigate();
  const overlay = useOverlay();
  const MemberschoolId = useRecoilValue(schoolIdAtom); // member에서 유치원 검색시 추출
  const setMemberDogInfo = useSetRecoilState(memberEnrollmentDogDetailAtom);
  const isMypage = useLocation()
    .pathname.split("/")
    .some((url) => url === "mypage");

  // 유치원 재등록할 경우 남아 있는 MemberDogInfo 삭제를 위해
  const handleResetMemberDogInfo = () => {
    setMemberDogInfo(null);
  };

  const openPreventLeavePopup = () =>
    overlay.open(({ isOpen, close }) => (
      <PreventLeaveModal
        isOpen={isOpen}
        close={close}
        action={() => {
          navigate(-1);
          handleResetMemberDogInfo();
        }}
      />
    ));

  return (
    <>
      <Header type="text" text="가입신청서" handleClick={openPreventLeavePopup} />
      <EnrollmentPage isMemberAddDog={isMypage} schoolId={Number(MemberschoolId)} />
    </>
  );
};

export default MemberEnrollmentFormDogAddPage;
