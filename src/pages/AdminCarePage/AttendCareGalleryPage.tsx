import CommentBox from "components/Admin/AttendCare/AttendCareGallery/CommentBox";
import SendFileButton from "components/Admin/AttendCare/AttendCareGallery/SendFileButton";
import UploadBox from "components/Admin/AttendCare/AttendCareGallery/UploadBox";
import Header from "components/common/Header";
import { useOverlay } from "hooks/common/useOverlay";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

import BasicModal from "../../components/common/Modal/BasicModal";

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
        action={() => navigate(-1)}
      />
    ));

  return (
    <>
      <Header text="사진 전송" type="text" handleClick={openPreventLeavePopup} />
      <PageContainer color="gray_5" pt="1.75">
        <FormProvider {...methods}>
          <UploadBox />
          <CommentBox />
          <SendFileButton type={type} />
        </FormProvider>
      </PageContainer>
    </>
  );
};

export default AttendCareGalleryPage;
