import BottomSheet from "..";
import { ThemeConfig } from "styles/ThemeConfig";
import { ButtonContainer, InnerContainer, TextContainer } from "./styles";
import Text from "components/common/Text";
import AlertIcon from "assets/svg/alert-icon";
import Button from "components/common/Button";

interface IAlertBottomSheet {
  title: string;
  content: string;
  onClose: () => void; // 바텀시트 배경 클릭 시 닫기
  grayButton?: string;
  brownButton: string;
  grayFuc?: () => void | Promise<void>;
  brownFuc?: () => void | Promise<void>;
}

const AlertBottomSheet = ({
  title,
  content,
  onClose,
  grayButton,
  brownButton,
  grayFuc,
  brownFuc
}: IAlertBottomSheet) => {
  return (
    <BottomSheet onClose={onClose}>
      <InnerContainer>
        <AlertIcon />
        <TextContainer>
          <Text text={title} size="1.125rem" weight="700" />
          <Text text={content} color={ThemeConfig.gray_3} margintop="4px" />
        </TextContainer>
      </InnerContainer>
      <ButtonContainer>
        {grayButton && (
          <Button
            height="48px"
            width="100%"
            backcolor={ThemeConfig.gray_4}
            textcolor={ThemeConfig.gray_2}
            weight="400"
            handleClick={onClose}
          >
            {grayButton}
          </Button>
        )}
        <Button height="48px" width="100%" handleClick={brownFuc}>
          {brownButton}
        </Button>
      </ButtonContainer>
    </BottomSheet>
  );
};

export default AlertBottomSheet;
