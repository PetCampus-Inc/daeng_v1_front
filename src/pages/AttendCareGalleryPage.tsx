import { BackgroundButtonWrapper } from "components/Admin/Attendance/AttendanceButton/styles";
import AttendCareGallery from "components/Admin/AttendCare/AttendCareGallery";
import BackgroundButton from "components/common/Button/BackgroundButton";
import Header from "components/common/Header";
import { PageContainer } from "styles/StyleModule";

interface Props {
  type: "main" | "info";
}

const AttendCareGalleryPage = ({ type }: Props) => {
  return (
    <>
      <Header text="사진 전송" type="text" />
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
