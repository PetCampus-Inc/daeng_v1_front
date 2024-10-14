import { ACCEPT_FILE_TYPE, TYPE_NAME, PATHS } from "constants/s3File";

import { BottomButton } from "components/common/Button";
import { usePostMemberDogDetailInfo } from "hooks/api/member/member";
import useUploadProfile from "hooks/common/useUploadProfile";
import { Adapter, DogInfoDetail2BeAdapter } from "libs/adapters";
import { useFormContext, type FieldValues } from "react-hook-form";
import { type MemberDogInfoReq } from "types/member/main.types";

const SaveButton = ({ dogId }: { dogId: number }) => {
  const {
    handleSubmit,
    formState: { isDirty, isValid }
  } = useFormContext();
  const { s3ProfileData, uploadFiles } = useUploadProfile();
  const { mutatePostDogDetailInfo } = usePostMemberDogDetailInfo(dogId);

  const handleSubmitData = async (data: FieldValues) => {
    let profileUri = data.profileUri;

    if (profileUri instanceof FileList) {
      const dogParams = {
        name: TYPE_NAME.DOG,
        id: dogId,
        files: profileUri,
        accept: ACCEPT_FILE_TYPE.IMAGE,
        path: PATHS.PROFILE
      };

      await uploadFiles([dogParams]);
      profileUri = s3ProfileData[0];
    }

    const formattedData = Adapter.from(data).to<FieldValues, MemberDogInfoReq>((item) =>
      new DogInfoDetail2BeAdapter(item).adapt()
    );

    const requestData = {
      ...formattedData,
      profileUri
    };

    mutatePostDogDetailInfo(requestData);
  };

  return (
    <BottomButton
      onClick={handleSubmit(handleSubmitData)}
      disabled={!isDirty || !isValid}
      position="relative"
    >
      수정 완료
    </BottomButton>
  );
};

export default SaveButton;
