import { daysArray, monthsArray, yearsArray } from "constants/date";
import { ITEM_ENGLISH_TO_KOREAN, ITEM_KEYS } from "constants/item";

import { TextInput } from "components/common";
import ImageUpload from "components/common/ImageUpload";
import SelectNumber from "components/common/Select/SelectNumber";
import SingleRadio from "components/common/Select/SingleRadio";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { useFormContext } from "react-hook-form";
import { addZero } from "utils/date";
import { handlePreventDefault } from "utils/preventDefault";

import { Caption, Card } from "./styles";
import BreedInput from "../Input/BreedInput";

interface DogInfoProps {
  requiredItems?: Map<number, boolean>;
}

const DogInfo = ({ requiredItems }: DogInfoProps) => {
  const { register, watch, setValue } = useFormContext();
  const requiredItemsMap = new Map<number, boolean>([
    [ITEM_KEYS.DOG_NAME, false],
    [ITEM_KEYS.DOG_GENDER, true],
    [ITEM_KEYS.DOG_SIZE, false],
    [ITEM_KEYS.DOG_BREED, false],
    [ITEM_KEYS.DOG_BIRTHDAY, false],
    [ITEM_KEYS.NEUTRALIZATION, true],
    [ITEM_KEYS.VACCINATION, true],
    [ITEM_KEYS.VACCINATION_FILE, false],
    [ITEM_KEYS.ALLERGY_DISEASE, false]
  ]);

  const [birthYear, birthMonth, birthDay] = watch("dogBirthDate");

  const dogBirthData = {
    year: birthYear,
    month: addZero(birthMonth),
    day: addZero(birthDay)
  };

  return (
    <>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.DOG_NAME)}>이름</Title>
        <TextInput
          name="dogName"
          placeholder="강아지 이름을 입력해주세요"
          register={register}
          required
          value={watch("dogName")}
          readOnly
        />
      </Card>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.DOG_GENDER)}>성별</Title>
        <SingleRadio
          name="dogGender"
          radiosText={["수컷", "암컷"]}
          isRequired
          defaultSelect={ITEM_ENGLISH_TO_KOREAN[watch("dogGender")]}
          preventDefaultClick={handlePreventDefault}
        />
      </Card>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.DOG_SIZE)}>크기</Title>
        <SingleRadio
          name="dogSize"
          caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
          radiosText={["소형견", "중형견", "대형견"]}
          isRequired
          defaultSelect={ITEM_ENGLISH_TO_KOREAN[watch("dogSize")]}
          preventDefaultClick={handlePreventDefault}
        />
      </Card>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.DOG_BREED)}>견종</Title>
        <BreedInput
          name="breedName"
          register={register}
          setValue={setValue}
          watch={watch}
          isRequired={requiredItemsMap?.get(ITEM_KEYS.DOG_BREED)}
          value={watch("breedName")}
          readOnly
        />
      </Card>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.DOG_BIRTHDAY)}>생일</Title>
        <div style={{ display: "flex", gap: "5px" }}>
          <SelectNumber
            name="year"
            defaultValue={dogBirthData.year}
            watch={watch}
            setValue={setValue}
          />
          <SelectNumber
            name="month"
            defaultValue={String(dogBirthData.month)}
            watch={watch}
            setValue={setValue}
          />
          <SelectNumber
            name="day"
            defaultValue={String(dogBirthData.day)}
            watch={watch}
            setValue={setValue}
          />
        </div>
      </Card>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.NEUTRALIZATION)}>중성화 여부</Title>
        <SingleRadio
          name="neutralization"
          radiosText={["했어요", "안했어요"]}
          isRequired={requiredItemsMap?.get(ITEM_KEYS.NEUTRALIZATION)}
          defaultSelect={ITEM_ENGLISH_TO_KOREAN[watch("neutralization")]}
          preventDefaultClick={handlePreventDefault}
        />
      </Card>
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.VACCINATION)}>예방접종 여부</Title>
        <SingleRadio
          name="vaccination"
          radiosText={["했어요", "안했어요"]}
          isRequired={requiredItemsMap?.get(ITEM_KEYS.VACCINATION)}
          defaultSelect={ITEM_ENGLISH_TO_KOREAN[watch("vaccination")]}
          preventDefaultClick={handlePreventDefault}
        />
      </Card>
      {watch("vaccination") === "했어요" && (
        <Card>
          <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.VACCINATION_FILE)}>
            예방접종 파일 첨부
          </Title>
          <Caption>최근 1년 내 접종 기록 증명을 위해 jpg, png 형태로 업로드해 주세요</Caption>
          <ImageUpload />
        </Card>
      )}
      <Card>
        <Title isRequired={requiredItemsMap?.get(ITEM_KEYS.ALLERGY_DISEASE)}>
          알러지 및 질병 유무
        </Title>
        <TextArea
          placeholder="알러지나 질병이 있다면 상세히 입력해주세요."
          {...register("allergyDisease", {
            required: requiredItemsMap?.get(ITEM_KEYS.ALLERGY_DISEASE)
          })}
          readOnly
        />
      </Card>
    </>
  );
};

export default DogInfo;
