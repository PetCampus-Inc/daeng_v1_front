import { useState } from "react";
import SingleRadio from "components/common/Select/SingleRadio";
import BreedInput from "../ChooseBreed";
import SelectNumber from "components/common/Select/SelectNumber";
import { daysArray, monthsArray, yearsArray } from "constants/date";
import Title from "components/common/Title";
import InputBox from "components/common/InputBox";
import TextArea from "components/common/TextArea";
import { Card } from "./styles";

const DogInfo = () => {
  const [name, setName] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [chosenBreedId, setChosenBreedId] = useState<number | null>(null);
  //post할 때 chosenBreedId가 있으면 이걸로 보내고(꼭 얘를 먼저 검증), 없으면 inputValue를 보내면 된다.

  return (
    <>
      <Card>
        <Title>이름</Title>
        <InputBox
          name="dogName"
          width="100%"
          height="49px"
          inputValue={name}
          setInputValue={setName}
        />
      </Card>
      <Card>
        <Title>성별</Title>
        <SingleRadio name="dogGender" radiosText={["수컷", "암컷"]} />
      </Card>
      <Card>
        <Title>크기</Title>
        <SingleRadio
          name="dogSize"
          caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
          radiosText={["소형견", "중형견", "대형견"]}
        />
      </Card>
      <Card>
        <Title>견종</Title>
        <BreedInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          chosenBreedId={chosenBreedId}
          setChosenBreedId={setChosenBreedId}
        />
      </Card>
      <Card>
        <Title>생일</Title>
        <div style={{ display: "flex", gap: "5px" }}>
          <SelectNumber numberList={yearsArray} initialValue={"2000"} />
          <SelectNumber numberList={monthsArray} initialValue={"01"} />
          <SelectNumber numberList={daysArray} initialValue={"01"} />
        </div>
      </Card>
      <Card>
        <Title>중성화 여부</Title>
        <SingleRadio name="neutralization" radiosText={["했어요", "안했어요"]} />
      </Card>
      <Card>
        <Title>예방접종 여부</Title>
        <SingleRadio name="vaccination" radiosText={["했어요", "안했어요"]} />
      </Card>
      <Card>
        <Title>알러지 및 질병 유무</Title>
        <TextArea
          name="allergyDisease"
          autoResize
          placeholder="알러지나 질병이 있다면 상세히 입력해주세요."
        />
      </Card>
    </>
  );
};

export default DogInfo;
