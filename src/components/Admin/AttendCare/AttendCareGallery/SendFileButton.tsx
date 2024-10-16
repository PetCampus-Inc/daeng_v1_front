import { routes } from "constants/path";

import { BottomButton } from "components/common/Button";
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
  const { handleSubmit, getValues } = useFormContext();
  const setGalleryImg = useSetRecoilState(galleryImgState);
  const { uploadFiles } = useUploadAndCreateAlbum();
  const navigate = useNavigate();

  const filesValue = getValues("files") ?? [];
  const hasFile = filesValue.length > 0;

  const onSubmit = async (data: FieldValues) => {
    if (type === "main") {
      setGalleryImg({
        files: data?.files,
        comment: data?.comment
      });
      navigate(routes.admin.care.gallery.select.root);
      return;
    }

    if (type === "info") {
      if (!data.files || data.files.length === 0) {
        showToast("업로드할 파일이 없습니다.", "ownerNav");
        return;
      }

      if (!dogId) throw new Error("dogId is required");

      const params = {
        files: data.files,
        accept: ["image/*", "video/*"],
        path: "test_images/agenda",
        dogIdList: [parseInt(dogId)],
        comment: data?.comment
      };

      await uploadFiles(params, {
        onSuccess: () => {
          navigate(routes.admin.care.notice.dynamic(dogId), {
            state: { tab: "album" },
            replace: true
          });
        }
      });
    }
  };

  return (
    <BottomButton type="submit" disabled={!hasFile} onClick={handleSubmit(onSubmit)}>
      전송하기
    </BottomButton>
  );
};

export default SendFileButton;
