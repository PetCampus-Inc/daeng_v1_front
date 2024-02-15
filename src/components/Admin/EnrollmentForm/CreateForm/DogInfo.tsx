import { useFormContext } from "react-hook-form";

import AdminTitle from "components/common/Title/AdminTitle";
import InputField from "components/common/InputField";
import SingleRadio from "components/common/Select/SingleRadio";
import SearchInputField from "components/common/InputField/SearchInputField";
import SelectNumber from "components/common/Select/SelectNumber";
import ImageUpload from "components/common/ImageUpload";
import TextArea from "components/common/TextArea";

import { Card, Caption } from "../styles";

const DogInfo = () => {
  const { control, register } = useFormContext();

  return (
    <>
      <Card>
        <AdminTitle name="dogName" control={control}>
          이름
        </AdminTitle>
        <InputField
          name="dogNameField"
          control={control}
          placeholder="강아지 이름을 입력해주세요"
          disabled
        />
      </Card>
      <Card>
        <AdminTitle name="dogGender" control={control}>
          성별
        </AdminTitle>
        <SingleRadio name="dogGenderField" radiosText={["수컷", "암컷"]} disabled />
      </Card>
      <Card>
        <AdminTitle name="dogSize" control={control}>
          크기
        </AdminTitle>
        <SingleRadio
          name="dogSizeField"
          caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견"
          radiosText={["소형견", "중형견", "대형견"]}
          disabled
        />
      </Card>
      <Card>
        <AdminTitle name="dogBreed" control={control}>
          견종
        </AdminTitle>
        <SearchInputField
          name="dogBreedField"
          control={control}
          placeholder="견종을 선택하는 칸이에요"
          disabled
        />
      </Card>
      <Card>
        <AdminTitle name="birthDate" control={control}>
          생일
        </AdminTitle>
        <div style={{ display: "flex", gap: "5px" }}>
          <SelectNumber name="year" control={control} defaultValue="2000" disabled />
          <SelectNumber name="month" control={control} defaultValue="01" disabled />
          <SelectNumber name="day" control={control} defaultValue="01" disabled />
        </div>
      </Card>
      <Card>
        <AdminTitle name="neutralization" control={control}>
          중성화 여부
        </AdminTitle>
        <SingleRadio name="neutralizationField" radiosText={["했어요", "안했어요"]} disabled />
      </Card>
      <Card>
        <AdminTitle name="vaccination" control={control}>
          예방접종 여부
        </AdminTitle>
        <SingleRadio name="vaccinationField" radiosText={["했어요", "안했어요"]} disabled />
        <Caption>접종을 한 견주가 예방접종 증명서를 업로드 하는 칸이에요</Caption>
        <ImageUpload disabled />
      </Card>
      <Card>
        <AdminTitle name="allergyDisease" control={control}>
          알러지 및 질병 유무
        </AdminTitle>
        <TextArea
          name="allergyDiseaseField"
          register={register}
          placeholder="알러지나 질병이 있다면 상세히 입력해주세요."
          disabled
        />
      </Card>
    </>
  );
};

export default DogInfo;
