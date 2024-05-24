import { useCreateAlbum } from "hooks/api/admin/care";
import { useMulterS3Upload } from "hooks/common/useS3";
import showToast from "utils/showToast";

interface UploadParams {
  files: FileList;
  path: string;
  accept: string[];
  dogIds: number[];
  comment?: string;
}

interface UploadAndCreateAlbumOptions {
  onSuccess?: () => void;
}

const useUploadAndCreateAlbum = () => {
  const { uploadToS3 } = useMulterS3Upload();
  const { mutateAlbum } = useCreateAlbum();

  const uploadFiles = async (
    { files, path, accept, dogIds, comment }: UploadParams,
    options?: UploadAndCreateAlbumOptions
  ) => {
    if (!files || files.length === 0) {
      showToast("업로드할 파일이 없습니다.", "ownerNav");
      return;
    }

    let allImageUriList: string[] = [];
    for (const dogId of dogIds) {
      const params = { files, accept, path: `${path}/${dogId}` };

      try {
        const imageUriList = await new Promise<string[]>((resolve, reject) => {
          uploadToS3(params, {
            onSuccess: (uriList) => resolve(uriList),
            onError: (error) => reject(error)
          });
        });

        allImageUriList = [...allImageUriList, ...imageUriList];
      } catch (error) {
        showToast("사진 업로드에 실패했습니다. 다시 시도해주세요.", "ownerNav");
        return;
      }
    }

    console.log(allImageUriList, comment, dogIds);

    mutateAlbum(
      { dogId: dogIds, imageUriList: allImageUriList, comment },
      {
        onSuccess: () => {
          if (options?.onSuccess) {
            options.onSuccess();
          }
        }
      }
    );
  };

  return { uploadFiles };
};

export default useUploadAndCreateAlbum;
