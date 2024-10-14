import { getFieldStep } from "constants/step";

import { usePostMemberEnrollment } from "hooks/api/member/enroll";
import { useS3Upload } from "hooks/common/useS3";
import { Adapter, CreateMemberForm2BeAdapter } from "libs/adapters";
import { FieldValues, useFormContext, type FieldErrors } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { FormButton } from "styles/StyleModule";
import showToast from "utils/showToast";

import { ImageFile } from "../ImageUpload/ImageUploadInput";

import type { EnrollmentInfoType, MemberGenderType } from "types/member/enrollment.types";

const MemberSubmitButton = ({ openPopup }: { openPopup: (field: string) => void }) => {
  const { handleSubmit, getValues } = useFormContext();
  const { uploadToS3 } = useS3Upload();
  const { mutateMemberEnrollment } = usePostMemberEnrollment();

  const setStep = useSetRecoilState(currentStepState);

  const getSubmitFormInfo = (data: FieldValues) => {
    return Adapter.from(data).to<FieldValues, EnrollmentInfoType>((item) =>
      new CreateMemberForm2BeAdapter(item).adapt()
    );
  };

  const uploadImages = async (files: FileList, dogId: string) => {
    const params = {
      files,
      accept: ["image/*"],
      path: `vaccination/${dogId}`
    };

    return await uploadToS3(params, {
      onError: () => showToast("사진 업로드에 실패했습니다. 다시 시도해주세요.", "ownerNav")
    });
  };

  const getMemberData = () => {
    const { memberName, memberGender, address, addressDetail, phoneNumber, emergencyPhoneNumber } =
      getValues();

    const memberData = {
      memberName: memberName,
      memberGender: memberGender as MemberGenderType,
      address: address || "",
      addressDetail: addressDetail,
      phoneNumber: phoneNumber,
      emergencyPhoneNumber: emergencyPhoneNumber || ""
    };

    return memberData;
  };

  // member - 강아지 추가 및 유치원 재등록
  const onSubmitMember = async (data: FieldValues) => {
    const memberData = getMemberData();

    let imageUrls;
    if (data.vaccination === "했어요" && data.vaccinationUri) {
      const files = data.vaccinationUri.map((item: ImageFile) => item.file);
      imageUrls = await uploadImages(files, data.dogId);
    }

    const formData = getSubmitFormInfo({ ...data, ...memberData, vaccinationUri: imageUrls });

    mutateMemberEnrollment(formData, {
      onError: () => showToast("제출 중 오류가 발생했습니다. 다시 시도해주세요.", "ownerNav")
    });
  };

  const onInvalid = (errors: FieldErrors) => {
    const firstErrorField = Object.keys(errors)[0];

    console.log(firstErrorField);

    const step = getFieldStep({ field: firstErrorField, enable: true });

    if (step !== undefined) {
      openPopup(firstErrorField);
      setStep(step);
    }
  };

  return (
    <FormButton
      type="submit"
      onClick={handleSubmit(onSubmitMember, onInvalid)}
      aria-label="제출하기"
    >
      제출하기
    </FormButton>
  );
};

export default MemberSubmitButton;
