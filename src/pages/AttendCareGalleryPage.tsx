import CommentBox from "components/Admin/AttendCareGallery/CommentBox";
import SendFileButton from "components/Admin/AttendCareGallery/SendFileButton";
import UploadBox from "components/Admin/AttendCareGallery/UploadBox";
import BasicModal from "components/common/ButtonModal/BasicModal";
import Header from "components/common/Header";
import useOverlay from "hooks/common/useOverlay/useOverlay";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

interface Props {
  type: "main" | "info";
}

const AttendCareGalleryPage = ({ type }: Props) => {
  const methods = useForm({ mode: "onSubmit" });
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
        <FormProvider {...methods}>
          <UploadBox />
          <CommentBox />
          <SendFileButton />
        </FormProvider>
      </PageContainer>
    </>
  );
};

export default AttendCareGalleryPage;
