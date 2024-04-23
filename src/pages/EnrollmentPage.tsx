import PreventLeaveModal from "components/common/ButtonModal/PreventLeaveModal";
import Header from "components/common/Header";
import EnrollmentForm from "components/Enrollment";
import useOverlay from "hooks/common/useOverlay/useOverlay";
import { useNavigate } from "react-router-dom";

const EnrollmentPage = () => {
  const navigate = useNavigate();
  const overlay = useOverlay();

  // TODO: browser history stack 관리 필요..!
  const openPreventLeavePopup = () =>
    overlay.open(({ isOpen, close }) => (
      <PreventLeaveModal isOpen={isOpen} close={close} action={() => navigate(-1)} />
    ));

  return (
    <>
      <Header
        type="text"
        text="가입신청서"
        handleClick={() => {
          openPreventLeavePopup();
        }}
      />
      <EnrollmentForm />
    </>
  );
};

export default EnrollmentPage;
