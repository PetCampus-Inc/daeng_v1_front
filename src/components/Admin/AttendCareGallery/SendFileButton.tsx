import { PATH } from "constants/path";

import { BackgroundButtonWrapper } from "components/Admin/Attendance/AttendanceButton/styles";
import BackgroundButton from "components/common/Button/BackgroundButton";
import { useCreateAlbum } from "hooks/api/admin/care";
import { useMulterS3Upload } from "hooks/common/useS3";
import { useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import showToast from "utils/showToast";

const SendFileButton = () => {
  // FIXME: dogId 쿼리파마리터로 꼭 전달해야함!!!!!!! 이전 페이지에서 전달을 못하고 있음 수정바람!!
  const { dogId } = useParams<{ dogId: string }>();
  const { handleSubmit } = useFormContext();
  const { uploadToS3, progress, uploaded } = useMulterS3Upload();
  const navigate = useNavigate();
  const { mutateAlbum } = useCreateAlbum();
  const [totalFiles, setTotalFiles] = useState(0);

  const handleCreateAlbum = (imageUriList: string[], comment?: string) => {
    mutateAlbum(
      { dogId: Number(dogId), imageUriList, comment },
      {
        onSuccess: () => {
          navigate(PATH.ADMIN_CARE_INFO(Number(dogId)), { replace: true });
        }
      }
    );
  };

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

    await uploadToS3(params, {
      onSuccess: (imageUriList) => {
        handleCreateAlbum(imageUriList, data?.comment);
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
