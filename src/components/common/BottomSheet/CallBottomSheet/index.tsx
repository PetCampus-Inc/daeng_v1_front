import BasicPhoneIcon from "assets/svg/phone-basic";

import BottomSheet from "../index";
import { CallSubtitle } from "../styles";

interface CallBottomSheetProps {
  isOpen: boolean;
  dogName: string;
  phoneNumber: string;
  onClose: () => void;
  handleCall: () => void;
}

const CallBottomSheet = ({
  dogName,
  onClose,
  phoneNumber,
  isOpen,
  handleCall
}: CallBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <BottomSheet.Content>
        <BottomSheet.Control />
        <BottomSheet.Title>
          <BasicPhoneIcon />
          <span>{dogName} 견주</span>
        </BottomSheet.Title>
        <CallSubtitle>{phoneNumber}</CallSubtitle>
        <BottomSheet.Button actionText="전화 걸기" actionFn={handleCall} />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default CallBottomSheet;
