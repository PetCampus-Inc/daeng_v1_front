import { useFormContext } from "react-hook-form";

import Title from "components/common/Title";
import InputField from "components/common/InputField";
import SingleRadio from "components/common/Select/SingleRadio";
import SearchInputField from "components/common/InputField/SearchInputField";
import SelectNumber from "components/common/Select/SelectNumber";
import ImageUpload from "components/common/ImageUpload";
import TextArea from "components/common/TextArea";

import { ITEM_KEYS } from "constants/item";
import { Card } from "../styles";
interface DogInfoProps {
  requiredItems?: Map<number, boolean>;
}

const DogInfo = ({ requiredItems }: DogInfoProps) => {
  const { register, control } = useFormContext();

  return (
    <>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.DOG_NAME)}>이름</Title>
        <InputField
          control={control}
          name="dogName"
          placeholder="강아지 이름을 입력해주세요"
          disabled
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.DOG_GENDER)}>성별</Title>
        <SingleRadio name="dogGender" radiosText={["수컷", "암컷"]} disabled />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.DOG_SIZE)}>크기</Title>
        <SingleRadio
          name="dogSize"
          caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
          radiosText={["소형견", "중형견", "대형견"]}
          disabled
        />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.DOG_BREED)}>견종</Title>
        <SearchInputField control={control} name="dogBreed" disabled />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.DOG_BIRTHDAY)}>생일</Title>
        <div style={{ display: "flex", gap: "5px" }}>
          <SelectNumber name="year" control={control} defaultValue="2000" disabled />
          <SelectNumber name="month" control={control} defaultValue="01" disabled />
          <SelectNumber name="day" control={control} defaultValue="01" disabled />
        </div>
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.NEUTRALIZATION)}>중성화 여부</Title>
        <SingleRadio name="neutralization" radiosText={["했어요", "안했어요"]} disabled />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.VACCINATION)}>예방접종 여부</Title>
        <SingleRadio name="vaccination" radiosText={["했어요", "안했어요"]} disabled />
        <ImageUpload disabled />
      </Card>
      <Card>
        <Title isRequired={requiredItems?.get(ITEM_KEYS.ALLERGY_DISEASE)}>
          알러지 및 질병 유무
        </Title>
        <TextArea
          register={register}
          name="allergyDisease"
          placeholder="알러지나 질병이 있다면 상세히 입력해주세요."
          disabled
        />
      </Card>
    </>
  );
};

export default DogInfo;
