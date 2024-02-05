import { useState } from "react";
import { Card } from "./styles";
import Title from "components/common/Title";
import InputBox from "components/common/InputBox";
import SingleRadio from "components/common/Select/SingleRadio";

const DogOwnerInfo = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [emergencyNum, setEmergencyNum] = useState<string>("");

  return (
    <>
      <Card>
        <Title>이름</Title>
        <InputBox
          name="memberName"
          width="100%"
          height="49px"
          inputValue={name}
          setInputValue={setName}
        />
      </Card>
      <Card>
        <Title>성별</Title>
        <SingleRadio name="memberGender" radiosText={["남", "여"]} />
      </Card>
      <Card>
        <Title>주소</Title>
        <InputBox
          name="address"
          type="search"
          width="100%"
          height="49px"
          inputValue={address}
          setInputValue={setAddress}
        />
      </Card>
      <Card>
        <Title>연락처</Title>
        <InputBox
          name="phoneNumber"
          width="100%"
          height="49px"
          inputValue={phoneNum}
          setInputValue={setPhoneNum}
        />
      </Card>
      <Card>
        <Title>비상 연락처</Title>
        <InputBox
          name="phoneNumber"
          width="100%"
          height="49px"
          inputValue={emergencyNum}
          setInputValue={setEmergencyNum}
        />
      </Card>
    </>
  );
};

export default DogOwnerInfo;
