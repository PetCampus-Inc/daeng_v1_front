import { BackgroundButtonWrapper } from "components/Admin/Attendance/AttendanceButton/styles";
import AttendCareGallery from "components/Admin/AttendCare/AttendCareGallery";
import BackgroundButton from "components/common/Button/BackgroundButton";
import BasicModal from "components/common/ButtonModal/BasicModal";
import Header from "components/common/Header";
import useOverlay from "hooks/common/useOverlay/useOverlay";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

interface Props {
  type: "main" | "info";
}

const AttendCareGalleryPage = ({ type }: Props) => {
  const navigate = useNavigate();
  const overlay = useOverlay();

  const openPreventLeavePopup = () =>
    overlay.open(({ isOpen, close }) => (
      <BasicModal
        isOpen={isOpen}
        close={close}
        title="사진 전송을 중단하시겠습니까?"
        subtitle="작성중이던 사진 전송 내용이 모두 초기화됩니다"
        actionText="삭제"
        closeText="취소"
        actionFn={() => navigate(-1)}
        closeFn={close}
      />
    ));

  return (
    <>
      <Header text="사진 전송" type="text" handleClick={openPreventLeavePopup} />
      <PageContainer color="gray_5" pt="1.75">
        <AttendCareGallery />
        <BackgroundButtonWrapper $isBottom>
          <BackgroundButton>전송하기</BackgroundButton>
        </BackgroundButtonWrapper>
      </PageContainer>
    </>
  );
};

export default AttendCareGalleryPage;
