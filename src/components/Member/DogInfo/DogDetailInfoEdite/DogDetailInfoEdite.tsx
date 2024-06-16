import { daysArray, monthsArray, yearsArray } from "constants/date";
import { FIELD, FIELD_KEYS } from "constants/field";

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
          name={FIELD.DOG_NAME}
          placeholder="강아지 이름을 입력해주세요"
          register={register}
          required
        />
      </Card>
      <Card>
        <Text>성별</Text>
        <SingleRadio name={FIELD.DOG_GENDER} radiosText={["수컷", "암컷"]} isRequired />
      </Card>
      <Card>
        <Text>크기</Text>
        <SingleRadio
          name={FIELD.DOG_SIZE}
          caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
          radiosText={["소형견", "중형견", "대형견"]}
          isRequired
        />
      </Card>
      <Card>
        <Text>견종</Text>
        <BreedInput
          name={FIELD.BREED_NAME}
          register={register}
          setValue={setValue}
          watch={watch}
          isRequired={requiredItems?.get(FIELD_KEYS.BREED_ID)}
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
          name={FIELD.NEUTRALIZATION}
          radiosText={["했어요", "안했어요"]}
          isRequired={requiredItems?.get(FIELD_KEYS.NEUTRALIZATION)}
        />
      </Card>
    </>
  );
};

export default DogDetailInfoEdite;
