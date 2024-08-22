import { PATH } from "constants/path";
import { QUERY_KEY } from "constants/queryKey";
import { getFieldStep } from "constants/step";

import { useQueryClient } from "@tanstack/react-query";
import { PreventLeaveModal } from "components/common/Modal";
import { usePostEnrollment } from "hooks/api/member/enroll";
import { useLocalStorageValue, useSetLocalStorage } from "hooks/common/useLocalStorage";
import { Adapter, MemberFormToServerAdapter } from "libs/adapters";
import { useEffect } from "react";
import { FieldValues, useFormContext, useFormState, type FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { FormButton } from "styles/StyleModule";

import type { EnrollmentInfoType, MemberGenderType } from "types/member/enrollment.types";

interface DogEnrollment {
  enrollmentFormId: string;
  dogName: string;
  registeredDate: string[];
}

const MemberSubmitButton = ({ openPopup }: { openPopup: (field: string) => void }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleSubmit, getValues } = useFormContext();
  const { mutateEnrollment } = usePostEnrollment();
  const setDogEnrollment = useSetLocalStorage();

  const setStep = useSetRecoilState(currentStepState);

  const getSubmitFormInfo = (data: FieldValues) => {
    return Adapter.from(data).to<FieldValues, EnrollmentInfoType>((item) =>
      new MemberFormToServerAdapter(item).adapt()
    );
  };

  const getMemberData = () => {
    const {
      memberId,
      memberName,
      memberGender,
      address,
      addressDetail,
      phoneNumber,
      emergencyPhoneNumber
    } = getValues();

    // FIXME: fileUrl 추가 필요
    const memberData = {
      memberId: memberId,
      memberName: memberName,
      memberGender: memberGender as MemberGenderType,
      address: address || "",
      addressDetail: addressDetail,
      phoneNumber: phoneNumber,
      emergencyPhoneNumber: emergencyPhoneNumber || ""
    };

    return memberData;
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    return [year, month, day];
  };

  // member - 강아지 추가 및 유치원 재등록
  const onSubmitMember = (data: FieldValues) => {
    const { memberId, dogName } = getValues();
    const requestData = getSubmitFormInfo(data);
    const memberData = getMemberData();
    const reqData = { ...requestData, ...memberData };

    navigate(PATH.MEMBER_MY_PAGE(memberId));

    mutateEnrollment(reqData, {
      onSuccess: (enrollmentFormId) => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_INFO(String(memberId)) });
        navigate(PATH.MEMBER_MY_PAGE(memberId));

        const enrollmentDataArr: DogEnrollment | DogEnrollment[] = [];

        if (!enrollmentDataArr.some((el) => el.enrollmentFormId === String(enrollmentFormId))) {
          const updateEnrollmentData = [
            ...enrollmentDataArr,
            {
              enrollmentFormId: String(enrollmentFormId),
              dogName: dogName,
              registeredDate: getTodayDate()
            }
          ];
          setDogEnrollment({
            key: "DOG_ENROLLMENT_DATA",
            value: updateEnrollmentData
          });
        }
      }
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
      aria-label="제출하기1"
    >
      제출하기1
    </FormButton>
  );
};

export default MemberSubmitButton;
