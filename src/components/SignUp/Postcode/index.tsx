import { Dispatch, SetStateAction } from "react";
import DaumPostcode, { Address } from "react-daum-postcode";

interface Props {
  schoolAddress: string;
  setSchoolAddress: Dispatch<SetStateAction<string>>;
}

const Postcode = ({ schoolAddress, setSchoolAddress }: Props) => {
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
    setSchoolAddress(fullAddress);
  };

  return (
    <>
      <DaumPostcode autoClose onComplete={complete} style={{ width: "100%", height: "100%" }} />
    </>
  );
};

export default Postcode;
