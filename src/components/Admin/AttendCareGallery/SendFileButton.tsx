import { BackgroundButtonWrapper } from "components/Admin/Attendance/AttendanceButton/styles";
import BackgroundButton from "components/common/Button/BackgroundButton";
import { useMulterS3Upload } from "hooks/common/useS3";
import { useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import showToast from "utils/showToast";

const SendFileButton = () => {
  const { dogId } = useParams<{ dogId: string }>();
  const { handleSubmit } = useFormContext();
  const { uploadToS3, progress, uploaded } = useMulterS3Upload();
  const [totalFiles, setTotalFiles] = useState(0);

  const onSubmit = async (data: FieldValues) => {
    if (!data.files || data.files.length === 0) {
      showToast("업로드할 파일이 없습니다.", "bottom");
      return;
    }
    setTotalFiles(data.files.length);

    const params = {
      files: data.files,
      accept: ["image/*", "video/*"],
      path: `test_images/agenda/${dogId}`
    };

    const url = await uploadToS3(params, {
      onSuccess: (url) => {
        console.log("업로드 성공:", url);
      },
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
