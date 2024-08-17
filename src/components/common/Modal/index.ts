export type { ModalProps } from "./ModalRoot";

import { ModalButton } from "./ModalButton";
import { ModalContent } from "./ModalContent";
import { ModalRoot } from "./ModalRoot";
import { ModalTitle } from "./ModalTitle";

const ModalComps = {
  Title: ModalTitle,
  Content: ModalContent,
  Button: ModalButton
};

export const Modal = Object.assign(ModalRoot, ModalComps);

export * from "./PreventLeaveModal";
export * from "./BasicModal";
