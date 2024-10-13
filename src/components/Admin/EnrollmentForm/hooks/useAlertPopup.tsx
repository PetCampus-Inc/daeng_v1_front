import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import { useOverlay } from "hooks/common/useOverlay";

export function useAlertPopup() {
  const overlay = useOverlay();

  return (cb: () => void) =>
    overlay.open(({ isOpen, close }) => (
      <AlertBottomSheet
        isOpen={isOpen}
        close={() => {
          close();
          cb();
        }}
        title="가입신청서를 완성해 주세요"
        subtitle="선택 입력으로 변경하거나 내용을 입력해 주세요"
        actionText="확인"
        actionFn={() => {
          close();
          cb();
        }}
      />
    ));
}
