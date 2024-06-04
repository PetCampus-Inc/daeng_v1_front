import { PATH } from "constants/path";

import BackgroundButton from "components/common/Button/BackgroundButton";
import { useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { galleryImgState } from "store/images";
import showToast from "utils/showToast";

import useUploadAndCreateAlbum from "../hooks/useUploadAndCreateAlbum";

interface Props {
  type: "main" | "info";
}

// type=info일 때만 onSubmit 실행
// type=main일 때는 data를 다음페이지로 전달한다.

const SendFileButton = ({ type }: Props) => {
  const { dogId } = useParams<{ dogId: string }>();
  const { handleSubmit } = useFormContext();
  const setGalleryImg = useSetRecoilState(galleryImgState);
  const [totalFiles, setTotalFiles] = useState(0);
  const { uploadFiles } = useUploadAndCreateAlbum();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    if (type === "main") {
      setGalleryImg({
        files: data?.files,
        comment: data?.comment
      });
      navigate(PATH.ADMIN_CARE_GALLERY_SELECT);
      return;
    }

    if (type === "info") {
      if (!data.files || data.files.length === 0) {
        showToast("업로드할 파일이 없습니다.", "ownerNav");
        return;
      }

      if (!dogId) throw new Error("dogId is required");

      setTotalFiles(data.files.length);

      const params = {
        files: data.files,
        accept: ["image/*", "video/*"],
        path: "test_images/agenda",
        dogIdList: [parseInt(dogId)],
        comment: data?.comment
      };

      await uploadFiles(params, {
        onSuccess: () => {
          navigate(PATH.ADMIN_CARE_NOTICE(dogId), { replace: true });
        }
      });
    }
  };

  return (
    <BackgroundButton type="submit" onClick={handleSubmit(onSubmit)}>
      전송하기
    </BackgroundButton>
  );
};

export default SendFileButton;
