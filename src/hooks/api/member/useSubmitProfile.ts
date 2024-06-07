import { useCreateAlbum } from "hooks/api/admin/care";
import { useS3Upload } from "hooks/common/useS3";
import { useState } from "react";
import showToast from "utils/showToast";

interface UploadParams {
  files: FileList;
  path: string;
  accept: string;
  id: number;
}

interface UploadAndCreateAlbumOptions {
  onSuccess?: () => void;
}

const useSubmitProfile = () => {
  const [fileData, setfileData] = useState<FileList[]>([]);
  const { uploadToS3 } = useS3Upload();
  const { mutateAlbum } = useCreateAlbum();

  const uploadFiles = async (
    { files, path, accept, id }: UploadParams,
    options?: UploadAndCreateAlbumOptions
  ) => {
    if (!files || files.length === 0) {
      showToast("업로드할 파일이 없습니다.", "ownerNav");
      return;
    }

    let allImageUriList: string[] = [];
    for (const item of files) {
      const params = { files, accept, path: `${path}/${id}` };

      try {
        const imageUriList = await new Promise<string[]>((resolve, reject) => {
          uploadToS3(params, {
            onSuccess: (uriList) => resolve(uriList),
            onError: (error) => reject(error)
          });
        });

        return (allImageUriList = [...allImageUriList, ...imageUriList]);
      } catch (error) {
        showToast("사진 업로드에 실패했습니다. 다시 시도해주세요.", "ownerNav");
        return;
      }
    }
  };

  return { uploadFiles };
};

export default useSubmitProfile;
