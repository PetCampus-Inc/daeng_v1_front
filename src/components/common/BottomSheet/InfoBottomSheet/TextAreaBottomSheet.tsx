import AllergyChartIcon from "assets/svg/allergy-chart-icon";
import CarIcon from "assets/svg/car-icon";
import { Flex } from "components/common/Flex";

import * as S from "./styles";
import BottomSheet, { type IBottomSheetProps } from "../index";

interface TextAreaBottomSheetProps extends IBottomSheetProps {
  title: string;
  text: string;
  type: string;
  actionText: string;
  actionFn: () => void;
  isOpen: boolean;
  close: () => void;
}

const TextAreaBottomSheet = ({
  title,
  text,
  type,
  actionText,
  close,
  isOpen,
  actionFn
}: TextAreaBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <Flex justify="space-between" align="center" mb="8px">
          <BottomSheet.Title>
            <S.Icon>
              {type === "pickDrop" && <CarIcon />}
              {type === "allergy" && <AllergyChartIcon />}
            </S.Icon>
            {title}
          </BottomSheet.Title>
          <BottomSheet.Control />
        </Flex>
        <S.TextAreaBox className="grayArea" name="" id="">
          {text}
        </S.TextAreaBox>
        <BottomSheet.Button actionText={actionText} actionFn={actionFn} />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default TextAreaBottomSheet;
