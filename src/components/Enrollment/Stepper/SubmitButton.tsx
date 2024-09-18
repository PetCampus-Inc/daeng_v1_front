import { routes } from "constants/path";
import { getFieldStep } from "constants/step";

import { usePostEnrollment } from "hooks/api/member/enroll";
import { useS3Upload } from "hooks/common/useS3";
import { Adapter, MemberFormToServerAdapter } from "libs/adapters";
import { FieldValues, useFormContext, type FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { FormButton } from "styles/StyleModule";
import showToast from "utils/showToast";

import type { ImageFile } from "../ImageUpload/ImageUploadInput";
import type { EnrollmentInfoType } from "types/member/enrollment.types";

const SubmitButton = ({ openPopup }: { openPopup: (field: string) => void }) => {
  const { handleSubmit } = useFormContext();
  const { uploadToS3 } = useS3Upload();
  const { mutateEnrollment } = usePostEnrollment();
  const setStep = useSetRecoilState(currentStepState);
  const navigate = useNavigate();

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

  const getFormData = (data: FieldValues) => {
    return Adapter.from(data).to<FieldValues, EnrollmentInfoType>((item) =>
      new MemberFormToServerAdapter(item).adapt()
    );
  };

  const onSubmit = async (data: FieldValues) => {
    let imageUrls;
    if (data.vaccination === "했어요" && data.vaccinationUri) {
      const files = data.vaccinationUri.map((item: ImageFile) => item.file);
      imageUrls = await uploadImages(files, data.dogId);
    }

    const formData = getFormData({ ...data, vaccinationUri: imageUrls });

    console.log(formData);
    mutateEnrollment(formData, {
      onSuccess: () => navigate(routes.approval.root),
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
    <FormButton type="submit" onClick={handleSubmit(onSubmit, onInvalid)} aria-label="제출하기">
      제출하기
    </FormButton>
  );
};

export default SubmitButton;
