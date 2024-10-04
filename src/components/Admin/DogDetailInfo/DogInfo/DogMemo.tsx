import PencilIcon from "assets/svg/pencil-icon";
import { ModalWithTextAreaContent } from "components/Admin/DogDetailInfo/DogInfo/styles";
import { Flex, Text, Textarea, type TextareaProps } from "components/common";
import { Modal, type ModalProps } from "components/common/Modal";
import { type ModalButtonProps } from "components/common/Modal/ModalButton";
import { usePostMemo } from "hooks/api/admin/dogs";
import { useOverlay } from "hooks/common/useOverlay";
import { FormProvider, useForm, type FieldValues, type UseFormRegister } from "react-hook-form";
import showToast from "utils/showToast";

interface MemoProps {
  memo: string | null;
  dogId: number;
}

export function DogMemo({ memo, dogId }: MemoProps) {
  const methods = useForm({ mode: "onSubmit" });
  const { mutateMemo } = usePostMemo();
  const overlay = useOverlay();

  const onSubmit = (formData: FieldValues) => {
    mutateMemo(
      { dogId, memo: formData["memo"] },
      {
        onSuccess: () => {
          showToast("메모를 등록했습니다.", "bottom");
          overlay.close(); // 메모 모달 닫기
        },
        onError: () => {
          showToast("메모 등록을 실패했습니다. 다시 시도해주세요", "bottom");
        }
      }
    );
  };
  const openMemoDialog = () =>
    overlay.open(({ isOpen, close }) => (
      <FormProvider {...methods}>
        <TextareaModal
          isOpen={isOpen}
          close={close}
          actionText="저장"
          closeText="취소"
          name="memo"
          register={methods.register}
          actionFn={methods.handleSubmit(onSubmit)}
          defaultValue={memo || ""}
          placeholder="메모를 입력해주세요"
        />
      </FormProvider>
    ));

  return (
    <Flex direction={"column"} gap={12}>
      <Flex justify={"space-between"}>
        <Text typo={"body1_18_B"} color={"gray_1"}>
          메모
        </Text>
        <button onClick={openMemoDialog}>
          <PencilIcon />
        </button>
      </Flex>
      <Textarea
        placeholder="메모를 입력해주세요"
        onClick={openMemoDialog}
        value={memo || ""}
        readOnly
      />
    </Flex>
  );
}

interface TextareaModalProps extends ModalProps, ModalButtonProps, TextareaProps {
  name: string;
  register: UseFormRegister<FieldValues>;
}

const TextareaModal = ({
  isOpen,
  close,
  closeText,
  actionText,
  actionFn,
  name,
  defaultValue,
  placeholder,
  register
}: TextareaModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <ModalWithTextAreaContent>
        <Textarea
          {...register(name)}
          rows={4}
          autoResize={false}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
        <Modal.Button
          closeText={closeText}
          actionText={actionText}
          closeFn={close}
          actionFn={actionFn}
        />
      </ModalWithTextAreaContent>
    </Modal>
  );
};
