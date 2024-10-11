import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import { useOverlay } from "hooks/common/useOverlay";
import { FieldValues, useFormContext } from "react-hook-form";

import SubmitButton from "./SubmitButton";

export const NavigationButton = ({
  onNextStep
}: {
  onNextStep?: (formInfo: FieldValues) => void;
}) => {
  const { setFocus } = useFormContext();

  const overlay = useOverlay();
  const openAlertPopup = (field: string) =>
    overlay.open(({ isOpen, close }) => (
      <AlertBottomSheet
        isOpen={isOpen}
        close={() => {
          close();
          setFocus(field);
        }}
        title="입력을 하지 않은 필수 항목이 있어요"
        subtitle="유의사항에 동의하지 않으면 가입이 어려워요"
        actionText="확인"
        actionFn={() => {
          close();
          setFocus(field);
        }}
      />
    ));

  return <SubmitButton type="EDIT" onNextStep={onNextStep} onOpenPopup={openAlertPopup} />;
};
