import { FieldValues, UseFormRegister } from "react-hook-form";

import Modal from "../ButtonModal";
import { ModalWithTextAreaContent } from "../ButtonModal/styles";
import TextArea from "../TextArea";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  closeText?: string;
  actionText: string;
  closeFn?: () => void | Promise<void>;
  actionFn: () => void | Promise<void>;
  name: string;
  register: UseFormRegister<FieldValues>;
  defaultValue?: string;
  placeholder?: string;
}

const TextAreaModal = ({
  isOpen,
  onClose,
  closeText,
  actionText,
  closeFn,
  actionFn,
  name,
  defaultValue,
  placeholder,
  register
}: Props) => {
  return (
    <Modal isOpen={isOpen} close={onClose}>
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
