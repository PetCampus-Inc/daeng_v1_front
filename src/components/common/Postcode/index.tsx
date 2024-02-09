import React, { useEffect, useRef } from "react";
import DaumPostcode, { Address } from "react-daum-postcode";
import ReactDOM from "react-dom";

import type { FieldValues, UseFormSetValue } from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";

import { Container } from "./styles";
import Header from "../Header";

interface PostcodeProps {
  field: string;
  setValue: UseFormSetValue<FieldValues>;
  closePopup: Dispatch<SetStateAction<boolean>>;
  setIsAddressActive: Dispatch<SetStateAction<boolean>>;
}

const Postcode = ({ field, setValue, closePopup, setIsAddressActive }: PostcodeProps) => {
  const popupRootRef = useRef(document.createElement("div"));

  useEffect(() => {
    const popupRoot = popupRootRef.current;

    if (!popupRoot.parentElement) {
      document.body.appendChild(popupRoot);
    }

    return () => {
      if (popupRoot.parentElement) {
        document.body.removeChild(popupRoot);
      }
    };
  }, [popupRootRef]);

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

  return ReactDOM.createPortal(
    <Container>
      <Header type="text" text="주소 검색" handleClick={() => closePopup(false)} />
      <DaumPostcode autoClose onComplete={complete} style={{ width: "100%", height: "100%" }} />
    </Container>,
    popupRootRef.current
  );
};

export default Postcode;
