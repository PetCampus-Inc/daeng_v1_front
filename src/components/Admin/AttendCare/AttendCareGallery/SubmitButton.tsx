import { PATH } from "constants/path";

import { BackgroundButton } from "components/common/Button";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { galleryImgState } from "store/images";
import showToast from "utils/showToast";

import { SelectedIdsContext } from "../context/SelectedIdsProvider";
import useUploadAndCreateAlbum from "../hooks/useUploadAndCreateAlbum";

const SubmitButton = () => {
  const selectIdsContext = useContext(SelectedIdsContext);
  const selectedDogIds = Array.from(selectIdsContext?.selectedIds ?? []);
  const [totalFiles, setTotalFiles] = useState(0);
  const galleryData = useRecoilValue(galleryImgState);
  const { uploadFiles } = useUploadAndCreateAlbum();
  const navigate = useNavigate();

  const requestForCreateAlbum = async () => {
    if (!galleryData?.files || galleryData.files.length === 0) {
      showToast("업로드할 파일이 없습니다.", "ownerNav");
      return;
    }
    setTotalFiles(galleryData.files.length);

    const params = {
      files: galleryData.files,
      accept: ["image/*", "video/*"],
      path: "test_images/agenda",
      dogIdList: selectedDogIds,
      comment: galleryData?.comment
    };

    await uploadFiles(params, {
      onSuccess: () => {
        navigate(PATH.ADMIN_CARE, { replace: true });
      }
    });
  };

  return (
    <BackgroundButton
      backgroundColor="white"
      disabled={selectedDogIds.length === 0}
      onClick={requestForCreateAlbum}
    >
      전송하기
    </BackgroundButton>
  );
};

export default SubmitButton;
