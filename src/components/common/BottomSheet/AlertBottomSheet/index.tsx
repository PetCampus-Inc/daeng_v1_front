import AlertIcon from "assets/svg/alert-icon";
import styled from "styled-components";

import BottomSheet, { type IBottomSheetProps } from "../index";

import type { BottomSheetButtonProps } from "../BottomSheetButton";

interface IAlertBottomSheet extends BottomSheetButtonProps, IBottomSheetProps {
  title: string;
  subtitle: string;
  hasControl?: boolean;
}

const AlertBottomSheet = ({
  title,
  subtitle,
  close,
  isOpen,
  hasControl = false, // 바텀시트 상단 x 버튼
  closeText,
  actionText,
  closeFn,
  actionFn
}: IAlertBottomSheet) => {
  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        {hasControl && <BottomSheet.Control />}
        <IconWrapper>
          <AlertIcon />
        </IconWrapper>
        <BottomSheet.Title>{title}</BottomSheet.Title>
        <BottomSheet.Subtitle>{subtitle}</BottomSheet.Subtitle>
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

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 8px;
`;
