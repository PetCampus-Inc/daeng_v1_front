import { FieldValues, type UseFormRegister } from "react-hook-form";

import TextArea, { type TextAreaProps } from "../../TextArea";
import { Modal, type ModalProps } from "../index";
import { type TicketInfo } from "../ModalButton";
import { ModalWithTextAreaContent } from "../styles";

interface TextAreaModalProps extends ModalProps, TextAreaProps, TicketInfo {
  name: string;
  register: UseFormRegister<FieldValues>;
}

const TextAreaModal = ({
  isOpen,
  close,
  closeText,
  actionText,
  closeFn,
  actionFn,
  name,
  defaultValue,
  placeholder,
  register
}: TextAreaModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <ModalWithTextAreaContent>
        <TextArea
          {...register(name)}
          rows={4}
          autoResize={false}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
        <Modal.Button
          closeText={closeText}
          actionText={actionText}
          closeFn={closeFn}
          actionFn={actionFn}
        />
      </ModalWithTextAreaContent>
    </Modal>
  );
};

export default TextAreaModal;
