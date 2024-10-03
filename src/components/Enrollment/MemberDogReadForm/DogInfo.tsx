import { FIELD, FIELD_KEYS } from "constants/field";
import { ITEM_ENGLISH_TO_KOREAN } from "constants/item";
import { REQUIRED_ITEMS_DOG_MAP } from "constants/requiredItemsMap";

import { TextInput } from "components/common";
import SelectNumber from "components/common/Select/SelectNumber";
import SingleRadio from "components/common/Select/SingleRadio";
import { Textarea } from "components/common/Textarea";
import Title from "components/common/Title";
import { Controller, useFormContext } from "react-hook-form";
import { padToTwoDigits } from "utils/date";
import { getLabelForValue } from "utils/formatter";

import { Caption, Card } from "./styles";
import { ImageUploadInput } from "../ImageUpload/ImageUploadInput";
import BreedInput from "../Input/BreedInput";

const DogInfo = () => {
  const { control, register, setValue, watch, getValues } = useFormContext();
  const { dogName, dogSize, allergyDisease, birthDate, dogGender, neutralization, vaccination } =
    getValues();
  const [birthYear, birthMonth, birthDay] = getValues(FIELD.BIRTHDAY).map(String);
  const dogBirthData = {
    year: birthYear,
    month: padToTwoDigits(birthMonth),
    day: padToTwoDigits(birthDay)
  };
  const formatDogGender = getLabelForValue(FIELD.DOG_GENDER, dogGender);
  const formatDogSize = getLabelForValue(FIELD.DOG_SIZE, dogSize);
  const formatNeutralization = getLabelForValue(FIELD.NEUTRALIZATION, neutralization);
  const formatVaccination = getLabelForValue(FIELD.VACCINATION, vaccination);

  return (
    <>
      {dogName && (
        <Card>
          <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.DOG_NAME)}>이름</Title>
          <TextInput
            name={FIELD.DOG_NAME}
            placeholder="강아지 이름을 입력해주세요"
            register={register}
            readOnly
          />
        </Card>
      )}

      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.DOG_GENDER)}>성별</Title>
        <SingleRadio
          name={FIELD.DOG_GENDER}
          radiosText={["수컷", "암컷"]}
          defaultSelect={formatDogGender}
        />
      </Card>

      {dogSize && (
        <Card>
          <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.DOG_SIZE)}>크기</Title>
          <SingleRadio
            name={FIELD.DOG_SIZE}
            caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
            radiosText={["소형견", "중형견", "대형견"]}
            defaultSelect={formatDogSize}
          />
        </Card>
      )}

      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.BREED_ID)}>견종</Title>
        <BreedInput
          name={FIELD.BREED_NAME}
          register={register}
          setValue={setValue}
          watch={watch}
          readOnly
        />
      </Card>

      {birthDate && (
        <Card>
          <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.BIRTHDAY)}>생일</Title>
          <div style={{ display: "flex", gap: "5px" }}>
            <SelectNumber name="year" defaultValue={dogBirthData.year} setValue={setValue} />
            <SelectNumber name="month" defaultValue={dogBirthData.month} setValue={setValue} />
            <SelectNumber name="day" defaultValue={dogBirthData.day} setValue={setValue} />
          </div>
        </Card>
      )}

      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.NEUTRALIZATION)}>
          중성화 여부
        </Title>
        <SingleRadio
          name={FIELD.NEUTRALIZATION}
          radiosText={["했어요", "안했어요"]}
          defaultSelect={formatNeutralization}
        />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.VACCINATION)}>
          예방접종 여부
        </Title>
        <SingleRadio
          name={FIELD.VACCINATION}
          radiosText={["했어요", "안했어요"]}
          defaultSelect={formatVaccination}
        />
      </Card>
      {getValues(FIELD.VACCINATION) === "했어요" && (
        <Card>
          <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.VACCINATION_URL)}>
            예방접종 파일 첨부
          </Title>
          <Caption>최근 1년 내 접종 기록 증명을 위해 jpg, png 형태로 업로드해 주세요</Caption>
          <Controller
            name={FIELD.VACCINATION_URL}
            control={control}
            render={({ field }) => <ImageUploadInput ref={field.ref} disabled />}
          />
        </Card>
      )}

      {allergyDisease && (
        <Card>
          <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.ALLERGY_DISEASE)}>
            알러지 및 질병 유무
          </Title>
          <Textarea
            placeholder="알러지나 질병이 있다면 상세히 입력해주세요."
            {...register(FIELD.ALLERGY_DISEASE, {
              required: REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.ALLERGY_DISEASE)
            })}
            readOnly
          />
        </Card>
      )}
    </>
  );
};

export default DogInfo;
