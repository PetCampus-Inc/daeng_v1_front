import { useFormContext } from "react-hook-form";

import AdminTitle from "components/common/Title/AdminTitle";
import InputField from "components/common/InputField";
import SingleRadio from "components/common/Select/SingleRadio";
import SearchInputField from "components/common/InputField/SearchInputField";
import SelectNumber from "components/common/Select/SelectNumber";
import ImageUpload from "components/common/ImageUpload";
import TextArea from "components/common/TextArea";

import { ITEM_KEYS } from "constants/item";
import { Card, Caption } from "../styles";

interface DogInfoProps {
  requiredItems?: Map<number, boolean>;
}

const DogInfo = ({ requiredItems }: DogInfoProps) => {
  const { control, register } = useFormContext();

  return (
    <>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.DOG_NAME}`} control={control}>
          이름
        </AdminTitle>
        <InputField
          name="null"
          control={control}
          placeholder="강아지 이름을 입력해주세요"
          disabled
        />
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.DOG_GENDER}`} control={control}>
          성별
        </AdminTitle>
        <SingleRadio name="null" radiosText={["수컷", "암컷"]} disabled />
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.DOG_SIZE}`} control={control}>
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
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.DOG_BREED}`} control={control}>
          견종
        </AdminTitle>
        <SearchInputField
          name="null"
          control={control}
          placeholder="견종을 선택하는 칸이에요"
          disabled
        />
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.DOG_BIRTHDAY}`} control={control}>
          생일
        </AdminTitle>
        <div style={{ display: "flex", gap: "5px" }}>
          <SelectNumber name="year" control={control} placeholder="2000" disabled />
          <SelectNumber name="month" control={control} placeholder="01" disabled />
          <SelectNumber name="day" control={control} placeholder="01" disabled />
        </div>
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.NEUTRALIZATION}`} control={control}>
          중성화 여부
        </AdminTitle>
        <SingleRadio name="null" radiosText={["했어요", "안했어요"]} disabled />
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.VACCINATION}`} control={control}>
          예방접종 여부
        </AdminTitle>
        <SingleRadio name="null" radiosText={["했어요", "안했어요"]} disabled />
        <Caption>접종을 한 견주가 예방접종 증명서를 업로드 하는 칸이에요</Caption>
        <ImageUpload disabled />
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.ALLERGY_DISEASE}`} control={control}>
          알러지 및 질병 유무
        </AdminTitle>
        <TextArea
          name="null"
          register={register}
          placeholder="알러지나 질병이 있다면 상세히 입력해주세요."
          disabled
        />
      </Card>
    </>
  );
};

export default DogInfo;
