import { type AgreementsListType, ITEM_KEYS } from "constants/item";

import Checkbox from "components/common/Checkbox";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { useFormContext } from "react-hook-form";

import { Caption, Card, Stack } from "../styles";

interface PolicyInfoProps {
  item?: Map<number, boolean>;
  agreements: AgreementsListType;
}

const PolicyInfo = ({ item, agreements }: PolicyInfoProps) => {
  const { register } = useFormContext();

  const isAllChecked =
    agreements.limitsInfo_agreement &&
    agreements.accidentInfo_agreement &&
    agreements.abandonmentInfo_agreement;

  return (
    <>
      <Card>
        <Checkbox label="유의사항 전체 동의하기" isChecked={isAllChecked} variant="fill" readOnly />
      </Card>
      <Card>
        <Title htmlFor="limitsInfo" isRequired={item?.get(ITEM_KEYS.LIMITS_INFO)}>
          이용 제한 유의 사항
        </Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <TextArea
          {...register("limitsInfo")}
          isChecked={agreements.limitsInfo_agreement}
          disabled
        />
        <Stack>
          <Checkbox label="동의합니다" isChecked={agreements.limitsInfo_agreement} readOnly />
        </Stack>
      </Card>
      <Card>
        <Title htmlFor="accidentInfo" isRequired={item?.get(ITEM_KEYS.ACCIDENT_INFO)}>
          상해 유의사항
        </Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <TextArea
          {...register("accidentInfo")}
          isChecked={agreements.accidentInfo_agreement}
          disabled
        />
        <Stack>
          <Checkbox label="동의합니다" isChecked={agreements.accidentInfo_agreement} readOnly />
        </Stack>
      </Card>
      <Card>
        <Title htmlFor="abandonmentInfo" isRequired={item?.get(ITEM_KEYS.ABANDONMENT_INFO)}>
          유기 유의사항
        </Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</Caption>
        <TextArea
          {...register("abandonmentInfo")}
          isChecked={agreements.abandonmentInfo_agreement}
          disabled
        />
        <Stack>
          <Checkbox label="동의합니다" isChecked={agreements.abandonmentInfo_agreement} readOnly />
        </Stack>
      </Card>
    </>
  );
};

export default PolicyInfo;
