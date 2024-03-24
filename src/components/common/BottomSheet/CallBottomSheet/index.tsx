import BasicPhoneIcon from "assets/svg/phone-basic";

import BottomSheet, { type IBottomSheetProps } from "../index";
import { CallSubtitle } from "../styles";

interface CallBottomSheetProps extends IBottomSheetProps {
  dogName: string;
  phoneNumber: string;
  handleCall: () => void;
}

const CallBottomSheet = ({
  dogName,
  close,
  phoneNumber,
  isOpen,
  handleCall
}: CallBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} close={close}>
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
