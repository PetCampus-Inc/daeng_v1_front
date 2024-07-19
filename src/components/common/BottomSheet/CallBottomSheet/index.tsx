import BasicPhoneIcon from "assets/svg/phone-basic";

import { BottomSheet, type BottomSheetProps } from "../index";
import { CallSubtitle } from "../styles";

interface CallBottomSheetProps extends BottomSheetProps {
  dogName?: string;
  schoolName?: string;
  phoneNumber: string;
  handleCall: () => void;
}

const CallBottomSheet = ({
  dogName,
  schoolName,
  phoneNumber,
  close,
  isOpen,
  handleCall
}: CallBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <BottomSheet.Control />
        <BottomSheet.Title>
          <BasicPhoneIcon />
          {dogName ? <span>{dogName} 견주</span> : <span>{schoolName} 유치원</span>}
        </BottomSheet.Title>
        <CallSubtitle>{phoneNumber}</CallSubtitle>
        <BottomSheet.Button actionText="전화 걸기" actionFn={handleCall} />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default CallBottomSheet;
