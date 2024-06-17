import { daysArray, monthsArray, yearsArray } from "constants/date";
import { FIELD, FIELD_KEYS } from "constants/field";
import { ITEM_ENGLISH_TO_KOREAN } from "constants/item";

import { TextInput } from "components/common";
import ImageUpload from "components/common/ImageUpload";
import SelectNumber from "components/common/Select/SelectNumber";
import SingleRadio from "components/common/Select/SingleRadio";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { Caption, Card } from "components/Enrollment/Form/styles";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { memberEnrollmentDogDetailAtom } from "store/member";
import { addZero } from "utils/date";

import BreedInput from "../Input/BreedInput";

interface DogInfoProps {
  requiredItems?: Map<number, boolean>;
}

const DogInfo = ({ requiredItems }: DogInfoProps) => {
  const { register, watch, setValue } = useFormContext();

  const memberDogInfo = useRecoilValue(memberEnrollmentDogDetailAtom);

  const [Dogyear, Dogmonth, Dogday] = memberDogInfo ? memberDogInfo.birthDate : [];
  const memeberDogBirth = {
    year: Dogyear ? String(Dogyear) : "",
    month: Dogmonth ? String(addZero(Dogmonth)) : "",
    day: Dogday ? String(addZero(Dogday)) : ""
  };

  useEffect(() => {
    setValue("newBreed", memberDogInfo ? memberDogInfo?.breedName : "");
  }, []);

  return (
    <>
      <Card>
        <Title isRequired={requiredItems?.get(FIELD_KEYS.DOG_NAME)}>이름</Title>
        <TextInput
          name={FIELD.DOG_NAME}
          placeholder="강아지 이름을 입력해주세요"
          register={register}
          required
          defaultValue={memberDogInfo ? memberDogInfo.dogName : ""}
          className="defaultValue"
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(FIELD_KEYS.DOG_GENDER)}>성별</Title>
        <SingleRadio
          name={FIELD.DOG_GENDER}
          radiosText={["수컷", "암컷"]}
          isRequired
          defaultSelect={memberDogInfo ? ITEM_ENGLISH_TO_KOREAN[memberDogInfo.dogGender] : ""}
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(FIELD_KEYS.DOG_SIZE)}>크기</Title>
        <SingleRadio
          name={FIELD.DOG_SIZE}
          caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
          radiosText={["소형견", "중형견", "대형견"]}
          isRequired
          defaultSelect={memberDogInfo ? ITEM_ENGLISH_TO_KOREAN[memberDogInfo.dogSize] : ""}
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(FIELD_KEYS.NEW_BREED)}>견종</Title>
        <BreedInput
          name={FIELD.NEW_BREED}
          register={register}
          setValue={setValue}
          watch={watch}
          isRequired={requiredItems?.get(FIELD_KEYS.NEW_BREED)}
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(FIELD_KEYS.BIRTHDAY)}>생일</Title>
        <div style={{ display: "flex", gap: "5px" }}>
          <SelectNumber
            name="year"
            numberList={yearsArray}
            defaultValue={memeberDogBirth.year === "" ? "2000" : memeberDogBirth.year}
            watch={watch}
            setValue={setValue}
          />
          <SelectNumber
            name="month"
            numberList={monthsArray}
            defaultValue={memeberDogBirth.month === "" ? "01" : memeberDogBirth.month}
            watch={watch}
            setValue={setValue}
          />
          <SelectNumber
            name="day"
            numberList={daysArray}
            defaultValue={memeberDogBirth.day === "" ? "01" : memeberDogBirth.day}
            watch={watch}
            setValue={setValue}
          />
        </div>
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(FIELD_KEYS.NEUTRALIZATION)}>중성화 여부</Title>
        <SingleRadio
          name={FIELD.NEUTRALIZATION}
          radiosText={["했어요", "안했어요"]}
          isRequired={requiredItems?.get(FIELD_KEYS.NEUTRALIZATION)}
          defaultSelect={memberDogInfo ? ITEM_ENGLISH_TO_KOREAN[memberDogInfo.neutralization] : ""}
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(FIELD_KEYS.VACCINATION)}>예방접종 여부</Title>
        <SingleRadio
          name={FIELD.VACCINATION}
          radiosText={["했어요", "안했어요"]}
          isRequired={requiredItems?.get(FIELD_KEYS.VACCINATION)}
          defaultSelect={memberDogInfo ? ITEM_ENGLISH_TO_KOREAN[memberDogInfo.vaccination] : ""}
        />
      </Card>
      {watch("vaccination") === "했어요" && (
        <Card>
          <Title isRequired={requiredItems?.get(FIELD_KEYS.VACCINATION_URL)}>
            예방접종 파일 첨부
          </Title>
          <Caption>최근 1년 내 접종 기록 증명을 위해 jpg, png 형태로 업로드해 주세요</Caption>
          <ImageUpload />
        </Card>
      )}
      <Card>
        <Title isRequired={requiredItems?.get(FIELD_KEYS.ALLERGY_DISEASE)}>
          알러지 및 질병 유무
        </Title>
        <TextArea
          placeholder="알러지나 질병이 있다면 상세히 입력해주세요."
          {...register("allergyDisease", {
            required: requiredItems?.get(FIELD_KEYS.ALLERGY_DISEASE)
          })}
          defaultValue={memberDogInfo ? memberDogInfo.allergyDisease : ""}
        />
      </Card>
    </>
  );
};

export default DogInfo;
