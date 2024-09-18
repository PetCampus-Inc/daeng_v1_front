import EnrollFormImage from "assets/images/new_enrollform.jpg";
import { Flex } from "components/common";
import { BottomSheet, type BottomSheetProps } from "components/common/BottomSheet";
import { css } from "styled-components";
import { FormButton, FormPrevButton } from "styles/StyleModule";

import * as S from "./styles";

interface NewEnrollmentFormBottomSheetProps extends BottomSheetProps {
  onConfirm?: () => void;
}

export default function NewEnrollmentFormBottomSheet({
  isOpen,
  close,
  onConfirm
}: NewEnrollmentFormBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content
        css={css`
          margin-top: 1.6rem;
        `}
      >
        <BottomSheet.Title>가입신청서를 만들어 관리해 보세요</BottomSheet.Title>
        <BottomSheet.Subtitle>
          이제 가입신청서를 직접 받지 않고
          <br />
          견주가 앱에서 작성하도록 해보세요
        </BottomSheet.Subtitle>

        <S.ImageWrapper>
          <S.Image src={EnrollFormImage} />
        </S.ImageWrapper>

        <Flex gap={4}>
          <FormPrevButton onClick={() => close()}>닫기</FormPrevButton>
          <FormButton onClick={onConfirm}>신규 등록</FormButton>
        </Flex>
      </BottomSheet.Content>
    </BottomSheet>
  );
}
