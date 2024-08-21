import { FIELD } from "constants/field";
import { ACCEPT_FILE_TYPE, FILE_NAME, PATHS, TYPE_NAME } from "constants/s3File";

import { BottomButton } from "components/common/Button";
import { usePostMemberProfileInfo } from "hooks/api/member/member";
import useUploadProfile from "hooks/common/useUploadProfile";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import type { IMemberProfilePostInfo } from "types/member/main.types";

const SaveButton = ({ memberId }: { memberId: string }) => {
  const {
    getValues,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting }
  } = useFormContext();
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const { uploadFiles, s3ProfileData } = useUploadProfile();
  const { mutateProfileInfo } = usePostMemberProfileInfo(memberId);

  const getFormValues = (): IMemberProfilePostInfo => {
    const formData = getValues();
    return {
      memberId,
      memberName: formData[FIELD.MEMBER_NAME],
      memberGender: formData[FIELD.MEMBER_GENDER] === "여" ? "FEMALE" : "MALE",
      memberProfileUri: formData[FILE_NAME.PROFILE_MEMBER],
      nickName: formData[FIELD.NICK_NAME],
      address: formData[FIELD.MEMBER_ADDRESS],
      addressDetail: formData[FIELD.MEMBER_ADDRESS_DETAIL],
      phoneNumber: formData[FIELD.MEMBER_PHONE],
      emergencyPhoneNumber: formData[FIELD.EMERGENCY_NUMBER],
      relation: formData[FIELD.RELATION]
    };
  };

  const handleSubmitData = async () => {
    const { memberProfileUri } = getFormValues();

    if (memberProfileUri && typeof memberProfileUri !== "string") {
      // profileUri 파일 수정 할 경우
      await uploadProfileFiles(memberProfileUri);
    }
    // profileUri 파일 수정 안 할 경우
    else onSubmit();
  };

  const uploadProfileFiles = async (profileUri: FileList) => {
    const memberParam = {
      name: TYPE_NAME.MEMBER,
      id: Number(memberId),
      files: profileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PATHS.PROFILE
    };

    const params = [memberParam];

    await uploadFiles(params, {
      onSuccess: () => {
        setShouldSubmit(true);
      }
    });
  };

  const onSubmit = () => {
    const formData = getFormValues();
    const memberProfileUri = getValues("profileUri");

    const requestData = {
      ...formData,
      memberProfileUri: s3ProfileData[0] || memberProfileUri
    };

    mutateProfileInfo(requestData);
  };

  useEffect(() => {
    if (shouldSubmit) {
      onSubmit();
      setShouldSubmit(false);
    }
  }, [s3ProfileData, shouldSubmit]);

  return (
    <BottomButton
      onClick={handleSubmit(handleSubmitData)}
      disabled={!isDirty || !isValid || isSubmitting}
    >
      수정 완료
    </BottomButton>
  );
};

export default SaveButton;
