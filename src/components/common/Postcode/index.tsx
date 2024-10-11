import Portal from "components/common/Portal";
import DaumPostcode, { Address } from "react-daum-postcode";

import { Container } from "./styles";
import { BottomSheetProps } from "../BottomSheet/BottomSheet";
import Header from "../Header";

interface PostcodeProps extends BottomSheetProps {
  onComplete: (value: string) => void;
}

const Postcode = ({ isOpen, close, onComplete }: PostcodeProps) => {
  if (!isOpen) return null;

  const complete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onComplete(fullAddress);
  };

  return (
    <Portal>
      <Container>
        <Header type="text" text="주소 검색" handleClick={close} />
        <DaumPostcode
          autoClose
          onComplete={complete}
          onClose={close}
          style={{ width: "100%", height: "100%" }}
        />
      </Container>
    </Portal>
  );
};

export default Postcode;
