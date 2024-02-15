import { useFormContext } from "react-hook-form";

import { Card } from "../styles";
import AdminTitle from "components/common/Title/AdminTitle";
import TextArea from "components/common/TextArea";
import { ITEM_KEYS } from "constants/item";

const PolicyInfo = () => {
  const { control } = useFormContext();
  return (
    <>
      <Card>
        <AdminTitle
          name={`requiredItemList.${ITEM_KEYS.LIMITS_INFO}`}
          control={control}
          hasBadge
          hasToggle
        >
          이용 제한 유의 사항
        </AdminTitle>
        <TextArea name="limitsInfo" placeholder="이용 제한 관련 유의사항을 입력해 주세요" />
      </Card>
      <Card>
        <AdminTitle
          name={`requiredItemList.${ITEM_KEYS.ACCIDENT_INFO}`}
          control={control}
          hasBadge
          hasToggle
        >
          상해 유의사항
        </AdminTitle>
        <TextArea name="accidentInfo" placeholder="상해 관련 유의사항을 입력해 주세요" />
      </Card>
      <Card>
        <AdminTitle
          name={`requiredItemList.${ITEM_KEYS.ABANDONMENT_INFO}`}
          control={control}
          hasBadge
          hasToggle
        >
          유기 유의사항
        </AdminTitle>
        <TextArea name="abandonmentInfo" placeholder="유기 관련 유의사항을 입력해 주세요" />
      </Card>
    </>
  );
};

export default PolicyInfo;
