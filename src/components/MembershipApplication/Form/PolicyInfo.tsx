import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Title from "components/common/Title";
import TextArea from "components/common/TextArea";
import Checkbox from "components/common/Checkbox";
import { ITEM_KEYS } from "constants/item";
import type { IPolicyInfo } from "types/School.type";

import * as S from "./styles";

interface PolicyInfoProps {
  info: IPolicyInfo;
  requiredItems: Map<number, boolean>;
}

const PolicyInfo = ({ info, requiredItems }: PolicyInfoProps) => {
  const { control, setValue, watch } = useFormContext();
  const allChecked = watch("all");
  const watchTerms = watch(["limitsInfo", "accidentInfo", "abandonmentInfo"]);

  useEffect(() => {
    const allTermsChecked = watchTerms.every(Boolean);

    if (allChecked !== allTermsChecked) {
      setValue("all", allTermsChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTerms, setValue]);

  const handleParentCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setValue("limitsInfo", checked);
    setValue("accidentInfo", checked);
    setValue("abandonmentInfo", checked);
  };

  return (
    <>
      <S.Card>
        <Checkbox
          name="all"
          control={control}
          ariaLabel="동의"
          onChange={handleParentCheckboxChange}
          isChecked={allChecked}
          variant="square"
        >
          유의사항 전체 동의하기
        </Checkbox>
      </S.Card>
      <S.Card>
        <Title htmlFor="limitsInfo" isRequired={requiredItems.get(ITEM_KEYS.LIMITS_INFO)}>
          이용 제한 유의 사항
        </Title>
        <S.Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</S.Caption>
        <TextArea
          id="limitsInfo"
          defaultValue={info.limitsInfo}
          disabled
          isChecked={watch("limitsInfo")}
        />
        <S.Stack>
          <Checkbox
            name="limitsInfo"
            control={control}
            ariaLabel="동의"
            isChecked={watchTerms[0]}
            isRequired={requiredItems.get(ITEM_KEYS.LIMITS_INFO)}
          >
            동의합니다
          </Checkbox>
        </S.Stack>
      </S.Card>
      <S.Card>
        <Title htmlFor="accidentInfo" isRequired={requiredItems.get(ITEM_KEYS.ACCIDENT_INFO)}>
          상해 유의사항
        </Title>
        <S.Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</S.Caption>
        <TextArea
          id="accidentInfo"
          defaultValue={info.accidentInfo}
          disabled
          isChecked={watch("accidentInfo")}
        />
        <S.Stack>
          <Checkbox
            name="accidentInfo"
            control={control}
            ariaLabel="동의"
            isChecked={watchTerms[1]}
            isRequired={requiredItems.get(ITEM_KEYS.ACCIDENT_INFO)}
          >
            동의합니다
          </Checkbox>
        </S.Stack>
      </S.Card>
      <S.Card>
        <Title htmlFor="abandonmentInfo" isRequired={requiredItems.get(ITEM_KEYS.ABANDONMENT_INFO)}>
          유기 유의사항
        </Title>
        <S.Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</S.Caption>
        <TextArea
          id="abandonmentInfo"
          defaultValue={info.abandonmentInfo}
          disabled
          isChecked={watch("abandonmentInfo")}
        />
        <S.Stack>
          <Checkbox
            name="abandonmentInfo"
            control={control}
            ariaLabel="동의"
            isChecked={watchTerms[2]}
            isRequired={requiredItems.get(ITEM_KEYS.ABANDONMENT_INFO)}
          >
            동의합니다
          </Checkbox>
        </S.Stack>
      </S.Card>
    </>
  );
};

export default PolicyInfo;
