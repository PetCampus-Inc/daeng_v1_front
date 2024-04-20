import { daysArray, monthsArray, yearsArray } from "constants/date";
import { ITEM_KEYS } from "constants/item";

import ImageUpload from "components/common/ImageUpload";
import InputField from "components/common/InputField";
import SelectNumber from "components/common/Select/SelectNumber";
import SingleRadio from "components/common/Select/SingleRadio";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { useFormContext } from "react-hook-form";

import { Caption, Card } from "./styles";
import BreedInput from "../BreedInput";

interface DogInfoProps {
  requiredItems: Map<number, boolean>;
}

const DogInfo = ({ requiredItems }: DogInfoProps) => {
  const { register, watch, setValue } = useFormContext();

  return (
    <>
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.DOG_NAME)}>이름</Title>
        <InputField
          name="dogName"
          placeholder="강아지 이름을 입력해주세요"
          register={register}
          isRequired
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.DOG_GENDER)}>성별</Title>
        <SingleRadio name="dogGender" radiosText={["수컷", "암컷"]} isRequired />
      </Card>
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.DOG_SIZE)}>크기</Title>
        <SingleRadio
          name="dogSize"
          caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
          radiosText={["소형견", "중형견", "대형견"]}
          isRequired
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.DOG_BREED)}>견종</Title>
        <BreedInput
          name="newBreed"
          setValue={setValue}
          watch={watch}
          register={register}
          isRequired
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.DOG_BIRTHDAY)}>생일</Title>
        <div style={{ display: "flex", gap: "5px" }}>
          <SelectNumber
            name="year"
            numberList={yearsArray}
            defaultValue="2000"
            watch={watch}
            setValue={setValue}
          />
          <SelectNumber
            name="month"
            numberList={monthsArray}
            defaultValue="01"
            watch={watch}
            setValue={setValue}
          />
          <SelectNumber
            name="day"
            numberList={daysArray}
            defaultValue="01"
            watch={watch}
            setValue={setValue}
          />
        </div>
      </Card>
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.NEUTRALIZATION)}>중성화 여부</Title>
        <SingleRadio
          name="neutralization"
          radiosText={["했어요", "안했어요"]}
          isRequired={requiredItems.get(ITEM_KEYS.NEUTRALIZATION)}
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.VACCINATION)}>예방접종 여부</Title>
        <SingleRadio
          name="vaccination"
          radiosText={["했어요", "안했어요"]}
          isRequired={requiredItems.get(ITEM_KEYS.VACCINATION)}
        />
      </Card>
      {watch("vaccination") === "했어요" && (
        <Card>
          <Title isRequired={requiredItems.get(ITEM_KEYS.VACCINATION_FILE)}>
            예방접종 파일 첨부
          </Title>
          <Caption>최근 1년 내 접종 기록 증명을 위해 jpg, png 형태로 업로드해 주세요</Caption>
          <ImageUpload />
        </Card>
      )}
      <Card>
        <Title isRequired={requiredItems.get(ITEM_KEYS.ALLERGY_DISEASE)}>알러지 및 질병 유무</Title>
        <TextArea
          placeholder="알러지나 질병이 있다면 상세히 입력해주세요."
          {...register("allergyDisease", {
            required: requiredItems.get(ITEM_KEYS.ALLERGY_DISEASE)
          })}
        />
      </Card>
    </>
  );
};

export default DogInfo;