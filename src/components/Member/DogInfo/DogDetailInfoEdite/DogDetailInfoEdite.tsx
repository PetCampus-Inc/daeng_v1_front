import { daysArray, monthsArray, yearsArray } from "constants/date";
import { ITEM_ENGLISH_TO_KOREAN, ITEM_KEYS } from "constants/item";

import { TextInput } from "components/common";
import SelectNumber from "components/common/Select/SelectNumber";
import SingleRadio from "components/common/Select/SingleRadio";
import BreedInput from "components/Enrollment/Input/BreedInput";
import { useFormContext } from "react-hook-form";

import { Card, Text } from "./styles";

interface DogInfoProps {
  requiredItems?: Map<number, boolean>;
}

const DogDetailInfoEdite = ({ requiredItems }: DogInfoProps) => {
  const { register, watch, setValue } = useFormContext();

  const dogBirth = {
    year: watch("year"),
    month: watch("month"),
    day: watch("day")
  };

  return (
    <>
      <Card>
        <Text>이름</Text>
        <TextInput
          name="dogName"
          placeholder="강아지 이름을 입력해주세요"
          register={register}
          required
        />
      </Card>
      <Card>
        <Text>성별</Text>
        <SingleRadio
          name="dogGender"
          radiosText={["수컷", "암컷"]}
          isRequired
          defaultSelect={ITEM_ENGLISH_TO_KOREAN[watch("dogGender")]}
        />
      </Card>
      <Card>
        <Text>크기</Text>
        <SingleRadio
          name="dogSize"
          caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
          radiosText={["소형견", "중형견", "대형견"]}
          isRequired
          defaultSelect={ITEM_ENGLISH_TO_KOREAN[watch("dogSize")]}
        />
      </Card>
      <Card>
        <Text>견종</Text>
        <BreedInput
          name="breedName"
          register={register}
          setValue={setValue}
          watch={watch}
          isRequired={requiredItems?.get(ITEM_KEYS.DOG_BREED)}
        />
      </Card>
      <Card>
        <Text>생일</Text>
        <div style={{ display: "flex", gap: "5px" }}>
          <SelectNumber
            name="year"
            numberList={yearsArray}
            defaultValue={dogBirth.year}
            watch={watch}
            setValue={setValue}
          />
          <SelectNumber
            name="month"
            numberList={monthsArray}
            defaultValue={dogBirth.month}
            watch={watch}
            setValue={setValue}
          />
          <SelectNumber
            name="day"
            numberList={daysArray}
            defaultValue={dogBirth.day}
            watch={watch}
            setValue={setValue}
          />
        </div>
      </Card>
      <Card>
        <Text>중성화 여부</Text>
        <SingleRadio
          name="neutralization"
          radiosText={["했어요", "안했어요"]}
          isRequired={requiredItems?.get(ITEM_KEYS.NEUTRALIZATION)}
          defaultSelect={ITEM_ENGLISH_TO_KOREAN[watch("neutralization")]}
        />
      </Card>
    </>
  );
};

export default DogDetailInfoEdite;
