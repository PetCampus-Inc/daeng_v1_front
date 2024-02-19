import { useFormContext } from "react-hook-form";

import Checkbox from "components/common/Checkbox";
import AdminTitle from "components/common/Title/AdminTitle";
import TextArea from "components/common/TextArea";
import { ITEM_KEYS } from "constants/item";
import { Card, Stack } from "../styles";

const PolicyInfo = () => {
  const { control, register } = useFormContext();

  return (
    <>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.LIMITS_INFO}`} control={control} hasBadge>
          이용 제한 유의 사항
        </AdminTitle>
        <TextArea name="limitsInfo" placeholder="이용 제한 관련 유의사항을 입력해 주세요" />
        <Stack>
          <Checkbox name="null" disabled>
            동의합니다
          </Checkbox>
        </Stack>
      </Card>
      <Card>
        <AdminTitle name={`requiredItemList.${ITEM_KEYS.ACCIDENT_INFO}`} control={control} hasBadge>
          상해 유의사항
        </AdminTitle>
        <TextArea name="accidentInfo" placeholder="상해 관련 유의사항을 입력해 주세요" />
        <Stack>
          <Checkbox name="null" disabled>
            동의합니다
          </Checkbox>
        </Stack>
      </Card>
      <Card>
        <AdminTitle
          name={`requiredItemList.${ITEM_KEYS.ABANDONMENT_INFO}`}
          control={control}
          hasBadge
        >
          유기 유의사항
        </AdminTitle>
        <TextArea name="abandonmentInfo" placeholder="유기 관련 유의사항을 입력해 주세요" />
        <Stack>
          <Checkbox name="null" disabled>
            동의합니다
          </Checkbox>
        </Stack>
      </Card>
    </>
  );
};

export default PolicyInfo;
