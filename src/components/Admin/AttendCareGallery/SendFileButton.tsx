import { BackgroundButtonWrapper } from "components/Admin/Attendance/AttendanceButton/styles";
import BackgroundButton from "components/common/Button/BackgroundButton";
import { useS3Upload } from "hooks/common/useS3";
import { FieldValues, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import showToast from "utils/showToast";

const SendFileButton = () => {
  const { dogId } = useParams<{ dogId: string }>();
  const { handleSubmit } = useFormContext();
  const { uploadToS3 } = useS3Upload();

  const onSubmit = async (data: FieldValues) => {
    const params = {
      files: data.files,
      accept: ["image/*", "video/*"],
      path: `test_images/agenda/${dogId}`
    };

    const url = await uploadToS3(params, {
      onError: () => {
        showToast("사진 업로드에 실패했습니다. 다시 시도해주세요.", "bottom");
      }
    });
  };

  return (
    <BackgroundButtonWrapper $isBottom>
      <BackgroundButton type="submit" onClick={handleSubmit(onSubmit)}>
        전송하기
      </BackgroundButton>
    </BackgroundButtonWrapper>
  );
};

export default SendFileButton;
