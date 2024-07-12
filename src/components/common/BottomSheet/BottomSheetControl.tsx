import XIcon from "assets/svg/x-icon";
import { useContext } from "react";

import { BottomSheetContext } from "./BottomSheetContext";
import { ControlButton, Control } from "./styles";

export const BottomSheetControl = () => {
  const bottomSheetContext = useContext(BottomSheetContext);

  if (!bottomSheetContext)
    throw new Error("BottomSheet.Control must be rendered within a BottomSheet");

  return (
    <Control>
      <ControlButton type="button" onClick={() => bottomSheetContext?.onClose()}>
        <XIcon />
      </ControlButton>
    </Control>
  );
};
