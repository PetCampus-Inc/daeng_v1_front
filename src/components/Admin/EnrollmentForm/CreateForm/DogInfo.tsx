import { FIELD, FIELD_KEYS } from "constants/field";

import { TextInput } from "components/common";
import SearchInputField from "components/common/Input/SearchInputField";
import SelectNumber from "components/common/Select/SelectNumber";
import SingleRadio from "components/common/Select/SingleRadio";
import { Textarea } from "components/common/Textarea";
import AdminTitle from "components/common/Title/AdminTitle";
import { ImageUploadInput } from "components/Enrollment/ImageUpload/ImageUploadInput";
import { useFormContext } from "react-hook-form";

import { Card, Caption } from "../styles";

const DogInfo = () => {
  const { control } = useFormContext();
  console.log(control._formValues);

  return (
    <>
      <Card>
        <AdminTitle
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.DOG_NAME}`}
          control={control}
          readOnly
        >
          이름
        </AdminTitle>
        <TextInput name="null" placeholder="강아지 이름을 입력해주세요" disabled />
      </Card>
      <Card>
        <AdminTitle
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.DOG_GENDER}`}
          control={control}
          readOnly
        >
          성별
        </AdminTitle>
        <SingleRadio name="null" radiosText={["수컷", "암컷"]} disabled />
      </Card>
      <Card>
        <AdminTitle
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.DOG_SIZE}`}
          control={control}
          readOnly
        >
          크기
        </AdminTitle>
        <SingleRadio
          name="null"
          caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
          radiosText={["소형견", "중형견", "대형견"]}
          disabled
        />
      </Card>
      <Card>
        <AdminTitle
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.BREED_ID}`}
          control={control}
          readOnly
        >
          견종
        </AdminTitle>
        <SearchInputField name="null" placeholder="견종을 선택하는 칸이에요" disabled />
      </Card>
      <Card>
        <AdminTitle
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.BIRTHDAY}`}
          control={control}
          readOnly
        >
          생일
        </AdminTitle>
        <div style={{ display: "flex", gap: "5px" }}>
          <SelectNumber name="year" placeholder="2000" disabled />
          <SelectNumber name="month" placeholder="01" disabled />
          <SelectNumber name="day" placeholder="01" disabled />
        </div>
      </Card>
      <Card>
        <AdminTitle name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.NEUTRALIZATION}`} control={control}>
          중성화 여부
        </AdminTitle>
        <SingleRadio name="null" radiosText={["했어요", "안했어요"]} disabled />
      </Card>
      <Card>
        <AdminTitle name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.VACCINATION}`} control={control}>
          예방접종 여부
        </AdminTitle>
        <SingleRadio name="null" radiosText={["했어요", "안했어요"]} disabled />
        <Caption>접종을 한 견주가 예방접종 증명서를 업로드 하는 칸이에요</Caption>
        <ImageUploadInput disabled />
      </Card>
      <Card>
        <AdminTitle name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.ALLERGY_DISEASE}`} control={control}>
          알러지 및 질병 유무
        </AdminTitle>
        <Textarea placeholder="알러지나 질병이 있다면 상세히 입력해주세요." disabled />
      </Card>
    </>
  );
};

export default DogInfo;
