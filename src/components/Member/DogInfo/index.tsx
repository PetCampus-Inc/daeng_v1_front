import { Flex } from "components/common";
import {
  useGetMemberDogDetailInfo,
  usePostMemberDogAllergy,
  usePostMemberDogPickDrop
} from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import { FormProvider, useForm } from "react-hook-form";

import DogInfoBox from "./Main/Box/DogInfoBox";
import DogMemoBox from "./Main/Box/DogMemoBox";
import VaccinationBox from "./Main/Box/VaccinationBox";
import { TextAreaBottomSheet } from "../../common/BottomSheet";

const DogInfo = ({ dogId }: { dogId: number }) => {
  const overlay = useOverlay();
  const methods = useForm({ mode: "onSubmit" });
  const mutatePostDogAllergy = usePostMemberDogAllergy(dogId);
  const mutatePostDogPickDrop = usePostMemberDogPickDrop(dogId);
  const { data } = useGetMemberDogDetailInfo(dogId);
  const { vaccinationUri } = data;

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
            handleEditMemo(type);
          }}
        />
      </FormProvider>
    ));

  const handleEditMemo = (type: string) => {
    const onSubmit = methods.handleSubmit(() => {
      const { pickDrop, allergy } = methods.getValues();

      if (type === "pickDrop") {
        mutatePostDogPickDrop({ dogId: dogId, memo: pickDrop });
      } else if (type === "allergy") {
        mutatePostDogAllergy({ dogId: dogId, memo: allergy });
      }
    });
    onSubmit();
  };

  return (
    <Flex direction="column" gap={24} pt={28} px={16}>
      <DogInfoBox data={data} dogId={dogId} />

      <DogMemoBox
        title="픽드랍 메모"
        type="pickDrop"
        memo={data.pickDropMemo}
        openPopup={openTextAreaPopup}
      />

      <DogMemoBox
        title="알러지 및 질병"
        type="allergy"
        memo={data.allergyDisease}
        openPopup={openTextAreaPopup}
      />

      <FormProvider {...methods}>
        <VaccinationBox dogId={dogId} vaccinationUri={vaccinationUri} />
      </FormProvider>
    </Flex>
  );
};

export default DogInfo;
