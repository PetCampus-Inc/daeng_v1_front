import { FIELD } from "constants/field";
import { ITEM_ENGLISH_TO_KOREAN } from "constants/item";

import BackgroundButton from "components/common/Button/BackgroundButton";
import { useGetMemberDogDetailnfo, usePostMemberDogDetailnfo } from "hooks/api/member/member";
import { useCallback, useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { formatDate } from "utils/formatter";

// TODO 리팩토링 할 수 있는 부분 있으면 하기
const SaveButton = ({ dogId }: { dogId: number }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { watch } = useFormContext();
  const methods = useForm({ mode: "onSubmit" });
  const mutatePostDogDetailInfo = usePostMemberDogDetailnfo(dogId);
  const { data: previousValues } = useGetMemberDogDetailnfo(dogId);

  const [prevYear, prevMonth, prevDay] = previousValues[FIELD.BIRTHDAY].map(String);
  const prevBirth = formatDate(prevYear, prevMonth, prevDay);

  const dogName = watch(FIELD.DOG_NAME);
  const dogGender = watch(FIELD.DOG_GENDER) === "암컷" ? "FEMALE" : "MALE";
  const dogSize = Object.keys(ITEM_ENGLISH_TO_KOREAN).find(
    (key) => ITEM_ENGLISH_TO_KOREAN[key] === watch("dogSize")
  );
  const breedId = watch(FIELD.BREED_ID);
  const newBreed = watch(FIELD.NEW_BREED);
  const birthDate = `${watch("year")}-${watch("month")}-${watch("day")}`;
  const neutralization = watch(FIELD.NEUTRALIZATION) === "했어요" ? "NEUTERED" : "NOT_NEUTERED";

  const updatedDogDetailInfo = {
    dogId: dogId,
    dogName: dogName,
    dogGender: dogGender,
    dogSize: dogSize,
    breedId: breedId,
    newBreed: newBreed,
    birthDate: birthDate,
    neutralization: neutralization
  };

  const checkFormValidity = useCallback(() => {
    if (
      previousValues.dogName !== dogName ||
      previousValues.dogGender !== dogGender ||
      previousValues.dogSize !== dogSize ||
      previousValues.breedId !== breedId ||
      previousValues.breedName !== newBreed ||
      prevBirth !== birthDate ||
      previousValues.neutralization !== neutralization
    ) {
      return false;
    }
    return true;
  }, [
    birthDate,
    breedId,
    dogGender,
    dogName,
    dogSize,
    neutralization,
    newBreed,
    prevBirth,
    previousValues.breedId,
    previousValues.breedName,
    previousValues.dogGender,
    previousValues.dogName,
    previousValues.dogSize,
    previousValues.neutralization
  ]);

  const onSubmit = methods.handleSubmit(() => {
    mutatePostDogDetailInfo(updatedDogDetailInfo);
  });

  useEffect(() => {
    const isValid = checkFormValidity();
    setIsDisabled(isValid);
  }, [checkFormValidity]);

  return (
    <BackgroundButton
      onClick={onSubmit}
      backgroundColor="white"
      buttonBackgroundColor="primaryColor"
      disabled={isDisabled}
    >
      수정 완료
    </BackgroundButton>
  );
};

export default SaveButton;
