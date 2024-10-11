import { FIELD, FIELD_KEYS } from "constants/field";

import { TextInput, ToggleLabel } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import SelectNumber from "components/common/Select/SelectNumber";
import SingleRadio from "components/common/Select/SingleRadio";
import { Textarea } from "components/common/Textarea";
import { ImageUploadInput } from "components/Enrollment/ImageUpload/ImageUploadInput";
import { Controller, Form, useFormContext } from "react-hook-form";

import { Card, Caption } from "../styles";

export function DogInfo() {
  const { control } = useFormContext();

  return (
    <Form control={control}>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.DOG_NAME}`}
          render={({ field }) => (
            <ToggleLabel {...field} showToggle readOnly>
              이름
            </ToggleLabel>
          )}
        />
        <TextInput placeholder="강아지 이름을 입력해주세요" disabled />
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.DOG_GENDER}`}
          render={({ field }) => (
            <ToggleLabel {...field} showToggle readOnly>
              성별
            </ToggleLabel>
          )}
        />
        <SingleRadio radiosText={["수컷", "암컷"]} disabled />
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.DOG_SIZE}`}
          render={({ field }) => (
            <ToggleLabel {...field} showToggle readOnly>
              크기
            </ToggleLabel>
          )}
        />
        <SingleRadio
          caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
          radiosText={["소형견", "중형견", "대형견"]}
          disabled
        />
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.BREED_ID}`}
          render={({ field }) => (
            <ToggleLabel {...field} showToggle readOnly>
              견종
            </ToggleLabel>
          )}
        />
        <SearchInputField placeholder="견종을 선택하는 칸이에요" disabled />
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.BIRTHDAY}`}
          render={({ field }) => (
            <ToggleLabel {...field} showToggle readOnly>
              생일
            </ToggleLabel>
          )}
        />
        <div style={{ display: "flex", gap: "5px" }}>
          <SelectNumber name="year" placeholder="2000" disabled />
          <SelectNumber name="month" placeholder="01" disabled />
          <SelectNumber name="day" placeholder="01" disabled />
        </div>
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.NEUTRALIZATION}`}
          render={({ field }) => (
            <ToggleLabel {...field} showToggle>
              중성화 여부
            </ToggleLabel>
          )}
        />
        <SingleRadio radiosText={["했어요", "안했어요"]} disabled />
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.VACCINATION}`}
          render={({ field }) => (
            <ToggleLabel {...field} showToggle>
              예방접종 여부
            </ToggleLabel>
          )}
        />
        <SingleRadio radiosText={["했어요", "안했어요"]} disabled />
        <Caption>접종을 한 견주가 예방접종 증명서를 업로드 하는 칸이에요</Caption>
        <ImageUploadInput disabled />
      </Card>
      <Card>
        <Controller
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.ALLERGY_DISEASE}`}
          render={({ field }) => (
            <ToggleLabel {...field} showToggle>
              알러지 및 질병 유무
            </ToggleLabel>
          )}
        />
        <Textarea placeholder="알러지나 질병이 있다면 상세히 입력해주세요." disabled />
      </Card>
    </Form>
  );
}
