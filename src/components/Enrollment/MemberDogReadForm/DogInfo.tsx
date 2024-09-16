import { FIELD, FIELD_KEYS } from "constants/field";
import { ITEM_ENGLISH_TO_KOREAN } from "constants/item";
import { REQUIRED_ITEMS_DOG_MAP } from "constants/requiredItemsMap";

import { TextInput } from "components/common";
import SelectNumber from "components/common/Select/SelectNumber";
import SingleRadio from "components/common/Select/SingleRadio";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { Controller, useFormContext } from "react-hook-form";
import { padToTwoDigits } from "utils/date";
import { handlePreventDefault } from "utils/preventDefault";

import { Caption, Card } from "./styles";
import { ImageUploadInput } from "../ImageUpload/ImageUploadInput";
import BreedInput from "../Input/BreedInput";

const DogInfo = () => {
  const { control, register, watch, setValue } = useFormContext();
  const [birthYear, birthMonth, birthDay] = watch(FIELD.BIRTHDAY);

  const dogBirthData = {
    year: birthYear,
    month: padToTwoDigits(birthMonth),
    day: padToTwoDigits(birthDay)
  };

  return (
    <>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.DOG_NAME)}>이름</Title>
        <TextInput
          name={FIELD.DOG_NAME}
          placeholder="강아지 이름을 입력해주세요"
          register={register}
          required
          readOnly
        />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.DOG_GENDER)}>성별</Title>
        <SingleRadio
          name={FIELD.DOG_GENDER}
          radiosText={["수컷", "암컷"]}
          isRequired
          defaultSelect={ITEM_ENGLISH_TO_KOREAN[watch(FIELD.DOG_GENDER)]}
          preventDefaultClick={handlePreventDefault}
        />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.DOG_SIZE)}>크기</Title>
        <SingleRadio
          name={FIELD.DOG_SIZE}
          caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
          radiosText={["소형견", "중형견", "대형견"]}
          isRequired
          defaultSelect={ITEM_ENGLISH_TO_KOREAN[watch(FIELD.DOG_SIZE)]}
          preventDefaultClick={handlePreventDefault}
        />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.BREED_ID)}>견종</Title>
        {/* // TODO 수정되지 않도록 추후 작업 필요 */}
        <BreedInput
          name={FIELD.BREED_NAME}
          register={register}
          setValue={setValue}
          watch={watch}
          isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.BREED_ID)}
          readOnly
        />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.BIRTHDAY)}>생일</Title>
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
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.NEUTRALIZATION)}>
          중성화 여부
        </Title>
        <SingleRadio
          name={FIELD.NEUTRALIZATION}
          radiosText={["했어요", "안했어요"]}
          isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.NEUTRALIZATION)}
          defaultSelect={ITEM_ENGLISH_TO_KOREAN[watch(FIELD.NEUTRALIZATION)]}
          preventDefaultClick={handlePreventDefault}
        />
      </Card>
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.VACCINATION)}>
          예방접종 여부
        </Title>
        <SingleRadio
          name={FIELD.VACCINATION}
          radiosText={["했어요", "안했어요"]}
          isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.VACCINATION)}
          defaultSelect={ITEM_ENGLISH_TO_KOREAN[watch(FIELD.VACCINATION)]}
          preventDefaultClick={handlePreventDefault}
        />
      </Card>
      {watch(FIELD.VACCINATION) === "했어요" && (
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
      <Card>
        <Title isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.ALLERGY_DISEASE)}>
          알러지 및 질병 유무
        </Title>
        <TextArea
          placeholder="알러지나 질병이 있다면 상세히 입력해주세요."
          {...register(FIELD.ALLERGY_DISEASE, {
            required: REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.ALLERGY_DISEASE)
          })}
          readOnly
        />
      </Card>
    </>
  );
};

export default DogInfo;
