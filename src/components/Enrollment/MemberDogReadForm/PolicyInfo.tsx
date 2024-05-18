import { ITEM_KEYS } from "constants/item";

import Checkbox from "components/common/Checkbox";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

import * as S from "./styles";

const PolicyInfo = () => {
  const requiredItemsMap = new Map<number, boolean>([
    [ITEM_KEYS.LIMITS_INFO, true],
    [ITEM_KEYS.ACCIDENT_INFO, true],
    [ITEM_KEYS.ABANDONMENT_INFO, true],
    [ITEM_KEYS.ABANDONMENT_INFO, true]
  ]);

  const { control, register, setValue, watch } = useFormContext();
  const allChecked = watch("all");
  const watchTerms = watch([
    "limitsInfo_agreement",
    "accidentInfo_agreement",
    "abandonmentInfo_agreement"
  ]);

  useEffect(() => {
    const allTermsChecked = watchTerms.every(Boolean);

    if (allChecked !== allTermsChecked) {
      setValue("all", allTermsChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTerms, setValue]);

  useEffect(() => {
    setValue("limitsInfo_agreement", true);
    setValue("accidentInfo_agreement", true);
    setValue("abandonmentInfo_agreement", true);
  }, [setValue]);

  return (
    <>
      <S.Card>
        <Controller
          name="all"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <Checkbox
              label="유의사항 전체 동의하기"
              ref={ref}
              isChecked={field.value}
              variant="fill"
            />
          )}
        />
      </S.Card>
      <S.Card>
        <Title htmlFor="limitsInfo" isRequired={requiredItemsMap?.get(ITEM_KEYS.LIMITS_INFO)}>
          이용 제한 유의 사항
        </Title>
        <S.Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</S.Caption>
        <TextArea {...register("limitsInfo")} isChecked={watchTerms[0]} disabled />
        <S.Stack>
          <Controller
            name="limitsInfo_agreement"
            control={control}
            rules={{ required: requiredItemsMap?.get(ITEM_KEYS.LIMITS_INFO) }}
            render={({ field: { ref, ...field } }) => (
              <Checkbox label="동의합니다" ref={ref} isChecked={field.value} />
            )}
          />
        </S.Stack>
      </S.Card>
      <S.Card>
        <Title htmlFor="accidentInfo" isRequired={requiredItemsMap?.get(ITEM_KEYS.ACCIDENT_INFO)}>
          상해 유의사항
        </Title>
        <S.Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</S.Caption>
        <TextArea {...register("accidentInfo")} isChecked={watchTerms[1]} disabled />
        <S.Stack>
          <Controller
            name="accidentInfo_agreement"
            control={control}
            rules={{ required: requiredItemsMap?.get(ITEM_KEYS.ACCIDENT_INFO) }}
            render={({ field: { ref, ...field } }) => (
              <Checkbox label="동의합니다" ref={ref} isChecked={field.value} />
            )}
          />
        </S.Stack>
      </S.Card>
      <S.Card>
        <Title
          htmlFor="abandonmentInfo"
          isRequired={requiredItemsMap?.get(ITEM_KEYS.ABANDONMENT_INFO)}
        >
          유기 유의사항
        </Title>
        <S.Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</S.Caption>
        <TextArea {...register("abandonmentInfo")} isChecked={watchTerms[2]} disabled />
        <S.Stack>
          <Controller
            name="abandonmentInfo_agreement"
            control={control}
            rules={{ required: requiredItemsMap?.get(ITEM_KEYS.ABANDONMENT_INFO) }}
            render={({ field: { ref, ...field } }) => (
              <Checkbox label="동의합니다" ref={ref} isChecked={field.value} />
            )}
          />
        </S.Stack>
      </S.Card>
    </>
  );
};

export default PolicyInfo;
