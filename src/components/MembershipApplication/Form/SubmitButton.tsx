import { useFormContext } from "react-hook-form";
import { useEnrollMutation } from "hooks/api/useEnrollMutation";
import { formatDate, extractNumber } from "utils/formatter";
import { IRequestEnrollment } from "../../../types/School.type";
import { ITEM_MAP } from "./constant";
import type { ItemMapValue } from "./constant";

import * as S from "../Stepper/styles";

const SubmitButton = () => {
  const {
    handleSubmit,
    formState: { isValid }
  } = useFormContext();

  const enrollMutation = useEnrollMutation();

  const mapValue = (key: string): string | ItemMapValue => {
    if (ITEM_MAP.has(key)) {
      return ITEM_MAP.get(key) as string | ItemMapValue;
    }
    return "";
  };

  const onSubmit = handleSubmit((data) => {
    const requestData: IRequestEnrollment = {
      // FIXME: schoolFormId, memberId, fileUrl 추가 필요
      // TODO: requestData 인터페이스 정의하기
      schoolFormId: 1,
      memberId: 1,
      breedId: 1,
      newBreed: "",
      fileUrl: "",
      memberName: data.memberName,
      address: data.address || "",
      phoneNumber: data.phoneNumber,
      emergencyNumber: data.emergencyNumber || "",
      dogName: data.dogName,
      allergyDisease: data.allergyDisease,
      attendanceDays: data.attendanceDays,
      pickDropMemo: data.pickDropMemo,
      birthDate: formatDate(data.year, data.month, data.day),
      memberGender: mapValue(data.memberGender) as string,
      dogGender: mapValue(data.dogGender) as string,
      dogSize: mapValue(data.dogSize) as string,
      neutralization: (mapValue(data.neutralization) as ItemMapValue).neutralization,
      vaccination: (mapValue(data.vaccination) as ItemMapValue).vaccination,
      pickDropRequest: mapValue(data.pickDropRequest) as string,
      pickDropType: mapValue(data.pickDropType) as string,
      ticketType: mapValue(data.ticketType) as string,
      monthlyTicketNumber: extractNumber(data.monthlyTicketNumber),
      roundTicketNumber: extractNumber(data.roundTicketNumber)
    };

    console.log(requestData);
    // enrollMutation(requestData);
  });

  return (
    <S.Button
      type="submit"
      onClick={onSubmit}
      aria-disabled={isValid ? "true" : undefined}
      aria-label="제출하기"
    >
      제출하기
    </S.Button>
  );
};

export default SubmitButton;
