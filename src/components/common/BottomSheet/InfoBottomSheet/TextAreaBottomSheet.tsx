import AllergyChartIcon from "assets/svg/allergy-chart-icon";
import CarIcon from "assets/svg/car-icon";
import { Flex } from "components/common/Flex";
import { FieldValues, UseFormRegister } from "react-hook-form";

import * as S from "./styles";
import BottomSheet, { type IBottomSheetProps } from "../index";

interface TextAreaBottomSheetProps extends IBottomSheetProps {
  title: string;
  defaultValue: string;
  type: string;
  name: string;
  placeholder?: string;
  actionText: string;
  actionFn: () => void;
  isOpen: boolean;
  close: () => void;
  register: UseFormRegister<FieldValues>;
}

const TextAreaBottomSheet = ({
  title,
  defaultValue,
  type,
  name,
  placeholder,
  actionText,
  close,
  isOpen,
  actionFn,
  register
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
        <S.TextAreaBox
          className="grayArea"
          id=""
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...register(type)}
        />
        <BottomSheet.Button actionText={actionText} actionFn={actionFn} />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default TextAreaBottomSheet;
