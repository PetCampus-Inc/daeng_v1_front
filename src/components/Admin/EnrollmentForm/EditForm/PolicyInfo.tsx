import { useFormContext } from "react-hook-form";

import type { IPolicyInfo } from "types/School.type";

import AdminTitle from "components/common/Title/AdminTitle";
import TextArea from "components/common/TextArea";
import Checkbox from "components/common/Checkbox";

import { ITEM_KEYS } from "constants/item";
import { Card, Stack } from "../styles";
interface PolicyInfoProps {
  info?: IPolicyInfo;
  requiredItems?: Map<number, boolean>;
}

const PolicyInfo = ({ info, requiredItems }: PolicyInfoProps) => {
  const { control, register } = useFormContext();

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
        <TextArea
          name="limitsInfo"
          register={register}
          rules={{
            required: true
          }}
          placeholder="이용 제한 관련 유의사항을 입력해 주세요"
          value={info?.limitsInfo}
        />
        <Stack>
          <Checkbox name="null" control={control} disabled>
            동의합니다
          </Checkbox>
        </Stack>
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
        <TextArea
          name="accidentInfo"
          register={register}
          rules={{
            required: true
          }}
          placeholder="상해 관련 유의사항을 입력해 주세요"
          value={info?.accidentInfo}
        />
        <Stack>
          <Checkbox name="null" control={control} disabled>
            동의합니다
          </Checkbox>
        </Stack>
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
        <TextArea
          name="abandonmentInfo"
          register={register}
          rules={{
            required: true
          }}
          placeholder="유기 관련 유의사항을 입력해 주세요"
          value={info?.abandonmentInfo}
        />
        <Stack>
          <Checkbox name="null" control={control} disabled>
            동의합니다
          </Checkbox>
        </Stack>
      </Card>
    </>
  );
};

export default PolicyInfo;
