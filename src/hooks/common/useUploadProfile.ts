import { useS3Upload } from "hooks/common/useS3";
import { useState } from "react";
import showToast from "utils/showToast";

interface UploadParams {
  files: FileList; // 파일 형식
  path: string; // s3 path 설정
  accept: string; // 파일 형식
  id: number; // member, dog 인지 구분
  name: string;
}

interface UploadAndCreateAlbumOptions {
  onSuccess?: () => void;
}

const useUploadProfile = () => {
  const [s3ProfileData, setS3ProfileData] = useState<string[]>([]);
  const { uploadToS3 } = useS3Upload();

  const uploadFiles = async (
    paramsArray: UploadParams[],
    options?: UploadAndCreateAlbumOptions
  ) => {
    const uploadPromises = paramsArray.map(async (params) => {
      const { files, path, accept, id, name } = params;

      const profileParams = { files, path: `${path}/${id}`, accept, id, name };

      if (!files || files.length === 0) {
        showToast("업로드할 파일이 없습니다.", "ownerNav");
        return;
      }

      try {
        const imageUriList = await new Promise<string[]>((resolve, reject) => {
          uploadToS3(profileParams, {
            onSuccess: (uriList) => resolve(uriList),
            onError: (error) => reject(error)
          });
        });
        return imageUriList;
      } catch (error) {
        showToast("사진 업로드에 실패했습니다. 다시 시도해주세요.", "ownerNav");
        return;
      }
    });

    try {
      const allImgUriList = await Promise.all(uploadPromises);
      const totalImgList = allImgUriList.flat().filter((el): el is string => el !== undefined);
      setS3ProfileData([...totalImgList]);
      if (options?.onSuccess) options.onSuccess();
    } catch (error) {
      return;
    }
  };

  const convertProfileUri = (name: string) => {
    return s3ProfileData.find((file) => file.split("/").includes(name)) || "";
  };

  return { convertProfileUri, uploadFiles, s3ProfileData };
};

export default useUploadProfile;
