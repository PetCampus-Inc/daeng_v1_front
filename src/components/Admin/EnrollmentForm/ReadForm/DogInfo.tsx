import { FIELD_KEYS } from "constants/field";

import { BadgeLabel, TextInput } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import SelectNumber from "components/common/Select/SelectNumber";
import SingleRadio from "components/common/Select/SingleRadio";
import { Textarea } from "components/common/Textarea";
import { ImageUploadInput } from "components/Enrollment/ImageUpload/ImageUploadInput";

import { Card } from "../styles";
interface DogInfoProps {
  item?: Map<number, boolean>;
}

export function DogInfo({ item }: DogInfoProps) {
  return (
    <>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.DOG_NAME)}>이름</BadgeLabel>
        <TextInput name="dogName" placeholder="강아지 이름을 입력해주세요" readOnly />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.DOG_GENDER)}>성별</BadgeLabel>
        <SingleRadio name="dogGender" radiosText={["수컷", "암컷"]} isPreviewMode disabled />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.DOG_SIZE)}>크기</BadgeLabel>
        <SingleRadio
          name="dogSize"
          caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
          radiosText={["소형견", "중형견", "대형견"]}
          isPreviewMode
          disabled
        />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.BREED_ID)}>견종</BadgeLabel>
        <SearchInputField name="newBreed" placeholder="견종을 선택해 주세요" readOnly />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.BIRTHDAY)}>생일</BadgeLabel>
        <div style={{ display: "flex", gap: "5px" }}>
          <SelectNumber name="year" defaultValue="2000" readOnly />
          <SelectNumber name="month" defaultValue="01" readOnly />
          <SelectNumber name="day" defaultValue="01" readOnly />
        </div>
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.NEUTRALIZATION)}>중성화 여부</BadgeLabel>
        <SingleRadio
          name="neutralization"
          radiosText={["했어요", "안했어요"]}
          isPreviewMode
          disabled
        />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.VACCINATION)}>예방접종 여부</BadgeLabel>
        <SingleRadio
          name="vaccination"
          radiosText={["했어요", "안했어요"]}
          isPreviewMode
          disabled
        />
        <ImageUploadInput disabled />
      </Card>
      <Card>
        <BadgeLabel isRequired={item?.get(FIELD_KEYS.ALLERGY_DISEASE)}>
          알러지 및 질병 유무
        </BadgeLabel>
        <Textarea placeholder="알러지나 질병이 있다면 상세히 입력해주세요." readOnly />
      </Card>
    </>
  );
}
