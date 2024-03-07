import AlertIcon from "assets/svg/alert-icon";

import { TextContainer } from "./styles";
import BottomSheet from "../index";

import type { BottomSheetButtonProps } from "../BottomSheetButton";

interface IAlertBottomSheet extends BottomSheetButtonProps {
  title: string;
  subtitle: string;
  isOpen: boolean;
  onClose: () => void;
  hasControl?: boolean;
}

const AlertBottomSheet = ({
  title,
  subtitle,
  onClose,
  isOpen,
  hasControl = false, // 바텀시트 상단 x 버튼
  closeText,
  actionText,
  closeFn,
  actionFn
}: IAlertBottomSheet) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <BottomSheet.Content>
        {hasControl && <BottomSheet.Control />}
        <AlertIcon />
        <TextContainer>
          <BottomSheet.Title>{title}</BottomSheet.Title>
          <BottomSheet.Subtitle>{subtitle}</BottomSheet.Subtitle>
        </TextContainer>
        <BottomSheet.Button
          closeText={closeText}
          closeFn={closeFn}
          actionText={actionText}
          actionFn={actionFn}
        />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default AlertBottomSheet;
