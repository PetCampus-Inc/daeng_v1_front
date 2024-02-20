import Portal from "../Modal/portal";
import TextArea from "../TextArea";
import * as S from "../ButtonModal/styles";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  children?: React.ReactNode;
  closebutton?: string;
  actionbutton?: string;
  closefunc?: () => void | Promise<void>;
  actionfunc?: () => void | Promise<void>;
  name: string;
  register: UseFormRegister<FieldValues>;
}

const TextAreaModal = ({
  children,
  closebutton,
  actionbutton,
  closefunc,
  actionfunc,
  name,
  register
}: Props) => {
  return (
    <Portal>
      <S.BackDrop>
        <S.MainWrapper>
          {children}
          <TextArea
            name={name}
            register={register}
            autoResize={false}
            style={{ height: "18vh", marginBottom: "20px", textAlign: "start" }}
          />

          <S.ButtonWrapper>
            {closebutton && <S.CloseButton onClick={closefunc}>{closebutton}</S.CloseButton>}
            {actionbutton && <S.ActButton onClick={actionfunc}>{actionbutton}</S.ActButton>}
          </S.ButtonWrapper>
        </S.MainWrapper>
      </S.BackDrop>
    </Portal>
  );
};

export default TextAreaModal;
