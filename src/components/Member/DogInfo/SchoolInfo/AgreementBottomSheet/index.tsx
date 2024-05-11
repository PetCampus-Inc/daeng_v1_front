import ApplicationWhiteIcon from "assets/svg/application-white-icon";
import BottomSheet, { IBottomSheetProps } from "components/common/BottomSheet";
import { ReactNode, useState } from "react";
import styled from "styled-components";

import CheckButton from "./CheckButton";

interface IAlertBottomSheet extends IBottomSheetProps {
  title: string;
  hasControl?: boolean;
  closeText: string;
  closeFn: () => void;
  icon: ReactNode;
}

const AgreementBottomSheet = ({
  title,
  close,
  isOpen,
  hasControl = false, // 바텀시트 상단 x 버튼
  closeText,
  closeFn,
  icon
}: IAlertBottomSheet) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <TitleWrapper>
          {icon}
          <Title>{title}</Title>
        </TitleWrapper>
        <Info>
          {
            "원장님이 입력한 가격안내 내용이 보이게 됩니다. 원장님이 입력한 가격안내 내용이 보이게 됩니다. 원장님이 입력한 가격안내 내용이 보이게 됩니다. 원장님이 입력한 가격안내 내용이 보이게 됩니다. "
          }
        </Info>
        <CheckButton isChecked={isChecked} setIsChecked={setIsChecked} />
        <BottomSheet.Button actionText={closeText} actionFn={closeFn} disabled={!isChecked} />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default AgreementBottomSheet;

const TitleWrapper = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const Title = styled.p`
  ${({ theme }) => theme.typo.label1_16_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;

const Info = styled.div`
  height: 10rem;
  width: 100%;
  margin-top: 1rem;
  border-radius: 8px;
  padding: 1rem 1.5rem 1rem 1.5rem;
  word-break: keep-all;
  color: ${({ theme }) => theme.colors.gray_2};
  ${({ theme }) => theme.typo.label1_16_R};
  background-color: ${({ theme }) => theme.colors.gray_5};
`;
