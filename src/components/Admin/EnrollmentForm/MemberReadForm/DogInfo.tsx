import { FIELD, FIELD_KEYS } from "constants/field";

import { DateInput, TextInput } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import SingleRadio from "components/common/Select/SingleRadio";
import { Textarea } from "components/common/Textarea";
import Title from "components/common/Title";
import { ImageUploadInput } from "components/Enrollment/ImageUpload/ImageUploadInput";
import { Controller, useFormContext } from "react-hook-form";

import { Card } from "../styles";
interface DogInfoProps {
  item?: Map<number, boolean>;
}

const DogInfo = ({ item }: DogInfoProps) => {
  const { register, control } = useFormContext();
  return (
    <>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.DOG_NAME)}>이름</Title>
        <TextInput
          {...register(FIELD.DOG_NAME)}
          placeholder="강아지 이름을 입력해주세요"
          readOnly
        />
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.DOG_GENDER)}>성별</Title>
        <SingleRadio name={FIELD.DOG_GENDER} radiosText={["수컷", "암컷"]} isPreviewMode disabled />
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.DOG_SIZE)}>크기</Title>
        <SingleRadio
          name={FIELD.DOG_SIZE}
          caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
          radiosText={["소형견", "중형견", "대형견"]}
          isPreviewMode
          disabled
        />
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.BREED_ID)}>견종</Title>
        <SearchInputField
          {...register(FIELD.BREED_NAME)}
          placeholder="견종을 선택해 주세요"
          readOnly
        />
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.BIRTHDAY)}>생일</Title>
        <div style={{ display: "flex", gap: "5px" }}>
          <DateInput {...register("year")} unit="년" readOnly />
          <DateInput {...register("month")} unit="월" readOnly />
          <DateInput {...register("day")} unit="일" readOnly />
        </div>
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.NEUTRALIZATION)}>중성화 여부</Title>
        <SingleRadio
          name={FIELD.NEUTRALIZATION}
          radiosText={["했어요", "안했어요"]}
          isPreviewMode
          disabled
        />
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.VACCINATION)}>예방접종 여부</Title>
        <SingleRadio
          name={FIELD.VACCINATION}
          radiosText={["했어요", "안했어요"]}
          isPreviewMode
          disabled
        />
        <Controller
          name={FIELD.VACCINATION_URL}
          control={control}
          render={({ field }) => <ImageUploadInput ref={field.ref} disabled />}
        />
      </Card>
      <Card>
        <Title isRequired={item?.get(FIELD_KEYS.ALLERGY_DISEASE)}>알러지 및 질병 유무</Title>
        <Textarea
          {...register(FIELD.ALLERGY_DISEASE)}
          placeholder="알러지나 질병이 있다면 상세히 입력해주세요."
          readOnly
        />
      </Card>
    </>
  );
};

export default DogInfo;
