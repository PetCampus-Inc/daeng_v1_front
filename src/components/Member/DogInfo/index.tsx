import { Flex } from "components/common";
import {
  useGetMemberDogDetailInfo,
  usePostMemberDogAllergy,
  usePostMemberDogPickDrop,
  usePostMembeVaccination
} from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import { FormProvider, useForm } from "react-hook-form";

import DogInfoBox from "./Box/DogInfoBox";
import DogMemoBox from "./Box/DogMemoBox";
import VaccinationBox from "./Main/Vaccination/VaccinationBox";
import { TextAreaBottomSheet } from "../../common/BottomSheet";

interface IProps {
  dogId: number;
}

//TODO 리팩토링하기
const DogInfo = ({ dogId }: IProps) => {
  const overlay = useOverlay();
  const { data } = useGetMemberDogDetailInfo(dogId);
  const methods = useForm({ mode: "onSubmit" });
  const mutatePostDogAllergy = usePostMemberDogAllergy(dogId);
  const metatePostDogPickDrop = usePostMemberDogPickDrop(dogId);
  const mutatePostVaccination = usePostMembeVaccination(dogId);

  const openTextAreaPopup = (title: string, defaultValue: string, type: string) =>
    overlay.open(({ isOpen, close }) => (
      <FormProvider {...methods}>
        <TextAreaBottomSheet
          title={title}
          defaultValue={defaultValue}
          type={type}
          isOpen={isOpen}
          close={close}
          register={methods.register}
          name={type}
          placeholder="메모를 입력해주세요"
          actionText={"수정 완료"}
          actionFn={() => {
            close();
            handleEventType(type);
          }}
        />
      </FormProvider>
    ));

  // MEMO 더 좋은 방법 있다면 개선하기
  const handleEventType = (type: string) => {
    const onSubmit = methods.handleSubmit(() => {
      if (type === "pickDrop") {
        const pickDrop = methods.getValues(type);
        metatePostDogPickDrop({ dogId: dogId, memo: pickDrop });
      }
      if (type === "allergy") {
        const allergy = methods.getValues(type);
        mutatePostDogAllergy({ dogId: dogId, memo: allergy });
      }
    });
    onSubmit();
  };
  return (
    <Flex direction="column" gap="24">
      <DogInfoBox data={data} dogId={dogId} />

      <DogMemoBox
        title="픽드랍 메모"
        type="pickDrop"
        memo={data.pickDropMemo}
        popUp={openTextAreaPopup}
      />

      <DogMemoBox
        title="알러지 및 질병"
        type="allergy"
        memo={data.allergyDisease}
        popUp={openTextAreaPopup}
      />

      {/* TODO 데이터 작업 필요vaccinationUri */}
      <FormProvider {...methods}>
        <VaccinationBox dogId={dogId} />
      </FormProvider>
    </Flex>
  );
};

export default DogInfo;
