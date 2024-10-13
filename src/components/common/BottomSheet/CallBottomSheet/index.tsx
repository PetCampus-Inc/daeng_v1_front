import BasicPhoneIcon from "assets/svg/phone-basic";
import useNativeAction from "hooks/native/useNativeAction";

import { BottomSheet, type BottomSheetProps } from "../index";
import { CallSubtitle } from "../styles";

interface CallBottomSheetProps extends BottomSheetProps {
  dogName?: string;
  schoolName?: string;
  phoneNumber: string;
}

const CallBottomSheet = ({
  dogName,
  schoolName,
  phoneNumber,
  ...bottomSheetProps
}: CallBottomSheetProps) => {
  const { call } = useNativeAction();

  const handleCallClick = () => {
    call(phoneNumber);
    close();
  };

  return (
    <BottomSheet {...bottomSheetProps}>
      <BottomSheet.Content>
        <BottomSheet.Control />
        <BottomSheet.Title>
          <BasicPhoneIcon />
          {dogName ? <span>{dogName} 견주</span> : <span>{schoolName} 유치원</span>}
        </BottomSheet.Title>
        <CallSubtitle>{phoneNumber}</CallSubtitle>
        <BottomSheet.Button actionText="전화 걸기" actionFn={handleCallClick} />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default CallBottomSheet;
