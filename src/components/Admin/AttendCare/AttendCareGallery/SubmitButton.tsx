import { routes } from "constants/path";

import { BottomButton } from "components/common/Button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { galleryImgState } from "store/images";
import showToast from "utils/showToast";

import { SelectedIdsContext } from "../context/SelectedIdsProvider";
import useUploadAndCreateAlbum from "../hooks/useUploadAndCreateAlbum";

const SubmitButton = () => {
  const selectIdsContext = useContext(SelectedIdsContext);
  const selectedDogIds = Array.from(selectIdsContext?.selectedIds ?? []);
  const galleryData = useRecoilValue(galleryImgState);
  const { uploadFiles } = useUploadAndCreateAlbum();
  const navigate = useNavigate();

  const requestForCreateAlbum = async () => {
    if (!galleryData?.files || galleryData.files.length === 0) {
      showToast("업로드할 파일이 없습니다.", "ownerNav");
      return;
    }

    const params = {
      files: galleryData.files,
      accept: ["image/*", "video/*"],
      path: "test_images/agenda",
      dogIdList: selectedDogIds,
      comment: galleryData?.comment
    };

    await uploadFiles(params, {
      onSuccess: () => {
        navigate(routes.admin.care.root, { replace: true });
      }
    });
  };

  return (
    <BottomButton disabled={selectedDogIds.length === 0} onClick={requestForCreateAlbum}>
      전송하기
    </BottomButton>
  );
};

export default SubmitButton;
