import { FIELD } from "constants/field";
import { RELATION_DATA_ARR } from "constants/relation";

import { BottomSheet, type BottomSheetProps } from "components/common/BottomSheet";
import { FieldValues, UseFormRegister } from "react-hook-form";

import * as S from "../styles";

interface RoleBottomSheetProps extends BottomSheetProps {
  title: string;
  actionFn: (data: string) => void;
  register: UseFormRegister<FieldValues>;
}

const RoleBottomSheet = ({ title, close, isOpen, actionFn, register }: RoleBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <BottomSheet.Control />
        <BottomSheet.Title>{title}</BottomSheet.Title>
        <S.RoleSelectWrapper direction="column">
          {RELATION_DATA_ARR.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                actionFn(item.type);
                close();
              }}
            >
              <S.RadioInput
                {...register(FIELD.RELATION, { required: true })}
                type="radio"
                id={item.type}
                value={item.type}
                name={FIELD.RELATION}
              />
              <S.RoleSelectLabel htmlFor={item.type}>
                <span>{item.relation}</span>
              </S.RoleSelectLabel>
            </div>
          ))}
        </S.RoleSelectWrapper>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default RoleBottomSheet;
