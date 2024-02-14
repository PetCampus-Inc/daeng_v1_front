import { useFormContext } from "react-hook-form";
import { useEnrollMutation } from "hooks/api/useEnrollMutation";
import { formatDate, extractNumber } from "utils/formatter";
import type { IRequestEnrollment, TPickDropRequest } from "types/School.type";
import type { ItemMapValue } from "constants/item";
import { ITEM_MAP } from "constants/item";

import * as S from "./styles";

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

  // FIXME: schoolFormId, memberId, fileUrl 추가 필요
  const onSubmit = handleSubmit((data) => {
    const address = [data.address.street, data.address.detail].filter(Boolean).join(" ");
    const requestData: IRequestEnrollment = {
      schoolFormId: 1,
      memberId: 1,
      breedId: data.breedId,
      newBreed: data.breedId ? "" : data.dogBreed,
      fileUrl: "",
      memberName: data.memberName,
      address,
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
      pickDropRequest: mapValue(data.pickDropRequest) as TPickDropRequest,
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