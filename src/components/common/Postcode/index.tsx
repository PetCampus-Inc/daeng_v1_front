import type { Dispatch, SetStateAction } from "react";

import Portal from "components/common/Portal";
import DaumPostcode, { Address } from "react-daum-postcode";

import { Container } from "./styles";
import Header from "../Header";

import type { FieldValues, UseFormSetValue } from "react-hook-form";

interface PostcodeProps {
  field: string;
  setValue: UseFormSetValue<FieldValues>;
  closePopup: Dispatch<SetStateAction<boolean>>;
  setIsAddressActive: Dispatch<SetStateAction<boolean>>;
}

const Postcode = ({ field, setValue, closePopup, setIsAddressActive }: PostcodeProps) => {
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
    setValue(field, fullAddress);
    setIsAddressActive(true);
  };

  return (
    <Portal>
      <Container>
        <Header type="text" text="주소 검색" handleClick={() => closePopup(false)} />
        <DaumPostcode autoClose onComplete={complete} style={{ width: "100%", height: "100%" }} />
      </Container>
    </Portal>
  );
};

export default Postcode;
